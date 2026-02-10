"use client"

import { UsersManager } from "@/components/admin/users-manager-new"

export default function AdminUsersPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Users</h1>
      </header>
      <UsersManager />
    </section>
  )
}
