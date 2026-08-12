import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderId, whatsappUrl } = location.state || {};

  return (
    <>
      <Helmet>
        <title>¡Pedido recibido! | AMOLI</title>
        <meta name="description" content="Tu pedido de guacamole AMOLI fue recibido. Confirma por WhatsApp para coordinar el pago y la entrega." />
      </Helmet>
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-8">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-primary" />
        <h1 className="font-display text-3xl font-extrabold">¡Gracias por tu pedido!</h1>
        {orderId && (
          <p className="mt-2 text-sm text-muted-foreground">Pedido #{orderId.slice(0, 8)}</p>
        )}
        <p className="mt-4 text-muted-foreground">
          Registramos tu pedido con estado <strong>pendiente</strong>. Para confirmarlo y coordinar el pago,
          escríbenos por WhatsApp con el resumen que ya preparamos.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {whatsappUrl && (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <MessageCircle size={18} /> Confirmar por WhatsApp
              </Button>
            </a>
          )}
          <Link to="/productos">
            <Button size="lg" variant="outline">Seguir comprando</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;