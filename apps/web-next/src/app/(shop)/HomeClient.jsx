'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Leaf,
  ChefHat,
  Mountain,
  MessageCircle,
  Star,
  Minus,
  Plus,
  ChevronDown,
  ListCheck,
  Snowflake,
  Loader2
} from 'lucide-react';
import ProductsList from '@/components/ProductsList';
import { getProducts, formatCOP } from '@/api/products';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { WHATSAPP_NUMBER } from '@/lib/contact';

const HARD_SHADOW = 'shadow-[6px_6px_0px_0px_rgba(42,42,42,1)]';
const HARD_SHADOW_LG = 'shadow-[8px_8px_0px_0px_rgba(42,42,42,1)]';
const HARD_SHADOW_SM = 'shadow-[3px_3px_0px_0px_rgba(42,42,42,1)]';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxODE4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbiBpbWFnZW48L3RleHQ+Cjwvc3ZnPgo=";

/**
 * @param {{ initialProducts: Array }} props - productos ya cargados en el
 *   servidor (page.js) para que el HTML inicial traiga el producto
 *   destacado real, en vez de arrancar en estado "cargando".
 */
const HomeClient = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (initialProducts.length === 0) return null;
    return initialProducts.find(p => p.title.toLowerCase().includes('limonudo')) || initialProducts[0];
  });
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (initialProducts.length > 0) return; // ya vino del servidor
    let isMounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (isMounted && data && data.length > 0) {
          setProducts(data);
          const defaultProd = data.find(p => p.title.toLowerCase().includes('limonudo')) || data[0];
          setSelectedProduct(defaultProd);
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setQuantity(1);
  };

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const toggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const unitPrice = selectedProduct?.sale_price ?? selectedProduct?.price ?? 18500;
  const totalPriceFormatted = formatCOP(unitPrice * quantity);
  const isPicante = selectedProduct?.title?.toLowerCase().includes('picante');
  // Limonudo primero en los selectores de sabor.
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aFirst = a.title.toLowerCase().includes('limonudo') ? 0 : 1;
      const bFirst = b.title.toLowerCase().includes('limonudo') ? 0 : 1;
      return aFirst - bFirst;
    });
  }, [products]);
  // El nombre del producto en la base de datos trae el peso al final (ej.
  // "Guacamole AMOLI Picante 450g"); esa info ya se muestra en las
  // etiquetas de presentación, así que la quitamos del título visible.
  const cleanTitle = (title) => (title || '').replace(/\s*\d+\s*g\.?\s*$/i, '').trim();
  const displayTitle = cleanTitle(selectedProduct?.title);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    try {
      addToCart(selectedProduct, quantity);
      toast({
        title: 'Añadido al carrito',
        description: `${quantity}x ${cleanTitle(selectedProduct.title)} añadido a tu pedido.`,
      });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">

      <section className="border-b-2 border-foreground">
        <div className="relative h-[42vh] min-h-[260px] w-full overflow-hidden sm:h-[52vh] lg:h-[64vh]">
          <img
            src="/images/hero-amoli-jars.jpg"
            alt="Frascos de guacamole AMOLI sobre aguacates frescos"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="bg-secondary">
          <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-8 px-4 py-12 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                Una marca joven, fresca y consciente.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                AMOLI nace para llevar a la categoría de refrigerados un guacamole visible, honesto y de alta rotación: sabor de aguacate, textura real y una imagen que se reconoce desde la góndola.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <span className="font-display text-6xl font-black leading-none tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                AMOLI
              </span>
            </div>
          </div>

          <div className="border-t-2 border-foreground bg-foreground py-4">
            <p className="mx-auto max-w-[90rem] px-4 text-center font-heading text-xs font-black uppercase tracking-[0.2em] text-background sm:text-sm">
              Vida sana · Frescura · Natural · Sin conservantes
            </p>
          </div>
        </div>
      </section>

      <section id="producto-destacado" className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-12 border-b-2 border-foreground">
        {loading ? (
          <div className="flex h-[400px] items-center justify-center rounded-2xl border-2 border-foreground bg-card p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 font-heading text-sm font-bold uppercase">Cargando productos desde la base de datos...</span>
          </div>
        ) : selectedProduct ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">

            <div className="space-y-4 lg:col-span-7">
              <div className={`relative overflow-hidden rounded-2xl border-2 border-foreground bg-secondary ${HARD_SHADOW_LG}`}>

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-foreground bg-background px-3 py-1.5 font-heading text-xs font-bold uppercase text-foreground shadow">
                    🌿 100% Natural
                  </span>
                  <span className={`rounded-full px-3 py-1.5 font-heading text-xs font-black uppercase text-foreground shadow ${isPicante ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                    {isPicante ? '🔥 Picante' : '🍋 Limonudo'}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-md border border-foreground bg-accent px-3 py-1.5 font-mono text-xs font-bold text-foreground">
                    450g CONT. NETO
                  </span>
                </div>

                <div className="relative flex h-[380px] items-center justify-center overflow-hidden p-8 sm:h-[460px]">
                  <motion.img
                    key={selectedProduct.id}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProduct.images?.[0] || placeholderImage}
                    alt={selectedProduct.title}
                    className="h-full max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 border-t-2 border-foreground bg-background p-4">
                  {sortedProducts.map((p) => {
                    const active = selectedProduct.id === p.id;
                    const isP = p.title.toLowerCase().includes('picante');
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className={`flex h-16 min-w-[130px] flex-col items-center justify-center rounded-xl border-2 px-4 py-2 transition-all ${active
                          ? `${isP ? 'border-primary bg-primary/10' : 'border-foreground bg-accent/30'} ring-2 ring-foreground ${HARD_SHADOW_SM}`
                          : 'border-foreground bg-background hover:bg-muted'
                          }`}
                      >
                        <span className="font-display text-xl font-black text-foreground">AMOLI</span>
                        <span className={`text-xs font-black uppercase ${isP ? 'text-primary' : 'text-lime-700'}`}>
                          {isP ? '🔥 Picante' : '🍋 Limonudo'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                  <Leaf className="mx-auto mb-1 h-5 w-5 text-lime-600" />
                  <span className="block font-heading text-xs font-bold uppercase">Sin Conservantes</span>
                  <span className="text-[10px] text-muted-foreground">Receta Limpia</span>
                </div>
                <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                  <ChefHat className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <span className="block font-heading text-xs font-bold uppercase">Sabor Real</span>
                  <span className="text-[10px] text-muted-foreground">Sin Rellenos</span>
                </div>
                <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                  <Mountain className="mx-auto mb-1 h-5 w-5 text-foreground" />
                  <span className="block font-heading text-xs font-bold uppercase">Origen Local</span>
                  <span className="text-[10px] text-muted-foreground">Envigado, Antioquia</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">

              <div className="border-b-2 border-foreground pb-6">
                <div className="mb-2 flex items-center justify-end">
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                <h1 className="font-display text-4xl font-black leading-none tracking-tight text-foreground sm:text-5xl">
                  {displayTitle}
                </h1>

                <p className="mt-3 text-sm font-medium text-muted-foreground leading-relaxed">
                  {selectedProduct.subtitle || selectedProduct.description?.replace(/<[^>]*>/g, '')}
                </p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-4xl font-black text-primary">
                    {formatCOP(unitPrice)}
                  </span>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                    Frescura garantizada
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-heading text-xs font-bold uppercase tracking-wider text-foreground">
                  1. SELECCIONA EL SABOR: <span className="font-black text-primary">{displayTitle.toUpperCase()}</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sortedProducts.map((p) => {
                    const isSelected = p.id === selectedProduct.id;
                    const isP = p.title.toLowerCase().includes('picante');
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className={`flex items-center justify-center gap-2 rounded-xl border-2 border-foreground py-3.5 px-4 font-heading text-sm font-black uppercase transition-all ${isSelected
                          ? `${isP ? 'bg-primary text-primary-foreground' : 'bg-accent text-foreground'} ${HARD_SHADOW_SM}`
                          : 'bg-background text-foreground hover:bg-muted'
                          }`}
                      >
                        {isP ? '🔥 PICANTE' : '🍋 LIMONUDO'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <div className={`flex items-center overflow-hidden rounded-xl border-2 border-foreground bg-background ${HARD_SHADOW_SM}`}>
                  <button
                    onClick={() => handleQtyChange(-1)}
                    className="px-4 py-3 text-foreground transition-colors hover:bg-muted"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[40px] text-center font-mono text-lg font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    className="px-4 py-3 text-foreground transition-colors hover:bg-muted"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-accent px-6 py-3.5 font-heading text-base font-black uppercase text-foreground transition-all hover:brightness-95 active:translate-y-0.5 ${HARD_SHADOW}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Agregar al Carrito ({totalPriceFormatted})</span>
                </button>
              </div>

              <div className="space-y-3 border-t-2 border-foreground pt-4">
                <div className="overflow-hidden rounded-xl border-2 border-foreground bg-background">
                  <button
                    onClick={() => toggleAccordion('acc-1')}
                    className="flex w-full items-center justify-between bg-secondary p-4 text-left font-heading text-sm font-bold uppercase hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <ListCheck className="h-4 w-4 text-primary" /> Ingredientes y Nutrición
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'acc-1' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'acc-1' && (
                    <div className="space-y-3 border-t-2 border-foreground bg-background p-4 text-xs text-muted-foreground">
                      <p><strong>INGREDIENTES:</strong> Aguacate Hass, Limón, Cilantro, Cebolla, Vinagre Blanco, Sal Marina (y Ají/Especias para versión Picante).</p>
                      <div className="space-y-1 rounded-lg bg-secondary p-3 font-mono text-[11px] text-foreground">
                        <p className="border-b border-border pb-1 font-bold">INFORMACIÓN NUTRICIONAL (Porción 30g)</p>
                        <div className="flex justify-between"><span>Energía:</span> <span>61 kcal</span></div>
                        <div className="flex justify-between"><span>Grasa Total (Saludable):</span> <span>11 g</span></div>
                        <div className="flex justify-between"><span>Sodio:</span> <span>800 mg</span></div>
                        <div className="flex justify-between"><span>Carbohidratos:</span> <span>3.4 g</span></div>
                      </div>
                      <p className="text-[10px] italic">* Registro Sanitario: RSA-0012502-2021 | Elaborado en Envigado, Antioquia.</p>
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border-2 border-foreground bg-background">
                  <button
                    onClick={() => toggleAccordion('acc-2')}
                    className="flex w-full items-center justify-between bg-secondary p-4 text-left font-heading text-sm font-bold uppercase hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <Snowflake className="h-4 w-4 text-cyan-600" /> Conservación en Frío
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openAccordion === 'acc-2' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'acc-2' && (
                    <div className="space-y-2 border-t-2 border-foreground bg-background p-4 text-xs text-muted-foreground">
                      <p>• Almacenar refrigerado entre <strong>0°C y 4°C</strong>.</p>
                      <p>• Producto fresco 100% natural sin conservantes químicos.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        ) : null}
      </section>

      <section className="relative overflow-hidden border-b-2 border-foreground bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(195,246,71,0.35),transparent_50%),radial-gradient(circle_at_85%_75%,rgba(239,54,8,0.15),transparent_50%)]" />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-block rounded-full border-2 border-foreground bg-background px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest"
            >
              🌿 100% natural · Aguacate Hass montañero
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-[0.88] tracking-tight text-foreground"
            >
              AMOLI
            </motion.p>

            <p className="mt-3 font-display text-2xl font-black uppercase tracking-wide text-primary sm:text-3xl">
              Guacamole real
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Elaborado mediante un proceso artesanal, fresco y responsable. Sin aditivos ni conservantes sintéticos — solo el mejor aguacate de nuestras montañas e ingredientes seleccionados.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
              <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                <Leaf className="mx-auto mb-1 h-5 w-5 text-lime-600" />
                <span className="block font-heading text-xs font-bold uppercase">Sin Conservantes</span>
              </div>
              <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                <ChefHat className="mx-auto mb-1 h-5 w-5 text-primary" />
                <span className="block font-heading text-xs font-bold uppercase">Sabor Real</span>
              </div>
              <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                <Mountain className="mx-auto mb-1 h-5 w-5 text-foreground" />
                <span className="block font-heading text-xs font-bold uppercase">Origen Antioquia</span>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#producto-destacado"
                onClick={(e) => scrollToSection(e, 'producto-destacado')}
                className={`flex h-12 items-center gap-2 rounded-xl border-2 border-foreground bg-primary px-7 font-display text-base font-bold uppercase tracking-wide text-primary-foreground transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${HARD_SHADOW}`}
              >
                <ShoppingCart size={18} /> Ver Productos
              </a>
              <Link
                href="/aliados"
                className={`flex h-12 items-center rounded-xl border-2 border-foreground bg-accent px-7 font-display text-base font-bold uppercase tracking-wide text-foreground transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${HARD_SHADOW}`}
              >
                Vende AMOLI
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className={`rounded-3xl border-2 border-foreground bg-secondary p-6 sm:p-8 text-center ${HARD_SHADOW_LG}`}>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                PRESENTACIÓN ESTÁNDAR
              </span>

              <div className="relative my-4 flex h-[280px] sm:h-[320px] items-center justify-center">
                <img
                  src="https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/amoligugacole.webp"
                  alt="Amoli Guacamole Artesanal"
                  className="h-full max-h-[300px] object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="mb-4">
                <span className="font-display text-4xl sm:text-5xl font-black text-foreground">AMOLI</span>
                <span className="mt-1 block font-heading text-lg sm:text-xl font-bold uppercase tracking-wide text-primary">
                  GUACAMOLE ARTESANAL
                </span>
              </div>

              <div className="rounded-xl border-2 border-foreground bg-background p-4 flex justify-between items-center">
                <span className="font-heading text-xs font-bold uppercase text-muted-foreground">Frasco de Vidrio</span>
                <span className="font-mono font-extrabold text-lg text-foreground">450g CONT. NETO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="productos" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
        <div className="mb-12 border-b-2 border-foreground pb-6 text-center">
          <h2 className="font-display text-4xl font-black sm:text-5xl">
            NUESTROS PRODUCTOS
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Selecciona tus sabores favoritos preparados con aguacate Hass fresco de Antioquia.
          </p>
        </div>

        <ProductsList initialProducts={initialProducts.length > 0 ? initialProducts : undefined} />
      </section>

      <section id="contacto" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
        <div className={`flex flex-col items-center justify-between gap-6 rounded-3xl border-2 border-foreground bg-accent p-8 md:flex-row ${HARD_SHADOW_LG}`}>
          <div>
            <h3 className="font-display text-3xl font-black text-foreground">¿TIENES DUDAS CON TU PEDIDO?</h3>
            <p className="mt-1 text-sm text-foreground/80 font-medium">
              Escríbenos directamente a WhatsApp y coordinamos tu entrega en Medellín y el Valle de Aburrá.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola AMOLI! Quisiera informaci\u00f3n sobre sus productos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex shrink-0 items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-6 py-3.5 font-heading text-xs font-black uppercase text-background transition hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] ${HARD_SHADOW}`}
          >
            <MessageCircle size={18} className="text-accent" /> Contactar por WhatsApp
          </a>
        </div>
      </section>

      <section id="blog" className="border-y-4 border-foreground bg-foreground py-16 text-background">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-accent">
              Blog AMOLI
            </span>
            <h2 className="font-display text-5xl font-black tracking-wide sm:text-6xl">
              RECETAS, HISTORIAS <span className="text-accent">Y NOVEDADES</span>
            </h2>
            <p className="mt-3 text-sm text-background/70">
              Entérate de lo último sobre AMOLI: recetas con guacamole, novedades de la marca y contenido fresco directo desde Antioquia.
            </p>
            <Link
              href="/blog"
              className={`mt-8 inline-flex h-12 items-center gap-2 rounded-xl border-2 border-background bg-accent px-7 font-display text-base font-bold uppercase tracking-wide text-foreground transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${HARD_SHADOW}`}
            >
              Ver el Blog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeClient;
