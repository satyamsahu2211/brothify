import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — Brothify",
  description: "Terms and conditions for using Brothify services.",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: January 1, 2025</p>
      </header>

      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Acceptance of Terms</h2>
          <p>
            By accessing or using Brothify's services, you agree to be bound by these Terms of Service. If you do not
            agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Use of Services</h2>
          <p>
            You must be at least 18 years old to place orders. You agree to provide accurate information and are
            responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Orders and Payments</h2>
          <p>
            All orders are subject to acceptance and availability. Prices are subject to change without notice. Payment
            is due at the time of order. We accept major credit cards and other payment methods as indicated on our
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Cancellations and Refunds</h2>
          <p>
            Orders may be cancelled within 5 minutes of placement. After preparation begins, cancellations may not be
            possible. Refunds are issued at our discretion for valid reasons such as order errors or quality issues.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Limitation of Liability</h2>
          <p>
            Brothify is not liable for any indirect, incidental, or consequential damages arising from your use of our
            services. Our total liability is limited to the amount paid for the relevant order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services after changes
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Contact Us</h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
            <a href="mailto:legal@Brothify.com" className="font-medium text-brand hover:underline">
              legal@Brothify.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
