"use client";

import { FileText, ImageIcon, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { publishPost } from "./actions";

const MAX_PDF_SIZE = 2.5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 1.25 * 1024 * 1024;
const MAX_COMBINED_SIZE = 3.75 * 1024 * 1024;
const MAX_BATCH_SIZE = 8;

export function UploadPostForm() {
  const [error, setError] = useState("");

  function validateUpload(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const pdfs = data.getAll("pdf").filter((file): file is File => file instanceof File && file.size > 0);
    const images = data.getAll("image").filter((file): file is File => file instanceof File && file.size > 0);

    if (!pdfs.length || !images.length) return;
    if (pdfs.length !== images.length) {
      event.preventDefault();
      setError(`Select the same number of PDFs and images. You selected ${pdfs.length} PDF${pdfs.length === 1 ? "" : "s"} and ${images.length} image${images.length === 1 ? "" : "s"}.`);
      return;
    }
    if (pdfs.length > MAX_BATCH_SIZE) {
      event.preventDefault();
      setError(`Publish no more than ${MAX_BATCH_SIZE} articles in one batch.`);
      return;
    }
    if (pdfs.some((pdf) => pdf.size > MAX_PDF_SIZE)) {
      event.preventDefault();
      setError("Each PDF must be no larger than 2.5 MB.");
      return;
    }
    if (images.some((image) => image.size > MAX_IMAGE_SIZE)) {
      event.preventDefault();
      setError("Each featured image must be no larger than 1.25 MB.");
      return;
    }
    if (pdfs.some((pdf, index) => pdf.size + images[index].size > MAX_COMBINED_SIZE)) {
      event.preventDefault();
      setError("Each PDF and its matching image must be no larger than 3.75 MB combined.");
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
        <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><FileText className="shrink-0 text-[#bd8f13]" aria-hidden /> Article PDFs</span>
        <span className="text-sm text-[#242424]/60">Select up to 8 text-based PDFs in publishing order, maximum 2.5 MB each.</span>
        <input name="pdf" type="file" accept="application/pdf,.pdf" multiple required className="mt-2 block w-full max-w-full text-xs file:mr-2 file:max-w-full file:border-0 file:bg-[#191c33] file:px-3 file:py-3 file:text-xs file:font-bold file:text-white sm:text-sm sm:file:mr-4 sm:file:px-4" />
      </label>
      <label className="group grid cursor-pointer gap-3 border border-[#d3d3d3] p-5 transition hover:border-[#bd8f13] sm:p-6">
        <span className="flex items-center gap-3 text-sm font-extrabold uppercase tracking-wide text-[#191c33]"><ImageIcon className="shrink-0 text-[#bd8f13]" aria-hidden /> Featured images</span>
        <span className="text-sm text-[#242424]/60">Select the same number of images in matching order. JPG, PNG or WebP, maximum 1.25 MB each.</span>
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp" multiple required className="mt-2 block w-full max-w-full text-xs file:mr-2 file:max-w-full file:border-0 file:bg-[#191c33] file:px-3 file:py-3 file:text-xs file:font-bold file:text-white sm:text-sm sm:file:mr-4 sm:file:px-4" />
      </label>
      <label className="grid gap-3 border border-[#d3d3d3] p-5 text-sm font-extrabold uppercase tracking-wide text-[#191c33] sm:p-6">
        Publish date and time
        <span className="text-sm font-normal normal-case tracking-normal text-[#242424]/60">Leave empty to publish immediately. Scheduled times use Dubai time (UTC+4).</span>
        <input name="publishAt" type="datetime-local" className="min-h-12 w-full border border-[#d3d3d3] bg-white px-3 font-normal normal-case tracking-normal outline-none focus:border-[#bd8f13] focus:ring-4 focus:ring-[#bd8f13]/10 sm:px-4" />
      </label>
      <button className="brand-button-primary inline-flex min-h-14 items-center justify-center gap-3 rounded-[10px] border-2 px-5 text-sm font-black uppercase tracking-[0.1em] transition sm:px-7"><Upload size={18} aria-hidden /> Upload and publish articles</button>
    </form>
  );
}
