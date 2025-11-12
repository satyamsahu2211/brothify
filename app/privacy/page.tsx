import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — YoFood",
  description: "Learn how YoFood collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: January 1, 2025</p>
      </header>

      <div className="space-y-6 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, place an order, or
            contact customer support. This may include your name, email address, phone number, delivery address, and
            payment information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Send you promotional materials (with your consent)</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with service providers who help us
            operate our business (e.g., payment processors, delivery partners), and when required by law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission
            over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To exercise these rights, please
            contact us at{" "}
            <a href="mailto:privacy@yofood.com" className="font-medium text-brand hover:underline">
              privacy@yofood.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-2xl text-foreground">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@yofood.com" className="font-medium text-brand hover:underline">
              privacy@yofood.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
