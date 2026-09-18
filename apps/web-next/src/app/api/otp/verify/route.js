import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { sanitizePhone } from '@/lib/validation';

export const runtime = 'nodejs';

const MAX_ATTEMPTS = 5;

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
  const code = (body?.code || '').trim();
  if (!phone || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Código inválido.' }, { status: 400 });
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return NextResponse.json({ error: 'No se pudo verificar el código en este momento.' }, { status: 503 });
  }

  const { data: otp, error } = await supabaseAdmin
    .from('phone_otps')
    .select('*')
    .eq('phone', phone)
    .eq('consumed', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error consultando phone_otps:', error);
    return NextResponse.json({ error: 'No se pudo verificar el código. Intenta de nuevo.' }, { status: 500 });
  }

  if (!otp || new Date(otp.expires_at) < new Date()) {
    return NextResponse.json({ error: 'El código venció. Pide uno nuevo.' }, { status: 400 });
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    await supabaseAdmin.from('phone_otps').update({ consumed: true }).eq('id', otp.id);
    return NextResponse.json({ error: 'Demasiados intentos. Pide un código nuevo.' }, { status: 429 });
  }

  if (otp.code_hash !== hashCode(phone, code)) {
    const attempts = otp.attempts + 1;
    await supabaseAdmin.from('phone_otps').update({ attempts }).eq('id', otp.id);
    const remaining = MAX_ATTEMPTS - attempts;
    return NextResponse.json(
      { error: remaining > 0 ? `Código incorrecto. Te quedan ${remaining} intentos.` : 'Código incorrecto. Pide un código nuevo.' },
      { status: 400 }
    );
  }

  await supabaseAdmin.from('phone_otps').update({ consumed: true, verified: true }).eq('id', otp.id);

  return NextResponse.json({ ok: true });
}
