# Supabase publishing setup

1. Create a free Supabase project in the region closest to the Vercel deployment.
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it once.
3. Open **Authentication > Users** and create the single publishing user with an email and strong password.
4. Disable new-user sign-ups under **Authentication > Sign In / Providers > Email**.
5. Add the variables from `.env.example` to **Vercel > Project > Settings > Environment Variables** for Production and Preview.
6. Set `SUPABASE_ADMIN_EMAIL` to the email created in step 3. Staff use this email address and their Supabase password to sign in.
7. Redeploy, then visit `/admin`.

If the original schema was installed before scheduling support was added, run `supabase/add-scheduling.sql` once in the SQL Editor. Scheduled publication times are entered in Dubai time (UTC+4).

The public site can read published rows. Only the authenticated owner can insert, update, or delete their own post rows and uploaded files. The PDF and image are intentionally public because they are published website assets.
