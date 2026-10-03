import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const { supabase } = await requireAdmin();
  const { data: enquiries, error } = await supabase
    .from("contact_submissions")
    .select("id,first_name,last_name,email,phone,message,source_path,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main className="min-h-[calc(100svh-7rem)] bg-[#f1f0f3] py-14 md:py-20">
      <div className="container max-w-5xl">
        <AdminNav />
        <p className="eyebrow">Cordova enquiries</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#191c33] sm:text-5xl">Website leads</h1>
        <p className="mt-4 max-w-2xl leading-7 text-[#242424]/70">The 100 most recent enquiries submitted through the public website.</p>
        {error ? <p className="mt-8 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">The enquiry table is not available yet. Run <code>supabase/add-contact-submissions.sql</code> in Supabase.</p> : null}
        <div className="mt-8 grid gap-5">
          {enquiries?.map((enquiry) => (
            <article key={enquiry.id} className="border-t-2 border-[#bd8f13] bg-white p-6 shadow-lg shadow-[#191c33]/5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-xl font-extrabold text-[#191c33]">{enquiry.first_name} {enquiry.last_name}</h2>
                  <p className="mt-1 text-sm text-[#242424]/65">{new Date(enquiry.created_at).toLocaleString("en-AE", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" })} Dubai time · {enquiry.source_path}</p>
                </div>
                <span className="w-fit bg-[#f1f0f3] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#191c33]">{enquiry.status}</span>
              </div>
              <p className="mt-5 whitespace-pre-wrap leading-7 text-[#242424]">{enquiry.message}</p>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-[#d3d3d3] pt-4 text-sm font-semibold">
                <a className="text-[#191c33] underline decoration-[#bd8f13] underline-offset-4" href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                <a className="text-[#191c33] underline decoration-[#bd8f13] underline-offset-4" href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`}>{enquiry.phone}</a>
              </div>
            </article>
          ))}
          {!error && !enquiries?.length ? <p className="bg-white p-6 text-[#242424]/70">No website enquiries yet.</p> : null}
        </div>
      </div>
    </main>
  );
}
