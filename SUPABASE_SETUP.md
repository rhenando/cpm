# Supabase publishing setup

1. Create a free Supabase project in the region closest to the Vercel deployment.
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it once.
3. Run `supabase/cms.sql` in the SQL Editor.
4. Open **Authentication > Users** and create the single publishing user with a strong password.
5. Register that user as the administrator using the commented bootstrap query at the bottom of `supabase/cms.sql`.
6. Disable new-user sign-ups under **Authentication > Sign In / Providers > Email**.
7. Add the variables from `.env.example` to **Vercel > Project > Settings > Environment Variables** for Production and Preview. Treat the two `NEXT_PUBLIC_*` values as public Config values and `SUPABASE_ADMIN_EMAIL` as a Secret.
8. Redeploy, then visit `/admin`.

If the original schema was installed before scheduling support was added, run `supabase/add-scheduling.sql` once in the SQL Editor. Scheduled publication times are entered in Dubai time (UTC+4).

The public site can read only published, non-scheduled rows. Only the registered administrator can change CMS rows or storage objects. PDFs and images are intentionally public because they are published website assets. Never expose a service-role key or database password to the browser.
