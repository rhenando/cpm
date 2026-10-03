-- Run once in the Supabase SQL Editor before deploying the connected lead form.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 3 and 40),
  message text not null check (char_length(message) between 10 and 3000),
  source_path text not null default '/',
  user_agent text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
grant insert on public.contact_submissions to anon, authenticated;
grant select, update, delete on public.contact_submissions to authenticated;

drop policy if exists "Visitors can submit enquiries" on public.contact_submissions;
create policy "Visitors can submit enquiries"
on public.contact_submissions for insert
to anon, authenticated
with check (
  char_length(first_name) between 1 and 80
  and char_length(last_name) between 1 and 80
  and char_length(email) between 3 and 254
  and char_length(phone) between 3 and 40
  and char_length(message) between 10 and 3000
  and status = 'new'
);

drop policy if exists "Admins manage enquiries" on public.contact_submissions;
create policy "Admins manage enquiries"
on public.contact_submissions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create index if not exists contact_submissions_created_at_idx
on public.contact_submissions (created_at desc);
