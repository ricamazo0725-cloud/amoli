'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccessClient = () => {
  // react-router-dom pasaba orderId/whatsappUrl como `state` de navegación;
  // next/navigation no tiene ese mecanismo, así que CheckoutClient los manda
  // por query string y acá los leemos con useSearchParams().
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const whatsappUrl = searchParams.get('wa');

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-8">
      <CheckCircle className="mx-auto mb-6 h-16 w-16 text-primary" />
      <h1 className="font-display text-3xl font-extrabold">¡Gracias por tu pedido!</h1>
      {orderId && (
        <p className="mt-2 text-sm text-muted-foreground">Pedido #{orderId.slice(0, 8)}</p>
      )}
      <p className="mt-4 text-muted-foreground">
        Registramos tu pedido con estado <strong>pendiente</strong>. Para confirmarlo y programar la entrega,
        envíanos por WhatsApp el resumen que ya preparamos junto con el <strong>pantallazo del comprobante</strong> de tu pago.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              <MessageCircle size={18} /> Enviar comprobante por WhatsApp
            </Button>
          </a>
        )}
        <Link href="/productos">
          <Button size="lg" variant="outline">Seguir comprando</Button>
        </Link>
      </div>
      {whatsappUrl && (
        <p className="mt-3 text-xs text-muted-foreground">
          Se abrirá WhatsApp con el resumen de tu pedido ya escrito: solo adjunta ahí la foto del comprobante y envía.
        </p>
      )}
    </div>
  );
};

export default OrderSuccessClient;
