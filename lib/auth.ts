import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-insecure-secret")

export type AuthUser = {
  email: string
  role: "admin" | "user"
}

export async function verifyToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    const email = (payload as any)?.email as string | undefined
    const roleFromToken = (payload as any)?.role as "admin" | "user" | undefined
    if (!email) return null
    // Fallback role: admin if matches ADMIN_EMAIL
    const allowed = process.env.ADMIN_EMAIL?.toLowerCase()
    const fallbackRole: "admin" | "user" = allowed && email.toLowerCase() === allowed ? "admin" : "user"
    return { email, role: roleFromToken || fallbackRole }
  } catch {
    return null
  }
}

export async function getUserFromCookie(): Promise<AuthUser | null> {
  const token = (await cookies()).get("token")?.value
  return verifyToken(token)
}

