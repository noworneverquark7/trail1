-- Metamorphosis portfolio database
-- Run this entire file in Supabase -> SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (char_length(type) between 1 and 50),
  slug text not null check (char_length(slug) between 1 and 120),
  title text not null check (char_length(title) between 1 and 200),
  excerpt text not null default '',
  body text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('private','draft','public','unlisted','archived')),
  sort_order integer not null default 100,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(type, slug)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists content_items_type_status_sort_idx
  on public.content_items(type, status, sort_order);
create index if not exists contact_messages_created_idx
  on public.contact_messages(created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_items_updated_at on public.content_items;
create trigger content_items_updated_at
before update on public.content_items
for each row execute function public.set_updated_at();

-- The app talks to these tables only from Next.js server routes using the
-- Supabase service-role key. RLS therefore remains enabled and no public
-- client policy is required.
alter table public.content_items enable row level security;
alter table public.contact_messages enable row level security;

-- Starter content. Safe to run more than once.
insert into public.content_items (type, slug, title, excerpt, body, metadata, status, sort_order)
values
('project','double-pendulum','Double Pendulum','A computational study of deterministic motion becoming visually chaotic.','Question: How quickly do nearby initial conditions diverge in a double-pendulum system?\n\nBuild the simulation, compare trajectories, and document the mathematics behind the motion.','{"statusLabel":"Planned","disciplines":["Mechanics","Differential Equations","Simulation"]}'::jsonb,'public',10),
('project','fourier-lab','Fourier Laboratory','An interactive exploration of how simple waves reconstruct complex signals.','Question: How can periodic structures be decomposed into a language of frequencies?','{"statusLabel":"Exploring","disciplines":["Analysis","Signals","Visualization"]}'::jsonb,'public',20),
('project','orbital-sandbox','Orbital Sandbox','A visual numerical playground for two-body and multi-body orbital motion.','Question: What do conservation laws look like when they are made interactive?','{"statusLabel":"Planned","disciplines":["Gravity","Numerical Methods","Computation"]}'::jsonb,'public',30),
('research','mathematics-of-physical-law','The Mathematics of Physical Law','An evolving reading and research thread on why mathematical structure maps so effectively onto nature.','A long-term inquiry connecting symmetry, differential equations, geometry, and physical law.','{"statusLabel":"Open question"}'::jsonb,'public',10),
('note','beginning','The Beginning','A note about choosing to document the process before the outcome is known.','A portfolio usually displays finished work. I want this one to preserve the unfinished process: questions, experiments, revisions, and the changing shape of ambition.','{"dateLabel":"Chapter 01"}'::jsonb,'public',10),
('note','linear-algebra-physics','Why Linear Algebra Keeps Appearing','A future notebook entry connecting vectors, transformations, eigenvalues, and physical models.','Notes in progress.','{"dateLabel":"Planned"}'::jsonb,'public',20),
('timeline','2026-beginning','2026 — The Beginning','Physics × Mathematics. Building foundations and beginning to publish the process.','','{}'::jsonb,'public',10),
('timeline','exploration','Exploration','Research, programming, independent projects, and deeper mathematical maturity.','','{}'::jsonb,'public',20),
('timeline','specialization','Specialization','The direction is intentionally unresolved. The work will determine it.','','{}'::jsonb,'public',30),
('timeline','unknown','Beyond — ?','The next version has not been written yet.','','{}'::jsonb,'public',40),
('current','studying','Studying','Physics + Mathematics foundations','','{}'::jsonb,'public',10),
('current','building','Building','This evolving portfolio and its first scientific experiments','','{}'::jsonb,'public',20),
('current','thinking','Thinking about','How mathematical structure becomes physical understanding','','{}'::jsonb,'public',30),
('current','question','Current question','What should I understand deeply enough to build with?','','{}'::jsonb,'public',40)
on conflict (type, slug) do nothing;
