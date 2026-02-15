"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/30 pt-16 pb-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
            Brothify
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Nourishing souls with fresh, organic soups, shakes, and juices. Crafted with care in Brooklyn.
          </p>
          <div className="mt-6 flex gap-4">
            {["twitter", "instagram", "facebook"].map((social) => (
              <a
                key={social}
                href={`#${social}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-brand hover:text-brand-foreground"
                aria-label={social}
              >
                <div className="h-4 w-4 bg-current" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-serif font-medium">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["About Us", "Careers", "Press", "Blog"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-brand transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif font-medium">Support</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Contact", "Terms of Service", "Privacy Policy", "Accessibility"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-brand transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif font-medium">Stay Updated</h4>
          <p className="mb-4 text-sm text-muted-foreground">
            Subscribe to our newsletter for seasonal menu updates and offers.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground shadow hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 border-t border-border/40 pt-8 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Brothify. All rights reserved.</p>
      </div>
    </footer>
  )
}
