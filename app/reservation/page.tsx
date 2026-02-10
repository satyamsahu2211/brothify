"use client"

import { useState } from "react"
import { FeedbackModal } from "@/components/feedback-modal"
import { reservationService } from "@/services/reservationService"

export const metadata = { title: "Reservation — Brothify" }

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "2",
    notes: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const response = await reservationService.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        partySize: parseInt(formData.partySize),
        note: formData.notes.trim(),
        status: "Pending",
      })

      const newReservationId = response.data?.data?.id || `res_${Date.now()}`
      setReservationId(newReservationId)
      setSuccess(true)
      setShowFeedback(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "2",
        notes: "",
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create reservation. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success && !showFeedback) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="text-center space-y-4">
          <div className="text-6xl">✅</div>
          <h1 className="font-serif text-4xl">Reservation Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            We've received your reservation request and will confirm it shortly.
          </p>
          <p className="text-muted-foreground">
            A confirmation email has been sent to <strong>{formData.email}</strong>
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 px-6 py-2 rounded bg-primary text-primary-foreground hover:brightness-110"
          >
            Make Another Reservation
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {showFeedback && reservationId && (
        <FeedbackModal
          reservationId={reservationId}
          customerEmail={formData.email}
          customerName={formData.name}
          onClose={() => setShowFeedback(false)}
          onSuccess={() => setSuccess(true)}
        />
      )}

      <header className="text-center">
        <h1 className="font-serif text-4xl">Book a Table</h1>
        <p className="mt-2 text-muted-foreground">Reserve your spot and we&apos;ll have everything ready.</p>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 grid gap-4 rounded-xl border border-border/50 bg-card/60 p-6 md:grid-cols-2">
        {error && (
          <div className="md:col-span-2 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="partySize" className="text-sm font-medium">
            Party Size *
          </label>
          <select
            id="partySize"
            name="partySize"
            value={formData.partySize}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="text-sm font-medium">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="time" className="text-sm font-medium">
            Time *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any special requests? (allergies, dietary restrictions, etc.)"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110 disabled:opacity-50 font-medium"
          >
            {submitting ? "Reserving..." : "Reserve"}
          </button>
        </div>
      </form>
    </main>
  )
}

