# Blog migration backup

Create a local backup of every article currently listed at `https://www.cordovaproperty.com/blog`:

```powershell
npm run backup:blog
```

The backup command exports published Supabase rows, checks them against the live blog catalogue, and saves:

- `articles.json` and `articles.ndjson` for database migration
- the original Supabase and legacy source records under `sources/`
- one structured JSON file per article under `articles/`
- the server-rendered HTML for every public article
- article images and PDFs with SHA-256 checksums
- `backup-manifest.json` with counts and any failures

Backups are written under `backups/` and ignored by Git. A valid finished backup has a manifest and no `INCOMPLETE` marker.

Optional arguments:

```powershell
npm run backup:blog -- --output=backups/before-database-migration
npm run backup:blog -- --skip-assets
npm run backup:blog -- --skip-pages
```

The public Supabase key can export only records visible on the public blog. Draft, private, and future-scheduled records require an authenticated database export and are intentionally not accessed by this script.
