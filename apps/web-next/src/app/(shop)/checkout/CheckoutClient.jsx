'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, MapPin, Landmark, Banknote, CreditCard, Link2, Check } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { usePlacesAutocomplete, getCityFromPlace } from '@/hooks/usePlacesAutocomplete';
import { AddressMapPicker } from '@/components/AddressMapPicker';
import DeliveryHoursCard from '@/components/DeliveryHoursCard';
import { createManualOrder } from '@/api/orders';
import { WHATSAPP_NUMBER } from '@/lib/contact';
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

const emptyCustomer = { name: '', phone: '', email: '', city: '', address: '', notes: '', paymentMethod: '' };

// PLACEHOLDER: confirmar cuáles de estos métodos ofrece AMOLI realmente y en
// qué zonas — por ahora replica el patrón visto en un sitio de referencia
// (transferencia con datos enviados por WhatsApp tras verificar el pedido,
// efectivo y datáfono solo en Medellín/Área Metropolitana, link de pago para
// el resto del país o el exterior).
const PAYMENT_METHODS = [
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    icon: Landmark,
    scope: 'Válido para toda Colombia',
    note: 'Cuando tu pedido sea verificado, te enviaremos la información de pago por WhatsApp. Por favor no hagas el pago antes de recibir la confirmación.',
  },
  {
    id: 'efectivo',
    label: 'Efectivo',
    icon: Banknote,
    scope: 'Solo para Medellín y Área Metropolitana',
  },
  {
    id: 'datafono',
    label: 'Datáfono (tarjeta débito o crédito)',
    icon: CreditCard,
    scope: 'Solo para Medellín y Área Metropolitana',
  },
  {
    id: 'link_pago',
    label: 'Link de pago (tarjeta de crédito)',
    icon: Link2,
    scope: 'Válido para pagos nacionales o desde el exterior',
  },
];

function validatePaymentMethod(value) {
  return value ? null : 'Selecciona un método de pago.';
}

