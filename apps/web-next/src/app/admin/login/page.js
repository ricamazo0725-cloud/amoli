'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Nota: react-router-dom permitía volver a la página de origen con
// location.state?.from tras iniciar sesión; next/navigation no tiene un
// equivalente de "state" de navegación, así que simplificamos a redirigir
// siempre a /admin (RequireAdminAuth de todas formas manda a /admin/login
// sin recordar de dónde venía).
const AdminLoginPage = () => {
  const { signIn, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast({ title: 'Bienvenido', description: 'Sesión iniciada correctamente.' });
      router.replace('/admin');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'No se pudo iniciar sesión',
        description: error.message || 'Revisa tu correo y contraseña.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-sm border border-border bg-card p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Panel de administrador</h1>
            <p className="text-sm text-muted-foreground">Gestiona los productos de la tienda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
