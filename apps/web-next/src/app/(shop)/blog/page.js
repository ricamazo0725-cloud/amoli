import { getPosts } from '@/api/posts';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: 'Blog | AMOLI',
  description: 'Recetas y tips para disfrutar tu guacamole AMOLI.',
  alternates: { canonical: '/blog' },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error al cargar posts en el servidor:', error);
  }

  return <BlogListClient posts={posts} />;
}
