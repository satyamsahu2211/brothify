"use client"

import type React from "react"
import useSWR from "swr"
import { categoryService } from "@/services/categoryService"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
}

export function CategoryManager() {
  const router = useRouter()
  const { data: categories = [], mutate, isLoading, error } = useSWR(
    "categories",
    async () => {
      try {
        const response = await categoryService.list()
        return response.data?.data || []
      } catch (err: any) {
        // Handle authentication errors
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/login")
          throw new Error("Authentication required")
        }
        throw err
      }
    },
    { revalidateOnFocus: false }
  )

  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const [actionError, setActionError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [updateLoading, setUpdateLoading] = useState<string | null>(null)

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    setActionError("")
    try {
      await categoryService.create({ name: name.trim() })
      setName("")
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setActionError(err?.message || "Failed to create category")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id)
    setEditingName(category.name)
    setActionError("")
  }

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !editingName.trim()) return

    setUpdateLoading(editingId)
    setActionError("")
    try {
      await categoryService.patch(editingId, { name: editingName.trim() })
      setEditingId(null)
      setEditingName("")
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setActionError(err?.message || "Failed to update category")
    } finally {
      setUpdateLoading(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingName("")
    setActionError("")
  }

  const handleDeleteCategory = async (id: string) => {
    setDeleteLoading(id)
    setActionError("")
    try {
      await categoryService.remove(id)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setActionError(err?.message || "Failed to delete category")
    } finally {
      setDeleteLoading(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="flex justify-center py-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-brand"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Failed to load categories. Please check your authentication.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categories</h3>
      
      <form onSubmit={handleAddCategory} className="flex items-center gap-2">
        <input
          type="text"
          aria-label="Category name"
          className="flex-1 border rounded px-3 py-2 bg-background text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
          placeholder="Add category (e.g. Soups)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {actionError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {actionError}
        </p>
      )}

      {categories.length > 0 ? (
        <ul className="divide-y border rounded">
          {categories.map((category: Category) => (
            <li key={category.id} className="p-3">
              {editingId === category.id ? (
                <form onSubmit={handleUpdateCategory} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 bg-background text-foreground outline-none text-sm"
                    disabled={updateLoading === category.id}
                  />
                  <button
                    type="submit"
                    disabled={updateLoading === category.id || !editingName.trim()}
                    className="px-3 py-1 text-xs rounded bg-green-600/20 text-green-700 hover:bg-green-600/30 disabled:opacity-60"
                  >
                    {updateLoading === category.id ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={updateLoading === category.id}
                    className="px-3 py-1 text-xs rounded bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      disabled={updateLoading || deleteLoading === category.id}
                      className="px-2 py-1 text-xs rounded bg-blue-600/20 text-blue-700 hover:bg-blue-600/30 disabled:opacity-60"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      disabled={deleteLoading === category.id || editingId !== null}
                      className="px-2 py-1 text-xs rounded bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-60"
                    >
                      {deleteLoading === category.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-6 text-muted-foreground">No categories yet</p>
      )}
    </div>
  )
}
