import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();

  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return { supabase, user };
}
