import { getProducts } from '@/api/products';
import CatalogClient from '../CatalogClient';

export const metadata = {
  title: 'Combos',
  description: 'Combos de guacamole artesanal AMOLI ideales para eventos, restaurantes y consumo en casa. Combina Limonudo y Picante.',
  alternates: { canonical: '/combos' },
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
      title="Combos"
      kicker="Packs para compartir"
      description="Combina Limonudo y Picante en packs con precio especial."
      initialProducts={initialProducts}
    />
  );
}
