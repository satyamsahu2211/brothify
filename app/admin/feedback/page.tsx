"use client"

import { FeedbackManager } from "@/components/admin/feedback-manager"

export default function AdminFeedbackPage() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Customer Feedback</h1>
      </header>
      <FeedbackManager />
    </section>
  )
}
