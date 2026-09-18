'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, MapPin, Landmark, Check } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { usePlacesAutocomplete, getCityFromPlace } from '@/hooks/usePlacesAutocomplete';
import { AddressMapPicker } from '@/components/AddressMapPicker';
import DeliveryHoursCard from '@/components/DeliveryHoursCard';
import { isInSameDayDeliveryZone } from '@/lib/deliveryZone';
import { createManualOrder } from '@/api/orders';
import { sendOtp, verifyOtp } from '@/api/otp';
import { WHATSAPP_NUMBER } from '@/lib/contact';
import { formatCOP, getProductsByIds } from '@/api/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
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

const emptyCustomer = { name: '', phone: '', email: '', city: '', address: '', notes: '', paymentMethod: 'transferencia' };

// Domicilio fijo por ahora ($10.000 para todos los pedidos). A futuro habrá
// clientes frecuentes/validados (por número o cédula) a quienes no se les
// cobre domicilio — cuando esa lógica esté definida, este valor pasa a
// depender del cliente en vez de ser una constante fija.
const DELIVERY_FEE = 10000;

// Único método de pago habilitado por ahora: transferencia bancaria,
// coordinada por WhatsApp tras verificar el pedido.
const PAYMENT_METHODS = [
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    icon: Landmark,
    scope: 'Válido para toda Colombia',
    note: 'Escanea el código QR para pagar el total del pedido (incluye domicilio). Guarda el pantallazo del comprobante: en el siguiente paso te damos un botón para enviarlo por WhatsApp y así confirmamos tu pago y programamos la entrega.',
  },
];

const OTP_RESEND_COOLDOWN_SECONDS = 60;

// El envío de OTP por WhatsApp está caído del lado del proveedor ("El envío
// de códigos no está disponible en este momento"). Mientras se soluciona,
// se oculta el paso de verificación y no se exige para completar el pedido.
// Para reactivarlo cuando vuelva a funcionar, solo hay que poner esto en true.
const WHATSAPP_OTP_ENABLED = false;

function validatePaymentMethod(value) {
  return value ? null : 'Selecciona un método de pago.';
}

