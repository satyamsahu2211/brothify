"use client";

import { useState } from "react";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuth()
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await authService.login({ email, password });
      if (res.status == 200) {
        const user = res?.data?.data;
        const token = res?.data?.data?.token || "";
        setAuth(user, token);
        router.push("/admin")
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <header className="text-center">
        <h1 className="font-serif text-3xl">Sign In</h1>
        <p className="mt-2 text-muted-foreground">
          Admins sign in with email and password. Regular users can sign in with email only.
        </p>
      </header>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="rounded-md border border-border bg-background px-3 py-2 outline-none ring-0"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-muted-foreground">(required for admin only)</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="rounded-md border border-border bg-background px-3 py-2 outline-none ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="w-full rounded-md bg-brand px-4 py-2 text-brand-foreground shadow hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
