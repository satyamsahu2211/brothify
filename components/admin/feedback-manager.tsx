"use client"

import { useState } from "react"
import useSWR from "swr"
import { feedbackService } from "@/services/feedbackService"
import { useRouter } from "next/navigation"

type Feedback = {
  id: string
  reservation_id: string
  customer_email: string
  customer_name: string
  rating: number
  comment: string
  created_at?: string
}

export function FeedbackManager() {
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [filterRating, setFilterRating] = useState<number | "all">("all")

  const { data: feedback = [], mutate, isLoading } = useSWR(
    "feedback",
    async () => {
      try {
        const response = await feedbackService.list()
        return response.data?.data || []
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/login")
        }
        console.error("Failed to fetch feedback:", err)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  const filteredFeedback = feedback.filter((f: Feedback) => {
    if (filterRating === "all") return true
    return f.rating === filterRating
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return

    setDeleteLoading(id)
    setError("")

    try {
      await feedbackService.remove(id)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to delete feedback")
    } finally {
      setDeleteLoading(null)
    }
  }

  const averageRating = feedback.length > 0
    ? (feedback.reduce((sum: number, f: Feedback) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Feedback</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total Feedback</p>
            <p className="text-3xl font-bold mt-2">{feedback.length}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p className="text-3xl font-bold mt-2">
              {averageRating} <span className="text-xl">⭐</span>
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">5-Star Reviews</p>
            <p className="text-3xl font-bold mt-2">
              {feedback.filter((f: Feedback) => f.rating === 5).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Filter by Rating</label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterRating("all")}
              className={`px-3 py-2 rounded text-sm font-medium transition ${
                filterRating === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background hover:bg-muted"
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  filterRating === rating
                    ? "bg-primary text-primary-foreground"
                    : "border bg-background hover:bg-muted"
                }`}
              >
                {rating} ⭐ ({feedback.filter((f: Feedback) => f.rating === rating).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading feedback...</div>
        ) : filteredFeedback.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {feedback.length === 0 ? "No feedback received yet" : "No feedback matches the selected filter"}
          </div>
        ) : (
          <div className="border rounded divide-y max-h-[700px] overflow-y-auto">
            {filteredFeedback.map((f: Feedback) => (
              <div key={f.id} className="p-4 hover:bg-muted/50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div>
                        <p className="font-semibold">{f.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{f.customer_email}</p>
                      </div>
                      <div className="ml-auto flex flex-col items-end">
                        <div className="text-lg">
                          {"⭐".repeat(f.rating)}
                          {"☆".repeat(5 - f.rating)}
                        </div>
                        {f.created_at && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(f.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {f.comment && (
                      <p className="text-sm text-foreground mt-2 bg-muted/30 p-3 rounded italic">
                        "{f.comment}"
                      </p>
                    )}
                    {f.reservation_id && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Reservation ID: {f.reservation_id}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(f.id)}
                    disabled={deleteLoading === f.id}
                    className="px-3 py-1.5 rounded text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                  >
                    {deleteLoading === f.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
