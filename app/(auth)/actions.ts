"use server"

import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-insecure-secret")

export async function loginWithEmail(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") || "")

  if (!email || !email.includes("@")) {
    redirect("/login?error=Please%20enter%20a%20valid%20email")
  }

  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const hasAdminEmailConfig = Boolean(allowed)
  const isAdminEmail = hasAdminEmailConfig && email === allowed

  // Dummy mode: if ADMIN_EMAIL is not set, treat everyone as admin (for preview/dev as requested)
  const isDummyAdmin = !hasAdminEmailConfig

  const role: "admin" | "user" = isDummyAdmin ? "admin" : isAdminEmail ? "admin" : "user"

  // If we're NOT in dummy mode and role is admin, enforce ADMIN_PASSWORD
  if (!isDummyAdmin && role === "admin") {
    const expected = process.env.ADMIN_PASSWORD || ""
    if (!expected || password !== expected) {
      redirect("/login?error=Invalid%20admin%20credentials")
    }
  }

  const token = await new SignJWT({ email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)

  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  })

  redirect(role === "admin" ? "/admin" : "/")
}

export async function logout() {
  cookies().delete("token")
  redirect("/")
}
