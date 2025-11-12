"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

type Item = {
  id: string
  name: string
  category: "Soup" | "Shake" | "Juice"
  price: number
  available: boolean
}

const STORAGE_KEY = "brothify_items"
const uid = () => Math.random().toString(36).slice(2, 10)

export default function AdminItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  // seed from localStorage or JSON file
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      try {
        setItems(JSON.parse(saved) as Item[])
        setLoading(false)
        return
      } catch {}
    }
    ;(async () => {
      try {
        const res = await fetch("/data/items.json")
        const data = (await res.json()) as Item[]
        setItems(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(
    () =>
      items.filter((i) => [i.name, i.category, String(i.price)].join(" ").toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  function remove(id: string) {
    const next = items.filter((i) => i.id !== id)
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  if (loading) return <div className="p-4">Loading…</div>

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Items</h1>
        <Link href="/admin/items/edit" className="rounded-md bg-primary px-3 py-2 text-primary-foreground">
          Add Item
        </Link>
      </header>

      <div className="flex items-center gap-2">
        <input
          className="px-3 py-2 rounded-md border bg-background w-full md:w-80"
          placeholder="Search items…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="divide-y rounded-md border">
        {filtered.map((it) => (
          <li key={it.id} className="p-3 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">{it.name}</p>
              <p className="text-sm text-muted-foreground">
                {it.category} • ₹{it.price} • {it.available ? "Available" : "Unavailable"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/items/edit?id=${it.id}`}
                className="text-sm rounded-md border px-2 py-1 hover:bg-accent hover:text-accent-foreground"
              >
                Edit
              </Link>
              <button className="text-sm text-red-600 hover:underline" onClick={() => remove(it.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="p-4 text-sm text-muted-foreground">No items match your search.</li>
        ) : null}
      </ul>
    </section>
  )
}
