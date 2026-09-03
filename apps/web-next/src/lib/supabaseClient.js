import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Crea un archivo .env en apps/web-next/.env con esos valores (revisa apps/web-next/.env.example), ' +
    'o si estás en Hostinger, confirma que están guardadas en la configuración de variables de entorno ' +
    'de la app Node.js y que el build se ejecutó DESPUÉS de guardarlas (las variables NEXT_PUBLIC_* ' +
    'quedan incrustadas en el código en el momento del build, no se leen en caliente).'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
