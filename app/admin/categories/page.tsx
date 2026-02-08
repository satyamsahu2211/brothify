"use client"

import { CategoryManager } from "@/components/admin/category-manager"
import { useAuth } from "@/hooks/useAuth"

export default function AdminCategoriesPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand"></div>
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <p className="text-muted-foreground">You must be logged in to manage categories.</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
      </div>
      <CategoryManager />
    </section>
  )
}
