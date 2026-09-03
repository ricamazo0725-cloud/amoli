import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/api/posts';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
      // Sin sufijo aqui: el layout raiz ya aplica title.template
      // ('%s | AMOLI'). Repetirlo duplica la marca (ver product/[id]/page.js).
      title: post.title,
      description: post.excerpt || undefined,
      alternates: { canonical: `/blog/${params.slug}` },
      openGraph: {
        title: `${post.title} | Blog AMOLI`,
        description: post.excerpt || undefined,
        images: post.cover_image ? [post.cover_image] : undefined,
        type: 'article',
      },
    };
  } catch (error) {
    return {};
  }
}

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

export default async function BlogPostPage({ params }) {
  let post = null;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    // getPostBySlug lanza si no existe o no está publicado (.single() de Supabase)
  }

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.published_at,
    author: { '@type': 'Organization', name: 'AMOLI' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Volver al blog
        </Link>

        <p className="text-sm text-muted-foreground">{formatDate(post.published_at)}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>}

        {post.cover_image && (
          <div className="mt-8 overflow-hidden rounded-sm border border-border">
            <img src={post.cover_image} alt={post.title} className="w-full object-cover" />
          </div>
        )}

        {post.content && (
          <div className="prose prose-invert mt-8 max-w-none whitespace-pre-line text-foreground">
            {post.content}
          </div>
        )}
      </article>
    </>
  );
}
