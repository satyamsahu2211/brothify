"use client"

import { useState } from "react"
import useSWR from "swr"
import { reservationService } from "@/services/reservationService"
import { useRouter } from "next/navigation"
import { mockDb } from "@/lib/mock-db"

type Reservation = {
  reservation_id: string
  reservation_person_name: string
  reservation_person_email: string
  reservation_person_mobile_number: string
  table_number: number
  number_of_guests: number
  reservation_date: string
  reservation_time: string
  special_requests?: string
  reservation_status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
  dish_items?: string[]
  amount: number
  payment_status?: string
  created_at?: string
  updated_at?: string
}

export function ReservationsManager() {
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [updateLoading, setUpdateLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")

  const { data: reservations = [], mutate, isLoading } = useSWR(
    "reservations",
    async () => {
      try {
        const response = await reservationService.list()
        return response.data?.data || []
      } catch (err: any) {
        console.error("Failed to fetch reservations, using mock data:", err)
        // Use mock data as fallback
        return mockDb.listReservations().map((r) => ({
          reservation_id: r.id,
          reservation_person_name: r.name,
          reservation_person_email: r.email,
          reservation_person_mobile_number: r.phone,
          table_number: 0,
          number_of_guests: r.partySize,
          reservation_date: r.datetime.split("T")[0],
          reservation_time: r.datetime.split("T")[1]?.slice(0, 5) || "19:00",
          special_requests: r.notes,
          reservation_status: r.status === "confirmed" ? "Confirmed" : r.status === "cancelled" ? "Cancelled" : "Pending",
          dish_items: [],
          amount: 0,
          created_at: r.createdAt,
        }))
      }
    },
    { revalidateOnFocus: false }
  )

  const filteredReservations = reservations.filter((r: Reservation) => {
    const q = query.toLowerCase()
    return (
      r.reservation_person_name.toLowerCase().includes(q) ||
      r.reservation_person_email.toLowerCase().includes(q) ||
      r.reservation_person_mobile_number.includes(q) ||
      r.reservation_date.includes(q) ||
      r.reservation_status.toLowerCase().includes(q)
    )
  })

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdateLoading(id)
    setError("")

    try {
      await reservationService.update(id, { reservation_status: newStatus })
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to update reservation")
    } finally {
      setUpdateLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return

    setDeleteLoading(id)
    setError("")

    try {
      await reservationService.remove(id)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to delete reservation")
    } finally {
      setDeleteLoading(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Reservations Management</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, phone, date, or status..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading reservations...</div>
      ) : filteredReservations.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {reservations.length === 0 ? "No reservations found" : "No reservations match your search"}
        </div>
      ) : (
        <div className="border rounded divide-y max-h-[800px] overflow-y-auto">
          {filteredReservations.map((reservation: Reservation) => (
            <div key={reservation.reservation_id} className="p-4 hover:bg-muted/50 transition">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-base">{reservation.reservation_person_name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(reservation.reservation_status)}`}>
                      {reservation.reservation_status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reservation.reservation_person_email} • {reservation.reservation_person_mobile_number}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{reservation.reservation_date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <p className="font-medium">{reservation.reservation_time}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Guests:</span>
                  <p className="font-medium">{reservation.number_of_guests}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Table:</span>
                  <p className="font-medium">{reservation.table_number || "N/A"}</p>
                </div>
              </div>

              {reservation.special_requests && (
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">Special Requests:</span>
                  <p className="text-sm italic text-foreground">{reservation.special_requests}</p>
                </div>
              )}

              {reservation.dish_items && reservation.dish_items.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">Dishes:</span>
                  <p className="text-sm font-medium">{reservation.dish_items.length} item(s)</p>
                </div>
              )}

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <p className="text-lg font-bold">${reservation.amount.toFixed(2)}</p>
                </div>
                {reservation.payment_status && (
                  <div>
                    <span className="text-sm text-muted-foreground">Payment:</span>
                    <p className="text-sm font-medium capitalize">{reservation.payment_status}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={reservation.reservation_status}
                  onChange={(e) => handleStatusUpdate(reservation.reservation_id, e.target.value)}
                  disabled={updateLoading === reservation.reservation_id}
                  className="rounded-md border border-input bg-background px-2 py-1 text-sm disabled:opacity-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(reservation.reservation_id)}
                  disabled={deleteLoading === reservation.reservation_id}
                  className="px-3 py-1.5 rounded text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                >
                  {deleteLoading === reservation.reservation_id ? "Deleting..." : "Delete"}
                </button>
              </div>

              {reservation.created_at && (
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(reservation.created_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
