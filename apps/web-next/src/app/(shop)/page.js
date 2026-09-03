import { getProducts } from '@/api/products';
import HomeClient from './HomeClient';

// generateMetadata corre en el servidor y su resultado SÍ llega al HTML que
// reciben los crawlers — a diferencia del react-helmet del proyecto Vite
// original, que solo actualizaba el <title> después de que el navegador
// ejecutara JavaScript. Esta es la causa raíz que arregla toda la migración.
// Sin "title" aquí a propósito: el layout raíz ya define
// title.default con este mismo texto. Si lo repetimos, Next aplica el
// title.template ('%s | AMOLI') sobre este valor y duplica la marca
// ("... | AMOLI | AMOLI"). Las demás páginas sí declaran su propio
// title corto porque quieren pasar por el template.
export const metadata = {
  description:
    'Guacamole 100% natural elaborado con aguacate Hass montañero de Antioquia. Descubre nuestros productos frescos elaborados de forma artesanal.',
  alternates: { canonical: '/' },
};

// force-dynamic: el catálogo se administra desde /admin y debe reflejarse
// sin tener que reconstruir el sitio — cada visita a "/" vuelve a consultar
// Supabase en el servidor (SSR real, no export estático).
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let initialProducts = [];
  try {
    initialProducts = await getProducts();
  } catch (error) {
    console.error('Error al cargar productos en el servidor:', error);
  }

  return <HomeClient initialProducts={initialProducts} />;
}
