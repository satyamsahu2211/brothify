"use client"

import useSWR from "swr"
import { api } from "@/services/base-service"
import { endpoints } from "@/utils/url"

export default function AdminCategoriesPage() {
  const { data, mutate } = useSWR(endpoints.categories, api.get)

  async function createDefault() {
    await api.post(endpoints.categories, {
      categories: ["Soups", "Shakes", "Juices"],
    })
    mutate()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
        <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground" onClick={createDefault}>
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
