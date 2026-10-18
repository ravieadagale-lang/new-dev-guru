import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  firestoreQuickQuestionAdapter,
  SubmitQuickQuestionInput,
} from "../src/domain/consultation/firestoreQuickQuestionAdapter";
import {
  createChatMessage,
  sanitizeChatMessage,
} from "../src/domain/consultation/chatEngine";
import {
  canAccessConsultantWorkspace,
} from "../src/domain/consultation/authorization";
import { PRIMARY_CONSULTANT } from "../src/domain/consultation/operatorConfig";

// In-memory mock for localStorage in Node environment
const mockStorage: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const key of Object.keys(mockStorage)) {
      delete mockStorage[key];
    }
  },
};
// @ts-ignore
global.localStorage = localStorageMock;

describe("Consultation Enhancement — Quick Question & Live Room Sanctuary Suite", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  describe("1. Quick Question Adapter & Persistence", () => {
    it("submits a quick question and stores it in local and memory adapters", async () => {
      const input: SubmitQuickQuestionInput = {
        serviceId: "quick_career_decision",
        category: "VEDIC_ASTROLOGY",
        question: "Should I accept the new senior tech offer in Bangalore next month?",
        clientName: "Aarav Sharma",
        clientEmail: "aarav@example.com",
        clientPhone: "+91 98765 43210",
        deliveryFormat: "WRITTEN_ANALYSIS",
        turnaroundHours: 6,
        totalPrice: {
          amountMinor: 149900,
          currency: "INR",
        },
        birthDetails: {
          dob: "1992-05-14",
          tob: "14:35",
          pob: "Bengaluru, India",
        },
      };

      const result = await firestoreQuickQuestionAdapter.submitQuickQuestion(input);

      expect(result).toBeDefined();
      expect(result.id).toMatch(/^qq-/);
      expect(result.clientName).toBe("Aarav Sharma");
      expect(result.clientEmail).toBe("aarav@example.com");
      expect(result.question).toBe("Should I accept the new senior tech offer in Bangalore next month?");
      expect(result.status).toBe("REQUESTED");
      expect(result.turnaroundHours).toBe(6);
      expect(result.totalPrice.amountMinor).toBe(149900);
      expect(result.birthDetails?.dob).toBe("1992-05-14");

      // Verify cached in localStorage
      const cached = JSON.parse(localStorage.getItem("astronext_quick_inquiries") || "[]");
      expect(cached.length).toBeGreaterThan(0);
      expect(cached[0].id).toBe(result.id);
    });

    it("allows consultant to answer an inquiry and update status to ANSWERED", async () => {
      const input: SubmitQuickQuestionInput = {
        serviceId: "quick_relationship_sync",
        category: "VEDIC_ASTROLOGY",
        question: "Is this favorable timing for marriage proposal?",
        clientName: "Pooja V",
        clientEmail: "pooja@example.com",
        deliveryFormat: "VOICE_NOTE",
        turnaroundHours: 24,
        totalPrice: { amountMinor: 99900, currency: "INR" },
      };

      const inquiry = await firestoreQuickQuestionAdapter.submitQuickQuestion(input);
      expect(inquiry.status).toBe("REQUESTED");

      const counselText = "Jupiter transits your 7th house starting next month. Favorable window for wedding talks.";
      const answerSuccess = await firestoreQuickQuestionAdapter.answerInquiry(inquiry.id, counselText);

      expect(answerSuccess).toBe(true);

      const cached = JSON.parse(localStorage.getItem("astronext_quick_inquiries") || "[]");
      const matched = cached.find((item: any) => item.id === inquiry.id);
      expect(matched).toBeDefined();
      expect(matched.status).toBe("ANSWERED");
      expect(matched.answer).toBe(counselText);
      expect(matched.answeredAt).toBeDefined();
    });

    it("enforces consultant authorization when listing all inquiries", async () => {
      const unauthorizedList = await firestoreQuickQuestionAdapter.listAllInquiries("random_user@gmail.com");
      expect(unauthorizedList).toEqual([]);

      const authorizedList = await firestoreQuickQuestionAdapter.listAllInquiries(PRIMARY_CONSULTANT.email);
      expect(Array.isArray(authorizedList)).toBe(true);
    });
  });

  describe("2. Live Sanctuary Chat & Security", () => {
    it("creates sanitized chat messages scoped to a consultation booking", () => {
      const rawText = "   Hello Guruji, <script>alert('xss')</script> Can you check my 10th house?   ";
      const sanitized = sanitizeChatMessage(rawText);

      expect(sanitized).not.toContain("<script>");
      expect(sanitized).toContain("Can you check my 10th house?");

      const msg = createChatMessage({
        bookingId: "book-12345",
        senderRole: "CLIENT",
        senderName: "Devotee Client",
        senderEmail: "devotee@example.com",
        message: rawText,
      });

      expect(msg.bookingId).toBe("book-12345");
      expect(msg.senderRole).toBe("CLIENT");
      expect(msg.message).not.toContain("<script>");
      expect(msg.id).toBeDefined();
      expect(msg.timestamp).toBeDefined();
    });

    it("verifies workspace authorization isolation between seeker and astrologer", () => {
      expect(canAccessConsultantWorkspace(PRIMARY_CONSULTANT.email)).toBe(true);
      expect(canAccessConsultantWorkspace(PRIMARY_CONSULTANT.email.toUpperCase())).toBe(true);
      expect(canAccessConsultantWorkspace("seeker@gmail.com")).toBe(false);
      expect(canAccessConsultantWorkspace(null)).toBe(false);
      expect(canAccessConsultantWorkspace(undefined)).toBe(false);
    });
  });
});
