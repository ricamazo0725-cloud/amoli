'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxODE4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbiBpbWFnZW48L3RleHQ+Cjwvc3ZnPgo=";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
};

/** @param {{ posts: Array }} props - posts ya cargados en el servidor (page.js) */
const BlogListClient = ({ posts }) => {
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="font-display text-xs font-bold tracking-[0.3em] text-primary">BLOG</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Guías de nutrición</h1>
        <p className="mt-4 text-muted-foreground">
          Consejos de suplementación y los productos que recomendamos para cada objetivo.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
          Todavía no hay artículos publicados.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 6) * 0.06 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary">
                  <div className="aspect-video overflow-hidden bg-[#0d0d0d]">
                    <img
                      src={post.cover_image || placeholderImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-muted-foreground">{formatDate(post.published_at)}</p>
                    <h2 className="mt-2 font-display text-xl font-bold leading-tight">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Leer más <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListClient;
