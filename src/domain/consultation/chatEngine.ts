export interface ChatMessage {
  id: string;
  bookingId: string;
  senderRole: "CLIENT" | "CONSULTANT";
  senderEmail: string;
  senderName: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface SendMessageInput {
  bookingId: string;
  senderRole: "CLIENT" | "CONSULTANT";
  senderEmail: string;
  senderName: string;
  message: string;
}

export function sanitizeChatMessage(text: string): string {
  // Strip HTML tags to avoid XSS in consultation messages
  return text.replace(/<[^>]*>/g, "").trim();
}

export function validateChatMessage(input: SendMessageInput): { isValid: boolean; error?: string } {
  if (!input.bookingId?.trim()) {
    return { isValid: false, error: "Booking ID is required." };
  }
  if (!input.senderEmail?.trim()) {
    return { isValid: false, error: "Sender email is required." };
  }
  const clean = sanitizeChatMessage(input.message || "");
  if (!clean || clean.length < 1) {
    return { isValid: false, error: "Message cannot be empty." };
  }
  if (clean.length > 2000) {
    return { isValid: false, error: "Message exceeds maximum length of 2000 characters." };
  }
  return { isValid: true };
}

export function createChatMessage(input: SendMessageInput): ChatMessage {
  const validation = validateChatMessage(input);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    bookingId: input.bookingId,
    senderRole: input.senderRole,
    senderEmail: input.senderEmail,
    senderName: input.senderName,
    message: sanitizeChatMessage(input.message),
    timestamp: new Date().toISOString(),
    isRead: false,
  };
}
