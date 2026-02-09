"use client"

import { RecipeFilters } from "@/components/filters/recipe-filters"
import useSWR from "swr"
import { dishService } from "@/services/dishService"
import { useMemo } from "react"

export default function MenuPage() {
  const { data: dishesData = [], isLoading } = useSWR(
    "menu-dishes",
    async () => {
      try {
        const response = await dishService.list()
        return response.data?.data || []
      } catch (error) {
        console.error("Failed to fetch dishes:", error)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  // Transform API dishes to Recipe format for RecipeFilters
  const recipes = useMemo(() => {
    return dishesData.map((dish: any) => ({
      id: dish.id,
      title: dish.dish_name,
      price: dish.price,
      category: dish.cat_name || "Uncategorized",
      image: dish.dish_url || "/placeholder.svg",
      vegan: dish.vegan || false,
      spicy: dish.spicy || false,
    }))
  }, [dishesData])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl">Choose Our Menu</h1>
          <p className="mt-2 text-muted-foreground">
            Filter by category, diet, spice, and price to discover your next favorite dish.
          </p>
        </header>
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl">Choose Our Menu</h1>
        <p className="mt-2 text-muted-foreground">
          Filter by category, diet, spice, and price to discover your next favorite dish.
        </p>
      </header>
      <RecipeFilters recipes={recipes} />
    </main>
  )
}
