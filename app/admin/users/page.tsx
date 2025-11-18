"use client"

import useSWR from "swr"
import { useState } from "react"
import { endpoints } from "@/utils/url"

export default function AdminUsersPage() {
  const { data, mutate } = useSWR([])
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"admin" | "user">("user")


  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">Users</h1>
      <div className="flex items-center gap-2">
        <input
          className="px-2 py-1 rounded-md border bg-background"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="px-2 py-1 rounded-md border bg-background"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="px-3 py-2 rounded-md bg-primary text-primary-foreground">
          Add
        </button>
      </div>
      <ul className="divide-y rounded-md border">
        {(data?.users || []).map((u: any) => (
          <li key={u.id} className="p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{u.email}</p>
              <p className="text-sm text-muted-foreground">{u.role}</p>
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={async () => {
                
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
