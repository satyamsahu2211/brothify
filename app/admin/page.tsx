// app/(admin)/page.tsx  (or wherever this lives)
import React from "react";
import { getUserFromCookie } from "@/lib/auth";
import { logout } from "../(auth)/actions";
import { baseService } from "@/services/base-service";

type HealthResponse = {
  ok: boolean;
  method?: string;
  at?: string;
  // add other fields your /health returns
};

export default async function AdminPage() {
  const user = await getUserFromCookie();

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl">Admin Panel</h1>
        <p className="mt-2 text-muted-foreground">
          You must sign in with your email to access the admin panel.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block rounded-md bg-brand px-5 py-2.5 text-brand-foreground shadow hover:brightness-110"
        >
          Go to Login
        </a>
      </main>
    );
  }

  // Safe health check: try/catch and sensible fallback
  let status: HealthResponse = { ok: false, method: "GET", at: new Date().toISOString() };
  try {
    const res = await baseService.get<HealthResponse>("/health");
    if (res) status = res;
  } catch (err) {
    // log server-side if you have a logger; fallback already set above
    // console.error("Health check failed", err);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as {user.email}</p>
        </div>

        {/* ensure the server action logout expects a POST; add method for clarity */}
        <form action={logout} method="post">
          <button
            type="submit"
            className="rounded-md border border-border bg-background/70 px-4 py-2 shadow hover:bg-secondary/70"
            aria-label="Log out"
          >
            Log out
          </button>
        </form>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h3 className="font-medium">Soup Items</h3>
          <p className="mt-2 text-3xl font-semibold">24</p>
          <p className="mt-1 text-sm text-muted-foreground">Live on menu</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h3 className="font-medium">Orders Today</h3>
          <p className="mt-2 text-3xl font-semibold">128</p>
          <p className="mt-1 text-sm text-muted-foreground">Including takeaways</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h3 className="font-medium">Ratings</h3>
          <p className="mt-2 text-3xl font-semibold">4.8</p>
          <p className="mt-1 text-sm text-muted-foreground">Average customer rating</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h3 className="font-medium">System Status</h3>
          <p className="mt-2 text-sm text-muted-foreground">Dummy API call via BaseService</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {`ok: ${String(status.ok)} | method: ${status.method ?? "unknown"} | at: ${status.at ?? "unknown"}`}
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-border/50 bg-card/60 p-6">
        <h2 className="font-serif text-2xl">Authentication Options</h2>
        <p className="mt-2 text-muted-foreground">
          Email login is active. Google and Phone OTP will be available soon.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Email</span>
              <span className="rounded bg-green-600/15 px-2 py-0.5 text-xs text-green-600">Enabled</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Uses JWT to protect the admin panel.</p>
          </div>

          <div className="rounded-lg border border-border p-4 opacity-60">
            <div className="flex items-center justify-between">
              <span className="font-medium">Google</span>
              <span className="rounded bg-yellow-600/15 px-2 py-0.5 text-xs text-yellow-600">Coming soon</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Sign in with your Google account.</p>
          </div>

          <div className="rounded-lg border border-border p-4 opacity-60">
            <div className="flex items-center justify-between">
              <span className="font-medium">Phone OTP</span>
              <span className="rounded bg-yellow-600/15 px-2 py-0.5 text-xs text-yellow-600">Coming soon</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">One-time passcodes via SMS.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
