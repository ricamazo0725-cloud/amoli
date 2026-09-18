import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { validatePhone, sanitizePhone } from '@/lib/validation';

export const runtime = 'nodejs';

const CODE_TTL_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_SENDS_PER_WINDOW = 3;
const SEND_WINDOW_MINUTES = 15;

function hashCode(phone, code) {
  return crypto.createHash('sha256').update(`${phone}:${code}`).digest('hex');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const phone = sanitizePhone(body?.phone);
  const phoneError = validatePhone(phone);
  if (phoneError) {
    return NextResponse.json({ error: phoneError }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_OTP_WEBHOOK_URL;
  if (!webhookUrl) {
    // eslint-disable-next-line no-console
    console.error('N8N_OTP_WEBHOOK_URL no está configurada — no se puede enviar el código por WhatsApp.');
    return NextResponse.json({ error: 'El envío de códigos no está disponible en este momento.' }, { status: 503 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return NextResponse.json({ error: 'El envío de códigos no está disponible en este momento.' }, { status: 503 });
  }

  const now = new Date();

  // Reutilizamos la misma consulta para el cooldown de reenvío y el límite
  // de intentos por ventana de tiempo (evita spamear WhatsApp/Evolution).
  const { data: recent, error: recentError } = await supabaseAdmin
    .from('phone_otps')
    .select('created_at')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(MAX_SENDS_PER_WINDOW);

  if (recentError) {
    // eslint-disable-next-line no-console
    console.error('Error consultando phone_otps:', recentError);
    return NextResponse.json({ error: 'No se pudo enviar el código. Intenta de nuevo.' }, { status: 500 });
  }

  if (recent?.[0]) {
    const secondsSinceLast = (now.getTime() - new Date(recent[0].created_at).getTime()) / 1000;
    if (secondsSinceLast < RESEND_COOLDOWN_SECONDS) {
      return NextResponse.json(
        { error: `Espera ${Math.ceil(RESEND_COOLDOWN_SECONDS - secondsSinceLast)} segundos antes de pedir otro código.` },
        { status: 429 }
      );
    }
  }

  const windowStart = new Date(now.getTime() - SEND_WINDOW_MINUTES * 60 * 1000);
  const sendsInWindow = (recent || []).filter((r) => new Date(r.created_at) > windowStart).length;
  if (sendsInWindow >= MAX_SENDS_PER_WINDOW) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera unos minutos antes de volver a pedir un código.' },
      { status: 429 }
    );
  }

  const code = crypto.randomInt(100000, 1000000).toString();
  const expiresAt = new Date(now.getTime() + CODE_TTL_SECONDS * 1000);

  const { error: insertError } = await supabaseAdmin.from('phone_otps').insert([{
    phone,
    code_hash: hashCode(phone, code),
    expires_at: expiresAt.toISOString(),
  }]);

  if (insertError) {
    // eslint-disable-next-line no-console
    console.error('Error guardando el código OTP:', insertError);
    return NextResponse.json({ error: 'No se pudo enviar el código. Intenta de nuevo.' }, { status: 500 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'otp.send',
        phone,
        code,
        expires_in_seconds: CODE_TTL_SECONDS,
      }),
    });
    if (!res.ok) throw new Error(`n8n respondió ${res.status}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error notificando a n8n para enviar el código por WhatsApp:', error);
    return NextResponse.json({ error: 'No se pudo enviar el código por WhatsApp. Intenta de nuevo.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, expiresInSeconds: CODE_TTL_SECONDS });
}
