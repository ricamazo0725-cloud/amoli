import { getProducts } from '@/api/products';
import CatalogClient from '../CatalogClient';

export const metadata = {
  title: 'Productos',
  description: 'Descubre los dos sabores de guacamole 100% natural de AMOLI: Limonudo y Picante. Sin conservantes, hecho a mano con aguacate Hass.',
  alternates: { canonical: '/productos' },
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
      title="Productos"
      kicker="Catálogo"
      description="Guacamole artesanal elaborado con aguacate Hass montañero de Antioquia."
      initialProducts={initialProducts}
    />
  );
}
