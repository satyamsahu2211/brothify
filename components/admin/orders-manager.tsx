"use client"

import useSWR from "swr"
import { api } from "@/services/base-service"
import { endpoints } from "@/utils/url"
import { useMemo } from "react"

type User = { id: string; email: string; name?: string }
type Item = { id: string; name: string; price: number }
type Order = {
  id: string
  userId: string
  itemIds: string[]
  total: number
  status: "pending" | "paid" | "preparing" | "completed"
  createdAt: string
}

const fetcher = (path: string) => api.get(path)

export function OrdersManager() {
  const { data: orders } = useSWR<Order[]>(endpoints.orders, fetcher)
  const { data: users } = useSWR<User[]>(endpoints.users, fetcher)
  const { data: items } = useSWR<Item[]>(endpoints.items, fetcher)

  const userMap = useMemo(() => new Map((users || []).map((u) => [u.id, u])), [users])
  const itemMap = useMemo(() => new Map((items || []).map((i) => [i.id, i])), [items])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Orders</h3>
      <div className="border rounded divide-y">
        {(orders || []).map((o) => {
          const u = userMap.get(o.userId)
          const names = o.itemIds.map((id) => itemMap.get(id)?.name || "Item").join(", ")
          return (
            <div key={o.id} className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Order #{o.id.slice(-6)}</p>
                <span className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm">User: {u?.email || "Unknown"}</p>
              <p className="text-sm">Items: {names}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">Total: ${o.total.toFixed(2)}</p>
                <p className="text-sm capitalize">Status: {o.status}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
