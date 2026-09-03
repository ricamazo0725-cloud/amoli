import { notFound } from 'next/navigation';
import { getProduct } from '@/api/products';
import ProductDetailClient from '../ProductDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const product = await getProduct(params.id);
    if (!product) return {};
    return {
      title: `${product.title} - AMOLI`,
      description: product.description?.substring(0, 160) || product.title,
      alternates: { canonical: `/product/${params.id}` },
      openGraph: {
        title: `${product.title} - AMOLI`,
        description: product.description?.substring(0, 160) || product.title,
        images: product.images?.[0] ? [product.images[0]] : undefined,
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function ProductPage({ params }) {
  let product = null;
  try {
    product = await getProduct(params.id);
  } catch (error) {
    // getProduct lanza si el producto no existe o no está activo (.single() de Supabase)
  }

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    image: product.images || [],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price: String(product.sale_price ?? product.price),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://amolisabores.com/product/${product.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
        <ProductDetailClient product={product} />
      </div>
    </>
  );
}
