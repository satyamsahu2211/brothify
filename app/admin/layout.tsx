"use client"
import type React from "react"
import AdminSidebar from "../../components/admin/sidebar"
import { useEffect, useState } from "react";
import LoginPage from "../login/page";
export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <>
      {
        user ? <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[240px_1fr]">
          <AdminSidebar />
          <main className="p-4">{children}</main>
        </div>
          :
          <LoginPage />
      }
    </>
  )
}
