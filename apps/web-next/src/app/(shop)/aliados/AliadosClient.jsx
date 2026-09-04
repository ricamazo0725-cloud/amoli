'use client';

// Pagina "Aliados": invita a minimercados y tiendas saludables a vender
// guacamole AMOLI en sus puntos de venta. Copy y estructura definidas en
// AMOLI_Copy_Aliados.md (raiz del repo). El formulario no depende de una
// tabla nueva en Supabase: arma un mensaje de WhatsApp con los datos
// (mismo patron que HomeClient.handleWhatsAppBuy y el CTA de contacto),
// asi el aliado potencial habla directo con AMOLI por el canal que ya usa
// a diario, sin prometer un plazo de respuesta fijo.

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, Package, TrendingUp, Megaphone, MessageCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
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
import { useToast } from '@/hooks/use-toast';
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

const HARD_SHADOW = 'shadow-[6px_6px_0px_0px_rgba(42,42,42,1)]';
const HARD_SHADOW_SM = 'shadow-[3px_3px_0px_0px_rgba(42,42,42,1)]';
const STORE_WHATSAPP_NUMBER = '573002902010';
const BUSINESS_TYPES = ['Minimercado', 'Tienda saludable', 'Fruver', 'Otro'];

const BENEFITS = [
  {
    icon: Store,
    title: 'Un producto que se vende solo',
    text: 'Receta artesanal, ingredientes reales y una marca que ya reconocen tus clientes.',
  },
  {
    icon: Package,
    title: 'Fácil de tener en tienda',
    text: 'Empaque pensado para nevera, buena vida útil y reposición sencilla — sin sorpresas.',
  },
  {
    icon: TrendingUp,
    title: 'Buen margen para ti',
    text: 'Precios y condiciones pensadas para que valga la pena el espacio en tu nevera.',
  },
  {
    icon: Megaphone,
    title: 'Te acompañamos con estrategias digitales',
    text: 'Flujos y estrategias digitales pensadas para impulsar tus ventas, más material para exhibir el producto y un canal directo con nosotros si algo se ofrece.',
  },
];

const STEPS = [
  { n: '1', title: 'Cuéntanos de tu tienda', text: 'Llena el formulario con tus datos y ubicación.' },
  { n: '2', title: 'Hablamos contigo', text: 'Te contactamos para conocer tu punto de venta y resolver dudas.' },
  { n: '3', title: 'Empiezas a vender', text: 'Coordinamos el primer pedido y la entrega.' },
];

const emptyForm = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  city: '',
  businessType: '',
  address: '',
  message: '',
};

const validateBusinessName = (value) => {
  const v = (value || '').trim();
  if (!v) return 'El nombre de tu tienda es obligatorio.';
  if (v.length < 2 || v.length > 60) return 'Escribe el nombre completo de tu tienda.';
  return null;
};

const validateBusinessType = (value) => (value ? null : 'Selecciona el tipo de tienda.');

const validators = {
  businessName: validateBusinessName,
  contactName: validateName,
  phone: validatePhone,
  email: validateEmail,
  city: validateCity,
  businessType: validateBusinessType,
  address: validateAddress,
  message: validateNotes,
};

