import { RecipeFilters } from "@/components/filters/recipe-filters"
import { recipes } from "@/lib/recipes"

export const metadata = { title: "Menu — YoFood" }

export default function MenuPage() {
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
