"use client"

import type React from "react"

import useSWR from "swr"
import { endpoints } from "@/utils/url"
import { useState } from "react"

type User = { id: string; email: string; name?: string }


export function UsersManager() {
  const { data: users, mutate } = useSWR<User[]>([])

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")




  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Users</h3>
      <form  className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          className="border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 bg-background text-foreground"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <button className="px-3 py-2 rounded bg-primary text-primary-foreground">Add User</button>
        </div>
      </form>

      <div className="border rounded divide-y">
        {(users || []).map((u) => (
          <div key={u.id} className="p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{u.email}</p>
              {u.name && <p className="text-sm text-muted-foreground">{u.name}</p>}
            </div>
            <button
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
