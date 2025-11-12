export const metadata = { title: "Services — YoFood" }

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl">Our Services</h1>
        <p className="mt-2 text-muted-foreground">
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
          <div key={title} className="rounded-xl border border-border/50 bg-card/60 p-6">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
