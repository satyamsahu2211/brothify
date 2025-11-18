"use client"

import useSWR from "swr"
import { endpoints } from "@/utils/url"

export default function AdminCategoriesPage() {
  const { data, mutate } = useSWR([])

  

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
        <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground">
          Create Default
        </button>
      </div>
      <ul className="list-disc pl-5">
        {(data?.categories || []).map((c: string) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  )
}
