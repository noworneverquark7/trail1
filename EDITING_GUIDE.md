# Editing guide

## Simple edits

Open `lib/content.js`.

### Identity

Edit the `site` object.

### Questions

Edit `questions`.

### Study areas

Edit `fields`.

### Projects, notes, research, timeline, current status

Edit `fallbackContent`.

A project object looks like:

```js
{
  type: "project",
  slug: "my-project",
  title: "My Project",
  excerpt: "One-sentence description.",
  body: "Question: ...\n\nApproach: ...\n\nResult: ...",
  metadata: {
    statusLabel: "Building",
    disciplines: ["Physics", "Mathematics"]
  },
  status: "public",
  sort_order: 40
}
```

It automatically appears at `/laboratory` and gets a detail page at `/laboratory/my-project`.

## Design

Edit `app/globals.css`.

## Hero animation

Edit `components/HeroField.jsx`.

## Browser-based CMS

After Supabase is configured, use `/admin` instead of editing local content for database-backed entries.

## Safe Cursor prompt

> Work inside my existing Metamorphosis Next.js portfolio. Inspect the current implementation before changing anything. Preserve the scientific editorial visual language, mobile behavior, local-content fallback, and the fact that the public site must deploy without Supabase environment variables. Make the smallest maintainable change. Run `npm run check` and `npm run build` before finishing.
