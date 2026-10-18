import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type Auth,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import firebaseConfigData from "../../../firebase-applet-config.json";

// Safe Firebase App Initialization
function getOrInitializeFirebaseApp(): FirebaseApp {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return getApp();
  }

  const metaEnv = (import.meta as any)?.env || {};
  const config = {
    apiKey: firebaseConfigData.apiKey || metaEnv.VITE_FIREBASE_API_KEY || "",
    authDomain: firebaseConfigData.authDomain || metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: firebaseConfigData.projectId || metaEnv.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: firebaseConfigData.storageBucket || metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: firebaseConfigData.messagingSenderId || metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: firebaseConfigData.appId || metaEnv.VITE_FIREBASE_APP_ID || "",
  };

  return initializeApp(config);
}

export const firebaseApp: FirebaseApp = getOrInitializeFirebaseApp();
export const firebaseAuth: Auth = getAuth(firebaseApp);
export const firestoreDb: Firestore =
  firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== "(default)"
    ? getFirestore(firebaseApp, firebaseConfigData.firestoreDatabaseId)
    : getFirestore(firebaseApp);

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User,
};
