"use client"

import useSWR from "swr"
import { api } from "@/services/base-service"
import { endpoints } from "@/utils/url"

export default function AdminOrdersPage() {
  const { data } = useSWR(endpoints.orders, api.get)

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="rounded-md border divide-y">
        {(data?.orders || []).map((o: any) => (
          <div key={o.id} className="p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">Order #{o.id}</p>
              <p className="text-sm text-muted-foreground">${o.total}</p>
            </div>
            <p className="text-sm text-muted-foreground">Status: {o.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
