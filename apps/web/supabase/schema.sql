-- ============================================================
-- ESQUEMA SUPABASE — AMOLI
-- Ejecuta este script completo en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1) Extensión para generar UUIDs
create extension if not exists "pgcrypto";

-- 2) Tabla de productos
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  ribbon_text text,
  category text,
  price numeric(12,2) not null default 0,
  sale_price numeric(12,2),
  stock integer not null default 0,
  images text[] not null default '{}',
  is_active boolean not null default true,
  "order" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Tabla de órdenes (pedidos con pago manual)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_city text,
  customer_address text,
  notes text,
  status text not null default 'pendiente', -- pendiente | confirmado | enviado | cancelado
  total numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

-- 4) Items de cada orden (snapshot del producto al momento de la compra)
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_title text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null,
  subtotal numeric(12,2) not null
);

-- 5) Trigger para mantener updated_at al día en products
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ============================================================
-- SEGURIDAD (Row Level Security)
-- ============================================================

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- PRODUCTOS: cualquier visitante puede ver los productos activos
drop policy if exists "public_read_active_products" on products;
create policy "public_read_active_products"
  on products for select
  to anon, authenticated
  using (is_active = true);

-- PRODUCTOS: solo un usuario logueado (el admin) puede crear/editar/borrar
drop policy if exists "admin_full_access_products" on products;
create policy "admin_full_access_products"
  on products for all
  to authenticated
  using (true)
  with check (true);

-- ORDENES: cualquier visitante puede crear un pedido (checkout manual)
drop policy if exists "anyone_can_create_orders" on orders;
create policy "anyone_can_create_orders"
  on orders for insert
  to anon, authenticated
  with check (true);

-- ORDENES: solo el admin logueado puede ver/editar pedidos
drop policy if exists "admin_read_orders" on orders;
create policy "admin_read_orders"
  on orders for select
  to authenticated
  using (true);

drop policy if exists "admin_update_orders" on orders;
create policy "admin_update_orders"
  on orders for update
  to authenticated
  using (true)
  with check (true);

-- ORDER_ITEMS: cualquier visitante puede insertar items al crear su pedido
drop policy if exists "anyone_can_create_order_items" on order_items;
create policy "anyone_can_create_order_items"
  on order_items for insert
  to anon, authenticated
  with check (true);

-- ORDER_ITEMS: solo el admin puede leerlos
drop policy if exists "admin_read_order_items" on order_items;
create policy "admin_read_order_items"
  on order_items for select
  to authenticated
  using (true);

-- ============================================================
-- DATOS DE EJEMPLO (opcional, puedes borrar este bloque desde /admin)
-- ============================================================
insert into products (title, subtitle, description, price, stock, images, category, "order")
values
  (
    'Guacamole AMOLI Picante 450g',
    'AMOLI',
    'Guacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.',
    22000, 20, '{}', 'Picante', 1
  ),
  (
    'Guacamole AMOLI Limonudo 450g',
    'AMOLI',
    'Guacamole 100% natural con trocitos de aguacate Hass montañero, con un toque cítrico de limón. Elaborado mediante un proceso artesanal, fresco y responsable.',
    22000, 20, '{}', 'Limonudo', 2
  )
on conflict do nothing;
