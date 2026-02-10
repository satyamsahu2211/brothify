"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { FeedbackModal } from "@/components/feedback-modal"
import { reservationService } from "@/services/reservationService"
import { dishService } from "@/services/dishService"
import { mockDb } from "@/lib/mock-db"

interface Dish {
  id: string
  dish_name: string
  price: number
  description: string
}

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    reservation_person_name: "",
    reservation_person_email: "",
    reservation_person_mobile_number: "",
    table_number: "",
    number_of_guests: "2",
    reservation_date: "",
    reservation_time: "",
    special_requests: "",
    dish_items: [] as string[],
  })

  const { data: dishes = [] } = useSWR(
    "dishes-for-reservation",
    async () => {
      try {
        const response = await dishService.list()
        return response.data?.data || []
      } catch (err) {
        console.error("Failed to fetch dishes, using mock data:", err)
        // Use mock data as fallback
        return mockDb.listItems().map((item) => ({
          id: item.id,
          dish_name: item.name,
          price: item.price,
          description: item.description || "",
        }))
      }
    },
    { revalidateOnFocus: false }
  )

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [reservationId, setReservationId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const selectedDishesTotal = useMemo(() => {
    return formData.dish_items.reduce((total, dishId) => {
      const dish = dishes.find((d: Dish) => d.id === dishId)
      return total + (dish?.price || 0)
    }, 0)
  }, [formData.dish_items, dishes])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDishToggle = (dishId: string) => {
    setFormData((prev) => ({
      ...prev,
      dish_items: prev.dish_items.includes(dishId)
        ? prev.dish_items.filter((id) => id !== dishId)
        : [...prev.dish_items, dishId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const payload = {
        reservation_person_name: formData.reservation_person_name.trim(),
        reservation_person_email: formData.reservation_person_email.trim(),
        reservation_person_mobile_number: formData.reservation_person_mobile_number.trim(),
        table_number: formData.table_number ? parseInt(formData.table_number) : 0,
        number_of_guests: parseInt(formData.number_of_guests),
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        special_requests: formData.special_requests.trim() || null,
        dish_items: formData.dish_items,
        amount: selectedDishesTotal,
        reservation_status: "Pending",
      }

      const response = await reservationService.create(payload)

      const newReservationId = response.data?.data?.reservation_id || `res_${Date.now()}`
      setReservationId(newReservationId)
      setSuccess(true)
      setShowFeedback(true)

      // Reset form
      setFormData({
        reservation_person_name: "",
        reservation_person_email: "",
        reservation_person_mobile_number: "",
        table_number: "",
        number_of_guests: "2",
        reservation_date: "",
        reservation_time: "",
        special_requests: "",
        dish_items: [],
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
            A confirmation email has been sent to <strong>{formData.reservation_person_email}</strong>
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
          customerEmail={formData.reservation_person_email}
          customerName={formData.reservation_person_name}
          onClose={() => setShowFeedback(false)}
          onSuccess={() => setSuccess(true)}
        />
      )}

      <header className="text-center">
        <h1 className="font-serif text-4xl">Book a Table</h1>
        <p className="mt-2 text-muted-foreground">Reserve your spot and we&apos;ll have everything ready.</p>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 space-y-6 rounded-xl border border-border/50 bg-card/60 p-6">
        {error && (
          <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reservation_person_name" className="text-sm font-medium">
                Name *
              </label>
              <input
                id="reservation_person_name"
                name="reservation_person_name"
                type="text"
                value={formData.reservation_person_name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="reservation_person_email" className="text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                id="reservation_person_email"
                name="reservation_person_email"
                value={formData.reservation_person_email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="reservation_person_mobile_number" className="text-sm font-medium">
                Phone *
              </label>
              <input
                type="tel"
                id="reservation_person_mobile_number"
                name="reservation_person_mobile_number"
                value={formData.reservation_person_mobile_number}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="table_number" className="text-sm font-medium">
                Table Number (Optional)
              </label>
              <input
                type="number"
                id="table_number"
                name="table_number"
                min="1"
                value={formData.table_number}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="number_of_guests" className="text-sm font-medium">
                Number of Guests *
              </label>
              <select
                id="number_of_guests"
                name="number_of_guests"
                value={formData.number_of_guests}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size} {size === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="reservation_date" className="text-sm font-medium">
                Date *
              </label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="reservation_time" className="text-sm font-medium">
                Time *
              </label>
              <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="special_requests" className="text-sm font-medium">
                Special Requests (Optional)
              </label>
              <textarea
                id="special_requests"
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                rows={3}
                placeholder="Allergies, dietary restrictions, special occasion, etc."
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Optional Dishes Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Add Dishes to Your Reservation (Optional)</h3>
          <p className="text-sm text-muted-foreground mb-4">Select dishes you'd like to pre-order or enjoy during your reservation</p>
          
          {dishes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No dishes available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dishes.map((dish: Dish) => (
                <label key={dish.id} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                  <input
                    type="checkbox"
                    checked={formData.dish_items.includes(dish.id)}
                    onChange={() => handleDishToggle(dish.id)}
                    className="mt-1 rounded border-border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dish.dish_name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{dish.description}</p>
                    <p className="text-sm font-semibold text-brand mt-1">${dish.price.toFixed(2)}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {formData.dish_items.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-muted">
              <div className="flex justify-between items-center">
                <span className="font-medium">Dishes Total:</span>
                <span className="text-lg font-bold">${selectedDishesTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110 disabled:opacity-50 font-medium"
          >
            {submitting ? "Reserving..." : "Complete Reservation"}
          </button>
        </div>
      </form>
    </main>
  )
}

