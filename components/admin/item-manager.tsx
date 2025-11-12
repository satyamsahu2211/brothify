"use client"

import type React from "react"

import useSWR from "swr"
import { api } from "@/services/base-service"
import { endpoints } from "@/utils/url"
import { useMemo, useState } from "react"

type Category = { id: string; name: string }
type Item = { id: string; name: string; categoryId: string; price: number; description?: string }

const fetcher = (path: string) => api.get(path)

export function ItemManager() {
  const { data: categories } = useSWR<Category[]>(endpoints.categories, fetcher)
  const { data: items, mutate } = useSWR<Item[]>(endpoints.items, fetcher)

  const [name, setName] = useState("")
  const [price, setPrice] = useState<string>("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [description, setDescription] = useState("")

  const catMap = useMemo(() => new Map((categories || []).map((c) => [c.id, c.name])), [categories])

  async function onAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !categoryId) return
    await api.post(endpoints.items, {
      name,
      categoryId,
      price: Number.parseFloat(price || "0") || 0,
      description,
    })
    setName("")
    setPrice("")
    setCategoryId("")
    setDescription("")
    mutate()
  }

  async function onDelete(id: string) {
    await api.delete(`${endpoints.items}/${id}`)
    mutate()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Items</h3>

      <form onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          className="border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 bg-background text-foreground"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select category</option>
          {(categories || []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          className="border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="md:col-span-4 border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="md:col-span-4">
          <button className="px-3 py-2 rounded bg-primary text-primary-foreground">Add Item</button>
        </div>
      </form>

      <div className="border rounded divide-y">
        {(items || []).map((it) => (
          <div key={it.id} className="p-3 flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">
                {it.name} — ${it.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {catMap.get(it.categoryId) || "Unknown"} {it.description ? `• ${it.description}` : ""}
              </p>
            </div>
            <button
              onClick={() => onDelete(it.id)}
              className="px-2 py-1 rounded bg-destructive text-destructive-foreground"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
