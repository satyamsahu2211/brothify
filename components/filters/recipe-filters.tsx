"use client"

import { useMemo, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import useSWR from "swr"
import { categoryService } from "@/services/categoryService"

export type Recipe = {
  id: string
  title: string
  price: number
  category: string
  image: string
  vegan?: boolean
  spicy?: boolean
}

type Category = {
  cat_id: string
  name: string
  description: string
}

export function RecipeFilters({ recipes }: { recipes: Recipe[] }) {
  const { data: categoriesData = [] } = useSWR(
    "filter-categories",
    async () => {
      try {
        const response = await categoryService.list()
        return response.data?.data || []
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        return []
      }
    },
    { revalidateOnFocus: false }
  )

  const categories = useMemo(() => {
    const apiCategories = categoriesData.map((c: Category) => c.name)
    return ["All", ...apiCategories]
  }, [categoriesData])

  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("All")
  const [vegan, setVegan] = useState(false)
  const [spicy, setSpicy] = useState(false)
  const [maxPrice, setMaxPrice] = useState(40)

  const filtered = recipes.filter((r) => {
    const matchQ = r.title.toLowerCase().includes(query.toLowerCase())
    const matchC = cat === "All" ? true : r.category === cat
    const matchV = vegan ? r.vegan : true
    const matchS = spicy ? r.spicy : true
    const matchP = r.price <= maxPrice
    return matchQ && matchC && matchV && matchS && matchP
  })

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <aside className="rounded-xl border border-border/50 bg-card/60 p-5 shadow-lg backdrop-blur lg:sticky lg:top-20 lg:self-start">
        <h2 className="mb-4 font-serif text-xl">Filters</h2>
        <div>
          <label htmlFor="search" className="text-sm font-medium">
            Search
          </label>
          <input
            id="search"
            placeholder="Find a dish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium">Category</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  c === cat
                    ? "border-brand bg-brand/15 text-brand shadow-sm"
                    : "border-border/50 text-muted-foreground hover:border-brand/50 hover:text-foreground hover:bg-brand/5",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm transition-colors hover:text-foreground">
            <input
              type="checkbox"
              checked={vegan}
              onChange={(e) => setVegan(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-border text-brand transition-colors focus:ring-2 focus:ring-brand/20 focus:ring-offset-2"
            />
            <span>Vegan only</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm transition-colors hover:text-foreground">
            <input
              type="checkbox"
              checked={spicy}
              onChange={(e) => setSpicy(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-border text-brand transition-colors focus:ring-2 focus:ring-brand/20 focus:ring-offset-2"
            />
            <span>Spicy only</span>
          </label>
          <div>
            <label htmlFor="price" className="text-sm font-medium">
              Max price: <span className="text-brand">${maxPrice}</span>
            </label>
            <input
              id="price"
              type="range"
              min={5}
              max={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-brand"
            />
          </div>
        </div>
      </aside>

      <main className="lg:col-span-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card/60 p-8 text-center">
            <p className="text-muted-foreground">No dishes match your filters. Try adjusting them!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r, i) => (
              <div
                key={r.id}
                className="group animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-border/50 bg-card/60 p-4 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-brand/30"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards" }}
              >
                <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border/50">
                  <img
                    src={r.image || "/placeholder.svg"}
                    alt={r.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium leading-snug transition-colors group-hover:text-brand">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.category}</p>
                  </div>
                  <span className="flex-shrink-0 rounded-md bg-brand/10 px-2 py-1 text-sm font-medium text-brand transition-colors group-hover:bg-brand/20">
                    ${r.price}
                  </span>
                </div>
                {(r.vegan || r.spicy) && (
                  <div className="mt-2 flex gap-2 text-xs">
                    {r.vegan && <span className="rounded bg-green/15 px-2 py-0.5 font-medium text-green">Vegan</span>}
                    {r.spicy && <span className="rounded bg-red/15 px-2 py-0.5 font-medium text-red">Spicy</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
