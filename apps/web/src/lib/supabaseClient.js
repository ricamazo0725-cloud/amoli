import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. ' +
    'Crea un archivo .env en la raíz del proyecto (apps/web/.env) con esos valores. ' +
    'Revisa apps/web/.env.example.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
