import Image from "next/image"

export const metadata = { title: "Blog — Brothify" }

const posts = [
  {
    title: "The Secrets to Perfect Curry Noodles",
    image: "/images/dishes/noodles-curry.jpg",
    excerpt: "Spices, bloom, and balance—our chef explains the method.",
  },
  {
    title: "5 Vegan Bowls That Actually Satisfy",
    image: "/images/dishes/veggie-bowl.jpg",
    excerpt: "Texture and protein make all the difference.",
  },
  {
    title: "Bread You Can Feel Good About",
    image: "/images/dishes/wholewheat-avocado.jpg",
    excerpt: "Whole grains with flavor—no compromise required.",
  },
]

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl">From Our Kitchen</h1>
        <p className="mt-2 text-muted-foreground">Stories, tips, and recipes from the Brothify team.</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-xl border border-border/50 bg-card/60">
            <div className="relative h-44 w-full">
              <Image src={p.image || "/placeholder.svg"} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
