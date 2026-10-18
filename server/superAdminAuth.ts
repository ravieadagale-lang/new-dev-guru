import fs from "fs";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import { 
  normalizeEmail, 
  resolveRoleFromEmail, 
  isSuperAdminEmail, 
  isAdminEmail,
  isPrivilegedEmail,
  hasPractitionerCapability,
  type AuthRole 
} from "../src/services/auth/superAdminConfig";

export interface VerifiedAuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  role: AuthRole;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isPractitioner: boolean;
  practitionerCapability: boolean;
}

export interface AuthenticatedSuperAdminRequest extends Request {
  superAdmin?: VerifiedAuthUser;
  authUser?: VerifiedAuthUser;
}

let cachedApiKey: string | null = null;

export function getFirebaseApiKey(): string {
  if (cachedApiKey) return cachedApiKey;

  if (process.env.FIREBASE_API_KEY) {
    cachedApiKey = process.env.FIREBASE_API_KEY;
    return cachedApiKey;
  }

  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed.apiKey) {
        cachedApiKey = parsed.apiKey;
        return cachedApiKey;
      }
    }
  } catch (err) {
    console.error("[SuperAdminAuth] Failed to read firebase-applet-config.json", err);
  }

  return "";
}

/**
 * Verifies a Firebase ID token with Google's Identity Toolkit API
 * and derives trusted user identity and role from the verified token.
 * Never accepts client-supplied role or email.
 */
export async function verifyFirebaseIdToken(idToken: string): Promise<{
  valid: boolean;
  user?: VerifiedAuthUser;
  error?: string;
  statusCode?: number;
}> {
  if (!idToken || typeof idToken !== "string" || idToken.trim().length === 0) {
    return {
      valid: false,
      error: "Authentication token is missing or empty.",
      statusCode: 401,
    };
  }

  const apiKey = getFirebaseApiKey();
  if (!apiKey) {
    return {
      valid: false,
      error: "Firebase API configuration is not available on server.",
      statusCode: 500,
    };
  }

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: idToken.trim() }),
    });

    const data = (await response.json()) as any;

    if (!response.ok || !data.users || !data.users[0]) {
      const errorCode = data?.error?.message || "INVALID_ID_TOKEN";
      return {
        valid: false,
        error: `Invalid or expired authentication token (${errorCode}).`,
        statusCode: 401,
      };
    }

    const userData = data.users[0];
    const userEmail = normalizeEmail(userData.email);

    if (!userEmail) {
      return {
        valid: true,
        error: "Authenticated user account does not have an email address.",
        statusCode: 403,
      };
    }

    const role = resolveRoleFromEmail(userEmail);

    return {
      valid: true,
      user: {
        uid: userData.localId,
        email: userEmail,
        emailVerified: Boolean(userData.emailVerified),
        role,
        isSuperAdmin: role === "SUPER_ADMIN",
        isAdmin: role === "ADMIN",
        isPractitioner: role === "PRACTITIONER",
        practitionerCapability: hasPractitionerCapability(userEmail, role),
      },
    };
  } catch (err: any) {
    console.error("[SuperAdminAuth] Token verification network error:", err);
    return {
      valid: false,
      error: "Internal error verifying authentication token.",
      statusCode: 500,
    };
  }
}

/**
 * Backward-compatible helper for Super Admin verification.
 */
export async function verifyFirebaseTokenAndSuperAdmin(idToken: string): Promise<{
  valid: boolean;
  authorized: boolean;
  user?: VerifiedAuthUser;
  error?: string;
  statusCode?: number;
}> {
  const res = await verifyFirebaseIdToken(idToken);
  if (!res.valid || !res.user) {
    return {
      valid: false,
      authorized: false,
      error: res.error,
      statusCode: res.statusCode,
    };
  }

  if (!isSuperAdminEmail(res.user.email)) {
    return {
      valid: true,
      authorized: false,
      user: res.user,
      error: "Access denied. Your account is not authorized for Super Admin privileges.",
      statusCode: 403,
    };
  }

  return {
    valid: true,
    authorized: true,
    user: res.user,
  };
}

/**
 * Express middleware to strictly enforce Super Admin authorization.
 */
export async function requireSuperAdminAuth(
  req: AuthenticatedSuperAdminRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  let token = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  } else if (req.body && typeof req.body.idToken === "string") {
    token = req.body.idToken.trim();
  }

  if (!token) {
    res.status(401).json({
      success: false,
      error: "UNAUTHENTICATED",
      message: "Authorization required. Please provide a valid Firebase ID token.",
    });
    return;
  }

  const result = await verifyFirebaseTokenAndSuperAdmin(token);

  if (!result.valid || !result.authorized || !result.user) {
    res.status(result.statusCode || 403).json({
      success: false,
      error: result.statusCode === 401 ? "UNAUTHENTICATED" : "FORBIDDEN",
      message: result.error || "Super Admin authorization failed.",
    });
    return;
  }

  req.superAdmin = result.user;
  req.authUser = result.user;
  next();
}

