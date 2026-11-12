"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { updatePost } from "./actions";

type EditablePost = { id: string; title: string; content: string; excerpt: string; image: string; updatedAt: string };

export function EditPostForm({ post }: { post: EditablePost }) {
  const [state, action, pending] = useActionState(updatePost, { error: "" });
  const [replacementPdf, setReplacementPdf] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(post.image);
  useEffect(() => {
    if (!imageFile) { setPreview(post.image); return; }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile, post.image]);
  const inputClass = "w-full border border-[#d3d3d3] bg-white px-4 py-3 font-normal outline-none focus:border-[#bd8f13] focus:ring-2 focus:ring-[#bd8f13]/20";
  return (
    <form action={action} className="grid gap-7">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="updatedAt" value={post.updatedAt} />
      {state.error ? <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{state.error}</p> : null}
      <fieldset disabled={pending} className="grid min-w-0 gap-7 disabled:opacity-60">
        <div className="grid gap-3">
          <h2 className="text-xl font-extrabold">Featured image</h2>
          {preview ? <Image src={preview} alt="Featured image preview" width={800} height={400} unoptimized className="max-h-72 w-full object-contain bg-[#f1f0f3]" /> : null}
          <label className="grid gap-3 font-bold">Replace image
            <span className="text-sm font-normal">Optional. JPG, PNG or WebP, up to 1.25 MB. Leave empty to keep the current image.</span>
            <input name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className={inputClass} />
          </label>
        </div>
        <label className="grid gap-3 font-bold">Replace article from PDF
          <span className="text-sm font-normal">Optional. A text-based PDF up to 2.5 MB replaces the title, excerpt, and article text below. Leave empty to edit the text directly. The post URL and publication date stay the same.</span>
          <input name="pdf" type="file" accept="application/pdf,.pdf" onChange={(event) => setReplacementPdf(Boolean(event.target.files?.length))} className={inputClass} />
        </label>
        {replacementPdf ? <p role="status" className="bg-amber-50 p-4 text-sm">The selected PDF will replace the title, excerpt, and article text when you save.</p> : null}
        <fieldset disabled={replacementPdf} className="grid min-w-0 gap-7 disabled:opacity-50">
          <label className="grid gap-3 font-bold">Title<input name="title" defaultValue={post.title} required maxLength={300} className={inputClass} /></label>
          <label className="grid gap-3 font-bold">Excerpt<textarea name="excerpt" defaultValue={post.excerpt} maxLength={500} rows={3} className={inputClass} /></label>
          <label className="grid gap-3 font-bold">Article text
            <span className="text-sm font-normal">Edit the web article here. The original uploaded PDF is only replaced when you select a new PDF.</span>
            <textarea name="content" defaultValue={post.content} required maxLength={200000} rows={22} className={`${inputClass} leading-7`} />
          </label>
        </fieldset>
        <button type="submit" className="brand-button-primary min-h-14 rounded-[10px] border-2 px-7 text-sm font-black uppercase tracking-wide">{pending ? "Saving changes…" : "Save changes"}</button>
      </fieldset>
    </form>
  );
}
