"use client"

import { useState } from "react"
import useSWR from "swr"
import { userService } from "@/services/userService"
import { useRouter } from "next/navigation"
import { mockDb } from "@/lib/mock-db"

type User = {
  user_id: string
  name: string
  email: string
  phone?: string
  created_at?: string
  updated_at?: string
}

export function UsersManager() {
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")

  const { data: users = [], mutate, isLoading } = useSWR(
    "users",
    async () => {
      try {
        const response = await userService.list()
        return response.data?.data || []
      } catch (err: any) {
        console.error("Failed to fetch users, using mock data:", err)
        // Use mock data as fallback
        return mockDb.listUsers().map((u) => ({
          user_id: u.id,
          name: u.name || "Unknown",
          email: u.email,
          phone: "",
          created_at: new Date().toISOString(),
        }))
      }
    },
    { revalidateOnFocus: false }
  )

  const filteredUsers = users.filter((u: User) => {
    const q = query.toLowerCase()
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q))
    )
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    setDeleteLoading(id)
    setError("")

    try {
      await userService.remove(id)
      await mutate()
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/login")
        return
      }
      setError(err?.response?.data?.message || "Failed to delete user")
    } finally {
      setDeleteLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Users Management</h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {users.length === 0 ? "No users found" : "No users match your search"}
        </div>
      ) : (
        <div className="border rounded divide-y max-h-[800px] overflow-y-auto">
          {filteredUsers.map((user: User) => (
            <div key={user.user_id} className="p-4 hover:bg-muted/50 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-base">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                  {user.created_at && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  disabled={deleteLoading === user.user_id}
                  className="px-3 py-1.5 rounded text-sm bg-destructive/20 text-destructive hover:bg-destructive/30 disabled:opacity-50"
                >
                  {deleteLoading === user.user_id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
