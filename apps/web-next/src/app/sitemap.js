import { getProducts } from '@/api/products';
import { getPosts } from '@/api/posts';

const BASE_URL = 'https://amolisabores.com';

export default async function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: 'daily' },
    { url: `${BASE_URL}/productos`, priority: 0.9, changeFrequency: 'daily' },
    { url: `${BASE_URL}/marcas`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/combos`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/ofertas`, priority: 0.7, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/blog`, priority: 0.6, changeFrequency: 'weekly' },
  ];

  let productRoutes = [];
  try {
    const products = await getProducts();
    productRoutes = (products || []).map((p) => ({
      url: `${BASE_URL}/product/${p.id}`,
      priority: 0.8,
      changeFrequency: 'weekly',
    }));
  } catch (error) {
    console.error('sitemap: failed to load products', error);
  }

  let postRoutes = [];
  try {
    const posts = await getPosts();
    postRoutes = (posts || []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
    }));
  } catch (error) {
    console.error('sitemap: failed to load posts', error);
  }

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
