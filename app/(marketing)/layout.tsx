import type React from "react"
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[800px] w-full bg-[radial-gradient(1200px_800px_at_50%_-20%,hsl(0_0%_100%_/_0.04),transparent_60%)]"
      />
      {children}
    </div>
  )
}
