"use client";

import { useRef, useState } from "react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current, sourcePath: window.location.pathname })
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Your enquiry could not be sent.");
      setStatus("success");
      formRef.current?.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Your enquiry could not be sent. Please call or email our team.");
    }
  }

  return (
    <form
      ref={formRef}
      className="grid gap-4"
      onSubmit={submit}
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company website</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="field" name="firstName" placeholder="First Name" required />
        <input className="field" name="lastName" placeholder="Last Name" required />
      </div>
      <input className="field" type="email" name="email" placeholder="Email" required />
      <input className="field" type="tel" name="phone" placeholder="Phone" required />
      <textarea
        className="field resize-none"
        name="message"
        placeholder="Comment or Message"
        rows={compact ? 4 : 6}
        required
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="brand-button-primary inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 px-6 py-3 text-sm font-black uppercase tracking-[0.1em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1ab39]"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
      {status === "success" ? (
        <p role="status" aria-live="polite" className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          Thank you. Your enquiry has been received and the Cordova team will be in touch.
        </p>
      ) : null}
      {status === "error" ? <p role="alert" className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{errorMessage}</p> : null}
    </form>
  );
}
