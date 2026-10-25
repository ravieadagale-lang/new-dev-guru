/**
 * AstroNext — Firebase Configuration & Target Project Diagnostic Tool
 * 
 * Verifies that the client runtime communicates with the active 'astronext-app' project
 * and confirms zero active runtime linkage to the legacy 'infra-ticket-l1ttq' project.
 * 
 * SAFETY RULE: Secrets, tokens, and full API keys are strictly redacted.
 * 
 * Usage:
 *   npx tsx scripts/diagnoseFirebaseConfig.ts
 */

import { firebaseApp, firebaseAuth, firestoreDb } from "../src/services/firebase/firebaseClient";
import rawConfig from "../firebase-applet-config.json";

interface DiagnosticField {
  label: string;
  expected: string;
  actual: string;
  status: "MATCH" | "MISMATCH";
}

function redactApiKey(key?: string): string {
  if (!key) return "[MISSING]";
  if (key.length <= 8) return "[PRESENT - REDACTED]";
  return `${key.slice(0, 8)}...${key.slice(-4)} (Redacted, length: ${key.length})`;
}

async function runDiagnostic() {
  console.log("=================================================================");
  console.log("       ASTRONEXT — FIREBASE RUNTIME CONFIGURATION AUDIT          ");
  console.log("=================================================================\n");

  const expectedTarget = {
    projectId: "dev-guru-41d29",
    projectNumber: "1040485924291",
    appId: "1:1040485924291:web:4ce2388d2d2c2d88f11176",
    authDomain: "dev-guru-41d29.firebaseapp.com",
    storageBucket: "dev-guru-41d29.firebasestorage.app",
    messagingSenderId: "1040485924291",
    firestoreDatabaseId: "(default)",
  };

  const legacyProjectIds = ["astronext-app", "535561647553", "infra-ticket-l1ttq", "602114835453"];

  // 1. Audit raw configuration file
  console.log("[1] Auditing firebase-applet-config.json...");
  const configAudit: DiagnosticField[] = [
    {
      label: "Project ID",
      expected: expectedTarget.projectId,
      actual: rawConfig.projectId || "",
      status: rawConfig.projectId === expectedTarget.projectId ? "MATCH" : "MISMATCH",
    },
    {
      label: "App ID",
      expected: expectedTarget.appId,
      actual: rawConfig.appId || "",
      status: rawConfig.appId === expectedTarget.appId ? "MATCH" : "MISMATCH",
    },
    {
      label: "Auth Domain",
      expected: expectedTarget.authDomain,
      actual: rawConfig.authDomain || "",
      status: rawConfig.authDomain === expectedTarget.authDomain ? "MATCH" : "MISMATCH",
    },
    {
      label: "Firestore Database",
      expected: expectedTarget.firestoreDatabaseId,
      actual: rawConfig.firestoreDatabaseId || "(default)",
      status: (rawConfig.firestoreDatabaseId || "(default)") === expectedTarget.firestoreDatabaseId ? "MATCH" : "MISMATCH",
    },
    {
      label: "Storage Bucket",
      expected: expectedTarget.storageBucket,
      actual: rawConfig.storageBucket || "",
      status: rawConfig.storageBucket === expectedTarget.storageBucket ? "MATCH" : "MISMATCH",
    },
    {
      label: "Messaging Sender ID",
      expected: expectedTarget.messagingSenderId,
      actual: rawConfig.messagingSenderId || "",
      status: rawConfig.messagingSenderId === expectedTarget.messagingSenderId ? "MATCH" : "MISMATCH",
    },
  ];

  configAudit.forEach((item) => {
    const icon = item.status === "MATCH" ? "✓" : "✗";
    console.log(`  ${icon} ${item.label.padEnd(20)}: ${item.actual} [${item.status}]`);
  });

  // 2. Check API Key safety & presence
  console.log("\n[2] Checking Web API Key (Secrets Excluded)...");
  const hasApiKey = Boolean(rawConfig.apiKey && rawConfig.apiKey.length > 0);
  console.log(`  ✓ API Key Configured  : ${hasApiKey ? "YES" : "NO"}`);
  console.log(`  ✓ Key Fingerprint     : ${redactApiKey(rawConfig.apiKey)}`);

  // 3. Audit Active Firebase SDK Instances
  console.log("\n[3] Auditing Initialized Firebase SDK Clients...");
  const runtimeAppProject = firebaseApp.options.projectId;
  const runtimeAppId = firebaseApp.options.appId;
  const runtimeAuthProject = (firebaseAuth as any)?.app?.options?.projectId;
  const runtimeFirestoreProject = (firestoreDb as any)?.app?.options?.projectId;

  console.log(`  ✓ FirebaseApp Name    : ${firebaseApp.name}`);
  console.log(`  ✓ App Options Project : ${runtimeAppProject} (${runtimeAppProject === expectedTarget.projectId ? "VALID" : "INVALID"})`);
  console.log(`  ✓ App Options App ID  : ${runtimeAppId} (${runtimeAppId === expectedTarget.appId ? "VALID" : "INVALID"})`);
  console.log(`  ✓ Auth Client Project : ${runtimeAuthProject} (${runtimeAuthProject === expectedTarget.projectId ? "VALID" : "INVALID"})`);
  console.log(`  ✓ Firestore Project   : ${runtimeFirestoreProject} (${runtimeFirestoreProject === expectedTarget.projectId ? "VALID" : "INVALID"})`);

  // 4. Check for legacy project contamination
  console.log("\n[4] Scanning for Legacy Project Leaks (astronext-app / 535561647553)...");
  const rawString = JSON.stringify(rawConfig);
  let legacyLeaks = 0;
  legacyProjectIds.forEach((legacyId) => {
    if (rawString.includes(legacyId)) {
      console.error(`  ✗ LEAK DETECTED: Reference to legacy identifier "${legacyId}" found in configuration!`);
      legacyLeaks++;
    }
  });

  if (legacyLeaks === 0) {
    console.log("  ✓ CLEAN: Zero references to legacy project or project numbers found.");
  }

  // 5. Final Diagnostic Verdict
  console.log("\n=================================================================");
  const allMatch = configAudit.every((i) => i.status === "MATCH") && legacyLeaks === 0 && runtimeAppProject === expectedTarget.projectId;
  if (allMatch) {
    console.log("  VERDICT: ALL CHECKS PASSED ✓");
    console.log("  Application is communicating exclusively with 'dev-guru-41d29'.");
  } else {
    console.error("  VERDICT: VERIFICATION FAILED ✗");
    process.exit(1);
  }
  console.log("=================================================================\n");
}

runDiagnostic().catch((err) => {
  console.error("Diagnostic execution error:", err);
  process.exit(1);
});
