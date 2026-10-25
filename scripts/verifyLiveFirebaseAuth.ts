/**
 * AstroNext — Live Firebase Auth Verification Script
 * 
 * Initializes the Firebase Auth SDK and logs current Auth configuration
 * parameters (strictly excluding sensitive keys and secrets) to verify the
 * application is connected to the 'astronext-app' project.
 * 
 * Usage:
 *   npx tsx scripts/verifyLiveFirebaseAuth.ts
 */

import { firebaseApp, firebaseAuth, firestoreDb } from "../src/services/firebase/firebaseClient";
import rawConfig from "../firebase-applet-config.json";

function redactApiKey(key?: string): string {
  if (!key) return "[MISSING]";
  if (key.length <= 8) return "[PRESENT - REDACTED]";
  return `${key.slice(0, 8)}...${key.slice(-4)} (Redacted, length: ${key.length})`;
}

async function verifyLiveAuth() {
  console.log("=================================================================");
  console.log("    ASTRONEXT — LIVE FIREBASE AUTH CONFIGURATION VERIFIER       ");
  console.log("=================================================================\n");

  const targetProject = "dev-guru-41d29";
  const targetAppId = "1:1040485924291:web:4ce2388d2d2c2d88f11176";
  const targetAuthDomain = "dev-guru-41d29.firebaseapp.com";

  console.log("[1] Checking Config Parameters (Secrets Excluded)...");
  console.log(`  - Project ID          : ${rawConfig.projectId}`);
  console.log(`  - Web App ID          : ${rawConfig.appId}`);
  console.log(`  - Auth Domain         : ${rawConfig.authDomain}`);
  console.log(`  - Firestore Database  : ${rawConfig.firestoreDatabaseId || "(default)"}`);
  console.log(`  - Storage Bucket      : ${rawConfig.storageBucket}`);
  console.log(`  - Messaging Sender ID : ${rawConfig.messagingSenderId}`);
  console.log(`  - API Key Fingerprint : ${redactApiKey(rawConfig.apiKey)}`);

  console.log("\n[2] Initializing Active Firebase SDK Clients in Memory...");
  const appProject = firebaseApp.options.projectId;
  const appId = firebaseApp.options.appId;
  const authProject = (firebaseAuth as any)?.app?.options?.projectId;
  const firestoreProject = (firestoreDb as any)?.app?.options?.projectId;

  console.log(`  - FirebaseApp Name    : ${firebaseApp.name}`);
  console.log(`  - App Project ID      : ${appProject}`);
  console.log(`  - App ID Match        : ${appId === targetAppId ? "MATCH" : "MISMATCH"}`);
  console.log(`  - Auth Client Project : ${authProject}`);
  console.log(`  - Firestore Project   : ${firestoreProject}`);

  console.log("\n[3] Target Project Verification Verdict...");
  const configStr = JSON.stringify(rawConfig);
  const isTargetVerified =
    appProject === targetProject &&
    authProject === targetProject &&
    rawConfig.authDomain === targetAuthDomain &&
    rawConfig.projectId === targetProject &&
    !configStr.includes("astronext-app") &&
    !configStr.includes("infra-ticket-l1ttq");

  if (isTargetVerified) {
    console.log("  >>> PASS: Firebase Auth SDK is properly connected to 'dev-guru-41d29'.");
  } else {
    console.error("  >>> FAIL: Firebase Auth SDK is NOT properly connected to 'dev-guru-41d29'.");
    process.exit(1);
  }
  console.log("\n=================================================================");
}

verifyLiveAuth().catch((err) => {
  console.error("Verification execution error:", err);
  process.exit(1);
});
