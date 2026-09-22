# Deploy to Vercel

## Stage 1 — Get a clean Vercel URL

Do this **before** Supabase or the custom domain.

1. Publish this folder as a new GitHub repository.
2. Sign in to Vercel with GitHub.
3. Click **Add New → Project**.
4. Import this repository.
5. Framework should show **Next.js**.
6. Root Directory should be `.`.
7. Leave Build Command, Output Directory, and Install Command on Vercel defaults.
8. Do not add environment variables yet.
9. Click **Deploy**.

Then visit:

```text
https://YOUR-VERCEL-URL.vercel.app/api/health
```

Expected result:

```json
{"ok":true,"project":"ashish-pandey-metamorphosis",...}
```

## Stage 2 — Connect Supabase

Only after Stage 1 succeeds.

Run `supabase/schema.sql`, then add:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
AUTH_SECRET
```

Optional canonical URL:

```text
NEXT_PUBLIC_SITE_URL=https://ashishpandey.com
```

Redeploy after changing environment variables.

## Stage 3 — Connect the .com

Vercel → Project → Settings → Domains:

```text
ashishpandey.com
www.ashishpandey.com
```

Use exactly the DNS records Vercel shows. Do not buy a second hosting plan from the domain registrar.

## Stage 4 — Final launch checks

- Home loads on desktop and phone
- Navigation works
- Project detail pages open
- Notebook detail pages open
- Research detail pages open
- `/api/health` returns `ok: true`
- Contact opens email fallback before Supabase
- Contact stores messages after Supabase
- `/admin` works after backend variables are configured
- Replace placeholder email in `lib/content.js`