const CheckoutClient = () => {
  const { cartItems, getCartTotal, getCartTotalValue, clearCart, removeFromCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [coords, setCoords] = useState(null);

  const handleChange = (field) => (e) => setCustomer((c) => ({ ...c, [field]: e.target.value }));
  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const addressInputRef = useRef(null);
  const { loadError: mapsLoadError } = usePlacesAutocomplete(addressInputRef, {
    onPlaceSelected: (place) => {
      const addressVal = place.formatted_address || '';
      if (addressInputRef.current) {
        addressInputRef.current.value = addressVal;
      }
      setCustomer((c) => ({ ...c, address: addressVal }));
      setTouched((t) => ({ ...t, address: true }));
      runFieldValidation('address', addressVal);

      const location = place.geometry?.location;
      if (location) {
        setCoords({ lat: location.lat(), lng: location.lng() });
      }

      const detectedCity = getCityFromPlace(place);
      if (detectedCity) {
        const normalizeText = (str) =>
          str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

        const match = CITY_OPTIONS.find(
          (opt) => normalizeText(opt) === normalizeText(detectedCity)
        );

        if (match) {
          setCustomer((c) => ({ ...c, city: match }));
          setTouched((t) => ({ ...t, city: true }));
          runFieldValidation('city', match);
        }
      }
    },
  });

  const validators = useMemo(() => ({
    name: validateName,
    phone: validatePhone,
    email: validateEmail,
    city: validateCity,
    address: validateAddress,
    notes: validateNotes,
    paymentMethod: validatePaymentMethod,
  }), []);

  const validateAll = () => {
    const currentAddress = addressInputRef.current ? addressInputRef.current.value : customer.address;
    const currentCustomer = { ...customer, address: currentAddress };

    const nextErrors = {};
    Object.entries(validators).forEach(([field, validate]) => {
      const message = validate(currentCustomer[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, city: true, address: true, notes: true, paymentMethod: true });
    return Object.keys(nextErrors).length === 0;
  };

  const runFieldValidation = (field, value) => {
    const message = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const buildWhatsappMessage = (order) => {
    const finalAddress = addressInputRef.current ? addressInputRef.current.value : customer.address;
    const paymentLabel = PAYMENT_METHODS.find((m) => m.id === customer.paymentMethod)?.label;
    const lines = [
      `Hola, quiero confirmar mi pedido #${order.id.slice(0, 8)}:`,
      ...cartItems.map(
        (item) => `• ${item.quantity} x ${item.product.title} — ${formatCOP((item.product.sale_price ?? item.product.price) * item.quantity)}`
      ),
      `Subtotal: ${formatCOP(getCartTotalValue())}`,
      'Domicilio: se confirma según tu zona',
      `Nombre: ${customer.name}`,
      customer.city ? `Ciudad: ${customer.city}` : null,
      finalAddress ? `Dirección: ${finalAddress}` : null,
      paymentLabel ? `Método de pago: ${paymentLabel}` : null,
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

      const finalAddress = addressInputRef.current ? addressInputRef.current.value : customer.address;
      // orders.notes no tiene una columna propia para el método de pago (evitamos
      // una migración de esquema que no podemos verificar desde aquí) — lo
      // anteponemos como texto a las notas para que quede registrado igual.
      const paymentLabelForNotes = PAYMENT_METHODS.find((m) => m.id === customer.paymentMethod)?.label;
      const notesWithPayment = [
        paymentLabelForNotes ? `Método de pago: ${paymentLabelForNotes}` : null,
        customer.notes || null,
      ].filter(Boolean).join(' — ');
      const sanitizedCustomer = {
        ...customer,
        address: finalAddress,
        notes: notesWithPayment,
        phone: sanitizePhone(customer.phone),
        lat: coords?.lat ?? null,
        lng: coords?.lng ?? null,
      };
      const order = await createManualOrder({
        customer: sanitizedCustomer,
        items: cartItems.map((item) => ({
          product: item.product,
          unitPrice: item.product.sale_price ?? item.product.price,
          quantity: item.quantity,
        })),
        total: getCartTotalValue(),
      });

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsappMessage(order)}`;
      clearCart();
      // react-router-dom permitía pasar `state` a la ruta destino; next/navigation
      // no tiene ese mecanismo para navegación de cliente, así que lo pasamos
      // por query string y /success lo lee con useSearchParams().
      const successUrl = `/success?orderId=${encodeURIComponent(order.id)}&wa=${encodeURIComponent(whatsappUrl)}`;
      router.push(successUrl);
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
        <Link href="/productos">
          <Button>Ver productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
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
        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{getCartTotal()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Domicilio</span>
            <span>Se confirma según tu zona</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-4 text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{getCartTotal()}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          * El valor del domicilio se confirma por WhatsApp según tu dirección — no está incluido en este total todavía.
        </p>
      </div>

      <div className="mb-8">
        <DeliveryHoursCard />
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
          <div className="relative">
            <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="address"
              ref={addressInputRef}
              placeholder="Ej. Calle 10 # 43-20, apto 301"
              autoComplete="off"
              className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => {
                setCustomer((c) => ({ ...c, address: e.target.value }));
                if (touched.address) runFieldValidation('address', e.target.value);
              }}
              onBlur={(e) => {
                handleBlur('address')();
                runFieldValidation('address', e.target.value);
              }}
              aria-invalid={!!errors.address}
            />
          </div>
          {touched.address && errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
          {mapsLoadError && (
            <p className="text-xs text-muted-foreground">
              Escribe la dirección manualmente (el autocompletado no está disponible ahora).
            </p>
          )}
          {coords && (
            <AddressMapPicker
              lat={coords.lat}
              lng={coords.lng}
              onPinMove={({ lat, lng, address }) => {
                setCoords({ lat, lng });
                if (address) {
                  if (addressInputRef.current) addressInputRef.current.value = address;
                  setCustomer((c) => ({ ...c, address }));
                }
              }}
            />
          )}
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

        <div className="space-y-2 border-t border-border pt-4">
          <h2 className="font-display font-bold">Método de pago *</h2>
          <p className="text-xs text-muted-foreground">Todas las transacciones son seguras y encriptadas.</p>

          <div className="space-y-3 pt-2">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const selected = customer.paymentMethod === method.id;
              return (
                <div key={method.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomer((c2) => ({ ...c2, paymentMethod: method.id }));
                      runFieldValidation('paymentMethod', method.id);
                      setTouched((t) => ({ ...t, paymentMethod: true }));
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${
                      selected ? 'border-primary bg-secondary' : 'border-border bg-background hover:border-foreground/40'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}
                    >
                      {selected && <Check size={12} className="text-primary-foreground" />}
                    </span>
                    <Icon size={18} className="shrink-0 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{method.label}</span>{' '}
                      <span className="text-muted-foreground">({method.scope})</span>
                    </span>
                  </button>
                  {selected && method.note && (
                    <p className="mt-2 rounded-lg border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">
                      {method.note}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {touched.paymentMethod && errors.paymentMethod && (
            <p className="text-xs text-destructive">{errors.paymentMethod}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar pedido'}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutClient;
