import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: 'Finalizar pedido | AMOLI',
  description: 'Confirma tu pedido de guacamole AMOLI: elige tus sabores, ingresa tus datos de entrega y coordina el pago.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
