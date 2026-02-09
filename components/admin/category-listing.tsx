"use client"

import type React from "react"
import useSWR from "swr"
import { categoryService } from "@/services/categoryService"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Category = {
  cat_id: string
  name: string
  description: string
}

export function CategoryListing() {
  const router = useRouter()

  const { data: categories = [], mutate, isLoading } = useSWR(
    "categories-list",
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

  // Form states
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingDescription, setEditingDescription] = useState("")
  const [updateLoading, setUpdateLoading] = useState<string | null>(null)

  const resetForm = () => {
    setName("")
    setDescription("")
    setError("")
  }

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
      resetForm()
      await mutate()
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

  const handleStartEdit = (category: Category) => {
    setEditingId(category.cat_id)
    setEditingName(category.name)
    setEditingDescription(category.description)
    setError("")
  }

  const handleUpdate = async (e: React.FormEvent, catId: string) => {
    e.preventDefault()

    if (!editingName.trim()) {
      setError("Please enter a category name")
      return
    }

    setUpdateLoading(catId)
    setError("")

    try {
      await categoryService.patch(catId, {
        name: editingName.trim(),
        description: editingDescription.trim() || "",
      })
      setEditingId(null)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to update category")
    } finally {
      setUpdateLoading(null)
    }
  }

  const handleDelete = async (catId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    setDeleteLoading(catId)
    setError("")

    try {
      await categoryService.remove(catId)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to delete category")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingName("")
    setEditingDescription("")
    setError("")
  }

  return (
    <div className="space-y-6">
      {/* Add Category Form */}
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Add New Category</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Category Name *</label>
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
              <label className="text-sm font-medium block mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories List</h3>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded bg-card p-4">
            No categories found. Add one to get started!
          </div>
        ) : (
          <div className="border rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categories.map((category: Category) => (
                    <tr key={category.cat_id} className="hover:bg-muted/50 transition">
                      {editingId === category.cat_id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="w-full border rounded px-2 py-1 bg-background text-foreground text-sm"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editingDescription}
                              onChange={(e) => setEditingDescription(e.target.value)}
                              className="w-full border rounded px-2 py-1 bg-background text-foreground text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                            <button
                              onClick={(e) => handleUpdate(e, category.cat_id)}
                              disabled={updateLoading === category.cat_id}
                              className="px-3 py-1 rounded text-sm bg-green-500/20 text-green-600 hover:bg-green-500/30 disabled:opacity-50"
                            >
                              {updateLoading === category.cat_id ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-3 py-1 rounded text-sm border text-foreground hover:bg-muted"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3">
                            <p className="font-medium text-foreground">{category.name}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-muted-foreground">{category.description || "—"}</p>
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                            <button
                              onClick={() => handleStartEdit(category)}
                              className="px-3 py-1 rounded text-sm bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(category.cat_id)}
                              disabled={deleteLoading === category.cat_id}
                              className="px-3 py-1 rounded text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                            >
                              {deleteLoading === category.cat_id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
