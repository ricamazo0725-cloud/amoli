'use client';

import React from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/toaster';

// Contextos de React (Auth, Cart) deben ser Client Components — se agrupan
// acá para que app/layout.js (Server Component) los pueda envolver sin
// tener que marcarse él mismo como cliente.
const Providers = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      {children}
      <Toaster />
    </CartProvider>
  </AuthProvider>
);

export default Providers;
