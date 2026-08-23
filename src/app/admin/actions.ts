"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_PDF_SIZE = 4 * 1024 * 1024;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGES = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function cleanPdfText(value: string) {
  return value
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function deriveTitle(content: string, metadataTitle: unknown, filename: string) {
  if (typeof metadataTitle === "string" && metadataTitle.trim().length > 4) return metadataTitle.trim();
  const firstLine = content.split("\n").map((line) => line.trim()).find((line) => line.length >= 8 && line.length <= 180);
  return firstLine || filename.replace(/\.pdf$/i, "").replace(/[-_]+/g, " ").trim();
}

function getPublishDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return new Date();
  const date = new Date(`${value}:00+04:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail) redirect("/admin/login?error=configuration");
  if (email !== adminEmail) redirect("/admin/login?error=email");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.code === "email_not_confirmed") redirect("/admin/login?error=unconfirmed");
    if (error.code === "invalid_credentials") redirect("/admin/login?error=credentials");
    redirect("/admin/login?error=connection");
  }
  redirect("/admin");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function publishPost(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const pdf = formData.get("pdf");
  const image = formData.get("image");
  const publishDate = getPublishDate(formData.get("publishAt"));
  if (!publishDate) redirect("/admin?error=invalid-date");
  if (!(pdf instanceof File) || !(image instanceof File) || !pdf.size || !image.size) {
    redirect("/admin?error=missing-files");
  }
  if (pdf.type !== "application/pdf" || pdf.size > MAX_PDF_SIZE) redirect("/admin?error=invalid-pdf");
  if (!ALLOWED_IMAGES.has(image.type) || image.size > MAX_IMAGE_SIZE) redirect("/admin?error=invalid-image");

  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: Buffer.from(await pdf.arrayBuffer()) });
  let content = "";
  let metadataTitle: unknown;
  try {
    const info = await parser.getInfo();
    const text = await parser.getText();
    content = cleanPdfText(text.text);
    metadataTitle = info.info?.Title;
  } finally {
    await parser.destroy();
  }
  if (content.length < 100) redirect("/admin?error=empty-pdf");

  const title = deriveTitle(content, metadataTitle, pdf.name);
  const articleContent = content.toLowerCase().startsWith(title.toLowerCase())
    ? content.slice(title.length).replace(/^\s+/, "")
    : content;
  const baseSlug = safeSlug(title) || `article-${Date.now()}`;
  const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
  const folder = `${user.id}/${slug}`;
  const imageExtension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const imagePath = `${folder}/featured.${imageExtension}`;
  const pdfPath = `${folder}/article.pdf`;

  const [imageUpload, pdfUpload] = await Promise.all([
    supabase.storage.from("blog-assets").upload(imagePath, image, { contentType: image.type }),
    supabase.storage.from("blog-assets").upload(pdfPath, pdf, { contentType: "application/pdf" })
  ]);
  if (imageUpload.error || pdfUpload.error) redirect("/admin?error=upload-failed");

  const imageUrl = supabase.storage.from("blog-assets").getPublicUrl(imagePath).data.publicUrl;
  const pdfUrl = supabase.storage.from("blog-assets").getPublicUrl(pdfPath).data.publicUrl;
  const excerpt = articleContent.replace(/\s+/g, " ").trim().slice(0, 220);
  const { error } = await supabase.from("posts").insert({
    author_id: user.id,
    slug,
    title,
    excerpt,
    content: articleContent,
    image_url: imageUrl,
    pdf_url: pdfUrl,
    published: true,
    published_at: publishDate.toISOString()
  });

  if (error) {
    await supabase.storage.from("blog-assets").remove([imagePath, pdfPath]);
    redirect("/admin?error=publish-failed");
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (publishDate.getTime() > Date.now()) redirect("/admin?success=scheduled");
  redirect(`/blog/${slug}`);
}

function storagePathFromPublicUrl(url: string) {
  try {
    const marker = "/storage/v1/object/public/blog-assets/";
    const pathname = new URL(url).pathname;
    const index = pathname.indexOf(marker);
    return index >= 0 ? decodeURIComponent(pathname.slice(index + marker.length)) : null;
  } catch {
    return null;
  }
}

export async function deletePost(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin?error=delete-failed");

  const { data: post, error: lookupError } = await supabase
    .from("posts")
    .select("id,slug,image_url,pdf_url")
    .eq("id", id)
    .eq("author_id", user.id)
    .single();
  if (lookupError || !post) redirect("/admin?error=delete-failed");

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id);
  if (deleteError) redirect("/admin?error=delete-failed");

  const assetPaths = [storagePathFromPublicUrl(post.image_url), storagePathFromPublicUrl(post.pdf_url)].filter(
    (path): path is string => Boolean(path)
  );
  if (assetPaths.length) await supabase.storage.from("blog-assets").remove(assetPaths);

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin?success=deleted");
}
