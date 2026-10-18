import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { firestoreDb, firebaseAuth } from "../../services/firebase/firebaseClient";
import { QuickConsultationInquiry } from "./types";
import { PRIMARY_CONSULTANT } from "./operatorConfig";
import { canAccessConsultantWorkspace } from "./authorization";

export interface SubmitQuickQuestionInput {
  serviceId: string;
  category: string;
  question: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  deliveryFormat: "WRITTEN_ANALYSIS" | "VOICE_NOTE" | "CHAT_THREAD";
  turnaroundHours: number;
  totalPrice: {
    amountMinor: number;
    currency: "INR";
  };
  birthDetails?: {
    dob?: string;
    tob?: string;
    pob?: string;
  };
}

export class FirestoreQuickQuestionAdapter {
  private readonly db: Firestore;

  constructor(customDb?: Firestore) {
    this.db = customDb || firestoreDb;
  }

  /**
   * Persists a Quick Question inquiry to Firestore and local storage.
   */
  public async submitQuickQuestion(
    input: SubmitQuickQuestionInput
  ): Promise<QuickConsultationInquiry> {
    const authUid = firebaseAuth.currentUser?.uid;
    const nowIso = new Date().toISOString();
    const inquiryId = `qq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const inquiryRecord: QuickConsultationInquiry = {
      id: inquiryId,
      serviceId: input.serviceId,
      clientId: authUid || "unauthenticated",
      clientEmail: (firebaseAuth.currentUser?.email || input.clientEmail).trim().toLowerCase(),
      clientName: input.clientName.trim(),
      clientPhone: input.clientPhone?.trim(),
      question: input.question.trim(),
      category: input.category,
      deliveryFormat: input.deliveryFormat,
      turnaroundHours: input.turnaroundHours,
      status: "REQUESTED",
      totalPrice: input.totalPrice,
      birthDetails: input.birthDetails,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Cache locally for immediate UX resilience
    try {
      const existingStr = localStorage.getItem("astronext_quick_inquiries");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [inquiryRecord, ...(Array.isArray(existing) ? existing : [])];
      localStorage.setItem("astronext_quick_inquiries", JSON.stringify(updated));
    } catch {}

    // Persist to authoritative Firestore if authenticated
    if (authUid) {
      try {
        const ref = doc(this.db, "quickQuestions", inquiryId);
        await setDoc(ref, {
          id: inquiryId,
          serviceId: input.serviceId,
          clientId: authUid,
          clientEmail: inquiryRecord.clientEmail,
          clientName: inquiryRecord.clientName,
          clientPhone: inquiryRecord.clientPhone || "",
          question: inquiryRecord.question,
          category: inquiryRecord.category,
          deliveryFormat: inquiryRecord.deliveryFormat,
          turnaroundHours: inquiryRecord.turnaroundHours,
          status: "REQUESTED",
          totalPrice: input.totalPrice,
          birthDetails: input.birthDetails || null,
          consultantId: PRIMARY_CONSULTANT.id,
          consultantEmail: PRIMARY_CONSULTANT.email,
          createdAt: nowIso,
          updatedAt: nowIso,
        });
      } catch (err) {
        console.warn("[FirestoreQuickQuestionAdapter] Non-fatal Firestore save warning:", err);
      }
    }

    return inquiryRecord;
  }

  /**
   * Lists inquiries submitted by the current authenticated client.
   */
  public async listInquiriesByClient(clientId: string): Promise<QuickConsultationInquiry[]> {
    if (!clientId?.trim()) return [];

    try {
      const q = query(
        collection(this.db, "quickQuestions"),
        where("clientId", "==", clientId.trim())
      );
      const snap = await getDocs(q);
      const list: QuickConsultationInquiry[] = [];
      snap.forEach((docSnap) => {
        list.push(docSnap.data() as QuickConsultationInquiry);
      });
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn("[FirestoreQuickQuestionAdapter] Error listing client inquiries:", err);
      // Fallback to local storage
      try {
        const local = localStorage.getItem("astronext_quick_inquiries");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            return parsed.filter((item) => item.clientId === clientId);
          }
        }
      } catch {}
      return [];
    }
  }

  /**
   * Lists all quick question inquiries for the authorized consultant.
   */
  public async listAllInquiries(userEmail?: string | null): Promise<QuickConsultationInquiry[]> {
    if (!canAccessConsultantWorkspace(userEmail)) {
      return [];
    }

    try {
      const snap = await getDocs(collection(this.db, "quickQuestions"));
      const list: QuickConsultationInquiry[] = [];
      snap.forEach((docSnap) => {
        list.push(docSnap.data() as QuickConsultationInquiry);
      });
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn("[FirestoreQuickQuestionAdapter] Error listing all inquiries:", err);
      // Fallback to local storage
      try {
        const local = localStorage.getItem("astronext_quick_inquiries");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {}
      return [];
    }
  }

  /**
   * Astrologer answers a quick question inquiry.
   */
  public async answerInquiry(
    inquiryId: string,
    answerText: string
  ): Promise<boolean> {
    if (!inquiryId?.trim() || !answerText?.trim()) return false;
    const nowIso = new Date().toISOString();

    // 1. Update local storage
    try {
      const local = localStorage.getItem("astronext_quick_inquiries");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          const updated = parsed.map((item) =>
            item.id === inquiryId
              ? { ...item, answer: answerText.trim(), answeredAt: nowIso, status: "ANSWERED", updatedAt: nowIso }
              : item
          );
          localStorage.setItem("astronext_quick_inquiries", JSON.stringify(updated));
        }
      }
    } catch {}

    // 2. Update Firestore
    try {
      const ref = doc(this.db, "quickQuestions", inquiryId.trim());
      await updateDoc(ref, {
        answer: answerText.trim(),
        answeredAt: nowIso,
        status: "ANSWERED",
        updatedAt: nowIso,
      });
      return true;
    } catch (err) {
      console.warn("[FirestoreQuickQuestionAdapter] Error saving answer to Firestore:", err);
      return true; // Local storage updated
    }
  }
}

export const firestoreQuickQuestionAdapter = new FirestoreQuickQuestionAdapter();
