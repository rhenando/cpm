-- Run once in the Supabase SQL Editor after schema.sql.
-- Then replace the email in the final INSERT with your configured SUPABASE_ADMIN_EMAIL.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.site_settings (
  id text primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.page_overrides (
  slug text primary key,
  title text not null,
  description text not null default '',
  content text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.page_overrides enable row level security;
grant select on public.site_settings, public.page_overrides to anon, authenticated;
grant insert, update, delete on public.site_settings, public.page_overrides to authenticated;

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Site settings are public" on public.site_settings for select to anon, authenticated using (true);
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Page overrides are public" on public.page_overrides;
create policy "Page overrides are public" on public.page_overrides for select to anon, authenticated using (true);
drop policy if exists "Admins manage page overrides" on public.page_overrides;
create policy "Admins manage page overrides" on public.page_overrides for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Authors can create posts" on public.posts;
drop policy if exists "Authors can update their posts" on public.posts;
drop policy if exists "Authors can delete their posts" on public.posts;
create policy "Admins can create posts" on public.posts for insert to authenticated with check (public.is_admin() and author_id = (select auth.uid()));
create policy "Admins can update their posts" on public.posts for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete posts" on public.posts for delete to authenticated using (public.is_admin());

drop policy if exists "Authenticated users can upload blog assets" on storage.objects;
drop policy if exists "Owners can delete blog assets" on storage.objects;
create policy "Admins can upload blog assets" on storage.objects for insert to authenticated with check (bucket_id = 'blog-assets' and public.is_admin());
create policy "Admins can delete blog assets" on storage.objects for delete to authenticated using (bucket_id = 'blog-assets' and public.is_admin());

-- Bootstrap the configured administrator:
-- insert into public.admin_users (user_id)
-- select id from auth.users where lower(email) = lower('admin@example.com')
-- on conflict (user_id) do nothing;
