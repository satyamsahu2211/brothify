export const metadata = { title: "Contact — Brothify" }

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-serif text-4xl">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">We love hearing from you.</p>
      </header>

      <form className="mx-auto mt-8 grid gap-4 rounded-xl border border-border/50 bg-card/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        <button className="rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110">
          Send
        </button>
      </form>
    </main>
  )
}
