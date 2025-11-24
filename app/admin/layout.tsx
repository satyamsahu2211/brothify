import type React from "react"
import AdminSidebar from "../../components/admin/sidebar"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <main className="p-4">{children}</main>
    </div>
  )
}
