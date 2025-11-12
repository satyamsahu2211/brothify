import { NextResponse } from "next/server"
import { getUserFromCookie } from "@/lib/auth"

export async function GET() {
  const user = await getUserFromCookie()
  if (!user) return NextResponse.json({ email: null, role: null }, { status: 200 })
  return NextResponse.json(user)
}
