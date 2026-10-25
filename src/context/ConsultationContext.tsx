import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestoreDb } from "../services/firebase/firebaseClient";
import {
  ConsultationAvailability,
  ConsultationBooking,
  ConsultationStatus,
  PaymentStatus,
  AvailabilityException,
  ConsultationMode,
  Money,
} from "../domain/consultation/types";
import {
  CANONICAL_CONSULTANT_AVAILABILITY,
  createCanonicalAvailability,
} from "../domain/consultation/canonicalAvailability";
import { PRIMARY_CONSULTANT } from "../domain/consultation/operatorConfig";
import { consultationOperations } from "../domain/consultation/consultationOperationsService";
import { calculateEndTime } from "../domain/consultation/businessRules";
import { validateBookingSlot } from "../domain/consultation/availabilityEngine";
import { firestoreConsultationBookingAdapter } from "../domain/consultation/firestoreConsultationBookingAdapter";
import { canAccessConsultantWorkspace, canViewPrivateNotes } from "../domain/consultation/authorization";

export interface CreateBookingParams {
  readonly serviceId: string;
  readonly serviceName: string;
  readonly category: any;
  readonly mode: ConsultationMode;
  readonly startTime: string; // ISO string
  readonly durationMinutes: number;
  readonly timezone: string;
  readonly clientName: string;
  readonly clientEmail: string;
  readonly clientPhone?: string;
  readonly clientQuestion?: string;
  readonly focusTopic: string;
  readonly paymentOption: "PAY_IN_FULL_NOW" | "PAY_BEFORE_SESSION";
  readonly originalPrice: Money;
  readonly finalPrice: Money;
  readonly birthDetails?: {
    readonly dob: string;
    readonly time: string;
    readonly place: string;
  };
}

export interface ConsultationNotesRecord {
  readonly privateNotes: string;
  readonly clientSummary: string;
  readonly remedies: readonly string[];
  readonly updatedAt: string;
}

export interface ConsultationContextType {
  // Availability state
  readonly availability: ConsultationAvailability;
  readonly updateWeeklyHours: (
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    isEnabled: boolean,
    timeRanges: readonly { start: string; end: string }[],
    breaks?: readonly { start: string; end: string }[]
  ) => void;
  readonly addTimeRange: (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, range: { start: string; end: string }) => void;
  readonly removeTimeRange: (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, index: number) => void;
  readonly addBreak: (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, breakRange: { start: string; end: string }) => void;
  readonly removeBreak: (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, index: number) => void;
  readonly setBufferMinutes: (bufferMinutes: number) => void;
  readonly addException: (exception: Omit<AvailabilityException, "id" | "consultantId">) => void;
  readonly removeException: (exceptionId: string) => void;
  readonly resetAvailabilityToDefault: () => void;

  // Bookings state
  readonly bookings: readonly ConsultationBooking[];
  readonly createBooking: (params: CreateBookingParams) => Promise<ConsultationBooking> | ConsultationBooking;
  readonly confirmBooking: (bookingId: string, actorEmail: string) => Promise<boolean> | boolean;
  readonly declineBooking: (bookingId: string, actorEmail: string, reason: string) => Promise<boolean> | boolean;
  readonly startSession: (bookingId: string, actorEmail: string) => Promise<boolean> | boolean;
  readonly completeSession: (bookingId: string, actorEmail: string) => Promise<boolean> | boolean;
  readonly cancelBooking: (bookingId: string, cancelledBy: "CLIENT" | "CONSULTANT", reason: string) => Promise<boolean> | boolean;
  readonly completePayment: (bookingId: string) => Promise<boolean> | boolean;
  readonly rescheduleBooking: (bookingId: string, newStartTime: string, reason: string) => Promise<boolean> | boolean;

  // Notes state (Strict separation)
  readonly saveConsultationNotes: (
    bookingId: string,
    privateNotes: string,
    clientSummary: string,
    remedies: readonly string[]
  ) => void;
  readonly getPrivateNotes: (bookingId: string) => string;
  readonly getClientSummary: (bookingId: string) => { summary: string; remedies: readonly string[] } | null;

