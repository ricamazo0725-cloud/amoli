import { supabase } from '@/lib/supabaseClient';

/** Convierte un título en un slug de URL (ej. "Mi Post!" -> "mi-post"). */
export function slugify(text) {
  return (text || '')
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Lista posts publicados, del más reciente al más viejo (para la vista pública). */
export async function getPosts({ limit } = {}) {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/** Obtiene un post publicado por su slug (para la página de detalle pública). */
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) throw error;
  return data;
}

/** Lista TODOS los posts (publicados y borradores) — solo para el panel de admin. */
export async function getAllPostsAdmin() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Crea un post — requiere sesión de admin (RLS lo exige). */
export async function createPost(post) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Actualiza un post — requiere sesión de admin. */
export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Elimina un post — requiere sesión de admin. */
export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
  return true;
}
