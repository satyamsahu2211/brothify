"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

type Item = {
  id: string
  name: string
  category: "Soup" | "Shake" | "Juice"
  price: number
  available: boolean
}

const STORAGE_KEY = "brothify_items"
const uid = () => Math.random().toString(36).slice(2, 10)

export default function EditItemPage() {
  const router = useRouter()
  const params = useSearchParams()
  const id = params.get("id")
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  const current = useMemo(() => items.find((i) => i.id === id), [items, id])

  const [name, setName] = useState("")
  const [category, setCategory] = useState<Item["category"]>("Soup")
  const [price, setPrice] = useState(0)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (saved) {
      try {
        const list = JSON.parse(saved) as Item[]
        setItems(list)
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

  useEffect(() => {
    if (!loading) {
      setName(current?.name ?? "")
      setCategory((current?.category as Item["category"]) ?? "Soup")
      setPrice(current?.price ?? 0)
      setAvailable(current?.available ?? true)
    }
  }, [loading, current])

  const onSave = () => {
    const next: Item = {
      id: current?.id ?? uid(),
      name: name.trim() || "Untitled",
      category,
      price: Number.isFinite(price) ? price : 0,
      available,
    }
    const updated = current ? items.map((i) => (i.id === next.id ? next : i)) : [next, ...items]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    router.push("/admin/items")
  }

  if (loading) return <div className="p-4">Loading…</div>

  return (
    <main className="p-4 space-y-4 max-w-xl">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{current ? "Edit Item" : "Add Item"}</h1>
        <Link href="/admin/items" className="text-brand hover:underline">
          Back to list
        </Link>
      </header>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm">Name</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm">Category</span>
          <select
            className="border rounded px-3 py-2 bg-background"
            value={category}
            onChange={(e) => setCategory(e.target.value as Item["category"])}
          >
            <option>Soup</option>
            <option>Shake</option>
            <option>Juice</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm">Price</span>
          <input
            type="number"
            className="border rounded px-3 py-2 bg-background"
            value={price}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
          <span className="text-sm">Available</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="inline-flex items-center rounded px-3 py-2 bg-primary text-primary-foreground"
        >
          Save
        </button>
        <Link href="/admin/items" className="inline-flex items-center rounded px-3 py-2 bg-muted">
          Cancel
        </Link>
      </div>
    </main>
  )
}
