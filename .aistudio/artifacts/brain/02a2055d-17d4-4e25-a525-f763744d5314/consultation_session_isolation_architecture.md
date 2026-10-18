# AstroNext — Consultation Ecosystem Architecture
## Phase 2B.2: Authenticated Session Isolation & Authoritative Firestore Persistence

### 1. Executive Summary
This document establishes the verified architectural foundation for the AstroNext Consultation Ecosystem. It defines the strict boundary separating client sessions, consultant workflows, and administrative controls while guaranteeing that Firebase Firestore remains the sole authoritative source of truth for bookings, slot locks, and lifecycle state.

---

### 2. Core Security & Session Isolation Guarantees

#### A. Signed-Out State Isolation
- **Zero Cross-Talk**: When unauthenticated (`currentUser === null`), in-memory React state for bookings is strictly empty (`[]`), and private notes are completely empty (`{}`).
- **No Stale Fallback**: Unauthenticated visitors are never presented with cached bookings or private notes from any prior session on the shared browser.
- **Legacy Storage Deprecation**: Un-scoped keys (`astronext_consultation_bookings`, `astronext_consultation_notes`) are purged upon context mounting.

#### B. Authenticated UID-Scoped Cache Partitioning
- **Identity Scoping**: If local browser storage is leveraged for transient performance, all cache keys are strictly scoped to the verified Firebase UID:
  - `astronext_consultation_bookings_${uid}`
  - `astronext_consultation_notes_${uid}`
- **Cache Ownership Rule**: Cached data is never accepted as authorization evidence. A user's cache can only ever be loaded if `currentUser.uid === uid`.
- **No Cache Write-Back**: Cached bookings in local storage are never written back or synchronized upward to Firestore. Firestore is strictly authoritative down to the client.

#### C. Asynchronous Race Protection (Identity & Request Invalidation)
- In single-page applications on shared devices, asynchronous Firestore queries (e.g., `listBookingsByClient`) may resolve after an active user has logged out or after another user has signed in.
- **Guard Mechanism**:
  - `activeUidRef` tracks the active Firebase UID.
  - `activeRequestIdRef` increments monotonically on every authentication state change.
  - In-flight responses compare their captured request ID and UID against `activeRequestIdRef.current` and `activeUidRef.current`. If a mismatch is detected, the stale asynchronous payload is safely discarded without mutating visible state.

#### D. Private Consultant Notes Quarantine
- **Strict Role Gating**: Private notes (`privateNotes`) are accessible exclusively to verified consultation operators (`ravieadagale@gmail.com` Super Admin / Chief Practitioner and approved practitioners).
- **Client Separation**: Customers calling `getPrivateNotes(bookingId)` receive empty strings (`""`) by cryptographic and role policy. Client-visible summaries (`getClientSummary`) contain only `summary` and `remedies`, with zero leakage of internal consultant observations.

#### E. Authoritative Persistence Before State Mutation
- **No Silent Fallbacks**: Consultation state transitions (`createBooking`, `confirmBooking`, `declineBooking`, `startSession`, `completeSession`, `cancelBooking`, `completePayment`, `rescheduleBooking`) require confirmed Firestore persistence before in-memory state is updated.
- **Error Propagation**: Any failure during atomic slot reservation (e.g., `SLOT_ALREADY_RESERVED`) or Firestore network operations throws directly to the caller, preventing false-positive confirmations.

---

### 3. Role & Authority Hierarchy
1. **SUPER_ADMIN (`ravieadagale@gmail.com`)**:
   - Sovereign administration of AstroNext engines.
   - Dual capability: Chief Practitioner and Consultant for Vedic Natal and Prashna sessions.
2. **ADMIN (`ravii.adagale20@gmail.com`)**:
   - Operational administration of business settings and bookings.
   - Distinct from Super Admin; no engine alterations.
3. **PRACTITIONER**:
   - Approved astrological consultants with access to consultant schedule, availability, and session execution.
4. **CUSTOMER**:
   - Vedic seekers authenticated via Firebase Auth.
   - Strictly restricted to personal booking records and client-facing summaries.

---

### 4. Firestore Authoritative Collections & Concurrency
- `consultations/{bookingId}`: Authoritative booking records containing status, pricing breakdown, and client details.
- `slotLocks/{consultantId}_{epochMinutes}`: Atomic concurrency lock documents managed via Firestore transactions to prevent duplicate reservations.
