-- ===================================================================
-- Nurse Hilfe Menschen Internationale — Supabase schema
-- Run this SQL in your Supabase SQL Editor to create all tables.
-- ===================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── Blog posts ──────────────────────────────────────────
create table if not exists public.posts (
    id uuid primary key default uuid_generate_v4 (),
    slug text unique not null,
    title text not null,
    excerpt text not null default '',
    content text not null default '',
    category text not null default 'Terrain',
    image text,
    read_time text not null default '4 min',
    published boolean not null default false,
    published_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ─── Projects / programmes ──────────────────────────────
create table if not exists public.projects (
    id uuid primary key default uuid_generate_v4 (),
    slug text unique not null,
    title text not null,
    theme text not null default '',
    region text not null default '',
    impact text not null default '',
    description text not null default '',
    objectives text not null default '',
    activities text not null default '',
    budget text,
    image text,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ─── Contact form submissions ───────────────────────────
create table if not exists public.contacts (
    id uuid primary key default uuid_generate_v4 (),
    first_name text not null,
    last_name text not null,
    email text not null,
    profile text not null default '',
    message text not null default '',
    read boolean not null default false,
    created_at timestamptz not null default now()
);

-- ─── Donations ──────────────────────────────────────────
create table if not exists public.donations (
    id uuid primary key default uuid_generate_v4 (),
    tx_ref text unique not null,
    flw_ref text,
    amount numeric(12, 2) not null,
    currency text not null default 'EUR',
    payment_method text not null default 'card',
    status text not null default 'pending',
    donor_email text not null,
    donor_name text not null,
    project text,
    recurring boolean not null default false,
    metadata jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ─── Auto-update updated_at ─────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_posts_updated
  before update on public.posts
  for each row execute function public.handle_updated_at();

create trigger on_projects_updated
  before update on public.projects
  for each row execute function public.handle_updated_at();

create trigger on_donations_updated
  before update on public.donations
  for each row execute function public.handle_updated_at();

-- ─── Row Level Security ─────────────────────────────────
alter table public.posts enable row level security;

alter table public.projects enable row level security;

alter table public.contacts enable row level security;

alter table public.donations enable row level security;

-- Public can read published posts & projects
create policy "Public read published posts" on public.posts for
select using (published = true);

create policy "Public read published projects" on public.projects for
select using (published = true);

-- Only service_role (admin API) can insert/update/delete
create policy "Service role full access posts" on public.posts for all using (auth.role () = 'service_role');

create policy "Service role full access projects" on public.projects for all using (auth.role () = 'service_role');

create policy "Anyone can insert contacts" on public.contacts for
insert
with
    check (true);

create policy "Service role full access contacts" on public.contacts for all using (auth.role () = 'service_role');

create policy "Service role full access donations" on public.donations for all using (auth.role () = 'service_role');

-- Allow anonymous insert for donations (webhook creates them)
create policy "Anon insert donations" on public.donations for
insert
with
    check (true);

-- ─── Seed data ──────────────────────────────────────────
insert into
    public.posts (
        slug,
        title,
        excerpt,
        content,
        category,
        image,
        read_time,
        published,
        published_at
    )
values (
        'sante-maternelle-nos-actions',
        'Santé maternelle : nos actions sur le terrain',
        'Un aperçu de nos cliniques mobiles et des consultations prénatales dans les zones isolées.',
        'Contenu complet de l''article sur la santé maternelle...',
        'Terrain',
        'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
        '4 min',
        true,
        now()
    ),
    (
        'urgences-humanitaires',
        'Urgences humanitaires : comment nous intervenons',
        'Notre protocole d''intervention rapide pour protéger les communautés vulnérables.',
        'Contenu complet de l''article sur les urgences humanitaires...',
        'Urgence',
        'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80',
        '5 min',
        true,
        now()
    ),
    (
        'rapport-2025',
        'Transparence & impact : rapport 2025',
        'Les résultats clés, l''utilisation des fonds et les indicateurs d''impact.',
        'Contenu complet du rapport annuel 2025...',
        'Rapport',
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
        '6 min',
        true,
        now()
    ) on conflict (slug) do nothing;

insert into
    public.projects (
        slug,
        title,
        theme,
        region,
        impact,
        description,
        objectives,
        activities,
        image,
        published
    )
values (
        'cliniques-mobiles',
        'Cliniques mobiles',
        'Santé rurale',
        'Afrique de l''Ouest',
        '5 000 consultations',
        'Des cliniques mobiles parcourent les zones les plus reculées pour offrir des soins de base.',
        'Atteindre 10 000 consultations annuelles en zone rurale.',
        'Déploiement de véhicules médicalisés, formation d''agents de santé, partenariats locaux.',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
        true
    ),
    (
        'sante-maternelle',
        'Santé maternelle',
        'Maternité',
        'Afrique centrale',
        '2 000 familles suivies',
        'Accompagnement des mères et nouveau-nés dans les communautés vulnérables.',
        'Réduire la mortalité maternelle de 30% dans les zones ciblées.',
        'Consultations prénatales, formation d''accoucheuses traditionnelles, kits de naissance.',
        'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
        true
    ),
    (
        'premiers-secours-communautaires',
        'Premiers secours communautaires',
        'Urgence',
        'Europe & Afrique',
        '300 agents formés',
        'Formation de premiers secouristes dans les communautés isolées.',
        'Former 500 agents d''ici fin 2026.',
        'Ateliers pratiques, certifications, mise en place de postes de secours.',
        'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80',
        true
    ),
    (
        'nutrition-prevention',
        'Nutrition & prévention',
        'Nutrition',
        'Afrique de l''Est',
        '1 200 enfants suivis',
        'Programme de lutte contre la malnutrition infantile.',
        'Réduire la malnutrition sévère de 40% dans les zones ciblées.',
        'Dépistage nutritionnel, distribution de compléments, éducation alimentaire.',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
        true
    ),
    (
        'centres-sante-partenaires',
        'Centres de santé partenaires',
        'Infrastructure',
        'Sahel',
        '18 centres appuyés',
        'Appui technique et matériel à des centres de santé existants.',
        'Rénover et équiper 25 centres d''ici 2027.',
        'Équipements médicaux, formation continue, supervision technique.',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
        true
    ),
    (
        'sante-mentale-soutien',
        'Santé mentale & soutien psychosocial',
        'Protection',
        'Zones urbaines',
        '900 consultations',
        'Soutien psychologique pour les populations affectées par les crises.',
        'Créer 5 centres de soutien psychosocial communautaires.',
        'Consultations individuelles et de groupe, formation de pairs aidants.',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
        true
    ) on conflict (slug) do nothing;