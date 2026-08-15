import type { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const VISITOR_COOKIE = "visitor_id";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The only place visitor identity is established — never trust an id from a request body. */
export function ensureVisitorId(req: NextRequest): {
  id: string;
  isNew: boolean;
} {
  const existing = req.cookies.get(VISITOR_COOKIE)?.value;
  if (existing && UUID_RE.test(existing)) {
    return { id: existing, isNew: false };
  }
  return { id: randomUUID(), isNew: true };
}

export function attachVisitorCookie(res: NextResponse, id: string): void {
  res.cookies.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: VISITOR_COOKIE_MAX_AGE,
    path: "/",
  });
}
