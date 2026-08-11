import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { getProducts, formatCOP } from '@/api/products';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTgxODE4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbiBpbWFnZW48L3RleHQ+Cjwvc3ZnPgo=";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const hasSale = product.sale_price !== null && product.sale_price !== undefined;
  const displayPrice = hasSale ? formatCOP(product.sale_price) : formatCOP(product.price);
  const originalPrice = hasSale ? formatCOP(product.price) : null;
  const stock = product.stock;
  const outOfStock = stock <= 0;

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    try {
      addToCart(product, 1);
      toast({ title: 'Añadido al carrito', description: `${product.title} está en tu carrito.` });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo añadir', description: error.message });
    }
  }, [product, addToCart, toast, outOfStock]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 4) * 0.06 }}
    >
      <Link to={`/product/${product.id}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-[6px_6px_0px_0px_rgba(42,42,42,1)] transition-transform hover:-translate-y-1">
          <div className="relative aspect-square overflow-hidden bg-[#0d0d0d]">
            <img
              src={product.images?.[0] || placeholderImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.ribbon_text && (
              <span className="absolute left-0 top-4 bg-primary px-3 py-1 font-display text-xs font-bold text-primary-foreground">
                {product.ribbon_text}
              </span>
            )}
            {stock <= 5 && (
              <span className="absolute right-3 top-4 bg-accent px-2 py-1 text-[11px] font-bold text-accent-foreground">
                {stock > 0 ? `Últimas ${stock}` : 'Agotado'}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold leading-tight">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {product.subtitle || String(product.description || '').replace(/<[^>]*>/g, '').slice(0, 110)}
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold text-primary">{displayPrice}</span>
              {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="mt-5 flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-foreground bg-foreground font-display font-bold text-background transition-colors hover:bg-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={16} /> {outOfStock ? 'Agotado' : 'Añadir al carrito'}
            </button>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

const ProductsList = ({ limit, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ limit, category });
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [limit, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: limit || 4 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-sm border border-border bg-card">
            <div className="aspect-square bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-10 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-8 text-center">
        <p className="text-destructive-foreground">Error al cargar productos: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-sm border border-border p-10 text-center text-muted-foreground">
        <Loader2 className="mx-auto mb-3 h-6 w-6" />
        <p>Aún no hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
    </div>
  );
};

export default ProductsList;
