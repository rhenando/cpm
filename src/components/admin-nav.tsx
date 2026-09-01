import Link from "next/link";

export function AdminNav() {
  return (
    <nav aria-label="Admin navigation" className="mb-8 flex flex-wrap gap-2 border-b border-[#d3d3d3] pb-5">
      <Link className="rounded-md bg-white px-4 py-2 text-sm font-bold text-[#191c33] hover:bg-[#191c33] hover:text-white" href="/admin">Articles</Link>
      <Link className="rounded-md bg-white px-4 py-2 text-sm font-bold text-[#191c33] hover:bg-[#191c33] hover:text-white" href="/admin/pages">Pages</Link>
      <Link className="rounded-md bg-white px-4 py-2 text-sm font-bold text-[#191c33] hover:bg-[#191c33] hover:text-white" href="/admin/settings">Site settings</Link>
    </nav>
  );
}
