import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

const recentSubmissions = new Map<string, number[]>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function rateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const attempts = (recentSubmissions.get(key) || []).filter((timestamp) => now - timestamp < 15 * 60_000);
  attempts.push(now);
  recentSubmissions.set(key, attempts);
  return attempts.length > 5;
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please call or email our team." }, { status: 503 });
  }
  if (rateLimited(request)) {
    return NextResponse.json({ error: "Too many requests. Please wait before trying again." }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots commonly fill hidden fields. Return success without storing the payload.
  if (text(payload.company, 100)) return NextResponse.json({ ok: true });
  const startedAt = Number(payload.startedAt || 0);
  if (!startedAt || Date.now() - startedAt < 2_000) {
    return NextResponse.json({ error: "Please review the form and try again." }, { status: 400 });
  }

  const firstName = text(payload.firstName, 80);
  const lastName = text(payload.lastName, 80);
  const email = text(payload.email, 254).toLowerCase();
  const phone = text(payload.phone, 40);
  const message = text(payload.message, 3_000);
  const sourcePath = text(payload.sourcePath, 300) || "/";
  if (!firstName || !lastName || !emailPattern.test(email) || !phone || message.length < 10) {
    return NextResponse.json({ error: "Please complete every field with valid contact details." }, { status: 400 });
  }

  const { url, key } = getSupabaseConfig();
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("contact_submissions").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    message,
    source_path: sourcePath,
    user_agent: text(request.headers.get("user-agent"), 500)
  });
  if (error) {
    console.error("Unable to save contact enquiry:", error.message);
    return NextResponse.json({ error: "We could not save your enquiry. Please call or email our team." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
