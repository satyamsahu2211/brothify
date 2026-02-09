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

export function DishCardView() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const { data: dishes = [], mutate, isLoading } = useSWR(
    "dishes-card-view",
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

  const { data: categoriesData = [] } = useSWR(
    "dish-card-categories",
    async () => {
      try {
        const response = await categoryService.list()
        return response.data?.data || []
      } catch (err: any) {
        console.error("Failed to fetch categories:", err)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  const displayedDishes = useMemo(() => dishes.slice(0, 3), [dishes])
  const catMap = useMemo(
    () => new Map((categoriesData as Category[]).map((c) => [c.cat_id, c.name])),
    [categoriesData]
  )

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Featured Dishes</h3>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            + Add New Dish
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading dishes...</div>
        ) : displayedDishes.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-card p-4 text-muted-foreground">
            No dishes yet. Click "+ Add New Dish" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedDishes.map((dish: Dish) => (
              <div
                key={dish.id}
                className="border rounded-lg bg-card overflow-hidden hover:shadow-md transition-shadow"
              >
                {dish.dish_url && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={dish.dish_url}
                      alt={dish.dish_name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-foreground line-clamp-1">{dish.dish_name}</h4>
                    <p className="text-lg font-bold text-primary">${dish.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{dish.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{catMap.get(dish.cat_id) || "—"}</span>
                    {dish.rating > 0 && <span>⭐ {dish.rating}</span>}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex-1 px-2 py-1 rounded text-sm bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <DishFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          categories={categoriesData as Category[]}
          onRefresh={() => mutate()}
        />
      )}
    </>
  )
}

function DishFormModal({
  isOpen,
  onClose,
  categories,
  onRefresh,
}: {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  onRefresh: () => void
}) {
  const router = useRouter()

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!dishName.trim() || !catId || !price || !description.trim()) {
      setError("Please fill in all required fields")
      return
    }

    if (!dishImage) {
      setError("Please upload an image")
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
      setDishName("")
      setCatId("")
      setPrice("")
      setDescription("")
      setDishImage(null)
      setDishImagePreview("")
      setAvailability(true)
      setRating("0")
      setHighlight(false)
      onRefresh()
      onClose()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to add dish")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b p-6 flex items-center justify-between sticky top-0 bg-background">
          <h2 className="text-xl font-semibold">Add New Dish</h2>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">Dish Name *</label>
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
                <label className="text-sm font-medium block mb-2">Category *</label>
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
                <label className="text-sm font-medium block mb-2">Price *</label>
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
                <label className="text-sm font-medium block mb-2">Rating</label>
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
                <label className="text-sm font-medium block mb-2">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Dish description"
                  className="w-full border rounded px-3 py-2 bg-background text-foreground min-h-[80px]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium block mb-2">Image *</label>
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
                  {dishImagePreview && (
                    <div className="mt-3">
                      <img
                        src={dishImagePreview}
                        alt="Preview"
                        className="w-full max-h-40 object-cover rounded"
                      />
                      {dishImage && <p className="text-xs text-muted-foreground mt-2">{dishImage.name}</p>}
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={highlight}
                    onChange={(e) => setHighlight(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Dish"}
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
