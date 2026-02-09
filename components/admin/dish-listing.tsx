"use client"

import type React from "react"
import useSWR from "swr"
import { dishService } from "@/services/dishService"
import { categoryService } from "@/services/categoryService"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type Category = { cat_id: string; name: string; description: string }
type Dish = {
  id?: string
  dish_name: string
  cat_id: string
  price: number
  description: string
  dish_url?: string
  availability: boolean
  rating: number
  highlight: boolean
}

export function DishListing() {
  const router = useRouter()

  const { data: categoriesData = [] } = useSWR(
    "dish-listing-categories",
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

  const { data: dishes = [], mutate, isLoading } = useSWR(
    "dish-listing",
    async () => {
      try {
        const response = await dishService.list()
        return response.data?.data || []
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/login")
        }
        console.error("Failed to fetch dishes:", err)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  const categories = useMemo(() => categoriesData as Category[], [categoriesData])
  const catMap = useMemo(() => new Map((categories || []).map((c) => [c.cat_id, c.name])), [categories])

  // Form states
  const [dishName, setDishName] = useState("")
  const [catId, setCatId] = useState("")
  const [price, setPrice] = useState<string>("")
  const [description, setDescription] = useState("")
  const [dishImage, setDishImage] = useState<File | null>(null)
  const [dishImagePreview, setDishImagePreview] = useState("")
  const [availability, setAvailability] = useState(true)
  const [rating, setRating] = useState<string>("0")
  const [highlight, setHighlight] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Editing states
  const [editingDishName, setEditingDishName] = useState("")
  const [editingCatId, setEditingCatId] = useState("")
  const [editingPrice, setEditingPrice] = useState<string>("")
  const [editingDescription, setEditingDescription] = useState("")
  const [editingAvailability, setEditingAvailability] = useState(true)
  const [editingRating, setEditingRating] = useState<string>("0")
  const [editingHighlight, setEditingHighlight] = useState(false)
  const [updateLoading, setUpdateLoading] = useState<string | null>(null)

  const resetForm = () => {
    setDishName("")
    setCatId("")
    setPrice("")
    setDescription("")
    setDishImage(null)
    setDishImagePreview("")
    setAvailability(true)
    setRating("0")
    setHighlight(false)
    setError("")
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dishName.trim() || !catId || !price || !description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    if (!dishImage) {
      setError("Please upload an image for new dishes")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("dish_name", dishName.trim())
      formData.append("cat_id", catId)
      formData.append("price", parseFloat(price).toString())
      formData.append("description", description.trim())
      formData.append("dish_url", dishImage)
      formData.append("availability", availability.toString())
      formData.append("rating", parseFloat(rating).toString())
      formData.append("highlight", highlight.toString())

      await dishService.create(formData)
      resetForm()
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to save dish")
    } finally {
      setSubmitting(false)
    }
  }

  const handleStartEdit = (dish: Dish) => {
    setEditingId(dish.id || "")
    setEditingDishName(dish.dish_name)
    setEditingCatId(dish.cat_id)
    setEditingPrice(dish.price.toString())
    setEditingDescription(dish.description)
    setEditingAvailability(dish.availability)
    setEditingRating(dish.rating.toString())
    setEditingHighlight(dish.highlight)
    setError("")
  }

  const handleUpdate = async (e: React.FormEvent, dishId: string) => {
    e.preventDefault()

    if (!editingDishName.trim() || !editingCatId || !editingPrice || !editingDescription.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setUpdateLoading(dishId)
    setError("")

    try {
      const formData = new FormData()
      formData.append("dish_name", editingDishName.trim())
      formData.append("cat_id", editingCatId)
      formData.append("price", parseFloat(editingPrice).toString())
      formData.append("description", editingDescription.trim())
      formData.append("availability", editingAvailability.toString())
      formData.append("rating", parseFloat(editingRating).toString())
      formData.append("highlight", editingHighlight.toString())

      await dishService.update(dishId, formData)
      setEditingId(null)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to update dish")
    } finally {
      setUpdateLoading(null)
    }
  }

  const handleDelete = async (dishId: string) => {
    if (!confirm("Are you sure you want to delete this dish?")) return

    setDeleteLoading(dishId)
    setError("")

    try {
      await dishService.remove(dishId)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to delete dish")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setError("")
  }

  return (
    <div className="space-y-6">
      {/* Add Dish Form */}
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">Add New Dish</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Dish Name *</label>
              <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g., Margherita Pizza"
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Category *</label>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.cat_id} value={c.cat_id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="0.0"
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Dish description"
                className="w-full border rounded px-3 py-2 bg-background text-foreground min-h-[80px]"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Dish Image *</label>
              <div className="border-2 border-dashed rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setDishImage(file)
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setDishImagePreview(event.target?.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full"
                />
                {(dishImagePreview || dishImage) && (
                  <div className="mt-3">
                    <img
                      src={dishImagePreview || URL.createObjectURL(dishImage!)}
                      alt="Preview"
                      className="w-full max-h-40 object-cover rounded"
                    />
                    {dishImage && <p className="text-xs text-muted-foreground mt-2">{dishImage.name}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium">Available</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highlight}
                  onChange={(e) => setHighlight(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm font-medium">Highlight</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add Dish"}
          </button>
        </form>
      </div>

      {/* Dishes List Table */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dishes List</h3>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading dishes...</div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded bg-card p-4">
            No dishes found. Add one to get started!
          </div>
        ) : (
          <div className="border rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                    <th className="px-4 py-3 text-left font-semibold">Rating</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dishes.map((dish: Dish) => (
                    <tr key={dish.id} className="hover:bg-muted/50 transition">
                      {editingId === dish.id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editingDishName}
                              onChange={(e) => setEditingDishName(e.target.value)}
                              className="w-full border rounded px-2 py-1 bg-background text-foreground text-xs"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={editingCatId}
                              onChange={(e) => setEditingCatId(e.target.value)}
                              className="w-full border rounded px-2 py-1 bg-background text-foreground text-xs"
                            >
                              <option value="">Select</option>
                              {categories.map((c) => (
                                <option key={c.cat_id} value={c.cat_id}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={editingPrice}
                              onChange={(e) => setEditingPrice(e.target.value)}
                              className="w-20 border rounded px-2 py-1 bg-background text-foreground text-xs"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={editingRating}
                              onChange={(e) => setEditingRating(e.target.value)}
                              className="w-16 border rounded px-2 py-1 bg-background text-foreground text-xs"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <label className="flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={editingAvailability}
                                  onChange={(e) => setEditingAvailability(e.target.checked)}
                                  className="w-3 h-3 rounded"
                                />
                                <span className="text-xs">Avail</span>
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={editingHighlight}
                                  onChange={(e) => setEditingHighlight(e.target.checked)}
                                  className="w-3 h-3 rounded"
                                />
                                <span className="text-xs">High</span>
                              </label>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right space-x-1">
                            <button
                              onClick={(e) => handleUpdate(e, dish.id || "")}
                              disabled={updateLoading === dish.id}
                              className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-600 hover:bg-green-500/30 disabled:opacity-50"
                            >
                              {updateLoading === dish.id ? "..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-2 py-1 rounded text-xs border text-foreground hover:bg-muted"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {dish.dish_url && (
                                <img
                                  src={dish.dish_url}
                                  alt={dish.dish_name}
                                  className="w-8 h-8 rounded object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{dish.dish_name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{dish.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{catMap.get(dish.cat_id) || "Unknown"}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium">${dish.price.toFixed(2)}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{dish.rating > 0 ? `⭐ ${dish.rating}` : "—"}</p>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {dish.availability && (
                                <span className="text-xs bg-green-200/50 text-green-700 px-2 py-0.5 rounded">
                                  Available
                                </span>
                              )}
                              {dish.highlight && (
                                <span className="text-xs bg-amber-200/50 text-amber-700 px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right space-x-1">
                            <button
                              onClick={() => handleStartEdit(dish)}
                              className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(dish.id || "")}
                              disabled={deleteLoading === dish.id}
                              className="px-2 py-1 rounded text-xs bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                            >
                              {deleteLoading === dish.id ? "..." : "Delete"}
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
