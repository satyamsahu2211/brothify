"use client"
import type React from "react"
import AdminSidebar from "../../components/admin/sidebar"
import { useAuth } from "@/hooks/useAuth";
import LoginPage from "../login/page";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      {
        isAuthenticated ? <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[240px_1fr]">
          <AdminSidebar />
          <main className="p-4">{children}</main>
        </div>
          :
          <LoginPage />
      }
    </>
  )
}
