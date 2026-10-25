import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "../firebase/firebaseClient";
import {
  normalizeEmail,
  resolveRoleFromEmail,
  isSuperAdminEmail,
  isAdminEmail,
  hasPractitionerCapability,
  AuthRole,
} from "./superAdminConfig";
import {
  getUserProfile,
  updateUserProfile,
  syncUserProfileOnAuth,
  UserProfile,
  UserProfileUpdatePayload,
} from "../firebase/userProfileService";

export interface AuthResult {
  success: boolean;
  user?: User;
  role?: AuthRole;
  displayName?: string;
  error?: string;
}

export function formatAuthErrorMessage(err: any): string {
  const code = (err?.code || "").toLowerCase();
  const rawMsg = (err?.message || "").toString();

  if (
    code === "auth/invalid-email" ||
    rawMsg.includes("auth/invalid-email") ||
    rawMsg.includes("invalid email") ||
    rawMsg.includes("invalid-email")
  ) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }
  if (
    code === "auth/operation-not-allowed" ||
    rawMsg.includes("auth/operation-not-allowed") ||
    rawMsg.includes("operation-not-allowed")
  ) {
    return "Email/Password authentication provider is disabled in this Firebase project. Please enable Email/Password in the Firebase Authentication console.";
  }
  if (code === "auth/user-not-found" || rawMsg.includes("auth/user-not-found")) {
    return "No account found with this email. Please check your email or Sign Up.";
  }
  if (code === "auth/wrong-password" || rawMsg.includes("auth/wrong-password")) {
    return "Incorrect password. Please verify and try again, or use 'Forgot password?'.";
  }
  if (code === "auth/invalid-credential" || rawMsg.includes("auth/invalid-credential")) {
    return "Invalid email or password. Please verify your credentials and try again.";
  }
  if (code === "auth/email-already-in-use" || rawMsg.includes("auth/email-already-in-use")) {
    return "This email address is already registered. Please click LOGIN to sign in.";
  }
  if (code === "auth/weak-password" || rawMsg.includes("auth/weak-password")) {
    return "Password must be at least 6 characters long.";
  }
  if (code === "auth/expired-action-code" || rawMsg.includes("auth/expired-action-code") || rawMsg.includes("expired-action-code")) {
    return "This password reset link has expired. Please request a new reset link.";
  }
  if (code === "auth/invalid-action-code" || rawMsg.includes("auth/invalid-action-code") || rawMsg.includes("invalid-action-code")) {
    return "This password reset link is invalid or has already been used. Please request a new reset link.";
  }
  if (code === "auth/user-disabled" || rawMsg.includes("auth/user-disabled")) {
    return "This account has been disabled. Please contact support.";
  }
  if (code === "auth/too-many-requests" || rawMsg.includes("auth/too-many-requests")) {
    return "Too many attempts. Please wait a moment before trying again.";
  }
  if (code === "auth/network-request-failed" || rawMsg.includes("auth/network-request-failed")) {
    return "Network error. Please check your internet connection.";
  }
  if (code === "auth/missing-password" || rawMsg.includes("auth/missing-password")) {
    return "Please enter your password.";
  }
  if (code === "auth/popup-closed-by-user" || rawMsg.includes("auth/popup-closed-by-user")) {
    return "Sign-in window was closed before completion.";
  }
  if (
    rawMsg.includes("Missing or insufficient permissions") ||
    rawMsg.includes("permission-denied")
  ) {
    return "Database access permission denied. Please verify your account permissions.";
  }

  // Clean any remaining Firebase technical wrappers
  const cleaned = rawMsg
    .replace(/^Firebase:\s*/i, "")
    .replace(/^Error\s*\(auth\/[^)]+\):?\s*/i, "")
    .replace(/\s*\(auth\/[^)]+\)\.?/gi, "")
    .trim();

  return cleaned || "Authentication failed. Please verify your details.";
}

