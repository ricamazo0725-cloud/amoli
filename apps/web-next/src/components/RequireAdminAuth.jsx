'use client';

// Equivalente a ProtectedRoute.jsx del proyecto Vite. Next.js App Router no
// tiene un componente declarativo <Navigate> como react-router-dom, así que
// la redirección se hace de forma imperativa con useRouter() dentro de un
// useEffect una vez que sabemos que NO hay sesión.
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const RequireAdminAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return children;
};

export default RequireAdminAuth;
