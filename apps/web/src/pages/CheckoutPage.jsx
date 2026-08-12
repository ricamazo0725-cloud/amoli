import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { createManualOrder } from '@/api/orders';
import { formatCOP, getProductsByIds } from '@/api/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CITY_OPTIONS,
  NOTES_MAX_LENGTH,
  validateName,
  validatePhone,
  validateEmail,
  validateCity,
  validateAddress,
  validateNotes,
  sanitizePhone,
} from '@/lib/validation';

// Número de WhatsApp de AMOLI para confirmar pedidos.
const STORE_WHATSAPP_NUMBER = '573002902010';

const emptyCustomer = { name: '', phone: '', email: '', city: '', address: '', notes: '' };

const CheckoutPage = () => {
  const { cartItems, getCartTotal, getCartTotalValue, clearCart, removeFromCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => setCustomer((c) => ({ ...c, [field]: e.target.value }));
  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const validators = useMemo(() => ({
    name: validateName,
    phone: validatePhone,
    email: validateEmail,
    city: validateCity,
    address: validateAddress,
    notes: validateNotes,
  }), []);

  const validateAll = () => {
    const nextErrors = {};
    Object.entries(validators).forEach(([field, validate]) => {
      const message = validate(customer[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, city: true, address: true, notes: true });
    return Object.keys(nextErrors).length === 0;
  };

  const runFieldValidation = (field, value) => {
    const message = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const buildWhatsappMessage = (order) => {
    const lines = [
      `Hola, quiero confirmar mi pedido #${order.id.slice(0, 8)}:`,
      ...cartItems.map(
        (item) => `• ${item.quantity} x ${item.product.title} — ${formatCOP((item.product.sale_price ?? item.product.price) * item.quantity)}`
      ),
      `Total: ${formatCOP(getCartTotalValue())}`,
      `Nombre: ${customer.name}`,
      customer.city ? `Ciudad: ${customer.city}` : null,
      customer.address ? `Dirección: ${customer.address}` : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast({ variant: 'destructive', title: 'Tu carrito está vacío' });
      return;
    }
    if (!validateAll()) {
      toast({ variant: 'destructive', title: 'Revisa los datos', description: 'Hay campos que necesitan corrección.' });
      return;
    }

    setSubmitting(true);
    try {
      // Revalidamos el carrito contra la base de datos: si algún producto fue
      // eliminado o desactivado desde que se agregó al carrito, lo sacamos
      // antes de intentar crear el pedido (evita el error de llave foránea).
      const currentIds = cartItems.map((item) => item.product.id);
      const stillValidProducts = await getProductsByIds(currentIds);
      const validIds = new Set(stillValidProducts.map((p) => p.id));
      const staleItems = cartItems.filter((item) => !validIds.has(item.product.id));

      if (staleItems.length > 0) {
        staleItems.forEach((item) => removeFromCart(item.product.id));
        toast({
          variant: 'destructive',
          title: 'Actualizamos tu carrito',
          description: `${staleItems.map((i) => i.product.title).join(', ')} ya no está disponible y se quitó del carrito. Revisa tu pedido y confirma de nuevo.`,
        });
        setSubmitting(false);
        return;
      }

      const sanitizedCustomer = { ...customer, phone: sanitizePhone(customer.phone) };
      const order = await createManualOrder({
        customer: sanitizedCustomer,
        items: cartItems.map((item) => ({
          product: item.product,
          unitPrice: item.product.sale_price ?? item.product.price,
          quantity: item.quantity,
        })),
        total: getCartTotalValue(),
      });

      const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${buildWhatsappMessage(order)}`;
      clearCart();
      navigate('/success', { state: { orderId: order.id, whatsappUrl } });
    } catch (error) {
      toast({ variant: 'destructive', title: 'No se pudo crear el pedido', description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground mb-6">Tu carrito está vacío.</p>
        <Link to="/productos">
          <Button>Ver productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Finalizar pedido | AMOLI</title>
        <meta name="description" content="Confirma tu pedido de guacamole AMOLI: elige tus sabores, ingresa tus datos de entrega y coordina el pago." />
      </Helmet>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} /> Seguir comprando
        </Link>

        <h1 className="font-display text-3xl font-extrabold mb-2">Finalizar pedido</h1>
        <p className="text-muted-foreground mb-8">
          Pago manual: te confirmamos el pedido y coordinamos el pago por transferencia o WhatsApp.
        </p>

        <div className="mb-8 rounded-sm border border-border bg-card p-6">
          <h2 className="font-display font-bold mb-4">Resumen del pedido</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.quantity} x {item.product.title}</span>
                <span className="font-semibold">
                  {formatCOP((item.product.sale_price ?? item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{getCartTotal()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-sm border border-border bg-card p-6">
          <h2 className="font-display font-bold mb-2">Tus datos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={customer.name}
                onChange={(e) => {
                  handleChange('name')(e);
                  if (touched.name) runFieldValidation('name', e.target.value);
                }}
                onBlur={(e) => {
                  handleBlur('name')();
                  runFieldValidation('name', e.target.value);
                }}
                aria-invalid={!!errors.name}
              />
              {touched.name && errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono / WhatsApp *</Label>
              <PhoneInput
                id="phone"
                international
                defaultCountry="CO"
                countryCallingCodeEditable={false}
                value={customer.phone}
                onChange={(value) => {
                  setCustomer((c) => ({ ...c, phone: value || '' }));
                  if (touched.phone) runFieldValidation('phone', value || '');
                }}
                onBlur={() => {
                  handleBlur('phone')();
                  runFieldValidation('phone', customer.phone);
                }}
                className={`phone-input-wrapper ${touched.phone && errors.phone ? 'phone-input-error' : ''}`}
              />
              {touched.phone && errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo (opcional)</Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => {
                  handleChange('email')(e);
                  if (touched.email) runFieldValidation('email', e.target.value);
                }}
                onBlur={(e) => {
                  handleBlur('email')();
                  runFieldValidation('email', e.target.value);
                }}
                aria-invalid={!!errors.email}
              />
              {touched.email && errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad *</Label>
              <Select
                value={customer.city}
                onValueChange={(value) => {
                  setCustomer((c) => ({ ...c, city: value }));
                  runFieldValidation('city', value);
                  setTouched((t) => ({ ...t, city: true }));
                }}
              >
                <SelectTrigger id="city" aria-invalid={!!errors.city}>
                  <SelectValue placeholder="Selecciona tu ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {CITY_OPTIONS.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.city && errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección de entrega *</Label>
            <Input
              id="address"
              value={customer.address}
              placeholder="Ej. Calle 10 # 43-20, apto 301"
              onChange={(e) => {
                handleChange('address')(e);
                if (touched.address) runFieldValidation('address', e.target.value);
              }}
              onBlur={(e) => {
                handleBlur('address')();
                runFieldValidation('address', e.target.value);
              }}
              aria-invalid={!!errors.address}
            />
            {touched.address && errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea
              id="notes"
              rows={3}
              maxLength={NOTES_MAX_LENGTH}
              value={customer.notes}
              onChange={(e) => {
                handleChange('notes')(e);
                if (touched.notes) runFieldValidation('notes', e.target.value);
              }}
              onBlur={(e) => {
                handleBlur('notes')();
                runFieldValidation('notes', e.target.value);
              }}
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-destructive">{touched.notes && errors.notes ? errors.notes : ''}</span>
              <span className="text-muted-foreground">{customer.notes.length}/{NOTES_MAX_LENGTH}</span>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar pedido'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;