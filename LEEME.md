# Autocompletado de direcciones (Google Places) en el checkout de AMOLI

## Archivos nuevos/modificados
- `src/hooks/useGoogleMapsScript.js` — carga el script de Google Maps JS API una sola vez (singleton).
- `src/hooks/usePlacesAutocomplete.js` — conecta el Autocomplete de Places a un `<input>`, restringido a Colombia y sesgado hacia Medellín.
- `src/pages/CheckoutPage.jsx` — el campo "Dirección de entrega" ahora usa el autocompletado; si Google detecta la ciudad y coincide con `CITY_OPTIONS`, la selecciona automáticamente.
- `.env.example` — se agregó `VITE_GOOGLE_MAPS_API_KEY`.
- `htaccess-actualizado.txt` (reemplaza a `public/.htaccess`) — se amplió la CSP para permitir `maps.googleapis.com` / `maps.gstatic.com`.

## Pasos para activarlo

1. **Crea/edita el archivo `apps/web/.env`** y agrega:
   ```
   VITE_GOOGLE_MAPS_API_KEY=tu-api-key-real
   ```

2. **En Google Cloud Console** (console.cloud.google.com/google/maps-apis):
   - Habilita **"Places API"** y **"Maps JavaScript API"**.
   - Crea una API key y restríngela por **HTTP referrers**: `https://amolisabores.com/*` y (si pruebas local) `http://localhost:3000/*`.
   - Opcional pero recomendado: limita la key para que solo pueda usar esas dos APIs (restricción por API).
   - Activa facturación en el proyecto (Google exige tarjeta, pero el uso normal de un checkout cae dentro de la cuota gratuita mensual).

3. **Copia el `.htaccess` actualizado** (`htaccess-actualizado.txt`) a `apps/web/public/.htaccess`, reemplazando el actual. Si ya le hiciste cambios propios, solo agrega `https://maps.googleapis.com https://maps.gstatic.com` al `script-src` y `https://maps.googleapis.com` al `connect-src` de la línea CSP.

4. Copia los dos hooks nuevos a `apps/web/src/hooks/` y reemplaza `apps/web/src/pages/CheckoutPage.jsx`.

5. `pnpm install` no requiere ningún paquete nuevo — no se agregó ninguna dependencia npm, el script de Google se carga directo desde su CDN.

## Cómo funciona
- Al escribir en el campo "Dirección de entrega", Google sugiere direcciones reales (restringidas a Colombia, priorizando el Valle de Aburrá).
- Al elegir una sugerencia, se llena automáticamente con la dirección formateada de Google.
- Si Google devuelve la ciudad (`locality`) y coincide con una de `CITY_OPTIONS` (en `src/lib/validation.js`), el selector de Ciudad se autocompleta también.
- Si la API key falta o el script no carga, el campo sigue funcionando como un input normal (no bloquea el checkout) y se muestra un aviso pequeño debajo.

## Nota de seguridad
La CSP quedó con `'unsafe-inline'` en `script-src` porque la librería de Places de Google inyecta sus propios `<script>`/estilos internos y no publica un hash fijo. Es el mismo trade-off que hacen la mayoría de sitios que usan Google Maps; si prefieres evitarlo, la alternativa es migrar al nuevo `PlaceAutocompleteElement` (Web Component) de Google, que es más restrictivo con CSP pero tiene menos soporte/documentación aún.
