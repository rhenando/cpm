"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { deletePost } from "./actions";

function ConfirmDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-700 px-5 text-sm font-extrabold text-white transition hover:bg-red-800 disabled:cursor-wait disabled:opacity-60"
    >
      <Trash2 size={16} aria-hidden /> {pending ? "Deleting…" : "Delete article"}
    </button>
  );
}

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-red-700 transition hover:bg-red-50"
      >
        <Trash2 size={14} aria-hidden /> Delete
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`delete-title-${id}`}
        aria-describedby={`delete-description-${id}`}
        onClick={(event) => {
          if (event.currentTarget === event.target) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 bg-white p-0 text-[#242424] shadow-2xl backdrop:bg-[#191c33]/70 backdrop:backdrop-blur-[2px]"
      >
        <div className="relative border-t-4 border-red-700 p-6 sm:p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close confirmation"
            className="absolute right-4 top-4 rounded-full p-2 text-[#242424]/55 transition hover:bg-[#f1f0f3] hover:text-[#191c33]"
          >
            <X size={19} aria-hidden />
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
            <AlertTriangle size={24} aria-hidden />
          </div>
          <h3 id={`delete-title-${id}`} className="mt-5 pr-8 text-xl font-extrabold text-[#191c33]">Delete this article?</h3>
          <p id={`delete-description-${id}`} className="mt-3 text-sm leading-6 text-[#242424]/70">
            <span className="font-bold text-[#242424]">{title}</span> and its uploaded files will be permanently removed. This action cannot be undone.
          </p>

          <form action={deletePost} className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <input type="hidden" name="id" value={id} />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="min-h-11 rounded-lg border border-[#d3d3d3] px-5 text-sm font-bold text-[#191c33] transition hover:bg-[#f1f0f3]"
            >
              Cancel
            </button>
            <ConfirmDeleteButton />
          </form>
        </div>
      </dialog>
    </>
  );
}
