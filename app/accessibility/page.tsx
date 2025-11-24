import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility — Brothify",
  description: "Our commitment to making Brothify accessible to everyone.",
}

export default function AccessibilityPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl">Accessibility Statement</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: January 1, 2025</p>
      </header>

      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Our Commitment</h2>
          <p>
            Brothify is committed to ensuring digital accessibility for people with disabilities. We are continually
            improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Measures to Support Accessibility</h2>
          <p>Brothify takes the following measures to ensure accessibility:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Include accessibility as part of our mission statement</li>
            <li>Integrate accessibility into our procurement practices</li>
            <li>Provide continual accessibility training for our staff</li>
            <li>Employ formal accessibility quality assurance methods</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Conformance Status</h2>
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain
            how to make web content more accessible for people with disabilities.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Physical Accessibility</h2>
          <p>Our Brooklyn location features:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Wheelchair-accessible entrance and restrooms</li>
            <li>Wide aisles and accessible seating options</li>
            <li>Clear signage with high contrast text</li>
            <li>Assistance available upon request</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of Brothify. Please let us know if you encounter accessibility
            barriers:
          </p>
          <p className="mt-3">
            Email:{" "}
            <a href="mailto:accessibility@Brothify.com" className="font-medium text-brand hover:underline">
              accessibility@Brothify.com
            </a>
          </p>
          <p className="mt-1">Phone: (718) 555-0123</p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Technical Specifications</h2>
          <p>
            Accessibility of Brothify relies on the following technologies to work with the particular combination of web
            browser and any assistive technologies or plugins installed on your computer: HTML, CSS, JavaScript.
          </p>
        </section>
      </div>
    </main>
  )
}
