export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout', '/success'],
      },
    ],
    sitemap: 'https://amolisabores.com/sitemap.xml',
  };
}
