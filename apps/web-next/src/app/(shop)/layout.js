import SiteChrome from '@/components/SiteChrome';

// Envuelve solo las rutas de la tienda pública con header/carrito/footer.
// El grupo de rutas "(shop)" no agrega segmento a la URL: app/(shop)/productos
// sigue sirviendo /productos. /admin/* usa su propio layout, sin este chrome
// — igual que el App.jsx original, que renderizaba <Layout> solo fuera de /admin.
export default function ShopLayout({ children }) {
  return <SiteChrome>{children}</SiteChrome>;
}