export interface SuperAdminAuthContextValue {
  user: User | null;
  userProfile: UserProfile | null;
  role: AuthRole;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isPractitioner: boolean;
  practitionerCapability: boolean;
  isServerVerified: boolean;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  login: (email: string, pass: string) => Promise<AuthResult>;
  signUp: (arg1: string, arg2: string, arg3?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyResetCode: (code: string) => Promise<{ success: boolean; email?: string; error?: string }>;
  confirmResetPassword: (code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateUserProfileData: (updates: UserProfileUpdatePayload) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const SuperAdminAuthContext = createContext<SuperAdminAuthContextValue | undefined>(
  undefined
);

export const SuperAdminAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadProfile = useCallback(async (authUser: User, throwOnError: boolean = false) => {
    try {
      const email = normalizeEmail(authUser.email || "");
      const determinedRole = resolveRoleFromEmail(email);
      const profile = await syncUserProfileOnAuth(
        {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          phoneNumber: authUser.phoneNumber,
          photoURL: authUser.photoURL,
        },
        determinedRole
      );
      setUserProfile(profile);
      return profile;
    } catch (err: any) {
      console.error("[SuperAdminAuth] Profile sync error:", err);
      if (throwOnError) {
        throw err;
      }
      // Fallback local representation if network/firestore has temporary glitch during read
      const email = normalizeEmail(authUser.email || "");
      const role = resolveRoleFromEmail(email);
      setUserProfile({
        userId: authUser.uid,
        email,
        displayName: authUser.displayName || "",
        role,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });
      return null;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [loadProfile]);

  const login = async (emailInput: string, pass: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    const email = (emailInput || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const err = "Please enter a valid email address (e.g. name@example.com).";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    if (!pass) {
      const err = "Please enter your password.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    try {
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, pass);
      await loadProfile(cred.user);
      const determinedRole = resolveRoleFromEmail(email);
      return {
        success: true,
        user: cred.user,
        role: determinedRole,
        displayName: cred.user.displayName || email.split("@")[0] || "Seeker",
      };
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    arg1: string,
    arg2: string,
    arg3?: string
  ): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    // Gracefully handle either:
    // 1) signUp(email, pass, displayName)
    // 2) signUp(name, email, pass)
    let email = "";
    let pass = "";
    let displayName = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanArg1 = (arg1 || "").trim();
    const cleanArg2 = (arg2 || "").trim();

    if (!emailRegex.test(cleanArg1) && emailRegex.test(cleanArg2)) {
      // Called with (name, email, pass)
      displayName = cleanArg1;
      email = cleanArg2.toLowerCase();
      pass = arg3 || "";
    } else {
      // Called with (email, pass, displayName)
      email = cleanArg1.toLowerCase();
      pass = arg2 || "";
      displayName = (arg3 || "").trim();
    }

    if (!email || !emailRegex.test(email)) {
      const err = "Please enter a valid email address (e.g. name@example.com).";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    if (!pass || pass.length < 6) {
      const err = "Password must be at least 6 characters long.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }

    try {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
      if (displayName && cred.user) {
        try {
          await updateProfile(cred.user, { displayName });
        } catch (e) {
          console.warn("[SuperAdminAuth] updateProfile displayName error:", e);
        }
      }
      // Require truthful profile creation in Firestore; fail truthfully if Firestore profile write is rejected
      await loadProfile(cred.user, true);
      const determinedRole = resolveRoleFromEmail(email);
      return {
        success: true,
        user: cred.user,
        role: determinedRole,
        displayName: displayName || cred.user.displayName || email.split("@")[0] || "Seeker",
      };
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(firebaseAuth);
      setUser(null);
      setUserProfile(null);
      try {
        localStorage.removeItem("astronext_active_user_profile");
        localStorage.removeItem("devguru_active_user_profile");
      } catch {}
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("astronext:auth_state_change"));
      }
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordReset = async (emailInput: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    const email = (emailInput || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const err = "Please enter a valid email address.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return { success: true };
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyResetCode = async (code: string): Promise<{ success: boolean; email?: string; error?: string }> => {
    setIsLoading(true);
    setError(null);
    const cleanCode = (code || "").trim();
    if (!cleanCode) {
      const err = "Password reset code is missing or invalid.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    try {
      const email = await verifyPasswordResetCode(firebaseAuth, cleanCode);
      return { success: true, email };
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const confirmResetPassword = async (
    code: string,
    newPass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);
    const cleanCode = (code || "").trim();
    if (!cleanCode) {
      const err = "Password reset code is missing or invalid.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    if (!newPass || newPass.length < 6) {
      const err = "Password must be at least 6 characters long.";
      setError(err);
      setIsLoading(false);
      return { success: false, error: err };
    }
    try {
      await confirmPasswordReset(firebaseAuth, cleanCode, newPass);
      return { success: true };
    } catch (err: any) {
      const msg = formatAuthErrorMessage(err);
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfileData = async (updates: UserProfileUpdatePayload) => {
    if (!user) {
      throw new Error("No authenticated user to update profile for.");
    }
    setError(null);
    try {
      await updateUserProfile(user.uid, updates);
      setUserProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err: any) {
      setError(err?.message || "Failed to update profile.");
      throw err;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user);
    }
  };

  const userEmail = normalizeEmail(user?.email || userProfile?.email || "");
  const currentRole: AuthRole = userProfile?.role || resolveRoleFromEmail(userEmail);
  const isSuperAdmin = currentRole === "SUPER_ADMIN" || isSuperAdminEmail(userEmail);
  const isAdmin = currentRole === "ADMIN" || isAdminEmail(userEmail);
  const isPractitioner = currentRole === "PRACTITIONER";
  const practitionerCapability = hasPractitionerCapability(userEmail, currentRole);
  const isServerVerified = Boolean(user && (isSuperAdmin || isAdmin));

  return (
    <SuperAdminAuthContext.Provider
      value={{
        user,
        userProfile,
        role: currentRole,
        isSuperAdmin,
        isAdmin,
        isPractitioner,
        practitionerCapability,
        isServerVerified,
        isLoading,
        error,
        clearError,
        login,
        signUp,
        logout,
        sendPasswordReset,
        verifyResetCode,
        confirmResetPassword,
        updateUserProfileData,
        refreshProfile,
      }}
    >
      {children}
    </SuperAdminAuthContext.Provider>
  );
};

export function useSuperAdminAuth(): SuperAdminAuthContextValue {
  const context = useContext(SuperAdminAuthContext);
  if (!context) {
    throw new Error(
      "useSuperAdminAuth must be used within a SuperAdminAuthProvider"
    );
  }
  return context;
}
