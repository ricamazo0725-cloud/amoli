import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, XCircle } from 'lucide-react';
import { getPostBySlug } from '@/api/posts';

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostBySlug(slug);
        if (!cancelled) setPost(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'No se pudo cargar el artículo');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Volver al blog
        </Link>
        <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-10 text-center text-destructive-foreground">
          <XCircle className="mx-auto mb-4 h-12 w-12" />
          <p>No encontramos este artículo{error ? `: ${error}` : '.'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog AMOLI</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Helmet>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
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
};

export default BlogPostPage;
