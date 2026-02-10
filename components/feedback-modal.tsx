"use client"

import { useState } from "react"
import { feedbackService } from "@/services/feedbackService"

interface FeedbackModalProps {
  reservationId: string
  customerEmail: string
  customerName: string
  onClose: () => void
  onSuccess?: () => void
}

export function FeedbackModal({ reservationId, customerEmail, customerName, onClose, onSuccess }: FeedbackModalProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      await feedbackService.create({
        reservation_id: reservationId,
        customer_email: customerEmail,
        customer_name: customerName,
        rating,
        comment: comment.trim(),
      })

      setSuccess(true)
      setComment("")
      setRating(5)
      
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 1500)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to submit feedback")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-xl font-semibold mb-2">Thank you for your feedback!</h2>
          <p className="text-muted-foreground">We appreciate your time and will use your feedback to improve our service.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Share Your Feedback</h2>
        <p className="text-sm text-muted-foreground mb-6">Help us improve by sharing your experience at Brothify</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <div>
            <label className="text-sm font-medium block mb-3">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition ${
                    star <= rating ? "opacity-100" : "opacity-30"
                  } hover:opacity-100`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-medium block mb-2">
              Comments (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think..."
              rows={4}
              className="w-full border rounded px-3 py-2 bg-background text-foreground resize-none"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50 font-medium"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-2 rounded border text-foreground disabled:opacity-50 font-medium"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
