"use client"

import { CategoryCardView } from "@/components/admin/category-card-view"
import { useAuth } from "@/hooks/useAuth"

export default function AdminCategoriesPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand"></div>
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-muted-foreground">You must be logged in.</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage dish categories</p>
      </div>
      <CategoryCardView />
    </section>
  )
}
