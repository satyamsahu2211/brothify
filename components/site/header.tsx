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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          Brothify
          <span className="sr-only">Brothify home</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group",
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full",
                pathname === item.href && "w-full"
              )} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/menu"
            className="rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  )
}