const CheckoutClient = () => {
  const { cartItems, getCartTotal, getCartTotalValue, clearCart, removeFromCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  // Total a pagar = subtotal del carrito + domicilio fijo (ver DELIVERY_FEE).
  const orderTotal = getCartTotalValue() + DELIVERY_FEE;
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [coords, setCoords] = useState(null);
  // true/false una vez ubicado el punto, null mientras no hay coords o la
  // librería "geometry" de Maps todavía no cargó. Solo informa al cliente
  // sobre el mismo día — no bloquea el pedido (se envía a toda Colombia).
  const [inSameDayZone, setInSameDayZone] = useState(null);

  // Verificación de WhatsApp: 'idle' -> 'sent' -> 'verified'. otpPhone guarda
  // a qué número corresponde el paso actual, para poder invalidar todo si el
  // usuario cambia el teléfono después de haber pedido/confirmado el código.
  const [otpStep, setOtpStep] = useState('idle');
  const [otpPhone, setOtpPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return undefined;
    const timer = setInterval(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const phoneIsVerified = !WHATSAPP_OTP_ENABLED || (otpStep === 'verified' && otpPhone === customer.phone);

  const resetOtpIfPhoneChanged = (newPhone) => {
    if (otpStep !== 'idle' && newPhone !== otpPhone) {
      setOtpStep('idle');
      setOtpCode('');
      setOtpError('');
    }
  };

  const handleSendOtp = async () => {
    const phoneError = validatePhone(customer.phone);
    if (phoneError) {
      setTouched((t) => ({ ...t, phone: true }));
      runFieldValidation('phone', customer.phone);
      return;
    }
    setOtpError('');
    setOtpSending(true);
    try {
      await sendOtp(customer.phone);
      setOtpPhone(customer.phone);
      setOtpStep('sent');
      setOtpCode('');
      setResendCooldown(OTP_RESEND_COOLDOWN_SECONDS);
      toast({ title: 'Código enviado', description: `Te enviamos un código por WhatsApp al ${customer.phone}.` });
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(otpCode)) {
      setOtpError('Ingresa el código de 6 dígitos.');
      return;
    }
    setOtpError('');
    setOtpVerifying(true);
    try {
      await verifyOtp(otpPhone, otpCode);
      setOtpStep('verified');
      toast({ title: 'Número verificado por WhatsApp' });
    } catch (error) {
      setOtpError(error.message);
    } finally {
      setOtpVerifying(false);
    }
  };

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
        const lat = location.lat();
        const lng = location.lng();
        setCoords({ lat, lng });
        setInSameDayZone(isInSameDayDeliveryZone(lat, lng));
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
      `Domicilio: ${formatCOP(DELIVERY_FEE)}`,
      `Total a pagar: ${formatCOP(orderTotal)}`,
      `Nombre: ${customer.name}`,
      customer.city ? `Ciudad: ${customer.city}` : null,
      finalAddress ? `Dirección: ${finalAddress}` : null,
      paymentLabel ? `Método de pago: ${paymentLabel}` : null,
      'Adjunto el pantallazo del comprobante de la transferencia 👇',
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
    if (!phoneIsVerified) {
      toast({
        variant: 'destructive',
        title: 'Verifica tu WhatsApp',
        description: 'Confirma el código que te enviamos por WhatsApp antes de completar el pedido.',
      });
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
        total: orderTotal,
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
            <span>{formatCOP(DELIVERY_FEE)}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-4 text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">{formatCOP(orderTotal)}</span>
        </div>
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
                resetOtpIfPhoneChanged(value || '');
              }}
              onBlur={() => {
                handleBlur('phone')();
                runFieldValidation('phone', customer.phone);
              }}
              className={`phone-input-wrapper ${touched.phone && errors.phone ? 'phone-input-error' : ''}`}
            />
            {touched.phone && errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}

            {WHATSAPP_OTP_ENABLED && (
              <div className="pt-1">
                {otpStep !== 'verified' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSendOtp}
                    disabled={otpSending || resendCooldown > 0 || !customer.phone || !!validatePhone(customer.phone)}
                  >
                    {otpSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : otpStep === 'sent' ? (
                      resendCooldown > 0 ? `Reenviar código (${resendCooldown}s)` : 'Reenviar código'
                    ) : (
                      'Enviar código por WhatsApp'
                    )}
                  </Button>
                )}

                {otpStep === 'sent' && (
                  <div className="mt-3 space-y-2">
                    <Label htmlFor="otp">Código de verificación *</Label>
                    <div className="flex flex-wrap items-center gap-2">
                      <InputOTP id="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={otpCode} onChange={setOtpCode}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <Button type="button" size="sm" onClick={handleVerifyOtp} disabled={otpVerifying || otpCode.length !== 6}>
                        {otpVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verificar'}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Te enviamos un código de 6 dígitos por WhatsApp al {otpPhone}.
                    </p>
                  </div>
                )}

                {otpStep === 'verified' && (
                  <p className="flex items-center gap-1.5 text-sm text-green-600">
                    <Check size={16} /> Número verificado por WhatsApp
                  </p>
                )}

                {otpError && <p className="mt-1 text-xs text-destructive">{otpError}</p>}
              </div>
            )}
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
                setInSameDayZone(isInSameDayDeliveryZone(lat, lng));
                if (address) {
                  if (addressInputRef.current) addressInputRef.current.value = address;
                  setCustomer((c) => ({ ...c, address }));
                }
              }}
            />
          )}
          {coords && inSameDayZone !== null && (
            inSameDayZone ? (
              <p className="flex items-center gap-1.5 text-xs font-medium text-lime-700">
                <Check className="h-3.5 w-3.5 shrink-0" />
                Tu dirección está dentro de la zona de entrega el mismo día.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                No hacemos entregas a domicilio fuera de la zona sur hasta Laureles. Puedes conseguir AMOLI en tiendas Vita Integral cerca de ti.
              </p>
            )
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
          <h2 className="font-display font-bold">Método de pago</h2>
          <p className="text-xs text-muted-foreground">Todas las transacciones son seguras y encriptadas.</p>

          <div className="flex items-start gap-3 rounded-xl border-2 border-primary bg-secondary p-4">
            <Landmark size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
            <div className="text-sm">
              <p>
                <span className="font-semibold">{PAYMENT_METHODS[0].label}</span>{' '}
                <span className="text-muted-foreground">({PAYMENT_METHODS[0].scope})</span>
              </p>
              <p className="mt-2 rounded-lg border border-border bg-background/60 p-3 text-xs text-muted-foreground">
                {PAYMENT_METHODS[0].note}
              </p>
              <div className="mt-3 flex flex-col items-center gap-2 rounded-lg border border-border bg-background/60 p-3">
                <img
                  src="/images/qr-pago-bancolombia.jpg"
                  alt="Código QR Bre-B Bancolombia para pagar por transferencia (llave @sosa30502)"
                  className="h-48 w-48 rounded-md border border-border object-contain bg-white"
                />
                <p className="text-center text-xs text-muted-foreground">
                  Escanea y transfiere <span className="font-semibold text-foreground">{formatCOP(orderTotal)}</span> (incluye domicilio).
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting || !phoneIsVerified}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar pedido'}
        </Button>
        {!phoneIsVerified && (
          <p className="text-center text-xs text-muted-foreground">
            Verifica tu WhatsApp arriba para poder confirmar el pedido.
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutClient;
