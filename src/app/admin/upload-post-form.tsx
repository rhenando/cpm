"use client";

import { FileText, ImageIcon, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { publishPost } from "./actions";

const MAX_PDF_SIZE = 2.5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 1.25 * 1024 * 1024;
const MAX_COMBINED_SIZE = 3.75 * 1024 * 1024;

export function UploadPostForm() {
  const [error, setError] = useState("");

  function validateUpload(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const pdf = data.get("pdf");
    const image = data.get("image");

    if (!(pdf instanceof File) || !(image instanceof File)) return;
    if (pdf.size > MAX_PDF_SIZE) {
      event.preventDefault();
      setError("The PDF must be no larger than 2.5 MB.");
      return;
    }
    if (image.size > MAX_IMAGE_SIZE) {
      event.preventDefault();
      setError("The featured image must be no larger than 1.25 MB.");
      return;
    }
    if (pdf.size + image.size > MAX_COMBINED_SIZE) {
      event.preventDefault();
      setError("The PDF and image must be no larger than 3.75 MB combined.");
      return;
    }
    setError("");
  }

  return (
    <form action={publishPost} onSubmit={validateUpload} className="grid gap-7">
      {error ? (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </p>
      ) : null}
      <label className="group grid cursor-pointer gap-3 border border-[#d3d3d3] p-5 transition hover:border-[#bd8f13] sm:p-6">
        <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><FileText className="shrink-0 text-[#bd8f13]" aria-hidden /> Article PDF</span>
        <span className="text-sm text-[#242424]/60">PDF with selectable text, maximum 2.5 MB.</span>
        <input name="pdf" type="file" accept="application/pdf,.pdf" required className="mt-2 block w-full max-w-full text-xs file:mr-2 file:max-w-full file:border-0 file:bg-[#191c33] file:px-3 file:py-3 file:text-xs file:font-bold file:text-white sm:text-sm sm:file:mr-4 sm:file:px-4" />
      </label>
      <label className="group grid cursor-pointer gap-3 border border-[#d3d3d3] p-5 transition hover:border-[#bd8f13] sm:p-6">
        <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><ImageIcon className="shrink-0 text-[#bd8f13]" aria-hidden /> Featured image</span>
        <span className="text-sm text-[#242424]/60">JPG, PNG or WebP, maximum 1.25 MB.</span>
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp" required className="mt-2 block w-full max-w-full text-xs file:mr-2 file:max-w-full file:border-0 file:bg-[#191c33] file:px-3 file:py-3 file:text-xs file:font-bold file:text-white sm:text-sm sm:file:mr-4 sm:file:px-4" />
      </label>
      <label className="grid gap-3 border border-[#d3d3d3] p-5 text-sm font-extrabold uppercase tracking-wide text-[#191c33] sm:p-6">
        Publish date and time
        <span className="text-sm font-normal normal-case tracking-normal text-[#242424]/60">Leave empty to publish immediately. Scheduled times use Dubai time (UTC+4).</span>
        <input name="publishAt" type="datetime-local" className="min-h-12 w-full border border-[#d3d3d3] bg-white px-3 font-normal normal-case tracking-normal outline-none focus:border-[#bd8f13] focus:ring-4 focus:ring-[#bd8f13]/10 sm:px-4" />
      </label>
      <button className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#bd8f13] px-5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ca8a04] sm:px-7"><Upload size={18} aria-hidden /> Upload and publish</button>
    </form>
  );
}
