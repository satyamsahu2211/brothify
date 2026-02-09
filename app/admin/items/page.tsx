"use client"

import { DishCardView } from "@/components/admin/dish-card-view"

export default function AdminItemsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Dishes</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage menu items with add, edit, and delete options</p>
      </div>
      <DishCardView />
    </section>
  )
}

