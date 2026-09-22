# Ashish Pandey — Metamorphosis

A deployment-safe personal portfolio for a Physics × Mathematics student. The site is designed to be a living record of projects, research, notes, questions, and intellectual development.

## Why this repository is intentionally simple

The public site has **zero required environment variables**. It deploys from local content immediately. Supabase and the private admin editor are optional enhancements, so a missing database can never prevent the public portfolio from building.

This repository uses:

- Next.js 16.3.3
- React 19.2
- JavaScript/JSX rather than TypeScript to reduce deployment/type-generation failure points
- Native CSS
- Canvas animation with no 3D dependency
- Optional Supabase REST backend
- Optional password-protected admin editor

## First deployment

1. Put this repository on GitHub.
2. In Vercel choose **Add New → Project**.
3. Import the repository.
4. Do not add environment variables yet.
5. Click **Deploy**.

After deployment, test:

- `/`
- `/laboratory`
- `/notebook`
- `/research`
- `/api/health`

`/api/health` should return JSON containing `"ok": true`.

## Local development

Use Node.js 22 when possible.

```bash
npm install
npm run check
npm run dev
```

Open `http://localhost:3000`.

Before pushing a major update:

```bash
npm run check
npm run build
```

## Edit your information

The easiest file is:

```text
lib/content.js
```

Change:

- name
- email
- hero statement
- questions
- fields of study
- projects
- research
- notebook posts
- timeline
- currently section

Design lives in:

```text
app/globals.css
```

## Optional Supabase backend

The public site does not need Supabase. Add it only when you want browser-based editing and stored contact messages.

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Add the values from `.env.example` to Vercel → Project → Settings → Environment Variables.
4. Redeploy.
5. Visit `/admin`.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or use a `NEXT_PUBLIC_` prefix for it.

## Domain

After the Vercel preview deployment works:

1. Vercel → Project → Settings → Domains.
2. Add `ashishpandey.com`.
3. Add `www.ashishpandey.com`.
4. Enter the DNS records Vercel gives you at your domain registrar.
5. Set the preferred domain as primary.

## Reliability checks already included

`npm run check` validates:

- required project files
- required package dependencies
- local import paths
- accidental TypeScript files in this JavaScript deployment build

The source has also been syntax-parsed independently before packaging.
