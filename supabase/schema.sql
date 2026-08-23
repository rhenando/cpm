-- Run this once in the Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete restrict,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null,
  image_url text not null,
  pdf_url text not null,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

create policy "Published posts are public"
on public.posts for select
to anon, authenticated
using ((published = true and published_at <= now()) or author_id = (select auth.uid()));

create policy "Authors can create posts"
on public.posts for insert
to authenticated
with check (author_id = (select auth.uid()));

create policy "Authors can update their posts"
on public.posts for update
to authenticated
using (author_id = (select auth.uid()))
with check (author_id = (select auth.uid()));

create policy "Authors can delete their posts"
on public.posts for delete
to authenticated
using (author_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-assets',
  'blog-assets',
  true,
  5242880,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Authenticated users can upload blog assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog-assets'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Owners can view their blog asset records"
on storage.objects for select
to authenticated
using (
  bucket_id = 'blog-assets'
  and owner_id = (select auth.uid()::text)
);

create policy "Owners can delete blog assets"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'blog-assets'
  and owner_id = (select auth.uid()::text)
);
