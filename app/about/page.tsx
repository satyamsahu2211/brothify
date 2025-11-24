import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us — Brothify",
  description: "Learn about our story, mission, and commitment to fresh, healthy food.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl">About Brothify</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Fresh ingredients, authentic recipes, and unforgettable taste.
        </p>
      </header>

      <div className="mt-12 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Our Story</h2>
          <p>
            Brothify was founded in 2018 with a simple mission: to bring fresh, healthy, and flavorful meals to everyone.
            What started as a small neighborhood kitchen has grown into a beloved destination for food lovers seeking
            quality and authenticity.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Our Philosophy</h2>
          <p>
            We believe great food starts with great ingredients. Every dish is prepared fresh daily using seasonal
            produce from local farms. Our chefs combine traditional techniques with modern creativity to craft meals
            that nourish both body and soul.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Sustainability</h2>
          <p>
            We're committed to sustainable practices—from sourcing ingredients responsibly to minimizing waste. Our
            packaging is eco-friendly, and we partner with local suppliers who share our values.
          </p>
        </section>

        <div className="relative mt-12 h-64 overflow-hidden rounded-xl border border-border/50 shadow-2xl md:h-96">
          <Image
            src="/images/dishes/wholewheat-avocado.jpg"
            alt="Fresh ingredients on a wooden table"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  )
}
