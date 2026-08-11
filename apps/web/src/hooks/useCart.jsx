import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { formatCOP } from '@/api/products';

const CartContext = createContext();

const CART_STORAGE_KEY = 'e-commerce-cart';

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * @param {Object} product - producto de Supabase (id, title, price, sale_price, stock, images...)
   * @param {number} quantity
   */
  const addToCart = useCallback((product, quantity = 1) => {
    return new Promise((resolve, reject) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        const currentCartQuantity = existingItem ? existingItem.quantity : 0;

        if ((currentCartQuantity + quantity) > product.stock) {
          reject(new Error(`No hay suficiente stock de ${product.title}. Solo quedan ${product.stock}.`));
          return prevItems;
        }

        if (existingItem) {
          resolve();
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        resolve();
        return [...prevItems, { product, quantity }];
      });
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotalValue = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product.sale_price ?? item.product.price;
      return total + Number(price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const getCartTotal = useCallback(() => formatCOP(getCartTotalValue()), [getCartTotalValue]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartTotalValue,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartTotalValue]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};
