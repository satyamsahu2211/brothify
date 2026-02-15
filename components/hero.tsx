import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100/20 via-background to-background dark:from-yellow-900/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-green-100/20 via-transparent to-transparent dark:from-green-900/10"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6 animate-in fade-in slide-in-from-left-6 duration-700 delay-150">
          <div className="inline-flex items-center rounded-full border border-yellow-200/50 bg-yellow-50/50 px-3 py-1 text-sm font-medium text-yellow-800 backdrop-blur dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200">
            <span className="flex h-2 w-2 rounded-full bg-yellow-500 mr-2 animate-pulse" />
            New Seasonal Menu
          </div>
          <h1 className="text-balance font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Nourishing Soups, <span className="text-brand italic">Made Fresh</span>
          </h1>
          <p className="max-w-lg text-pretty text-lg text-muted-foreground md:text-xl">
            Comfort in every bowl. Explore our chef-crafted soup menu, made with organic ingredients/
            Craving something cool? Try our fresh shakes and juices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-8 font-medium text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Explore Menu
            </Link>
            <Link
              href="/reservation"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background/50 px-8 font-medium shadow-sm backdrop-blur transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book a Table
            </Link>
          </div>
        </div>

        <div className="relative isolate animate-in fade-in zoom-in-95 duration-700 delay-300">
          <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-yellow-200/40 to-green-200/40 opacity-70 blur-3xl dark:from-yellow-900/20 dark:to-green-900/20" />
          <Image
            src="/images/hero/young-girl-soups.jpg"
            width={840}
            height={840}
            alt="Young girl enjoying fresh soups"
            className="w-full rotate-3 rounded-2xl border-8 border-background/50 object-cover shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
            priority
          />
          {/* Decorative floating elements */}
          <div className="absolute -bottom-8 -left-8 animate-float delay-700 rounded-xl bg-card/80 p-4 shadow-xl backdrop-blur border border-border/50 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                🌿
              </div>
              <div>
                <p className="text-sm font-semibold">100% Organic</p>
                <p className="text-xs text-muted-foreground">Locally sourced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
