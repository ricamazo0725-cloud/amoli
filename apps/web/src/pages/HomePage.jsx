import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Leaf,
  Flame,
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

const HARD_SHADOW = 'shadow-[6px_6px_0px_0px_rgba(42,42,42,1)]';
const HARD_SHADOW_LG = 'shadow-[8px_8px_0px_0px_rgba(42,42,42,1)]';
const HARD_SHADOW_SM = 'shadow-[3px_3px_0px_0px_rgba(42,42,42,1)]';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxODE4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbiBpbWFnZW48L3RleHQ+Cjwvc3ZnPgo=";

const pillars = [
  {
    value: '0%',
    color: 'text-accent',
    title: 'Sin Aditivos Ni Rellenos',
    text: 'Garantizamos un sabor limpio. No diluimos la receta con agua, harinas ni colorantes sintéticos.',
    emoji: '🌿'
  },
  {
    value: '100%',
    color: 'text-primary',
    title: 'Aguacate Hass Montañero',
    text: 'Cultivado en el campo antioqueño. Mantenemos trocitos reales para dar la mejor textura en cada cucharada.',
    emoji: '🥑'
  },
  {
    value: 'HONESTO',
    color: 'text-background',
    title: 'Proceso Artesanal',
    text: 'Ingredientes seleccionados minuciosamente para ofrecer un sabor casero y una experiencia auténtica.',
    emoji: '✨'
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Cargar productos dinámicos desde Supabase / Base de Datos
  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (isMounted && data && data.length > 0) {
          setProducts(data);
          const defaultProd = data.find(p => p.title.toLowerCase().includes('picante')) || data[0];
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
  }, []);

  // Función para desplazamiento suave (Smooth Scroll)
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

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    try {
      addToCart(selectedProduct, quantity);
      toast({
        title: 'Añadido al carrito',
        description: `${quantity}x ${selectedProduct.title} añadido a tu pedido.`,
      });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleWhatsAppBuy = () => {
    if (!selectedProduct) return;
    const message = `Hola AMOLI! Quisiera pedir:
- Producto: ${selectedProduct.title}
- Cantidad: ${quantity}
- Total: ${totalPriceFormatted}

Ubicación de entrega: Medellín / Envigado / Valle de Aburrá.`;

    window.open(`https://wa.me/573002902010?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>AMOLI | Guacamole artesanal, real y honesto</title>
        <meta
          name="description"
          content="Guacamole 100% natural elaborado con aguacate Hass montañero de Antioquia. Descubre nuestros productos frescos elaborados de forma artesanal."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans antialiased">

        {/* 1. SECCIÓN INTERACTIVA CON FOTO Y DATOS DE BD */}
        <section id="producto-destacado" className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-12 border-b-2 border-foreground">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center rounded-2xl border-2 border-foreground bg-card p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 font-heading text-sm font-bold uppercase">Cargando productos desde la base de datos...</span>
            </div>
          ) : selectedProduct ? (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">

              {/* IZQUIERDA: FOTO DEL PRODUCTO SELECCIONADO */}
              <div className="space-y-4 lg:col-span-7">
                <div className={`relative overflow-hidden rounded-2xl border-2 border-foreground bg-secondary ${HARD_SHADOW_LG}`}>

                  {/* Badges superiores */}
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

                  {/* Visual del producto desde la Base de Datos */}
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

                  {/* Selector rápido de sabores creados desde la BD */}
                  <div className="flex flex-wrap items-center justify-center gap-4 border-t-2 border-foreground bg-background p-4">
                    {products.map((p) => {
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

                {/* Badges de Valor */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                    <Leaf className="mx-auto mb-1 h-5 w-5 text-lime-600" />
                    <span className="block font-heading text-xs font-bold uppercase">Sin Conservantes</span>
                    <span className="text-[10px] text-muted-foreground">Receta Limpia</span>
                  </div>
                  <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                    <Flame className="mx-auto mb-1 h-5 w-5 text-primary" />
                    <span className="block font-heading text-xs font-bold uppercase">Sabor Honesto</span>
                    <span className="text-[10px] text-muted-foreground">Sin Rellenos</span>
                  </div>
                  <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                    <Mountain className="mx-auto mb-1 h-5 w-5 text-foreground" />
                    <span className="block font-heading text-xs font-bold uppercase">Origen Local</span>
                    <span className="text-[10px] text-muted-foreground">Envigado, Antioquia</span>
                  </div>
                </div>
              </div>

              {/* DERECHA: DETALLES, PRECIOS Y COMPRA */}
              <div className="space-y-6 lg:col-span-5">

                {/* Título y Precios */}
                <div className="border-b-2 border-foreground pb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      FRASCO DE VIDRIO • 450G
                    </span>
                    {/* Estrellas de valoración sin número */}
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>

                  <h1 className="font-display text-4xl font-black leading-none tracking-tight text-foreground sm:text-5xl">
                    {selectedProduct.title}
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

                {/* Selector de Sabores dinámicos */}
                <div className="space-y-3">
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-foreground">
                    1. SELECCIONA EL SABOR: <span className="font-black text-primary">{selectedProduct.title.toUpperCase()}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {products.map((p) => {
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

                {/* Presentación fija 450g */}
                <div className="space-y-3">
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-foreground">
                    2. PRESENTACIÓN ÚNICA:
                  </label>
                  <div className="flex items-center justify-between rounded-xl border-2 border-foreground bg-secondary p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-background p-2 text-foreground font-extrabold border border-foreground">🫙</div>
                      <div>
                        <span className="block font-heading text-sm font-bold text-foreground">Frasco de Vidrio 450g</span>
                        <span className="text-[11px] text-muted-foreground">Porción ideal para disfrutar en su punto óptimo</span>
                      </div>
                    </div>
                    <span className="rounded border border-foreground bg-background px-2.5 py-1 font-mono text-xs font-bold">
                      450 GRAMOS
                    </span>
                  </div>
                </div>

                {/* Cantidad y Botones de Compra */}
                <div className="space-y-4 pt-2">
                  <div className="flex gap-4">
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
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-6 py-3.5 font-heading text-base font-black uppercase text-background transition-all hover:bg-primary hover:text-primary-foreground active:translate-y-0.5 ${HARD_SHADOW}`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Añadir al Carrito</span>
                    </button>
                  </div>

                  <button
                    onClick={handleWhatsAppBuy}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-accent px-6 py-3.5 font-heading text-base font-black uppercase text-foreground transition-all hover:brightness-95 active:translate-y-0.5 ${HARD_SHADOW}`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Pedir por WhatsApp ({totalPriceFormatted})</span>
                  </button>
                </div>

                {/* Acordeones informativos */}
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

        {/* 2. HERO BANNER PRINCIPAL */}
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

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="font-display text-[clamp(3.5rem,9vw,6.5rem)] font-black leading-[0.88] tracking-tight text-foreground"
              >
                AMOLI
              </motion.h1>

              <p className="mt-3 font-display text-2xl font-black uppercase tracking-wide text-primary sm:text-3xl">
                Guacamole real, sin artificios
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Elaborado mediante un proceso artesanal, fresco y responsable. Sin aditivos, sin harinas ni conservantes sintéticos — solo el mejor aguacate de nuestras montañas e ingredientes seleccionados.
              </p>

              {/* Badges de Valor */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                  <Leaf className="mx-auto mb-1 h-5 w-5 text-lime-600" />
                  <span className="block font-heading text-xs font-bold uppercase">Sin Conservantes</span>
                </div>
                <div className="rounded-xl border-2 border-foreground bg-card p-3 text-center">
                  <Flame className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <span className="block font-heading text-xs font-bold uppercase">Sabor Honesto</span>
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
                  to="/aliados"
                  className={`flex h-12 items-center rounded-xl border-2 border-foreground bg-accent px-7 font-display text-base font-bold uppercase tracking-wide text-foreground transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${HARD_SHADOW}`}
                >
                  Vende AMOLI
                </Link>
              </div>
            </div>

            {/* Tarjeta destacada con la imagen del frasco */}
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

        {/* 3. GRID COMPLETA DE PRODUCTOS */}
        <section id="productos" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
          <div className="mb-12 border-b-2 border-foreground pb-6 text-center">
            <h2 className="font-display text-4xl font-black sm:text-5xl">
              NUESTROS PRODUCTOS
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
              Selecciona tus sabores favoritos preparados con aguacate Hass fresco de Antioquia.
            </p>
          </div>

          <ProductsList />
        </section>

        {/* 4. MANIFESTO / FILOSOFÍA (SIN MARCOS EN LA IMAGEN Y CON EFECTO MOTION) */}
        <section id="filosofia" className="border-y-4 border-foreground bg-foreground py-16 text-background">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="mb-2 block font-heading text-xs font-bold uppercase tracking-widest text-accent">
                Manifesto AMOLI
              </span>
              <h2 className="font-display text-5xl font-black tracking-wide sm:text-6xl">
                GUACAMOLE REAL, <span className="text-accent">SIN ARTIFICIOS</span>
              </h2>
              <p className="mt-3 text-sm text-background/70">
                Sin trucos, sin aditivos y sin rellenos. Una receta honesta que respeta la frescura del aguacate de nuestras montañas.
              </p>
            </div>

            {/* Showcase Creativo con Framer Motion y sin marcos */}
            <div className="my-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 rounded-3xl border-2 border-background/20 bg-background/5 p-8 sm:p-12">
              <div className="lg:col-span-5 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl"
                >
                  <img
                    src="https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/amoliagucate.webp"
                    alt="Aguacate Hass Montañero AMOLI"
                    className="max-h-[340px] w-full object-cover rounded-3xl"
                  />
                </motion.div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground font-heading uppercase">
                  🥑 Selección Premium de Origen
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-background">
                  DEL ÁRBOL ANTIOQUEÑO DIRECTO A TU MESA
                </h3>
                <p className="text-sm text-background/80 leading-relaxed">
                  Cada frasco de AMOLI comienza con una selección rigurosa de aguacate Hass cosechado en las montañas de Antioquia. Cuidamos cada detalle del proceso para asegurar una textura cremosa natural y un sabor inigualable sin recurrir a aditivos artificiales.
                </p>
                <div className="pt-2 flex items-center gap-6 font-mono text-xs text-accent font-bold">
                  <span>✓ 100% Hass Natural</span>
                  <span>✓ Cosecha Local</span>
                  <span>✓ Frescura Garantizada</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="group relative overflow-hidden rounded-2xl border-2 border-background/20 bg-background/5 p-6 transition-colors hover:border-accent"
                >
                  <div className={`mb-3 font-display text-5xl font-black ${p.color}`}>
                    {p.value}
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold uppercase text-background">
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-background/60">
                    {p.text}
                  </p>
                  <div className="pointer-events-none absolute -bottom-6 -right-4 select-none font-display text-8xl opacity-10">
                    {p.emoji}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FOOTER / CONTACTO CTA WHATSAPP */}
        <section id="contacto" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
          <div className={`flex flex-col items-center justify-between gap-6 rounded-3xl border-2 border-foreground bg-accent p-8 md:flex-row ${HARD_SHADOW_LG}`}>
            <div>
              <h3 className="font-display text-3xl font-black text-foreground">¿TIENES DUDAS CON TU PEDIDO?</h3>
              <p className="mt-1 text-sm text-foreground/80 font-medium">
                Escríbenos directamente a WhatsApp y coordinamos tu entrega en Medellín y el Valle de Aburrá.
              </p>
            </div>
            <a
              href="https://wa.me/573002902010?text=Hola%20AMOLI!%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20productos."
              target="_blank"
              rel="noopener noreferrer"
              className={`flex shrink-0 items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-6 py-3.5 font-heading text-xs font-black uppercase text-background transition hover:bg-primary active:translate-x-[2px] active:translate-y-[2px] ${HARD_SHADOW}`}
            >
              <MessageCircle size={18} className="text-accent" /> Contactar por WhatsApp
            </a>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;