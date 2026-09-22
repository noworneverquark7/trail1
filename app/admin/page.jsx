"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const password = String(new FormData(event.currentTarget).get("password") || "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Login failed");

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login shell">
      <form onSubmit={submit}>
        <div className="eyebrow">Private system</div>
        <h1>Metamorphosis Admin</h1>
        <p>Edit public projects, notebook entries, research, timeline items, and the Current section.</p>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        {error ? <p className="form-message error">{error}</p> : null}
        <button className="button button-primary" disabled={loading}>{loading ? "Checking…" : "Enter dashboard"}</button>
      </form>
    </div>
  );
}
