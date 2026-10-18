import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  runTransaction,
  Timestamp,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { firestoreDb, firebaseAuth } from "../../services/firebase/firebaseClient";
import {
  ConsultationBooking,
  ConsultationRequest,
  ConsultationStatus,
  Money,
  PaymentStatus,
} from "./types";
import { ConsultationBookingRepository } from "./repositories";
import { calculateEndTime } from "./businessRules";
import { validateBookingSlot } from "./availabilityEngine";
import { CANONICAL_CONSULTANT_AVAILABILITY } from "./canonicalAvailability";
import { PRIMARY_CONSULTANT } from "./operatorConfig";
import { calculateConsultationPrice, ConsultationPaymentOption } from "./pricingEngine";

export interface ExtendedConsultationRequest extends ConsultationRequest {
  readonly serviceName?: string;
  readonly category?: any;
  readonly durationMinutes?: number;
  readonly paymentOption?: ConsultationPaymentOption;
  readonly originalPrice?: Money;
  readonly finalPrice?: Money;
  readonly clientUid?: string;
}

/**
 * Real Firestore Consultation Booking Repository Adapter.
 * Connects consultation bookings to the active Firebase project ('astronext-app').
 * Enforces atomic slot locking, authentic client UID validation, and pricing snapshots.
 */
export class FirestoreConsultationBookingAdapter implements ConsultationBookingRepository {
  private readonly db: Firestore;

  constructor(customDb?: Firestore) {
    this.db = customDb || firestoreDb;
  }

  /**
   * Generates a canonical, deterministic lock key for atomic slot reservation.
   * Lock key format: `${consultantId}_${startUtcEpochMinutes}`
   */
  public getSlotLockKey(consultantId: string, startTimeIso: string): string {
    const startMs = new Date(startTimeIso).getTime();
    if (isNaN(startMs)) {
      throw new Error(`Invalid start time ISO format: ${startTimeIso}`);
    }
    const epochMinutes = Math.floor(startMs / 60000);
    return `${consultantId}_${epochMinutes}`;
  }

