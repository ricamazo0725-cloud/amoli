import { Suspense } from 'react';
import OrderSuccessClient from './OrderSuccessClient';

export const metadata = {
  title: '¡Pedido recibido! | AMOLI',
  description: 'Tu pedido de guacamole AMOLI fue recibido. Confirma por WhatsApp para coordinar el pago y la entrega.',
  alternates: { canonical: '/success' },
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  // useSearchParams() exige un límite <Suspense> alrededor en App Router.
  return (
    <Suspense fallback={null}>
      <OrderSuccessClient />
    </Suspense>
  );
}
