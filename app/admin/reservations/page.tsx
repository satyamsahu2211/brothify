"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type Booking = {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  partySize: number
  note?: string
  status: "Pending" | "Confirmed" | "Cancelled"
}

const STORAGE_KEY = "brothify_reservations"

export default function AdminReservationsPage() {
  const [list, setList] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      try {
        setList(JSON.parse(saved) as Booking[])
        setLoading(false)
        return
      } catch {}
    }
    ;(async () => {
      try {
        const res = await fetch("/data/reservations.json")
        const data = (await res.json()) as Booking[]
        setList(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        setList([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return list.filter((r) =>
      [r.name, r.email, r.phone, r.status, r.date, r.time, String(r.partySize)].join(" ").toLowerCase().includes(q),
    )
  }, [list, query])

  function updateStatus(id: string, status: Booking["status"]) {
    const next = list.map((r) => (r.id === id ? { ...r, status } : r))
    setList(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function remove(id: string) {
    const next = list.filter((r) => r.id !== id)
    setList(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  if (loading) return <div className="p-4">Loading…</div>

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Reservations</h1>
        <Link href="/admin/reservations/edit" className="rounded-md bg-primary px-3 py-2 text-primary-foreground">
          Add Booking
        </Link>
      </header>

      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 rounded-md border bg-background w-full md:w-80"
          placeholder="Search bookings…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="divide-y rounded-md border">
        {filtered.map((r) => (
          <li key={r.id} className="p-3 flex items-start justify-between gap-4">
            <div className="text-sm">
              <p className="font-medium">
                {r.name} • {r.partySize} people
              </p>
              <p className="text-muted-foreground">
                {r.email} • {r.phone}
              </p>
              <p className="text-muted-foreground">
                {r.date} at {r.time}
              </p>
              {r.note ? <p className="text-muted-foreground">Note: {r.note}</p> : null}
            </div>
            <div className="flex items-center gap-3">
              <select
                className="rounded-md border bg-background px-2 py-1 text-sm"
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value as Booking["status"])}
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
              </select>
              <Link
                href={`/admin/reservations/edit?id=${r.id}`}
                className="text-sm rounded-md border px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                Edit
              </Link>
              <button className="text-sm text-red-600 hover:underline" onClick={() => remove(r.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 ? <li className="p-4 text-sm text-muted-foreground">No bookings found.</li> : null}
      </ul>
    </section>
  )
}
