"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import useSWR from "swr"
import { endpoints } from "@/utils/url"

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/menu", label: "Menu" },
  { href: "/reservation", label: "Reservation" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { data: me } = useSWR<{ email?: string; role?: "admin" | "user" }>([])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          Brothify
          <span className="sr-only">Brothify home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm/6 font-medium text-muted-foreground hover:text-foreground transition-colors",
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/menu"
          className="rounded-md bg-brand px-4 py-2 text-brand-foreground shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          See Menu
        </Link>
        {/* {me?.role === "admin" ? (
          <Link
            href="/admin"
            className="ml-2 rounded-md border border-border bg-background/70 px-4 py-2 text-foreground shadow hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Admin
          </Link>
        ) : null} */}
      </div>
    </header>
  )
}
