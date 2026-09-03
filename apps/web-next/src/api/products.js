import { supabase } from '@/lib/supabaseClient';

export const formatCOP = (value) => {
  const number = Number(value || 0);
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(number);
};

/**
 * Lista productos activos (para la tienda pública).
 * @param {Object} params
 * @param {number} [params.limit]
 * @param {string} [params.category]
 */
export async function getProducts({ limit, category } = {}) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/** Verifica que los productos sigan existiendo y activos (para validar el carrito antes de pagar). */
export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)
    .eq('is_active', true);

  if (error) throw error;
  return data || [];
}

/** Obtiene un solo producto activo por id (para la página de detalle pública). */
export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) throw error;
  return data;
}

/** Lista TODOS los productos (activos e inactivos) — solo para el panel de admin. */
export async function getAllProductsAdmin() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Crea un producto — requiere sesión de admin (RLS lo exige). */
export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Actualiza un producto — requiere sesión de admin. */
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Elimina un producto — requiere sesión de admin. */
export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
}
