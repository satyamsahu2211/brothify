"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

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
const uid = () => Math.random().toString(36).slice(2, 10)

export default function EditReservationPage() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get("id")

  const [list, setList] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const current = useMemo(() => list.find((b) => b.id === id), [list, id])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [partySize, setPartySize] = useState(2)
  const [note, setNote] = useState("")
  const [status, setStatus] = useState<Booking["status"]>("Pending")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      try {
        const data = JSON.parse(saved) as Booking[]
        setList(data)
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

  useEffect(() => {
    if (!loading) {
      setName(current?.name ?? "")
      setEmail(current?.email ?? "")
      setPhone(current?.phone ?? "")
      setDate(current?.date ?? "")
      setTime(current?.time ?? "")
      setPartySize(current?.partySize ?? 2)
      setNote(current?.note ?? "")
      setStatus(current?.status ?? "Pending")
    }
  }, [loading, current])

  const onSave = () => {
    const next: Booking = {
      id: current?.id ?? uid(),
      name: name.trim() || "Guest",
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
      partySize: Number.isFinite(partySize) ? partySize : 2,
      note: note.trim(),
      status,
    }
    const updated = current ? list.map((b) => (b.id === next.id ? next : b)) : [next, ...list]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    router.push("/admin/reservations")
  }

  if (loading) return <div className="p-4">Loading…</div>

  return (
    <main className="p-4 space-y-4 max-w-xl">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{current ? "Edit Booking" : "Add Booking"}</h1>
        <Link href="/admin/reservations" className="text-brand hover:underline">
          Back to list
        </Link>
      </header>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm">Name</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Email</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Phone</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm">Date</span>
            <input
              type="date"
              className="border rounded px-3 py-2 bg-background"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm">Time</span>
            <input
              type="time"
              className="border rounded px-3 py-2 bg-background"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm">Party Size</span>
          <input
            type="number"
            min={1}
            className="border rounded px-3 py-2 bg-background"
            value={partySize}
            onChange={(e) => setPartySize(Number.parseInt(e.target.value || "1", 10))}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm">Note</span>
          <textarea
            className="border rounded px-3 py-2 bg-background"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm">Status</span>
          <select
            className="border rounded px-3 py-2 bg-background"
            value={status}
            onChange={(e) => setStatus(e.target.value as Booking["status"])}
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
          </select>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="inline-flex items-center rounded px-3 py-2 bg-primary text-primary-foreground"
        >
          Save
        </button>
        <Link href="/admin/reservations" className="inline-flex items-center rounded px-3 py-2 bg-muted">
          Cancel
        </Link>
      </div>
    </main>
  )
}