  // Persistence status
  readonly persistenceInfo: {
    readonly isDeferred: boolean;
    readonly notice: string;
  };
}

const ConsultationContext = createContext<ConsultationContextType | null>(null);

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Deterministic in-memory availability
  const [availability, setAvailability] = useState<ConsultationAvailability>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("astronext_consultant_availability");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed.rules)) {
            return parsed;
          }
        }
      } catch {
        // Fallback to canonical
      }
    }
    return CANONICAL_CONSULTANT_AVAILABILITY;
  });

  // Bookings list: strictly initialized to empty to guarantee signed-out isolation
  const [bookings, setBookings] = useState<readonly ConsultationBooking[]>([]);

  // Notes store (keyed by bookingId): strictly initialized to empty to guarantee privacy
  const [notesStore, setNotesStore] = useState<Record<string, ConsultationNotesRecord>>({});

  // Active identity tracking and asynchronous race protection refs
  const activeUidRef = useRef<string | null>(null);
  const activeRequestIdRef = useRef<number>(0);

  // Load persistent availability configuration from Firestore on mount
  useEffect(() => {
    let isMounted = true;
    async function loadRemoteAvailability() {
      try {
        const snap = await getDoc(doc(firestoreDb, "systemSettings", "consultationAvailability"));
        if (snap.exists() && isMounted) {
          const data = snap.data();
          if (data && Array.isArray(data.rules) && data.rules.length > 0) {
            setAvailability(data as ConsultationAvailability);
          }
        }
      } catch (err) {
        // Fallback to local or canonical defaults silently if offline
      }
    }
    loadRemoteAvailability();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync availability configuration locally and persist to Firestore for authorized Super Admin
  useEffect(() => {
    try {
      localStorage.setItem("astronext_consultant_availability", JSON.stringify(availability));
    } catch {}

    const userEmail = firebaseAuth.currentUser?.email?.toLowerCase();
    if (userEmail === "ravieadagale@gmail.com") {
      setDoc(doc(firestoreDb, "systemSettings", "consultationAvailability"), availability).catch(() => {});
    }
  }, [availability]);

  // Sync bookings strictly to authenticated UID-scoped storage
  useEffect(() => {
    const currentUid = firebaseAuth.currentUser?.uid;
    if (currentUid && bookings.length > 0) {
      try {
        localStorage.setItem(
          `astronext_consultation_bookings_${currentUid}`,
          JSON.stringify(bookings)
        );
      } catch {}
    }
  }, [bookings]);

  // Sync notes strictly to authenticated UID-scoped storage for authorized consultants only
  useEffect(() => {
    const currentUid = firebaseAuth.currentUser?.uid;
    const currentEmail = firebaseAuth.currentUser?.email;
    if (currentUid && canViewPrivateNotes(currentEmail) && Object.keys(notesStore).length > 0) {
      try {
        localStorage.setItem(
          `astronext_consultation_notes_${currentUid}`,
          JSON.stringify(notesStore)
        );
      } catch {}
    }
  }, [notesStore]);

  // Authoritative Firestore session listener with race-condition guards & session isolation
  useEffect(() => {
    // Purge legacy un-scoped consultation keys that could leak across users on shared browsers
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("astronext_consultation_bookings");
        localStorage.removeItem("astronext_consultation_notes");
      } catch {}
    }

    // Explicit event listener for synchronous logout broadcasts
    const handleExplicitAuthChange = () => {
      if (!firebaseAuth.currentUser) {
        activeRequestIdRef.current++;
        activeUidRef.current = null;
        setBookings([]);
        setNotesStore({});
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("astronext:auth_state_change", handleExplicitAuthChange);
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      // Increment request token for asynchronous race protection
      const currentRequestId = ++activeRequestIdRef.current;
      const currentUid = currentUser?.uid || null;
      activeUidRef.current = currentUid;

      // 1. SIGNED-OUT STATE: Immediately clear in-memory React state
      if (!currentUser || !currentUid) {
        setBookings([]);
        setNotesStore({});
        return;
      }

      // 2. USER SIGNED IN: Isolate state immediately
      // Never expose another user's state while loading
      const scopedBookingKey = `astronext_consultation_bookings_${currentUid}`;
      const scopedNotesKey = `astronext_consultation_notes_${currentUid}`;

      let initialScopedBookings: readonly ConsultationBooking[] = [];
      try {
        const storedBookings = localStorage.getItem(scopedBookingKey);
        if (storedBookings) {
          const parsed = JSON.parse(storedBookings);
          if (Array.isArray(parsed)) {
            // Strictly scope to current user's UID or assigned consultant email
            initialScopedBookings = parsed.filter(
              (b) => b.clientId === currentUid || b.consultantEmail === currentUser.email
            );
          }
        }
      } catch {}

      // Display only this user's scoped cache while remote load is pending
      setBookings(initialScopedBookings);

      let initialScopedNotes: Record<string, ConsultationNotesRecord> = {};
      if (canViewPrivateNotes(currentUser.email)) {
        try {
          const storedNotes = localStorage.getItem(scopedNotesKey);
          if (storedNotes) {
            const parsed = JSON.parse(storedNotes);
            if (parsed && typeof parsed === "object") {
              initialScopedNotes = parsed;
            }
          }
        } catch {}
      }
      setNotesStore(initialScopedNotes);

      // 3. AUTHORITATIVE ASYNCHRONOUS FIRESTORE LOAD
      try {
        const isConsultant = canAccessConsultantWorkspace(currentUser.email);
        let remoteBookings: readonly ConsultationBooking[] = [];

        if (isConsultant) {
          // Consultant / Super Admin: load consultant bookings + client bookings
          const [consultantBookings, clientBookings] = await Promise.all([
            firestoreConsultationBookingAdapter.listBookingsByConsultant(PRIMARY_CONSULTANT.id),
            firestoreConsultationBookingAdapter.listBookingsByClient(currentUid),
          ]);
          const map = new Map<string, ConsultationBooking>();
          consultantBookings.forEach((b) => map.set(b.id, b));
          clientBookings.forEach((b) => map.set(b.id, b));
          remoteBookings = Array.from(map.values()).sort(
            (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
        } else {
          // Standard Customer: load strictly bookings belonging to this client UID
          remoteBookings = await firestoreConsultationBookingAdapter.listBookingsByClient(currentUid);
        }

        // 4. ASYNCHRONOUS RACE PROTECTION
        // Ensure a request initiated under UID A cannot update context after identity changes to UID B or signed-out
        if (activeRequestIdRef.current !== currentRequestId || activeUidRef.current !== currentUid) {
          // Response is stale or superseded; safely discard
          return;
        }

        // Authoritative Firestore load replaces in-memory state
        setBookings(remoteBookings);

        // Update UID-scoped cache (never used as authorization evidence, never written back to Firestore)
        try {
          localStorage.setItem(scopedBookingKey, JSON.stringify(remoteBookings));
        } catch {}
      } catch (err) {
        console.warn("[ConsultationContext] Could not load bookings from Firestore:", err);
        if (activeRequestIdRef.current !== currentRequestId || activeUidRef.current !== currentUid) {
          return;
        }
      }
    });

    return () => {
      activeRequestIdRef.current++;
      activeUidRef.current = null;
      if (typeof window !== "undefined") {
        window.removeEventListener("astronext:auth_state_change", handleExplicitAuthChange);
      }
      unsubscribe();
    };
  }, []);

  // Availability mutators
  const updateWeeklyHours = (
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    isEnabled: boolean,
    timeRanges: readonly { start: string; end: string }[],
    breaks?: readonly { start: string; end: string }[]
  ) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0] || {
        id: "rule-canonical-weekly",
        consultantId: prev.consultantId,
        weeklyHours: [],
        timezone: prev.timezone,
        bufferMinutes: 15,
      };

      const updatedWeeklyHours = activeRule.weeklyHours.map((dh) => {
        if (dh.dayOfWeek === dayOfWeek) {
          return {
            ...dh,
            isEnabled,
            timeRanges: [...timeRanges],
            breaks: breaks ? [...breaks] : dh.breaks || [],
          };
        }
        return dh;
      });

      return {
        ...prev,
        rules: [
          {
            ...activeRule,
            weeklyHours: updatedWeeklyHours,
          },
        ],
      };
    });
  };

  const addTimeRange = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, range: { start: string; end: string }) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0];
      if (!activeRule) return prev;
      const updated = activeRule.weeklyHours.map((dh) => {
        if (dh.dayOfWeek === dayOfWeek) {
          return {
            ...dh,
            isEnabled: true,
            timeRanges: [...dh.timeRanges, range],
          };
        }
        return dh;
      });
      return {
        ...prev,
        rules: [{ ...activeRule, weeklyHours: updated }],
      };
    });
  };

  const removeTimeRange = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, index: number) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0];
      if (!activeRule) return prev;
      const updated = activeRule.weeklyHours.map((dh) => {
        if (dh.dayOfWeek === dayOfWeek) {
          const filtered = dh.timeRanges.filter((_, i) => i !== index);
          return {
            ...dh,
            isEnabled: filtered.length > 0,
            timeRanges: filtered,
          };
        }
        return dh;
      });
      return {
        ...prev,
        rules: [{ ...activeRule, weeklyHours: updated }],
      };
    });
  };

  const addBreak = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, breakRange: { start: string; end: string }) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0];
      if (!activeRule) return prev;
      const updated = activeRule.weeklyHours.map((dh) => {
        if (dh.dayOfWeek === dayOfWeek) {
          return {
            ...dh,
            breaks: [...(dh.breaks || []), breakRange],
          };
        }
        return dh;
      });
      return {
        ...prev,
        rules: [{ ...activeRule, weeklyHours: updated }],
      };
    });
  };

  const removeBreak = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6, index: number) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0];
      if (!activeRule) return prev;
      const updated = activeRule.weeklyHours.map((dh) => {
        if (dh.dayOfWeek === dayOfWeek) {
          return {
            ...dh,
            breaks: (dh.breaks || []).filter((_, i) => i !== index),
          };
        }
        return dh;
      });
      return {
        ...prev,
        rules: [{ ...activeRule, weeklyHours: updated }],
      };
    });
  };

  const setBufferMinutes = (bufferMinutes: number) => {
    setAvailability((prev) => {
      const activeRule = prev.rules[0];
      if (!activeRule) return prev;
      return {
        ...prev,
        rules: [{ ...activeRule, bufferMinutes }],
      };
    });
  };

  const addException = (exception: Omit<AvailabilityException, "id" | "consultantId">) => {
    setAvailability((prev) => {
      const newException: AvailabilityException = {
        ...exception,
        id: `exc-${Date.now()}`,
        consultantId: prev.consultantId,
      };
      return {
        ...prev,
        exceptions: [...prev.exceptions, newException],
      };
    });
  };

  const removeException = (exceptionId: string) => {
    setAvailability((prev) => ({
      ...prev,
      exceptions: prev.exceptions.filter((e) => e.id !== exceptionId),
    }));
  };

  const resetAvailabilityToDefault = () => {
    setAvailability(createCanonicalAvailability());
  };

  // Booking actions
  const createBooking = async (params: CreateBookingParams): Promise<ConsultationBooking> => {
    // 1. Validate slot integrity deterministically before creation
    const validation = validateBookingSlot({
      availability,
      startTime: params.startTime,
      durationMinutes: params.durationMinutes,
      bufferMinutes: availability.rules[0]?.bufferMinutes || 15,
      existingBookings: bookings,
    });

    if (!validation.isValid) {
      throw new Error(`Slot validation failed: ${validation.error}`);
    }

    const currentAuthUser = firebaseAuth.currentUser;
    if (!currentAuthUser?.uid) {
      throw new Error("Authentication required: You must be signed in to submit an authoritative consultation booking.");
    }

    // 2. Persist to real Firestore with atomic concurrency slot lock
    // Persistence-before-local-state: must succeed in Firestore first
    const booking = await firestoreConsultationBookingAdapter.createBooking({
      serviceId: params.serviceId,
      serviceName: params.serviceName,
      category: params.category,
      mode: params.mode,
      requestedStartTime: params.startTime,
      timezone: params.timezone,
      durationMinutes: params.durationMinutes,
      paymentOption: params.paymentOption,
      originalPrice: params.originalPrice,
      finalPrice: params.finalPrice,
      clientUid: currentAuthUser.uid,
      clientDetails: {
        name: params.clientName,
        email: currentAuthUser.email || params.clientEmail,
        phone: params.clientPhone,
        focusTopic: params.focusTopic,
        specificQuestions: params.clientQuestion ? [params.clientQuestion] : undefined,
        birthDetails: params.birthDetails,
      },
    });

    // Update in-memory state only upon verified Firestore persistence
    setBookings((prev) => [booking, ...prev.filter((b) => b.id !== booking.id)]);
    return booking;
  };

  const confirmBooking = async (bookingId: string, actorEmail: string): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    const res = consultationOperations.transitionState({
      booking: target,
      nextStatus: "CONFIRMED",
      actorRole: "CONSULTANT",
      actorEmail,
      reason: "Confirmed by consultant",
    });

    if (res.success && res.updatedBooking) {
      try {
        await firestoreConsultationBookingAdapter.updateBookingStatus(bookingId, "CONFIRMED");
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.updatedBooking! : b))
        );
        return true;
      } catch (err) {
        console.error("[ConsultationContext] Failed to persist confirmation to Firestore:", err);
        return false;
      }
    }
    return false;
  };

  const declineBooking = async (bookingId: string, actorEmail: string, reason: string): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    const res = consultationOperations.transitionState({
      booking: target,
      nextStatus: "DECLINED",
      actorRole: "CONSULTANT",
      actorEmail,
      reason,
    });

    if (res.success && res.updatedBooking) {
      try {
        await firestoreConsultationBookingAdapter.updateBookingStatus(bookingId, "DECLINED");
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.updatedBooking! : b))
        );
        return true;
      } catch (err) {
        console.error("[ConsultationContext] Failed to persist decline to Firestore:", err);
        return false;
      }
    }
    return false;
  };

  const startSession = async (bookingId: string, actorEmail: string): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    const res = consultationOperations.transitionState({
      booking: target,
      nextStatus: "IN_PROGRESS",
      actorRole: "CONSULTANT",
      actorEmail,
      reason: "Session commenced",
    });

    if (res.success && res.updatedBooking) {
      try {
        await firestoreConsultationBookingAdapter.updateBookingStatus(bookingId, "IN_PROGRESS");
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.updatedBooking! : b))
        );
        return true;
      } catch (err) {
        console.error("[ConsultationContext] Failed to persist session start to Firestore:", err);
        return false;
      }
    }
    return false;
  };

  const completeSession = async (bookingId: string, actorEmail: string): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    const res = consultationOperations.transitionState({
      booking: target,
      nextStatus: "COMPLETED",
      actorRole: "CONSULTANT",
      actorEmail,
      reason: "Session completed with counsel formulated",
    });

    if (res.success && res.updatedBooking) {
      try {
        await firestoreConsultationBookingAdapter.updateBookingStatus(bookingId, "COMPLETED");
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.updatedBooking! : b))
        );
        return true;
      } catch (err) {
        console.error("[ConsultationContext] Failed to persist session completion to Firestore:", err);
        return false;
      }
    }
    return false;
  };

  const cancelBooking = async (
    bookingId: string,
    cancelledBy: "CLIENT" | "CONSULTANT",
    reason: string
  ): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;

    const nextStatus: ConsultationStatus =
      cancelledBy === "CLIENT" ? "CANCELLED_BY_CLIENT" : "CANCELLED_BY_CONSULTANT";

    const res = consultationOperations.transitionState({
      booking: target,
      nextStatus,
      actorRole: cancelledBy,
      actorEmail: cancelledBy === "CLIENT" ? target.clientEmail : target.consultantEmail,
      reason,
    });

    if (res.success && res.updatedBooking) {
      try {
        await firestoreConsultationBookingAdapter.updateBookingStatus(bookingId, nextStatus);
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? res.updatedBooking! : b))
        );
        return true;
      } catch (err) {
        console.error("[ConsultationContext] Failed to persist cancellation to Firestore:", err);
        return false;
      }
    }
    return false;
  };

  const completePayment = async (bookingId: string): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;
    try {
      await firestoreConsultationBookingAdapter.updateBookingPaymentStatus(bookingId, "PAID");
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, paymentStatus: "PAID", updatedAt: new Date().toISOString() }
            : b
        )
      );
      return true;
    } catch (err) {
      console.error("[ConsultationContext] Failed to persist payment status to Firestore:", err);
      return false;
    }
  };

  const rescheduleBooking = async (
    bookingId: string,
    newStartTime: string,
    reason: string
  ): Promise<boolean> => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return false;
    const duration =
      Math.round(
        (new Date(target.endTime).getTime() - new Date(target.startTime).getTime()) / 60000
      ) || 60;
    const newEndTime = calculateEndTime(newStartTime, duration);
    const newRescheduleRecord = {
      previousStartTime: target.startTime,
      newStartTime,
      requestedBy: "CLIENT" as const,
      reason,
      timestamp: new Date().toISOString(),
    };
    try {
      await firestoreConsultationBookingAdapter.rescheduleBooking(
        bookingId,
        newStartTime,
        newEndTime,
        reason
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? {
                ...b,
                startTime: newStartTime,
                endTime: newEndTime,
                status: "RESCHEDULED",
                rescheduleHistory: [...b.rescheduleHistory, newRescheduleRecord],
                updatedAt: new Date().toISOString(),
              }
            : b
        )
      );
      return true;
    } catch (err) {
      console.error("[ConsultationContext] Failed to persist rescheduling to Firestore:", err);
      return false;
    }
  };

  // Notes actions (Strict role separation & session isolation)
  const saveConsultationNotes = (
    bookingId: string,
    privateNotes: string,
    clientSummary: string,
    remedies: readonly string[]
  ) => {
    const currentEmail = firebaseAuth.currentUser?.email;
    if (!canAccessConsultantWorkspace(currentEmail)) {
      console.warn("[ConsultationContext] Unauthorized attempt to save consultant notes");
      return;
    }

    setNotesStore((prev) => {
      const updated = {
        ...prev,
        [bookingId]: {
          privateNotes,
          clientSummary,
          remedies,
          updatedAt: new Date().toISOString(),
        },
      };
      const currentUid = firebaseAuth.currentUser?.uid;
      if (currentUid) {
        try {
          localStorage.setItem(
            `astronext_consultation_notes_${currentUid}`,
            JSON.stringify(updated)
          );
        } catch {}
      }
      return updated;
    });
  };

  const getPrivateNotes = (bookingId: string): string => {
    // Privacy mandate: Clients and unauthenticated users must NEVER have access to private notes
    const currentEmail = firebaseAuth.currentUser?.email;
    if (!canViewPrivateNotes(currentEmail)) {
      return "";
    }
    return notesStore[bookingId]?.privateNotes || "";
  };

  const getClientSummary = (
    bookingId: string
  ): { summary: string; remedies: readonly string[] } | null => {
    const record = notesStore[bookingId];
    if (!record) return null;
    return {
      summary: record.clientSummary,
      remedies: record.remedies,
    };
  };

  return (
    <ConsultationContext.Provider
      value={{
        availability,
        updateWeeklyHours,
        addTimeRange,
        removeTimeRange,
        addBreak,
        removeBreak,
        setBufferMinutes,
        addException,
        removeException,
        resetAvailabilityToDefault,
        bookings,
        createBooking,
        confirmBooking,
        declineBooking,
        startSession,
        completeSession,
        cancelBooking,
        completePayment,
        rescheduleBooking,
        saveConsultationNotes,
        getPrivateNotes,
        getClientSummary,
        persistenceInfo: {
          isDeferred: false,
          notice:
            "Phase 2B.2 architecture: Firebase Firestore persistence is authoritative. Session isolation, UID-scoped caching, and async race protections are active.",
        },
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = (): ConsultationContextType => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within a ConsultationProvider");
  }
  return context;
};
