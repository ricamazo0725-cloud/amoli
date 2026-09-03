import { getProducts } from '@/api/products';
import CatalogClient from '../CatalogClient';

export const metadata = {
  title: 'Ofertas',
  description: 'Aprovecha las ofertas actuales en guacamole artesanal AMOLI. Sabores Limonudo y Picante a precio especial por tiempo limitado.',
  alternates: { canonical: '/ofertas' },
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
      title="Ofertas"
      kicker="Promociones"
      description="Descuentos vigentes en nuestros frascos de guacamole artesanal."
      initialProducts={initialProducts}
    />
  );
}
