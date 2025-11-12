import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press — YoFood",
  description: "Media resources, press releases, and contact information for YoFood.",
}

export default function PressPage() {
  const releases = [
    {
      date: "March 15, 2025",
      title: "YoFood Launches New Spring Menu",
      excerpt: "Featuring seasonal ingredients and innovative plant-based options.",
    },
    {
      date: "January 8, 2025",
      title: "YoFood Named Brooklyn's Best Healthy Eatery",
      excerpt: "Local publication honors YoFood for fresh, sustainable dining.",
    },
    {
      date: "November 20, 2024",
      title: "YoFood Expands Delivery Service",
      excerpt: "Now serving wider Brooklyn area with same-day delivery.",
    },
  ]

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl">Press & Media</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          News, updates, and media resources for YoFood.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="mb-6 font-serif text-2xl">Recent Press Releases</h2>
        <div className="space-y-4">
          {releases.map((item, i) => (
            <article
              key={item.title}
              className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-border/50 bg-card/60 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
            >
              <time className="text-xs font-medium text-brand">{item.date}</time>
              <h3 className="mt-2 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border/50 bg-card/60 p-8 shadow-lg">
        <h2 className="mb-4 font-serif text-2xl">Media Contact</h2>
        <p className="leading-relaxed text-muted-foreground">
          For press inquiries, interviews, or media resources, please contact:
        </p>
        <p className="mt-3">
          <a href="mailto:press@yofood.com" className="font-medium text-brand hover:underline">
            press@yofood.com
          </a>
        </p>
      </section>
    </main>
  )
}
