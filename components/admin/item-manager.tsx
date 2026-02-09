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

export function ItemManager() {
  const router = useRouter()

  const { data: categoriesData = [] } = useSWR(
    "item-categories",
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
    "items",
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
    setEditingId(null)
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dishName.trim() || !catId || !price || !description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    if (!editingId && !dishImage) {
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
      
      // Append file if selected
      if (dishImage) {
        formData.append("dish_url", dishImage)
      }
      
      formData.append("availability", availability.toString())
      formData.append("rating", parseFloat(rating).toString())
      formData.append("highlight", highlight.toString())

      if (editingId) {
        await dishService.update(editingId, formData)
      } else {
        await dishService.create(formData)
      }

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

  const handleEdit = (dish: Dish) => {
    setEditingId(dish.id || "")
    setDishName(dish.dish_name)
    setCatId(dish.cat_id)
    setPrice(dish.price.toString())
    setDescription(dish.description)
    setDishImage(null)
    setDishImagePreview(dish.dish_url || "")
    setAvailability(dish.availability)
    setRating(dish.rating.toString())
    setHighlight(dish.highlight)
    setError("")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dish?")) return

    setDeleteLoading(id)
    setError("")

    try {
      await dishService.remove(id)
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dishes Management</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-card">
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
                className="w-full border rounded px-3 py-2 bg-background text-foreground min-h-[100px]"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Dish Image {!editingId && "*"}</label>
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

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
            >
              {submitting ? "Saving..." : editingId ? "Update Dish" : "Add Dish"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded border text-foreground"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dishes List</h3>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading dishes...</div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No dishes found</div>
        ) : (
          <div className="border rounded divide-y max-h-[600px] overflow-y-auto">
            {dishes.map((dish: Dish) => (
              <div key={dish.id} className="p-4 flex items-start justify-between hover:bg-muted/50 transition">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{dish.dish_name}</p>
                    {dish.highlight && <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Highlight</span>}
                    {!dish.availability && <span className="text-xs bg-gray-200 text-gray-900 px-2 py-0.5 rounded">Unavailable</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {catMap.get(dish.cat_id) || "Unknown"} • ${dish.price.toFixed(2)}
                    {dish.rating > 0 && ` • ⭐ ${dish.rating}`}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{dish.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(dish)}
                    className="px-3 py-1.5 rounded text-sm bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dish.id || "")}
                    disabled={deleteLoading === dish.id}
                    className="px-3 py-1.5 rounded text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                  >
                    {deleteLoading === dish.id ? "Deleting..." : "Delete"}
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
