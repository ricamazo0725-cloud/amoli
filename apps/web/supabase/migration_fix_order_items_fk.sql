-- ============================================================
-- MIGRACIÓN: arregla la relación order_items → products
-- Ejecuta esto UNA VEZ si tu base de datos ya existía antes de este cambio
-- (si es un proyecto nuevo, no lo necesitas — schema.sql ya viene correcto).
-- Dashboard → SQL Editor → New query → pega esto → Run
-- ============================================================

alter table order_items drop constraint if exists order_items_product_id_fkey;

alter table order_items
  add constraint order_items_product_id_fkey
  foreign key (product_id) references products(id) on delete set null;
