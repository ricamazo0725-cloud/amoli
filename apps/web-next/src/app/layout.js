import Script from 'next/script';
import './globals.css';
import Providers from '@/components/Providers';

// metadataBase habilita URLs absolutas automáticas para openGraph/canonical
// en cada page.js — sin esto, Next arma las URLs relativas al dominio donde
// se ejecuta el build, no al dominio real del sitio.
export const metadataBase = new URL('https://amolisabores.com');

export const metadata = {
  metadataBase,
  title: {
    default: 'AMOLI | Guacamole artesanal, real y honesto',
    template: '%s | AMOLI',
  },
  description:
    'Guacamole 100% natural elaborado con aguacate Hass montañero de Antioquia, mediante un proceso artesanal, fresco y responsable. Sabores Limonudo y Picante.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'AMOLI',
    title: 'AMOLI | Guacamole artesanal, real y honesto',
    description: 'Guacamole 100% natural con aguacate Hass montañero de Antioquia. Sabores Limonudo y Picante.',
    url: 'https://amolisabores.com/',
    images: ['/og-image.jpg'],
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMOLI | Guacamole artesanal, real y honesto',
    description: 'Guacamole 100% natural con aguacate Hass montañero de Antioquia.',
    images: ['/og-image.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EF3608',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AMOLI',
  url: 'https://amolisabores.com/',
  logo: 'https://amolisabores.com/logo.png',
  description: 'Guacamole artesanal elaborado con aguacate Hass montañero de Antioquia.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+57-300-290-2010',
    contactType: 'customer service',
    areaServed: 'CO',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-494MCYFSWX" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-494MCYFSWX');
          `}
        </Script>
      </body>
    </html>
  );
}
