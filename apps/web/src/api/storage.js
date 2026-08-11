import { supabase } from '@/lib/supabaseClient';

const BUCKET = 'product-images';

function sanitizeFileName(name) {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .toLowerCase();
}

/**
 * Sube una imagen al bucket "product-images" y devuelve su URL pública.
 * @param {File} file
 * @returns {Promise<string>} URL pública de la imagen
 */
export async function uploadProductImage(file) {
  const ext = file.name.split('.').pop();
  const safeName = sanitizeFileName(file.name.replace(`.${ext}`, ''));
  const path = `products/${Date.now()}-${safeName}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Sube una imagen de portada de blog al mismo bucket (carpeta "blog/").
 * @param {File} file
 * @returns {Promise<string>} URL pública de la imagen
 */
export async function uploadBlogImage(file) {
  const ext = file.name.split('.').pop();
  const safeName = sanitizeFileName(file.name.replace(`.${ext}`, ''));
  const path = `blog/${Date.now()}-${safeName}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
