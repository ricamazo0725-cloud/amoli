import AliadosClient from './AliadosClient';

// Pagina estatica (no depende de datos de Supabase), asi que no necesita
// dynamic = 'force-dynamic' como product/blog/sitemap. Se puede generar
// en build time sin problema.

export async function generateMetadata() {
  return {
    // Sin sufijo "| AMOLI": el layout raiz ya aplica title.template
    // ('%s | AMOLI'). Repetirlo aqui duplicaria la marca (mismo bug que
    // ya se corrigio en home/producto/blog).
    title: 'Aliados — Vende AMOLI en tu tienda',
    description:
      '¿Tienes un minimercado o tienda saludable? Súmate como aliado y empieza a vender guacamole artesanal AMOLI en tu punto de venta.',
    alternates: { canonical: '/aliados' },
    openGraph: {
      title: 'Aliados — Vende AMOLI en tu tienda',
      description:
        '¿Tienes un minimercado o tienda saludable? Súmate como aliado y empieza a vender guacamole artesanal AMOLI en tu punto de venta.',
      url: 'https://amolisabores.com/aliados',
    },
  };
}

export default function AliadosPage() {
  return <AliadosClient />;
}
