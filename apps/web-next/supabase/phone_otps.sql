-- ============================================================
-- VERIFICACIÓN DE WHATSAPP (checkout) — AMOLI
-- Ejecuta este script en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists phone_otps (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  attempts integer not null default 0,
  consumed boolean not null default false,
  verified boolean not null default false,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists phone_otps_phone_created_idx
  on phone_otps (phone, created_at desc);

-- RLS activado y SIN políticas: ningún visitante (anon/authenticated) puede
-- leer ni escribir esta tabla directamente. Solo el backend (las rutas
-- /api/otp/send y /api/otp/verify), usando SUPABASE_SERVICE_ROLE_KEY, puede
-- acceder — esa clave ignora RLS. Así el código de verificación nunca queda
-- expuesto al navegador ni a la anon key pública.
alter table phone_otps enable row level security;
