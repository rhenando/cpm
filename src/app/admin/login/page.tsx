import { redirect } from "next/navigation";
import { login } from "../actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isSupabaseConfigured()) {
    return <SetupRequired />;
  }
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/admin");
  const { error } = await searchParams;
  const errorMessage = error === "email"
    ? "This email address is not authorized to access the publishing area."
    : error === "credentials"
      ? "The email or password is incorrect. Reset this user's password in Supabase Authentication and try again."
      : error === "unconfirmed"
        ? "The Supabase user's email is not confirmed. Confirm the user in Authentication > Users."
        : error === "connection"
          ? "Supabase authentication could not be completed. Confirm the project URL and publishable key belong to the same project."
      : error === "configuration"
        ? "The admin email environment variable is missing."
        : error
          ? "Sign in failed. Check the configured credentials."
          : "";

  return (
    <main className="flex min-h-[calc(100svh-7rem)] items-center bg-[#f1f0f3] py-16">
      <div className="container">
        <div className="mx-auto max-w-md border-t-2 border-[#bd8f13] bg-[#191c33] p-7 text-white shadow-2xl shadow-[#191c33]/20 sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#bd8f13]">Cordova publishing</p>
          <h1 className="mt-4 text-3xl font-extrabold">Admin sign in</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">Authorized team members only.</p>
          {errorMessage ? <p className="mt-5 border border-red-300/30 bg-red-950/30 px-4 py-3 text-sm text-red-100">{errorMessage}</p> : null}
          <form action={login} className="mt-7 grid gap-5">
            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
              Email address
              <input name="email" type="email" required autoComplete="email" className="min-h-12 bg-white px-4 text-base font-normal normal-case tracking-normal text-[#191c33] outline-none focus:ring-2 focus:ring-[#bd8f13]" />
            </label>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
              Password
              <input name="password" type="password" required autoComplete="current-password" className="min-h-12 bg-white px-4 text-base font-normal normal-case tracking-normal text-[#191c33] outline-none focus:ring-2 focus:ring-[#bd8f13]" />
            </label>
            <button className="brand-button-on-dark mt-2 min-h-12 rounded-[10px] border-2 px-6 text-sm font-black uppercase tracking-[0.1em] transition">Sign in</button>
          </form>
        </div>
      </div>
    </main>
  );
}

function SetupRequired() {
  return (
    <main className="section bg-[#f1f0f3]">
      <div className="container max-w-2xl bg-white p-8">
        <h1 className="text-3xl font-extrabold text-[#191c33]">Supabase setup required</h1>
        <p className="mt-4 leading-7 text-[#242424]">Add the environment variables documented in <code>.env.example</code>, then restart the application.</p>
      </div>
    </main>
  );
}
