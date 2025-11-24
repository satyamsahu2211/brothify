import Link from 'next/link'
import React from 'react'

const AdminSidebar = () => {
    return (
        <aside className="border-r bg-background p-4">
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Admin</h2>
                {/* <p className="text-sm text-muted-foreground">{user.email}</p> */}
            </div>
            <nav className="flex flex-col gap-2">
                <Link href="/admin" className="text-foreground/80 hover:text-foreground">
                    Dashboard
                </Link>
                <Link href="/admin/items" className="text-foreground/80 hover:text-foreground">
                    Items
                </Link>
                <Link href="/admin/reservations" className="text-foreground/80 hover:text-foreground">
                    Reservations
                </Link>
            </nav>
        </aside>)
}

export default AdminSidebar