import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con la service_role key — IGNORA Row Level Security.
// Solo debe importarse desde código que corre en el servidor (rutas
// app/api/**/route.js). Nunca lo importes desde un componente 'use client'
// ni desde src/api/*.js (esos corren en el navegador con la anon key).
//
// Se crea de forma perezosa (no al importar el módulo) porque `next build`
// carga las rutas para inspeccionarlas incluso sin variables de entorno
// configuradas, y @supabase/supabase-js lanza un error si la key viene vacía.
let cachedClient;

export function getSupabaseAdmin() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY. ' +
      'La verificación de WhatsApp (envío/validación de código) no va a funcionar. ' +
      'Copia la service_role key desde Supabase Dashboard → Project Settings → API ' +
      'y agrégala como SUPABASE_SERVICE_ROLE_KEY en apps/web-next/.env (¡sin el prefijo NEXT_PUBLIC_!).'
    );
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cachedClient;
}
