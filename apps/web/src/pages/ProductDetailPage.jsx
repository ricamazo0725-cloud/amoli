import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, formatCOP } from '@/api/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (!product) return;
    try {
      await addToCart(product, quantity);
      toast({
        title: '¡Añadido al carrito! 🛒',
        description: `${quantity} x ${product.title} agregado.`,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Algo salió mal',
        description: err.message,
      });
    }
  }, [product, quantity, addToCart, toast]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  }, [product?.images?.length]);

  useEffect(() => {
    let cancelled = false;
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);
        if (!cancelled) setProduct(fetchedProduct);
      } catch (err) {
        if (!cancelled) setError(err.message || 'No se pudo cargar el producto');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProductData();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto">
        <Link to="/productos" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="text-center text-destructive p-8 rounded-sm border border-destructive/40 bg-destructive/10">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <p className="mb-6">Error al cargar el producto: {error}</p>
        </div>
      </div>
    );
  }

  const hasSale = product.sale_price !== null && product.sale_price !== undefined;
  const price = hasSale ? formatCOP(product.sale_price) : formatCOP(product.price);
  const originalPrice = hasSale ? formatCOP(product.price) : null;
  const availableStock = product.stock;
  const canAddToCart = quantity <= availableStock && availableStock > 0;

  const images = product.images?.length > 0 ? product.images : [null];
  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <>
      <Helmet>
        <title>{product.title} - AMOLI</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <Link to="/productos" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
        <div className="grid md:grid-cols-2 gap-8 rounded-sm border border-border bg-card p-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <div className="relative overflow-hidden rounded-sm shadow-2xl h-96 md:h-[500px] bg-[#0d0d0d]">
              <img
                src={currentImage || placeholderImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-sm shadow-lg">
                  {product.ribbon_text}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="hidden md:flex gap-2 mt-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image || placeholderImage}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <h1 className="text-4xl font-display font-bold mb-2">{product.title}</h1>
            {product.subtitle && <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-display font-bold text-primary">{price}</span>
              {originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
              )}
            </div>

            {product.description && (
              <div className="prose prose-invert text-muted-foreground mb-6 whitespace-pre-line">
                {product.description}
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-full p-1">
                <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-full h-8 w-8"><Minus size={16} /></Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-full h-8 w-8"><Plus size={16} /></Button>
              </div>
            </div>

            <div className="mt-auto">
              <Button onClick={handleAddToCart} size="lg" className="w-full font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={!canAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
              </Button>

              {canAddToCart && (
                <p className="text-sm text-primary mt-3 flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {availableStock} disponibles
                </p>
              )}

              {!canAddToCart && (
                <p className="text-sm text-destructive mt-3 flex items-center justify-center gap-2">
                  <XCircle size={16} /> Agotado
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
