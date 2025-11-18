"use client"

import type React from "react"

import useSWR from "swr"
import { endpoints } from "@/utils/url"
import { useState } from "react"

type Category = { id: string; name: string }


export function CategoryManager() {
  const { data, mutate, isLoading, error } = useSWR<Category[]>([])
  const [name, setName] = useState("")


  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categories</h3>
      <form  className="flex items-center gap-2">
        <input
          aria-label="Category name"
          className="border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Add category (e.g. Soups)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="px-3 py-2 rounded bg-primary text-primary-foreground">Add</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Failed to load</p>}

      <ul className="divide-y border rounded">
        {(data || []).map((c) => (
          <li key={c.id} className="p-3">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
