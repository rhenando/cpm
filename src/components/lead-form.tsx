"use client";

import { useState } from "react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
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
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#bd8f13] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#d0a424] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd8f13]"
      >
        Submit
      </button>
      {submitted ? (
        <p className="rounded-md border border-[#bd8f13]/35 bg-[#bd8f13]/10 px-4 py-3 text-sm font-semibold text-[#191c33]">
          Thanks. This demo form has validated your request locally.
        </p>
      ) : null}
    </form>
  );
}
