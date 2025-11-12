import { Hero } from "@/components/hero"
import { MenuCard } from "@/components/menu-card"
import { Testimonials } from "@/components/sections/testimonials"

export default function HomePage() {
  const previewMenu = [
    {
      title: "Classic Tomato Basil Soup",
      price: 8,
      image: "/images/soups/tomato-basil-soup.jpg",
      caption: "Slow-simmered tomatoes, basil, a touch of cream.",
    },
    {
      title: "Creamy Pumpkin Soup",
      price: 9,
      image: "/images/soups/creamy-pumpkin-soup.jpg",
      caption: "Velvety roasted pumpkin with warm spices.",
    },
    {
      title: "Hearty Ramen Soup",
      price: 12,
      image: "/images/soups/ramen-soup.jpg",
      caption: "Rich broth with noodles and fresh toppings.",
    },
    {
      title: "Minestrone Vegetable Soup",
      price: 10,
      image: "/images/soups/minestrone-soup.jpg",
      caption: "Comforting Italian-style veggie and bean soup.",
    },
  ]

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl">Try Our New Soup Menu</h2>
          <p className="mt-2 text-muted-foreground">Soul-warming bowls made with seasonal produce and bold flavors.</p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {previewMenu.map((m) => (
            <MenuCard key={m.title} {...m} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/menu"
            className="inline-block rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110"
          >
            See All
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2">
        <div className="relative">
          <img
            src="/images/soups/ramen-soup.jpg"
            alt="Steam rising from a hearty ramen soup bowl"
            className="h-auto w-full rounded-xl border border-border/50 object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-3xl">Spiced Tomato Basil Soup</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Sun-ripened tomatoes and fresh basil</li>
            <li>Slow-simmered for deep, layered flavor</li>
            <li>Comforting finish with a silky texture</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl">Our Full Services</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Everything we offer to keep you satisfied—from dine-in to delivery.
          </p>
        </header>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["Dine-In", "Comfortable seating and friendly staff."],
            ["Delivery", "Fast delivery with eco-friendly packaging."],
            ["Catering", "Custom menus for events and meetings."],
            ["Reservation", "Book tables for any occasion."],
            ["Meal Boxes", "Balanced boxes for busy days."],
            ["Private Dining", "Intimate space for celebrations."],
          ].map(([title, desc]) => (
            <div key={title as string} className="rounded-xl border border-border/50 bg-card/60 p-6">
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
