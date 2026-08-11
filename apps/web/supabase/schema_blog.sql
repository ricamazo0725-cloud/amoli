-- ============================================================
-- ESQUEMA SUPABASE — Blog
-- Ejecuta esto DESPUÉS de haber corrido schema.sql (necesita la función
-- set_updated_at() que ya se creó ahí).
-- Dashboard → SQL Editor → New query → pega esto → Run
-- ============================================================

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on posts (slug);
create index if not exists posts_published_idx on posts (is_published, published_at desc);

drop trigger if exists trg_posts_updated_at on posts;
create trigger trg_posts_updated_at
  before update on posts
  for each row execute function set_updated_at();

alter table posts enable row level security;

-- Cualquier visitante puede ver los posts publicados
drop policy if exists "public_read_published_posts" on posts;
create policy "public_read_published_posts"
  on posts for select
  to anon, authenticated
  using (is_published = true);

-- Solo el admin logueado puede crear/editar/borrar posts (y ver los borradores)
drop policy if exists "admin_full_access_posts" on posts;
create policy "admin_full_access_posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);
