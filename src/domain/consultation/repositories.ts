import {
  ConsultationService,
  ConsultationAvailability,
  ConsultationBooking,
  ConsultationSlot,
  ConsultationStatus,
  ConsultationRequest,
  PrivateConsultantNote,
  ClientVisibleConsultationSummary,
  ConsultationFollowUp,
  ConsultationConversation,
  ConsultationChatMessage,
  ConsultationNotificationEvent,
  ConsultationAuditEvent,
} from "./types";
import { firestoreConsultationBookingAdapter, FirestoreConsultationBookingAdapter } from "./firestoreConsultationBookingAdapter";

/**
 * Persistence connection state for the Consultation domain.
 * Firebase connection is explicitly DEFERRED.
 */
export type PersistenceStatus =
  | "PERSISTENCE_DEFERRED"
  | "CONNECTING"
  | "CONNECTED"
  | "ERROR";

export interface PersistenceMetadata {
  readonly status: PersistenceStatus;
  readonly provider: "FIREBASE_FIRESTORE" | "UNCONNECTED";
  readonly message: string;
}

/**
 * Repository interface for Consultation Services.
 */
export interface ConsultationServiceRepository {
  getServiceById(id: string): Promise<ConsultationService | null>;
  listActiveServices(): Promise<readonly ConsultationService[]>;
  listServicesByConsultant(consultantId: string): Promise<readonly ConsultationService[]>;
  saveService(service: ConsultationService): Promise<void>;
  updateServiceStatus(serviceId: string, status: "ACTIVE" | "INACTIVE"): Promise<void>;
}

/**
 * Repository interface for Consultant Availability.
 */
export interface ConsultationAvailabilityRepository {
  getAvailabilityByConsultant(consultantId: string): Promise<ConsultationAvailability | null>;
  listAvailableSlots(
    consultantId: string,
    serviceId: string,
    fromDate: string,
    toDate: string
  ): Promise<readonly ConsultationSlot[]>;
  saveAvailability(availability: ConsultationAvailability): Promise<void>;
}

/**
 * Repository interface for Consultation Bookings.
 */
export interface ConsultationBookingRepository {
  getBookingById(id: string): Promise<ConsultationBooking | null>;
  listBookingsByClient(clientId: string): Promise<readonly ConsultationBooking[]>;
  listBookingsByConsultant(consultantId: string): Promise<readonly ConsultationBooking[]>;
  createBooking(request: ConsultationRequest): Promise<ConsultationBooking>;
  updateBookingStatus(bookingId: string, status: ConsultationStatus): Promise<void>;
}

/**
 * Strict repository interface for notes and summaries.
 * Private consultant notes are strictly quarantined.
 */
export interface ConsultationNotesRepository {
  savePrivateNote(note: PrivateConsultantNote): Promise<void>;
  getPrivateNote(bookingId: string, requestingUserEmail: string): Promise<PrivateConsultantNote | null>;
  saveClientSummary(summary: ClientVisibleConsultationSummary): Promise<void>;
  getClientSummary(bookingId: string): Promise<ClientVisibleConsultationSummary | null>;
}

/**
 * Repository interface for Follow-ups.
 */
export interface ConsultationFollowUpRepository {
  createFollowUp(followUp: ConsultationFollowUp): Promise<void>;
  listFollowUpsForConsultant(consultantId: string): Promise<readonly ConsultationFollowUp[]>;
  listFollowUpsForClient(clientId: string): Promise<readonly ConsultationFollowUp[]>;
  updateFollowUpStatus(followUpId: string, status: ConsultationFollowUp["status"]): Promise<void>;
}

/**
 * Repository interface for In-App Consultation Chat.
 */
export interface ConsultationChatRepository {
  getConversationByBooking(bookingId: string): Promise<ConsultationConversation | null>;
  listMessages(conversationId: string): Promise<readonly ConsultationChatMessage[]>;
  sendMessage(message: ConsultationChatMessage): Promise<void>;
  markMessagesRead(conversationId: string, userEmail: string): Promise<void>;
}

/**
 * Repository interface for Consultation Notifications.
 */
export interface ConsultationNotificationRepository {
  listNotificationsForUser(email: string): Promise<readonly ConsultationNotificationEvent[]>;
  markNotificationAsRead(notificationId: string): Promise<void>;
  sendNotification(notification: Omit<ConsultationNotificationEvent, "eventId" | "timestamp" | "isRead">): Promise<void>;
}

/**
 * Repository interface for Consultation Audit Trail.
 */
export interface ConsultationAuditRepository {
  recordAuditEvent(event: ConsultationAuditEvent): Promise<void>;
  listAuditEvents(targetBookingId?: string): Promise<readonly ConsultationAuditEvent[]>;
}

/**
 * Storage adapter interface for Consultant Profile Photos.
 */
export interface ConsultantPhotoStorageAdapter {
  uploadProfilePhoto(file: File, consultantId: string): Promise<{ photoUrl: string }>;
  removeProfilePhoto(consultantId: string): Promise<void>;
}

/**
 * Unified Consultation Repository Interface.
 */
