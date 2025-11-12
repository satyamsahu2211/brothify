export function Services() {
  const items = [
    { title: "Online Order", desc: "Quick delivery to your door.", icon: "🚚" },
    { title: "24/7 Service", desc: "Open late on weekends.", icon: "🕒" },
    { title: "Reservation", desc: "Book your perfect table.", icon: "📅" },
    { title: "Fresh Taste Box", desc: "Meal boxes you'll love.", icon: "📦" },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl">We Have a Service That Can Satisfy You</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Uncompromising quality paired with convenient options so you can enjoy great food anytime.
        </p>
      </header>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <div
            key={s.title}
            className="group animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-border/50 bg-card/60 p-5 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
          >
            <div className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-110">{s.icon}</div>
            <h3 className="font-medium transition-colors group-hover:text-brand">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
