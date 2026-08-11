// Envía eventos del negocio (pedidos nuevos, etc.) a un webhook de n8n para
// que puedas automatizar cosas ahí: confirmación por WhatsApp, alertas de
// stock bajo, notificaciones internas, sincronizar con un CRM, etc.
//
// Configura la URL de tu webhook en apps/web/.env:
//   VITE_N8N_WEBHOOK_URL=https://tu-n8n.tudominio.com/webhook/pedidos
//
// Si no está configurada, esta función simplemente no hace nada (no rompe
// el checkout). Si el webhook falla (n8n caído, URL mala, etc.), tampoco
// rompe el checkout — el pedido ya quedó guardado en Supabase de todas
// formas; solo se registra el error en la consola.

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

/**
 * Notifica a n8n que se creó un pedido nuevo.
 * @param {Object} params
 * @param {Object} params.order - El pedido recién creado (con al menos `id`).
 * @param {{name:string, phone:string, email?:string, city?:string, address?:string, notes?:string}} params.customer
 * @param {Array<{product:{id:string,title:string}, unitPrice:number, quantity:number}>} params.items
 * @param {number} params.total
 */
export async function notifyN8nNewOrder({ order, customer, items, total }) {
  if (!N8N_WEBHOOK_URL) {
    // eslint-disable-next-line no-console
    console.warn('VITE_N8N_WEBHOOK_URL no está configurada — no se notificó a n8n.');
    return;
  }

  const payload = {
    event: 'order.created',
    order_id: order.id,
    total,
    customer,
    items: items.map((item) => ({
      product_id: item.product.id,
      product_title: item.product.title,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.unitPrice * item.quantity,
    })),
    created_at: new Date().toISOString(),
  };

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // No interrumpimos el checkout si n8n no responde — el pedido ya está
    // guardado en Supabase. Solo lo dejamos registrado para depurar.
    // eslint-disable-next-line no-console
    console.error('No se pudo notificar a n8n:', error);
  }
}