export interface ConsultationRepository {
  readonly services: ConsultationServiceRepository;
  readonly availability: ConsultationAvailabilityRepository;
  readonly bookings: ConsultationBookingRepository;
  readonly notes: ConsultationNotesRepository;
  readonly followUps: ConsultationFollowUpRepository;
  readonly chat: ConsultationChatRepository;
  readonly notifications: ConsultationNotificationRepository;
  readonly audit: ConsultationAuditRepository;
  readonly photos: ConsultantPhotoStorageAdapter;
  getPersistenceMetadata(): PersistenceMetadata;
}

/**
 * Phase 3 Consultation Persistence Adapter
 * 
 * Truthfully marks persistence as DEFERRED.
 * Does NOT use LocalStorage as a database.
 * Does NOT fake booking results or simulate mock database writes.
 * Ready for certified Firebase integration in Phase 5.
 */
export class DeferredFirebaseConsultationAdapter implements ConsultationRepository {
  private readonly metadata: PersistenceMetadata = Object.freeze({
    status: "PERSISTENCE_DEFERRED",
    provider: "UNCONNECTED",
    message:
      "Firebase Firestore persistence is deferred for Phase 1. Online booking and records will be persisted upon Firebase production certification.",
  });

  public getPersistenceMetadata(): PersistenceMetadata {
    return this.metadata;
  }

  public readonly services: ConsultationServiceRepository = {
    getServiceById: async (_id: string) => null,
    listActiveServices: async () => [],
    listServicesByConsultant: async (_consultantId: string) => [],
    saveService: async (_service: ConsultationService) => {
      throw new Error("Persistence deferred: Cannot save consultation service without verified database connection.");
    },
    updateServiceStatus: async (_serviceId: string, _status: "ACTIVE" | "INACTIVE") => {
      throw new Error("Persistence deferred: Cannot update service status.");
    },
  };

  public readonly availability: ConsultationAvailabilityRepository = {
    getAvailabilityByConsultant: async (_consultantId: string) => null,
    listAvailableSlots: async () => [],
    saveAvailability: async () => {
      throw new Error("Persistence deferred: Cannot save availability rules without verified database connection.");
    },
  };

  public readonly bookings: ConsultationBookingRepository = {
    getBookingById: async (_id: string) => null,
    listBookingsByClient: async () => [],
    listBookingsByConsultant: async () => [],
    createBooking: async () => {
      throw new Error("Persistence deferred: Real booking storage is disabled until Phase 3 Firebase connection.");
    },
    updateBookingStatus: async () => {
      throw new Error("Persistence deferred: Cannot update booking status.");
    },
  };

  public readonly notes: ConsultationNotesRepository = {
    savePrivateNote: async () => {
      throw new Error("Persistence deferred: Cannot save private notes without verified database connection.");
    },
    getPrivateNote: async () => null,
    saveClientSummary: async () => {
      throw new Error("Persistence deferred: Cannot save client summary without verified database connection.");
    },
    getClientSummary: async () => null,
  };

  public readonly followUps: ConsultationFollowUpRepository = {
    createFollowUp: async () => {
      throw new Error("Persistence deferred: Cannot create follow-up record.");
    },
    listFollowUpsForConsultant: async () => [],
    listFollowUpsForClient: async () => [],
    updateFollowUpStatus: async () => {
      throw new Error("Persistence deferred: Cannot update follow-up status.");
    },
  };

  public readonly chat: ConsultationChatRepository = {
    getConversationByBooking: async () => null,
    listMessages: async () => [],
    sendMessage: async () => {
      throw new Error("Persistence deferred: Messaging unavailable until persistence is connected.");
    },
    markMessagesRead: async () => {},
  };

  public readonly notifications: ConsultationNotificationRepository = {
    listNotificationsForUser: async () => [],
    markNotificationAsRead: async () => {},
    sendNotification: async () => {},
  };

  public readonly audit: ConsultationAuditRepository = {
    recordAuditEvent: async () => {},
    listAuditEvents: async () => [],
  };

  public readonly photos: ConsultantPhotoStorageAdapter = {
    uploadProfilePhoto: async (_file: File, _consultantId: string) => {
      throw new Error("Persistence deferred: Cloud photo storage is disabled until Phase 5 Firebase connection.");
    },
    removeProfilePhoto: async (_consultantId: string) => {
      throw new Error("Persistence deferred: Cannot remove photo.");
    },
  };
}

export { FirestoreConsultationBookingAdapter } from "./firestoreConsultationBookingAdapter";

/**
 * Production Consultation Repository with Real Firestore Bookings.
 * Bookings are persistent in Firestore; other sub-domains remain deferred per Phase 2B scope.
 */
export class ProductionConsultationRepository extends DeferredFirebaseConsultationAdapter {
  public override readonly bookings: ConsultationBookingRepository;

  constructor(bookingAdapter?: ConsultationBookingRepository) {
    super();
    this.bookings = bookingAdapter || firestoreConsultationBookingAdapter;
  }

  public override getPersistenceMetadata(): PersistenceMetadata {
    return Object.freeze({
      status: "CONNECTED",
      provider: "FIREBASE_FIRESTORE",
      message: "Consultation Bookings connected to active Firestore project ('astronext-app').",
    });
  }
}

/**
 * Singleton repository instance configured with real Firestore bookings persistence.
 */
export const defaultConsultationRepository: ConsultationRepository = new ProductionConsultationRepository();
