import { getProducts } from '@/api/products';
import CatalogClient from '../CatalogClient';

export const metadata = {
  title: 'Sabores',
  description: 'Conoce los sabores de AMOLI: Limonudo y Picante. Guacamole artesanal 100% natural con aguacate Hass montañero de Antioquia.',
  alternates: { canonical: '/marcas' },
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  let initialProducts = [];
  try {
    initialProducts = await getProducts();
  } catch (error) {
    console.error('Error al cargar productos en el servidor:', error);
  }

  return (
    <CatalogClient
      title="Sabores"
      kicker="Nuestros dos sabores"
      description="Limonudo y Picante — el mismo guacamole artesanal, con un toque distinto para cada antojo."
      initialProducts={initialProducts}
    />
  );
}
