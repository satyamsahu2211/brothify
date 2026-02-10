"use client"

import { ReservationsManager } from "@/components/admin/reservations-manager"

export default function AdminReservationsPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Reservations</h1>
      </header>
      <ReservationsManager />
    </section>
  )
}
