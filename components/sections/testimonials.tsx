import Image from "next/image"

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="font-serif text-3xl md:text-5xl">What Our Customers Say</h2>
        <p className="mt-4 text-muted-foreground">Don't just take our word for it—hear from our broth lovers.</p>
      </header>

      <div className="mx-auto max-w-4xl relative">
        <div className="absolute -left-4 -top-4 text-6xl text-brand/20 font-serif">"</div>
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-xl">
              <Image
                src="/images/testimonial-guest.jpg"
                alt="Happy customer"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-center md:justify-start gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p className="text-xl font-medium leading-relaxed italic text-foreground md:text-2xl">
                Brothify is a revelation. The flavors, the service, and the ambience are consistently excellent. I keep
                coming back for the whole wheat bread with avocado sauce.
              </p>
              <div>
                <h4 className="font-serif text-lg font-bold">Helena Kataria</h4>
                <p className="text-sm text-muted-foreground">Food Critic & Blogger</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 text-6xl text-brand/20 font-serif rotate-180">"</div>
      </div>
    </section>
  )
}
