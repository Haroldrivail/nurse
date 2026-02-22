-- ===================================================================
-- Multilingual content — Translation tables
-- Run in Supabase SQL Editor AFTER initial schema.sql
-- ===================================================================

-- ─── Post translations ──────────────────────────────────
create table if not exists public.post_translations (
  id         uuid primary key default uuid_generate_v4(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  locale     text not null,
  title      text not null default '',
  excerpt    text not null default '',
  content    text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (post_id, locale)
);

-- ─── Project translations ───────────────────────────────
create table if not exists public.project_translations (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  locale      text not null,
  title       text not null default '',
  description text not null default '',
  objectives  text not null default '',
  activities  text not null default '',
  impact      text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (project_id, locale)
);

-- ─── Auto-update updated_at ─────────────────────────────
create trigger on_post_translations_updated
  before update on public.post_translations
  for each row execute function public.handle_updated_at();

create trigger on_project_translations_updated
  before update on public.project_translations
  for each row execute function public.handle_updated_at();

-- ─── Row Level Security ─────────────────────────────────
alter table public.post_translations    enable row level security;
alter table public.project_translations enable row level security;

-- Public can read translations (parent RLS already filters published)
create policy "Public read post translations"
  on public.post_translations for select
  using (true);

create policy "Public read project translations"
  on public.project_translations for select
  using (true);

-- Service role full access
create policy "Service role full access post translations"
  on public.post_translations for all
  using (auth.role() = 'service_role');

create policy "Service role full access project translations"
  on public.project_translations for all
  using (auth.role() = 'service_role');

-- ─── Seed existing French content into translations ─────
insert into public.post_translations (post_id, locale, title, excerpt, content)
  select id, 'fr', title, excerpt, content from public.posts
  on conflict (post_id, locale) do nothing;

insert into public.project_translations (project_id, locale, title, description, objectives, activities, impact)
  select id, 'fr', title, description, objectives, activities, impact from public.projects
  on conflict (project_id, locale) do nothing;
