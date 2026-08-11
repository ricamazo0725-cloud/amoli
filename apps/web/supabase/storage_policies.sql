-- ============================================================
-- POLÍTICAS DE STORAGE — bucket "product-images"
-- Ejecuta esto DESPUÉS de crear el bucket "product-images" desde
-- Storage → Create bucket (marcado como "Public bucket").
-- Dashboard → SQL Editor → New query → pega esto → Run
-- ============================================================

-- Cualquiera puede VER las imágenes (para que se muestren en la tienda pública)
drop policy if exists "public_read_product_images" on storage.objects;
create policy "public_read_product_images"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

-- Solo el admin logueado puede SUBIR imágenes
drop policy if exists "admin_upload_product_images" on storage.objects;
create policy "admin_upload_product_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

-- Solo el admin logueado puede REEMPLAZAR imágenes
drop policy if exists "admin_update_product_images" on storage.objects;
create policy "admin_update_product_images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

-- Solo el admin logueado puede BORRAR imágenes
drop policy if exists "admin_delete_product_images" on storage.objects;
create policy "admin_delete_product_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
