import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart as CartIcon, Menu, Truck, Leaf, ShieldCheck, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import ShoppingCartPanel from '@/components/ShoppingCart';

const NAV = [
  { href: '/#productos', label: 'Productos' },
  { href: '/#filosofia', label: 'Nuestra Filosofía' },
  { to: '/aliados', label: 'Vende AMOLI', isButton: true },
  { href: '/#contacto', label: 'Contacto' },
];

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const count = cartItems.reduce((n, i) => n + i.quantity, 0);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* BARRA SUPERIOR ANIMADA */}
      <div className="bg-foreground text-background text-xs sm:text-sm overflow-hidden">
        <div className="flex w-max ticker">
          {[0, 1].map((k) => (
            <div key={k} className="flex w-max shrink-0 items-center py-2 px-4 font-semibold uppercase tracking-wide gap-8 pr-8">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <Leaf size={14} className="shrink-0" /> 100% aguacate Hass montañero de Antioquia
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <ShieldCheck size={14} className="shrink-0" /> Guacamole real, sin artificios
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <Truck size={14} className="shrink-0" /> Envío refrigerado a tu puerta
              </span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-4 sm:px-8">

          {/* Logo / Marca más grande sin subtítulo */}
          <Link to="/" className="font-display text-4xl sm:text-5xl font-black leading-none tracking-tighter transition-colors hover:text-primary">
            AMOLI
          </Link>

          {/* Menú de Navegación Escritorio */}
          <nav className="hidden lg:flex items-center gap-8 font-heading text-sm font-bold uppercase tracking-wider">
            {NAV.map((n, idx) =>
              n.isButton ? (
                <Link
                  key={idx}
                  to={n.to}
                  className="rounded-xl border-2 border-foreground bg-foreground text-background px-4 py-2 text-xs font-black uppercase transition-all hover:bg-primary hover:text-primary-foreground shadow-[2px_2px_0px_0px_rgba(42,42,42,1)]"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={n.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-1"
                >
                  {n.label}
                </a>
              )
            )}
          </nav>

          {/* Acciones de la derecha (Carrito + Menú Móvil) */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-11 min-w-[44px] items-center gap-2 rounded-full bg-foreground px-4 font-display font-bold tracking-wide text-background transition active:scale-[0.98]"
            >
              <CartIcon size={18} /> <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
            <button className="h-11 w-11 lg:hidden flex items-center justify-center border-2 border-foreground rounded-xl" onClick={() => setMenuOpen((v) => !v)} aria-label="Menú">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Menú Desplegable Móvil */}
        {menuOpen && (
          <nav className="border-t border-border px-4 py-4 lg:hidden bg-background space-y-3 font-heading font-bold uppercase text-sm">
            {NAV.map((n, idx) =>
              n.isButton ? (
                <Link
                  key={idx}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg p-2 bg-foreground text-background text-center"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-border/60 py-2 text-foreground hover:text-primary"
                >
                  {n.label}
                </a>
              )
            )}
          </nav>
        )}
      </header>

      <main key={location.pathname} className="flex-1">{children}</main>

      <footer className="border-t-2 border-foreground bg-foreground text-sm text-background/70">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-black text-background">AMOLI</p>
            <p className="mt-3 max-w-xs">Guacamole elaborado mediante un proceso artesanal, fresco y responsable, con aguacate Hass montañero de Antioquia.</p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-background">Tienda</p>
            <ul className="mt-3 space-y-2">
              <li><a href="/#productos" className="hover:text-primary">Productos (450g)</a></li>
              <li><a href="/#filosofia" className="hover:text-primary">Nuestra Filosofía</a></li>
              <li><Link to="/aliados" className="hover:text-primary">Aliados B2B</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-background">Envíos y pagos</p>
            <ul className="mt-3 space-y-2">
              <li>Envío refrigerado</li>
              <li>Entrega 24-72 h</li>
              <li>Transferencia bancaria</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-background">Contacto</p>
            <ul className="mt-3 space-y-2">
              <li>WhatsApp: +57 300 290 2010</li>
              <li>saboresamoli@gmail.com</li>
              <li>Cra. 39B #45A Sur-07, Envigado, Ant.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 px-4 py-5 text-center text-xs sm:px-8">
          © {new Date().getFullYear()} AMOLI. Todos los derechos reservados.
        </div>
      </footer>

      <ShoppingCartPanel isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </div>
  );
};

export default Layout;