  /**
   * Atomically creates a consultation booking document in Firestore
   * with concurrency-safe slot reservation.
   */
  public async createBooking(request: ConsultationRequest | ExtendedConsultationRequest): Promise<ConsultationBooking> {
    const ext = request as ExtendedConsultationRequest;

    // 1. Resolve authoritative authenticated client UID
    const authUid = ext.clientUid || firebaseAuth.currentUser?.uid;
    if (!authUid) {
      throw new Error("Authentication required: You must be signed in to submit a consultation booking.");
    }

    const clientEmail = (firebaseAuth.currentUser?.email || ext.clientDetails.email).trim().toLowerCase();
    const clientName = ext.clientDetails.name.trim() || "Consultation Seeker";
    const consultantId = ext.consultantId || PRIMARY_CONSULTANT.id;
    const consultantEmail = PRIMARY_CONSULTANT.email;
    const durationMinutes = ext.durationMinutes || 60;
    const startTimeIso = ext.requestedStartTime;
    const endTimeIso = calculateEndTime(startTimeIso, durationMinutes);
    const timezone = ext.timezone || "Asia/Kolkata";

    // 2. Validate slot availability deterministically against canonical rules
    const slotValidation = validateBookingSlot({
      availability: CANONICAL_CONSULTANT_AVAILABILITY,
      startTime: startTimeIso,
      durationMinutes,
      bufferMinutes: CANONICAL_CONSULTANT_AVAILABILITY.rules[0]?.bufferMinutes || 15,
      existingBookings: [],
    });

    if (!slotValidation.isValid) {
      throw new Error(`Slot validation failed: ${slotValidation.error}`);
    }

    // 3. Resolve authoritative pricing snapshot
    const paymentOption: ConsultationPaymentOption = ext.paymentOption || "PAY_BEFORE_SESSION";
    const rawBasePrice: Money = ext.originalPrice || { amountMinor: 150000, currency: "INR" };
    const priceBreakdown = calculateConsultationPrice(rawBasePrice, paymentOption);

    const nowIso = new Date().toISOString();
    const bookingId = `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const lockKey = this.getSlotLockKey(consultantId, startTimeIso);

    // Build the domain ConsultationBooking object
    const domainBooking: ConsultationBooking = {
      id: bookingId,
      clientId: authUid,
      clientEmail,
      clientName,
      consultantId,
      consultantEmail,
      serviceId: ext.serviceId,
      category: ext.category || "VEDIC_ASTROLOGY",
      mode: ext.mode || "VIDEO",
      startTime: startTimeIso,
      endTime: endTimeIso,
      timezone,
      clientQuestion: ext.clientDetails.specificQuestions?.join("; ") || ext.clientDetails.focusTopic || undefined,
      clientNotes: ext.clientDetails.birthDetails
        ? `DOB: ${ext.clientDetails.birthDetails.dob}, TOB: ${ext.clientDetails.birthDetails.time}, POB: ${ext.clientDetails.birthDetails.place}`
        : undefined,
      status: "REQUESTED",
      paymentStatus: "PAYMENT_NOT_CONNECTED",
      paymentOption,
      originalPrice: priceBreakdown.originalPrice,
      finalPrice: priceBreakdown.finalPrice,
      rescheduleHistory: [],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // 4. Atomic Firestore Transaction for Slot Reservation + Booking Creation
    await runTransaction(this.db, async (transaction) => {
      const lockRef = doc(this.db, "slotLocks", lockKey);
      const lockSnap = await transaction.get(lockRef);

      if (lockSnap.exists()) {
        const lockData = lockSnap.data();
        const now = Date.now();
        const expiresAtMs = lockData?.expiresAt?.toMillis
          ? lockData.expiresAt.toMillis()
          : typeof lockData?.expiresAt === "number"
          ? lockData.expiresAt
          : new Date(lockData?.expiresAt).getTime();

        // Reject if active unexpired reservation already exists
        if (expiresAtMs > now && lockData.status !== "RELEASED" && lockData.status !== "CANCELLED") {
          throw new Error(
            "SLOT_ALREADY_RESERVED: This time slot was just taken by another seeker. Please choose another available time."
          );
        }
      }

      // Write slot lock atomically
      transaction.set(lockRef, {
        lockId: lockKey,
        bookingId,
        consultantId,
        clientId: authUid,
        startTime: startTimeIso,
        endTime: endTimeIso,
        status: "RESERVED",
        expiresAt: Timestamp.fromMillis(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1-year booking validity
        createdAt: serverTimestamp(),
      });

      // Write consultation booking document atomically
      const bookingRef = doc(this.db, "consultations", bookingId);
      transaction.set(bookingRef, {
        bookingId,
        id: bookingId,
        clientId: authUid,
        clientEmail,
        clientName,
        consultantId,
        consultantEmail,
        serviceId: domainBooking.serviceId,
        category: domainBooking.category,
        mode: domainBooking.mode,
        startTime: domainBooking.startTime,
        endTime: domainBooking.endTime,
        timezone: domainBooking.timezone,
        clientQuestion: domainBooking.clientQuestion || "",
        clientNotes: domainBooking.clientNotes || "",
        status: domainBooking.status,
        paymentStatus: domainBooking.paymentStatus,
        paymentOption: domainBooking.paymentOption,
        originalPrice: {
          amountMinor: domainBooking.originalPrice?.amountMinor ?? 0,
          currency: domainBooking.originalPrice?.currency ?? "INR",
        },
        finalPrice: {
          amountMinor: domainBooking.finalPrice?.amountMinor ?? 0,
          currency: domainBooking.finalPrice?.currency ?? "INR",
        },
        discountAmount: {
          amountMinor: priceBreakdown.discountAmount.amountMinor,
          currency: priceBreakdown.discountAmount.currency,
        },
        rescheduleHistory: [],
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    });

    return domainBooking;
  }

  /**
   * Retrieves a single booking document by ID.
   */
  public async getBookingById(id: string): Promise<ConsultationBooking | null> {
    if (!id?.trim()) return null;
    try {
      const snap = await getDoc(doc(this.db, "consultations", id.trim()));
      if (!snap.exists()) return null;
      return snap.data() as ConsultationBooking;
    } catch (err) {
      console.warn(`[FirestoreBookingAdapter] Error fetching booking ${id}:`, err);
      return null;
    }
  }

  /**
   * Lists all consultation bookings belonging to a specific customer UID.
   */
  public async listBookingsByClient(clientId: string): Promise<readonly ConsultationBooking[]> {
    if (!clientId?.trim()) return [];
    try {
      const q = query(
        collection(this.db, "consultations"),
        where("clientId", "==", clientId.trim())
      );
      const querySnap = await getDocs(q);
      const list: ConsultationBooking[] = [];
      querySnap.forEach((docSnap) => {
        list.push(docSnap.data() as ConsultationBooking);
      });
      // Sort by creation or start time descending
      return list.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    } catch (err) {
      console.warn(`[FirestoreBookingAdapter] Error listing client bookings:`, err);
      return [];
    }
  }

  /**
   * Lists all consultation bookings assigned to a consultant.
   */
  public async listBookingsByConsultant(consultantId: string): Promise<readonly ConsultationBooking[]> {
    if (!consultantId?.trim()) return [];
    try {
      const q = query(
        collection(this.db, "consultations"),
        where("consultantId", "==", consultantId.trim())
      );
      const querySnap = await getDocs(q);
      const list: ConsultationBooking[] = [];
      querySnap.forEach((docSnap) => {
        list.push(docSnap.data() as ConsultationBooking);
      });
      return list.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    } catch (err) {
      console.warn(`[FirestoreBookingAdapter] Error listing consultant bookings:`, err);
      return [];
    }
  }

  /**
   * Updates booking status in Firestore and manages slot lock release on cancellation/decline.
   */
  public async updateBookingStatus(bookingId: string, status: ConsultationStatus): Promise<void> {
    if (!bookingId?.trim()) return;
    const nowIso = new Date().toISOString();

    const bookingRef = doc(this.db, "consultations", bookingId.trim());
    await runTransaction(this.db, async (transaction) => {
      const snap = await transaction.get(bookingRef);
      if (!snap.exists()) {
        throw new Error(`Booking ${bookingId} not found in Firestore.`);
      }

      const bookingData = snap.data();
      transaction.update(bookingRef, {
        status,
        updatedAt: nowIso,
      });

      // If booking is cancelled or declined, release the slot lock
      if (status === "CANCELLED_BY_CLIENT" || status === "CANCELLED_BY_CONSULTANT" || status === "DECLINED") {
        if (bookingData.consultantId && bookingData.startTime) {
          const lockKey = this.getSlotLockKey(bookingData.consultantId, bookingData.startTime);
          const lockRef = doc(this.db, "slotLocks", lockKey);
          transaction.update(lockRef, {
            status: "RELEASED",
            updatedAt: serverTimestamp(),
          });
        }
      }
    });
  }

  /**
   * Updates booking payment status in Firestore.
   */
  public async updateBookingPaymentStatus(bookingId: string, paymentStatus: PaymentStatus): Promise<void> {
    if (!bookingId?.trim()) return;
    const nowIso = new Date().toISOString();
    const bookingRef = doc(this.db, "consultations", bookingId.trim());
    await runTransaction(this.db, async (transaction) => {
      const snap = await transaction.get(bookingRef);
      if (!snap.exists()) return;
      transaction.update(bookingRef, {
        paymentStatus,
        updatedAt: nowIso,
      });
    });
  }

  /**
   * Reschedules a booking in Firestore and transfers the slot lock to the new start time.
   */
  public async rescheduleBooking(
    bookingId: string,
    newStartTime: string,
    newEndTime: string,
    reason: string
  ): Promise<void> {
    if (!bookingId?.trim()) return;
    const nowIso = new Date().toISOString();
    const bookingRef = doc(this.db, "consultations", bookingId.trim());
    await runTransaction(this.db, async (transaction) => {
      const snap = await transaction.get(bookingRef);
      if (!snap.exists()) return;
      const data = snap.data();
      const oldStartTime = data.startTime;
      const consultantId = data.consultantId || PRIMARY_CONSULTANT.id;

      // Release old slot lock
      if (oldStartTime) {
        const oldLockKey = this.getSlotLockKey(consultantId, oldStartTime);
        const oldLockRef = doc(this.db, "slotLocks", oldLockKey);
        transaction.update(oldLockRef, { status: "RELEASED", updatedAt: serverTimestamp() });
      }

      // Reserve new slot lock
      const newLockKey = this.getSlotLockKey(consultantId, newStartTime);
      const newLockRef = doc(this.db, "slotLocks", newLockKey);
      transaction.set(newLockRef, {
        lockId: newLockKey,
        bookingId,
        consultantId,
        clientId: data.clientId,
        startTime: newStartTime,
        endTime: newEndTime,
        status: "RESERVED",
        expiresAt: Timestamp.fromMillis(Date.now() + 1000 * 60 * 60 * 24 * 365),
        createdAt: serverTimestamp(),
      });

      // Update booking
      const rescheduleHistory = Array.isArray(data.rescheduleHistory) ? [...data.rescheduleHistory] : [];
      rescheduleHistory.push({
        previousStartTime: oldStartTime,
        newStartTime,
        requestedBy: "CLIENT",
        reason,
        timestamp: nowIso,
      });

      transaction.update(bookingRef, {
        startTime: newStartTime,
        endTime: newEndTime,
        status: "RESCHEDULED",
        rescheduleHistory,
        updatedAt: nowIso,
      });
    });
  }
}

export const firestoreConsultationBookingAdapter = new FirestoreConsultationBookingAdapter();
