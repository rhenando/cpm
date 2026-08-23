"use client";

import { Trash2 } from "lucide-react";
import { deletePost } from "./actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(event) => {
        if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-red-700 transition hover:bg-red-50"
      >
        <Trash2 size={14} aria-hidden /> Delete
      </button>
    </form>
  );
}
