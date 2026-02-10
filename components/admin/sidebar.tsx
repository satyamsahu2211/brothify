"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'

const AdminSidebar = () => {
    const { user, logout } = useAuth()

    return (
        <aside className="border-r bg-background p-4 flex flex-col">
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Admin</h2>
                {user && <p className="text-sm text-muted-foreground">{user.email}</p>}
            </div>
            <nav className="flex flex-col gap-2 flex-1">
                <Link href="/admin" className="text-foreground/80 hover:text-foreground">
                    Dashboard
                </Link>
                <Link href="/admin/items" className="text-foreground/80 hover:text-foreground">
                    Items
                </Link>
                    <Link href="/admin/categories" className="text-foreground/80 hover:text-foreground">
                    Category
                </Link>
                <Link href="/admin/reservations" className="text-foreground/80 hover:text-foreground">
                    Reservations
                </Link>
                <Link href="/admin/feedback" className="text-foreground/80 hover:text-foreground">
                    Feedback
                </Link>
            </nav>
            {user && (
                <button
                    onClick={logout}
                    className="w-full rounded-md border border-border bg-background/70 px-4 py-2 shadow hover:bg-secondary/70 text-sm font-medium"
                >
                    Logout
                </button>
            )}
        </aside>
    )
}

export default AdminSidebar