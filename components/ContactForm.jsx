"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        setState("sent");
        setMessage("Message received. Thank you.");
        form.reset();
        return;
      }

      if (result.fallback === "email") {
        const subject = encodeURIComponent(String(data.subject || "Portfolio contact"));
        const body = encodeURIComponent(`${String(data.message || "")}\n\nFrom: ${String(data.name || "")} <${String(data.email || "")}>`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setState("idle");
        setMessage("Opening your email app because the database is not connected yet.");
        return;
      }

      throw new Error(result.error || "Unable to send the message.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to send the message.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot" />
      <div className="form-grid">
        <label>Name<input name="name" required maxLength={100} /></label>
        <label>Email<input name="email" type="email" required maxLength={200} /></label>
      </div>
      <label>Subject<input name="subject" required maxLength={160} /></label>
      <label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={7} /></label>
      <button className="button button-primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      {message ? <p className={`form-message ${state}`}>{message}</p> : null}
    </form>
  );
}
