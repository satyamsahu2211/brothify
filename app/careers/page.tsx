import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers — Brothify",
  description: "Join our team and help us create exceptional food experiences.",
}

export default function CareersPage() {
  const openings = [
    {
      title: "Line Cook",
      type: "Full-time",
      location: "Brooklyn, NY",
      description: "Prepare high-quality dishes in a fast-paced kitchen environment.",
    },
    {
      title: "Server",
      type: "Part-time",
      location: "Brooklyn, NY",
      description: "Provide excellent service and create memorable dining experiences.",
    },
    {
      title: "Sous Chef",
      type: "Full-time",
      location: "Brooklyn, NY",
      description: "Support kitchen operations and mentor junior staff.",
    },
  ]

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl">Careers at Brothify</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Join a team passionate about great food and exceptional service.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="mb-6 font-serif text-2xl">Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, i) => (
            <article
              key={job.title}
              className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-border/50 bg-card/60 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand/30"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl text-foreground">{job.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {job.type} · {job.location}
                  </p>
                </div>
                <a
                  href={`mailto:careers@Brothify.com?subject=Application for ${job.title}`}
                  className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow transition-all hover:scale-105 hover:shadow-lg"
                >
                  Apply Now
                </a>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{job.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border/50 bg-card/60 p-8 text-center shadow-lg">
        <h2 className="font-serif text-2xl">Don't see the right role?</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          We're always looking for talented people. Send your resume to{" "}
          <a href="mailto:careers@Brothify.com" className="font-medium text-brand hover:underline">
            careers@Brothify.com
          </a>
        </p>
      </section>
    </main>
  )
}
