// Cliente para las rutas /api/otp/* (verificación de WhatsApp en el checkout).
// A diferencia de src/api/orders.js, estas NO hablan directo con Supabase:
// pasan por el servidor (app/api/otp/**/route.js) porque generar/validar el
// código y llamar al webhook de n8n necesita la service_role key, que nunca
// debe llegar al navegador.

/** @returns {Promise<{ok:true, expiresInSeconds:number}>} */
export async function sendOtp(phone) {
  const res = await fetch('/api/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'No se pudo enviar el código.');
  return data;
}

/** @returns {Promise<{ok:true}>} */
export async function verifyOtp(phone, code) {
  const res = await fetch('/api/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Código incorrecto.');
  return data;
}
