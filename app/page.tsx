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
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src="/images/soups/ramen-soup.jpg"
            alt="Steam rising from a hearty ramen soup bowl"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 z-20 text-white">
            <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground mb-2">
              Chef's Special
            </span>
            <h3 className="font-serif text-2xl font-bold">Spiced Tomato Basil Soup</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl">Handcrafted with Love</h2>
            <p className="text-muted-foreground text-lg">
              Every bowl tells a story of tradition, patience, and the finest local ingredients.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              "Sun-ripened tomatoes and fresh basil",
              "Slow-simmered for deep, layered flavor",
              "Comforting finish with a silky texture",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div>
            <a
              href="/menu"
              className="inline-block border-b-2 border-brand font-medium text-foreground hover:text-brand transition-colors"
            >
              Learn about our ingredients
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-16">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Everything we offer to keep you satisfied—from dine-in to delivery.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Dine-In",
              desc: "Experience our warm atmosphere with comfortable seating and friendly staff.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
              )
            },
            {
              title: "Express Delivery",
              desc: "Fast, tracked delivery with eco-friendly packaging that keeps food hot.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><path d="M2 14h2" /><path d="M22 14h-2" /><path d="M15 2v20" /><path d="M2 10v12" /></svg>
              )
            },
            {
              title: "Catering",
              desc: "Custom menus for events, meetings, and parties of any size.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h18" /><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /><path d="M12 2v20" /></svg>
              )
            },
            {
              title: "Online Reservation",
              desc: "Book tables easily for any occasion through our website or app.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              )
            },
            {
              title: "Meal Boxes",
              desc: "Balanced, nutritious meal boxes perfect for busy work days.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
              )
            },
            {
              title: "Private Dining",
              desc: "Intimate, dedicated spaces for celebrations and special moments.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
              )
            },
          ].map((service, i) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border/40 bg-card/40 p-8 transition-all hover:bg-card hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                {service.icon}
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
    </main>
  )
}
