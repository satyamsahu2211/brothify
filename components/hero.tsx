import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_-20%,hsl(56_100%_50%_/_0.06),transparent_40%),radial-gradient(900px_700px_at_120%_10%,hsl(140_70%_50%_/_0.05),transparent_40%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div className="animate-in fade-in slide-in-from-left-6 duration-700 delay-150">
          <h1 className="text-balance font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Nourishing Soups, Made Fresh
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Comfort in every bowl. Explore our chef-crafted soup menu. Craving something cool? Try our fresh shakes and
            juices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="inline-flex items-center rounded-md bg-brand px-6 py-3 font-medium text-brand-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Soups
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center rounded-md border border-border bg-background/50 px-6 py-3 font-medium text-foreground backdrop-blur transition-all hover:bg-secondary/60 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Book a Table
            </Link>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-300">
          <div className="absolute -inset-4 rounded-2xl bg-brand/20 blur-2xl" aria-hidden />
          <Image
            src="/images/hero/young-girl-soups.jpg"
            width={840}
            height={840}
            alt="Young girl craving soups, shakes, and juices (transparent background)"
            className="relative mx-auto h-auto w-[90%] drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </div>
      </div>
    </section>
  )
}
