// Reglas de validación para el checkout. Centralizadas aquí para poder
// reutilizarlas o ajustarlas sin tocar el JSX del formulario.

export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NOTES_MAX_LENGTH = 300;
export const ADDRESS_MIN_LENGTH = 8;

/** Lista de ciudades para el selector (ajusta/agrega las que necesites). */
export const CITY_OPTIONS = [
  'Medellín',
  'Envigado',
  'Itagüí',
  'Sabaneta',
  'La Estrella',
  'Bello',
  'Caldas',
  'Copacabana',
  'Rionegro',
  'Bogotá',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Otra ciudad',
];

/**
 * Valida el nombre completo.
 * @returns {string|null} mensaje de error, o null si es válido
 */
export function validateName(value) {
  const v = (value || '').trim();
  if (!v) return 'El nombre es obligatorio.';
  if (!NAME_REGEX.test(v)) return 'Usa solo letras y espacios (3 a 40 caracteres).';
  return null;
}

/**
 * Valida el teléfono ya en formato E.164 (ej. +573107008875), como lo
 * entrega react-phone-number-input.
 * @returns {string|null}
 */
export function validatePhone(value) {
  const v = (value || '').trim();
  if (!v) return 'El teléfono es obligatorio.';
  // Colombia: +57 seguido de exactamente 10 dígitos
  if (v.startsWith('+57')) {
    const digits = v.slice(3);
    if (!/^\d{10}$/.test(digits)) return 'Para Colombia, el número debe tener 10 dígitos.';
    return null;
  }
  // Otros países: validación general E.164 (8 a 15 dígitos totales)
  if (!/^\+\d{8,15}$/.test(v)) return 'Número de teléfono inválido.';
  return null;
}

/** Sanitiza el teléfono antes de guardarlo (quita espacios/guiones). */
export function sanitizePhone(value) {
  return (value || '').replace(/[\s-]/g, '');
}

/**
 * Valida el correo. Es opcional: una cadena vacía es válida.
 * @returns {string|null}
 */
export function validateEmail(value) {
  const v = (value || '').trim();
  if (!v) return null;
  if (!EMAIL_REGEX.test(v)) return 'Escribe un correo válido (ej. nombre@correo.com).';
  return null;
}

/** @returns {string|null} */
export function validateCity(value) {
  const v = (value || '').trim();
  if (!v) return 'Selecciona tu ciudad.';
  return null;
}

/** @returns {string|null} */
export function validateAddress(value) {
  const v = (value || '').trim();
  if (!v) return 'La dirección de entrega es obligatoria.';
  if (v.length < ADDRESS_MIN_LENGTH) return `Escribe la dirección completa (mínimo ${ADDRESS_MIN_LENGTH} caracteres).`;
  return null;
}

/** @returns {string|null} */
export function validateNotes(value) {
  const v = value || '';
  if (v.length > NOTES_MAX_LENGTH) return `Máximo ${NOTES_MAX_LENGTH} caracteres.`;
  return null;
}
