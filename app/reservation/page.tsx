export const metadata = { title: "Reservation — Brothify" }

export default function ReservationPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl">Book a Table</h1>
        <p className="mt-2 text-muted-foreground">Reserve your spot and we&apos;ll have everything ready.</p>
      </header>

      <form className="mx-auto mt-8 grid gap-4 rounded-xl border border-border/50 bg-card/60 p-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input id="name" className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="time" className="text-sm font-medium">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <button className="w-full rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110">
            Reserve
          </button>
        </div>
      </form>
    </main>
  )
}
