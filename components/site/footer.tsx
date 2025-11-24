import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-lg">Brothify</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Fresh soups, shakes, and juices made with care.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">brothify@gmail.com</p>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-foreground transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="hover:text-foreground transition-colors">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-foreground transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Contact</h4>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>302 Cornelia St</li>
            <li>Brooklyn, NY 11238</li>
            <li className="mt-3 text-brand">Open: 10AM – 9PM</li>
          </ul>
          {/* <div className="mt-4 flex items-center gap-3 text-sm">
            <Link
              href="/admin"
              className="rounded-md border border-border/50 px-3 py-1.5 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-border/50 px-3 py-1.5 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Login
            </Link>
          </div> */}
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Brothify. All rights reserved.
      </div>
    </footer>
  )
}