const AliadosClient = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    runFieldValidation(field, form[field]);
  };

  const runFieldValidation = (field, value) => {
    const message = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const validateAll = () => {
    const nextErrors = {};
    Object.entries(validators).forEach(([field, validate]) => {
      const message = validate(form[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);
    setTouched({
      businessName: true,
      contactName: true,
      phone: true,
      email: true,
      city: true,
      businessType: true,
      address: true,
      message: true,
    });
    return Object.keys(nextErrors).length === 0;
  };

  const buildWhatsappMessage = () => {
    const lines = [
      'Hola AMOLI! Quiero ser aliado y vender guacamole en mi tienda.',
      `Negocio: ${form.businessName}`,
      `Tipo de negocio: ${form.businessType}`,
      `Nombre de contacto: ${form.contactName}`,
      `Teléfono: ${form.phone}`,
      form.email ? `Correo: ${form.email}` : null,
      `Ciudad: ${form.city}`,
      `Dirección del punto de venta: ${form.address}`,
      form.message ? `Mensaje: ${form.message}` : null,
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      toast({ variant: 'destructive', title: 'Revisa los datos', description: 'Hay campos que necesitan corrección.' });
      return;
    }

    const sanitizedPhone = sanitizePhone(form.phone);
    setForm((f) => ({ ...f, phone: sanitizedPhone }));

    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="border-b-2 border-foreground bg-secondary">
        <div className="mx-auto max-w-[70rem] px-4 py-16 text-center sm:px-8 sm:py-20">
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
            Lleva AMOLI a tu tienda
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Guacamole artesanal, fresco y sin conservantes, listo para vender en tu nevera. Súmate a los minimercados y tiendas saludables que ya confían en AMOLI.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href="#formulario-aliados"
              className={`flex h-12 items-center gap-2 rounded-xl border-2 border-foreground bg-primary px-7 font-display text-base font-bold uppercase tracking-wide text-primary-foreground transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${HARD_SHADOW}`}
            >
              Quiero ser aliado
            </a>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sin costo por aplicar · Escríbenos por WhatsApp y cuéntanos dónde queda tu tienda
            </p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8">
        <h2 className="text-center font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
          Por qué las tiendas venden AMOLI
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className={`rounded-2xl border-2 border-foreground bg-card p-6 ${HARD_SHADOW_SM}`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border-2 border-foreground bg-accent">
                <Icon size={20} className="text-foreground" />
              </div>
              <h3 className="font-heading text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-y-2 border-foreground bg-foreground text-background">
        <div className="mx-auto max-w-[70rem] px-4 py-16 sm:px-8">
          <h2 className="text-center font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Cómo empezar
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto mb-4 font-display text-5xl font-black text-accent">{step.n}</div>
                <h3 className="font-heading text-base font-bold uppercase">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO / CONFIRMACION */}
      <section id="formulario-aliados" className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
        {submitted ? (
          <div className={`rounded-2xl border-2 border-foreground bg-card p-8 text-center ${HARD_SHADOW}`}>
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="font-display text-2xl font-black">¡Listo! Ya recibimos tu solicitud</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Gracias por tu interés en vender AMOLI. Un asesor te va a contactar pronto al número o correo que nos dejaste. Si prefieres agilizarlo, también puedes escribirnos por WhatsApp y contarnos dónde queda tu tienda.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-5 font-heading text-xs font-black uppercase text-background transition hover:bg-primary ${HARD_SHADOW_SM}`}
              >
                <MessageCircle size={16} className="text-accent" /> Escribir por WhatsApp
              </a>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
                <ArrowLeft size={16} /> Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-black">Cuéntanos de tu tienda</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Llena tus datos y te escribimos para coordinar todo.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 rounded-2xl border-2 border-foreground bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nombre de tu tienda o minimercado *</Label>
                  <Input
                    id="businessName"
                    placeholder="Ej: Minimercado La Esquina"
                    value={form.businessName}
                    onChange={(e) => {
                      handleChange('businessName')(e);
                      if (touched.businessName) runFieldValidation('businessName', e.target.value);
                    }}
                    onBlur={handleBlur('businessName')}
                    aria-invalid={!!errors.businessName}
                  />
                  {touched.businessName && errors.businessName && (
                    <p className="text-xs text-destructive">{errors.businessName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Tu nombre *</Label>
                  <Input
                    id="contactName"
                    value={form.contactName}
                    onChange={(e) => {
                      handleChange('contactName')(e);
                      if (touched.contactName) runFieldValidation('contactName', e.target.value);
                    }}
                    onBlur={handleBlur('contactName')}
                    aria-invalid={!!errors.contactName}
                  />
                  {touched.contactName && errors.contactName && (
                    <p className="text-xs text-destructive">{errors.contactName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (WhatsApp) *</Label>
                  <PhoneInput
                    id="phone"
                    international
                    defaultCountry="CO"
                    countryCallingCodeEditable={false}
                    value={form.phone}
                    onChange={(value) => {
                      setForm((f) => ({ ...f, phone: value || '' }));
                      if (touched.phone) runFieldValidation('phone', value || '');
                    }}
                    onBlur={() => handleBlur('phone')()}
                    className="phone-input-amoli"
                  />
                  {touched.phone && errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      handleChange('email')(e);
                      if (touched.email) runFieldValidation('email', e.target.value);
                    }}
                    onBlur={handleBlur('email')}
                    aria-invalid={!!errors.email}
                  />
                  {touched.email && errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Select
                    value={form.city}
                    onValueChange={(value) => {
                      setForm((f) => ({ ...f, city: value }));
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

                <div className="space-y-2">
                  <Label htmlFor="businessType">Tipo de tienda *</Label>
                  <Select
                    value={form.businessType}
                    onValueChange={(value) => {
                      setForm((f) => ({ ...f, businessType: value }));
                      runFieldValidation('businessType', value);
                      setTouched((t) => ({ ...t, businessType: true }));
                    }}
                  >
                    <SelectTrigger id="businessType" aria-invalid={!!errors.businessType}>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.businessType && errors.businessType && (
                    <p className="text-xs text-destructive">{errors.businessType}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección del punto de venta *</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => {
                    handleChange('address')(e);
                    if (touched.address) runFieldValidation('address', e.target.value);
                  }}
                  onBlur={handleBlur('address')}
                  aria-invalid={!!errors.address}
                />
                {touched.address && errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">¿Algo más que quieras contarnos?</Label>
                <Textarea
                  id="message"
                  placeholder="Ej: cuántos puntos de venta tienes, si ya vendes productos similares"
                  maxLength={NOTES_MAX_LENGTH}
                  value={form.message}
                  onChange={(e) => {
                    handleChange('message')(e);
                    if (touched.message) runFieldValidation('message', e.target.value);
                  }}
                  onBlur={handleBlur('message')}
                  aria-invalid={!!errors.message}
                />
                {touched.message && errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" className={`w-full sm:w-auto ${HARD_SHADOW_SM}`}>
                Enviar solicitud
              </Button>
              <p className="text-xs text-muted-foreground">
                Tus datos solo se usan para contactarte sobre esta solicitud. Al enviar, se abre WhatsApp con tu información para que hables directo con nosotros.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default AliadosClient;
