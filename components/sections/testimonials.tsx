import Image from "next/image"

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl">What Our Customers Say</h2>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-brand/30 md:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-brand/30 shadow-lg transition-transform duration-300 hover:scale-105">
            <Image src="/images/testimonial-guest.jpg" alt="Happy customer" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-pretty leading-relaxed text-muted-foreground md:text-lg">
              "Brothify is a revelation. The flavors, the service, and the ambience are consistently excellent. I keep
              coming back for the whole wheat bread with avocado sauce."
            </p>
            <p className="mt-3 text-sm font-medium">
              Helena Kataria <span className="text-muted-foreground">— Student</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
