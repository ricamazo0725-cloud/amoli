# Cómo conectar tu tienda a Supabase

## 0. Este proyecto usa pnpm (no npm)
El monorepo está configurado para **pnpm**. Si no lo tienes instalado:
```bash
npm install -g pnpm
```
Verifica con `pnpm -v`.

**Desde la raíz del proyecto** (no desde `apps/web`) puedes correr:
```bash
pnpm install   # instala TODO (raíz + apps/web) en un solo paso
pnpm dev       # levanta el servidor de la tienda
```
Ya no hace falta entrar a `apps/web` a mano ni usar npm — `pnpm --filter`
se encarga de correr los comandos dentro del paquete correcto.

Si ya tenías una instalación previa con `npm`, borra `node_modules` (en la
raíz y en `apps/web`) antes de correr `pnpm install`, para evitar mezclar
lockfiles de distintos gestores:
```bash
rm -rf node_modules apps/web/node_modules
pnpm install
```
(En Windows PowerShell: `Remove-Item -Recurse -Force node_modules, apps/web/node_modules`)

## 1. Crea el proyecto en Supabase
1. Ve a https://supabase.com → crea una cuenta/proyecto (gratis).
2. En **Settings → API** copia:
   - `Project URL`
   - `anon public key`

## 2. Configura las variables de entorno
En `apps/web/`, copia `.env.example` como `.env` y pega tus valores:

```
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## 3. Crea las tablas
En el Dashboard de Supabase, ve a **SQL Editor → New query**, pega todo el
contenido de `apps/web/supabase/schema.sql` y dale **Run**.
Esto crea las tablas `products`, `orders`, `order_items`, sus políticas de
seguridad (RLS), y 2 productos de ejemplo (puedes borrarlos desde el panel admin).

## 4. Crea tu usuario administrador
En el Dashboard de Supabase ve a **Authentication → Users → Add user**
(elige "Create new user"), pon tu correo y una contraseña. Con eso entras al panel.

⚠️ Importante: **no** actives "Enable email confirmations" para este usuario,
o crea el usuario ya confirmado desde el dashboard (la opción "Add user" del
dashboard crea usuarios ya confirmados automáticamente).

## 5. Instala dependencias y corre el proyecto
```bash
pnpm install
pnpm dev
```
Abre http://localhost:3000

## 6. Usa el panel de administrador
- Ve a `/admin/login`, entra con el correo/contraseña que creaste en el paso 4.
- En `/admin` puedes crear, editar y eliminar productos.
- Los productos marcados como "Visible en la tienda" aparecen automáticamente
  en `/productos`, la página de inicio y el detalle de cada producto.

## 7. Imágenes de producto (subida directa)
1. En el Dashboard de Supabase ve a **Storage → Create bucket**, nómbralo
   exactamente `product-images` y actívalo como **Public bucket**.
2. En **SQL Editor → New query**, pega el contenido de
   `apps/web/supabase/storage_policies.sql` y dale **Run**.
3. Listo — en el panel `/admin`, al crear o editar un producto, verás un botón
   "Subir imagen" que sube el archivo directo a Supabase y lo agrega al
   producto. También puedes seguir pegando URLs manualmente si prefieres.

## 8. Pagos
Por ahora el checkout es **manual**: el cliente llena sus datos, se crea el
pedido en Supabase con estado "pendiente", y se le da un botón para confirmar
por WhatsApp. Edita el número de WhatsApp de la tienda en:
`apps/web/src/pages/CheckoutPage.jsx` → constante `STORE_WHATSAPP_NUMBER`.

Cuando quieras activar Wompi o ePayco como pasarela real, dímelo — se integra
sobre esta misma base sin tener que rehacer el catálogo ni el panel admin.

## 10. Validaciones del formulario de checkout
El formulario de `/checkout` ahora valida en tiempo real:
- **Teléfono**: selector de país con banderas (por defecto Colombia); si es
  +57, exige 10 dígitos exactos. El número se guarda ya limpio (sin espacios).
- **Nombre**: solo letras y espacios, 3-40 caracteres.
- **Correo**: opcional, pero si se llena debe tener formato válido.
- **Ciudad**: ahora es una lista desplegable (`src/lib/validation.js` →
  `CITY_OPTIONS`) en vez de texto libre, para evitar variaciones como
  "Medellin"/"medallo". Agrega o quita ciudades ahí.
- **Dirección**: ahora es obligatoria, mínimo 8 caracteres.
- **Notas**: máximo 300 caracteres, con contador visible.

Todas las reglas están centralizadas en `apps/web/src/lib/validation.js` por
si quieres ajustarlas (ej. cambiar el mínimo de la dirección, agregar
ciudades, etc.).

## 11. Panel de pedidos
Ya no necesitas entrar a Supabase para ver los pedidos: en `/admin` verás dos
pestañas — **Productos** y **Pedidos**. En Pedidos puedes ver los datos del
cliente, los productos comprados, y cambiar el estado (pendiente → confirmado
→ enviado → cancelado) con un clic.

## 12. Blog
Se agregó un blog completo:
- **Público**: `/blog` (listado) y `/blog/tu-slug` (detalle de cada artículo).
- **Admin**: pestaña "Blog" dentro de `/admin`, para crear, editar y eliminar
  artículos, con subida de imagen de portada y control de "Publicado / Borrador".

**Antes de usarlo**, corre el script SQL nuevo:
1. Dashboard de Supabase → SQL Editor → New query.
2. Pega el contenido de `apps/web/supabase/schema_blog.sql` y dale Run.
   (Necesita que ya hayas corrido `schema.sql` antes — reutiliza una función
   de ahí.)

El campo "URL (slug)" se genera solo desde el título, pero lo puedes editar a
mano antes de guardar. El contenido del artículo es texto simple (respeta
saltos de línea), no tiene formato enriquecido (negritas, títulos, etc.) —
si más adelante quieres eso, se puede agregar un editor con Markdown.
