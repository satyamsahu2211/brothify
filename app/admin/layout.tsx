import type React from "react"
import "server-only"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserFromCookie } from "@/lib/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromCookie()
  if (!user || user.role !== "admin") {
    redirect("/login")
  }
  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-background p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="text-foreground/80 hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/admin/items" className="text-foreground/80 hover:text-foreground">
            Items
          </Link>
          <Link href="/admin/reservations" className="text-foreground/80 hover:text-foreground">
            Reservations
          </Link>
        </nav>
      </aside>
      <main className="p-4">{children}</main>
    </div>
  )
}
