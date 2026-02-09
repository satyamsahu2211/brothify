"use client"

import type React from "react"
import useSWR from "swr"
import { categoryService } from "@/services/categoryService"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type Category = {
  cat_id: string
  name: string
  description: string
}

export function CategoryCardView() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const { data: categories = [], mutate, isLoading } = useSWR(
    "categories-card-view",
    async () => {
      try {
        const response = await categoryService.list()
        return response.data?.data || []
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/login")
        }
        console.error("Failed to fetch categories:", err)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  const displayedCategories = useMemo(() => categories.slice(0, 3), [categories])

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Categories</h3>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            + Add New Category
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading categories...</div>
        ) : displayedCategories.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-card p-4 text-muted-foreground">
            No categories yet. Click "+ Add New Category" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedCategories.map((category: Category) => (
              <div
                key={category.cat_id}
                className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-foreground">{category.name}</h4>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {category.description || "No description"}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setShowModal(true)
                    }}
                    className="flex-1 px-2 py-1 rounded text-sm bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CategoryFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onRefresh={() => mutate()}
        />
      )}
    </>
  )
}

function CategoryFormModal({
  isOpen,
  onClose,
  onRefresh,
}: {
  isOpen: boolean
  onClose: () => void
  onRefresh: () => void
}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter a category name")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      await categoryService.create({
        name: name.trim(),
        description: description.trim() || "",
      })
      setName("")
      setDescription("")
      onRefresh()
      onClose()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to create category")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-md">
        <div className="border-b p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New Category</h2>
          <button
            onClick={onClose}
            className="text-2xl text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Soups, Salads, Breads"
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className="w-full border rounded px-3 py-2 bg-background text-foreground min-h-[100px]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Category"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded border text-foreground hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
