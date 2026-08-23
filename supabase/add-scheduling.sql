-- Run this once in the Supabase SQL Editor for an existing installation.
drop policy if exists "Published posts are public" on public.posts;

create policy "Published posts are public"
on public.posts for select
to anon, authenticated
using (
  (published = true and published_at <= now())
  or author_id = (select auth.uid())
);
