import { supabase } from '@/lib/supabaseClient';

// crypto.randomUUID() solo existe en "contextos seguros" (https, o exactamente
// "localhost"). Si el sitio se abre por IP (ej. http://192.168.x.x) o un
// navegador viejo, no existe — por eso generamos el UUID a mano como respaldo.
function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0'));
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
  }
  // Último recurso (no criptográficamente seguro, pero suficiente para un id de pedido)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Crea un pedido con pago manual y sus items.
 * @param {Object} params
 * @param {{name:string, phone:string, email?:string, city?:string, address?:string, notes?:string}} params.customer
 * @param {Array<{product:{id:string,title:string}, unitPrice:number, quantity:number}>} params.items
 * @param {number} params.total
 * @returns {Promise<{id:string}>}
 */
export async function createManualOrder({ customer, items, total }) {
  // Generamos el id en el cliente y NO pedimos que Supabase nos devuelva la fila
  // (.select()) porque un visitante anónimo no tiene permiso para LEER pedidos
  // (solo para crearlos) — eso es lo que protege los datos de otros clientes.
  const orderId = generateUUID();

  const { error: orderError } = await supabase
    .from('orders')
    .insert([{
      id: orderId,
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email || null,
      customer_city: customer.city || null,
      customer_address: customer.address || null,
      notes: customer.notes || null,
      status: 'pendiente',
      total,
    }]);

  if (orderError) throw orderError;

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.product.id,
    product_title: item.product.title,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    subtotal: item.unitPrice * item.quantity,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  return { id: orderId };
}

/** Lista pedidos — solo admin (RLS lo exige). */
export async function getOrdersAdmin() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/** Actualiza el estado de un pedido — solo admin. */
export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
