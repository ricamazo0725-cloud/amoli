# Guía del proyecto — IronFuel / Base reutilizable de tienda + blog

Esta guía tiene un solo objetivo: que puedas tomar este proyecto como **plantilla
base para otro cliente**, cambiando solo lo visual (colores, textos, logo,
layout) sin arriesgar romper lo que ya funciona (Supabase, checkout, admin,
despliegue).

> Regla general: **todo lo que vive en `src/api/`, `src/hooks/`, `src/lib/`,
> y `supabase/` es "motor" — no lo toques al rediseñar.** Todo lo que vive en
> `src/pages/`, `src/components/` (menos `ui/`), `src/index.css` y
> `tailwind.config.js` es "carrocería" — ahí es donde cambias el diseño.

---

## 1. Arquitectura en una imagen mental

```
Visitante                         Administrador
    │                                   │
    ▼                                   ▼
Tienda pública (/,/productos,      Panel admin (/admin,
/blog, /checkout...)               /admin/orders, /admin/blog)
    │                                   │
    └───────────────┬───────────────────┘
                     ▼
              Supabase (Postgres + Auth + Storage)
                     │
                     ▼
              n8n (webhooks, automatizaciones)
```

- **Frontend**: React + Vite, todo en `apps/web` (es un monorepo con pnpm,
  pero solo hay una app adentro).
- **Backend**: no existe un backend propio — Supabase hace de base de datos,
  autenticación del admin, y almacenamiento de imágenes.
- **Hosting**: Hostinger, usando su integración nativa de Git (no Vercel/Netlify).
- **Automatizaciones**: n8n (en tu propio VPS), conectado por webhook.

---

## 2. Qué es "motor" (funcionalidad — NO tocar al rediseñar)

| Carpeta / archivo | Qué hace | Por qué no tocarlo |
|---|---|---|
| `src/lib/supabaseClient.js` | Conexión a Supabase | Si lo rompes, se cae TODO el sitio |
| `src/api/products.js` | CRUD de productos | Usado por catálogo, detalle, admin, checkout |
| `src/api/orders.js` | Crear/leer pedidos | Usado por checkout y admin de pedidos |
| `src/api/posts.js` | CRUD del blog | Usado por blog público y admin |
| `src/api/storage.js` | Subida de imágenes a Supabase Storage | Usado por admin de productos y blog |
| `src/api/n8n.js` | Notifica pedidos nuevos a tu webhook | Automatizaciones |
| `src/hooks/useCart.jsx` | Lógica del carrito (localStorage) | Si cambia la forma de los datos, hay que actualizar `ShoppingCart.jsx` y `CheckoutPage.jsx` a la vez |
| `src/hooks/useAuth.jsx` | Sesión del admin (Supabase Auth) | Login/logout del panel |
| `src/lib/validation.js` | Reglas del formulario de checkout | Cambia aquí las reglas, no en el JSX del form |
| `src/components/ProtectedRoute.jsx` | Bloquea `/admin/*` sin sesión | Seguridad del panel |
| `supabase/*.sql` | Esquema de base de datos y permisos (RLS) | Se corre una sola vez por proyecto de Supabase nuevo |
| `pnpm-workspace.yaml`, `.npmrc` | Configuración de instalación que costó mucho ajustar para que compilara en Hostinger (`ignoreScripts`, chmod de esbuild, etc.) | Romper esto = volver a los errores de `EACCES`/`pnpm` que ya resolvimos |
| `package.json` (raíz) → script `build` | Incluye el `chmod +x` que arregla el permiso de esbuild en Hostinger | Necesario en cualquier proyecto nuevo desplegado ahí |

**Para un cliente nuevo**, estos archivos se copian tal cual — solo cambian
las credenciales de Supabase (`.env`) y los datos dentro de las tablas
(productos, posts), no el código.

---

## 3. Qué es "carrocería" (diseño — aquí sí cambias todo)

### 3.1 Colores y tema visual → `src/index.css`

Todo el color del sitio sale de estas variables (formato HSL sin la palabra
`hsl()`, solo los números):

```css
:root {
  --background: 0 0% 6%;      /* fondo general (casi negro) */
  --foreground: 0 0% 98%;     /* texto principal (casi blanco) */
  --card: 0 0% 10%;           /* fondo de tarjetas */
  --primary: 0 84% 48%;       /* rojo — color de marca IronFuel */
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 14%;
  --accent: 38 96% 52%;       /* naranja/dorado — para etiquetas destacadas */
  --destructive: 0 72% 51%;   /* rojo de error/eliminar */
  --border: 0 0% 20%;
  --radius: 0.25rem;          /* qué tan redondeadas son las esquinas */
}
```

**Para cambiar la identidad visual de un cliente nuevo**, solo edita estos
valores. Ejemplo: si el cliente es una marca de belleza con paleta rosa/beige
sobre fondo claro, cambiarías `--background` a algo claro, `--primary` a un
rosa, etc. Todo el sitio (botones, bordes, textos) se actualiza solo porque
Tailwind está configurado para leer estas variables (`tailwind.config.js`).

También ahí están:
- La fuente de títulos (`font-display`, actualmente "Barlow Condensed" en
  mayúsculas) — cámbiala en la línea `@import` de Google Fonts y en
  `.font-display`.
- Estilos del selector de teléfono (`.phone-input-wrapper`) — ajusta si
  cambias el radio de bordes o colores.

### 3.2 Textos, menú y estructura del header/footer → `src/components/Layout.jsx`

Aquí vive:
- El nombre de la marca ("IRONFUEL SUPLEMENTOS") — línea del `<Link to="/">`.
- El menú de navegación (`NAV`, arriba del archivo) — array simple de
  `{ to, label }`.
- El texto de la barra superior animada (envío gratis, descuento, etc.).
- El footer (más abajo en el mismo archivo).

Para un cliente nuevo, aquí cambias el nombre, el menú, y los mensajes
promocionales — la estructura (header sticky, carrito flotante, menú móvil)
se puede dejar igual.

### 3.3 Páginas públicas → `src/pages/`

| Archivo | Qué es |
|---|---|
| `HomePage.jsx` | Portada |
| `CatalogPage.jsx` | Listado genérico (se reutiliza para /marcas, /combos, /ofertas con distinto título) |
| `ProductDetailPage.jsx` | Ficha de producto |
| `BlogPage.jsx` / `BlogPostPage.jsx` | Blog público |
| `CheckoutPage.jsx` | Formulario de pedido — **el flujo es "motor", pero el diseño del formulario (orden de campos, textos) sí se puede tocar** |
| `OrderSuccessPage.jsx` | Página de "gracias por tu compra" |

Estas páginas mezclan diseño (JSX, clases de Tailwind) con llamadas a la
lógica de negocio (`import { getProducts } from '@/api/products'`). Al
rediseñar, cambia las clases y el layout visual, pero no cambies qué función
de `src/api/` se está llamando ni la forma de los datos que espera.

### 3.4 Panel de administrador → `src/pages/Admin*.jsx`

`AdminDashboardPage.jsx` (productos), `AdminOrdersPage.jsx` (pedidos),
`AdminBlogPage.jsx` (blog) siguen todos el mismo patrón: tabla + formulario
tipo modal. Si quieres darle otra cara al admin para un cliente (por ejemplo,
con su color de marca en vez del rojo de IronFuel), el tema ya se hereda
solo de `index.css` — normalmente no necesitas tocar estos archivos, solo el
tema global.

### 3.5 Componentes UI base → `src/components/ui/`

Son los componentes tipo shadcn (Button, Input, Select, etc.). Rara vez se
tocan — ya están conectados al sistema de temas. Solo edítalos si necesitas
cambiar un comportamiento global (como ya hicimos con el color de texto de
los inputs).

---

## 4. Checklist para clonar esta base a un proyecto nuevo

1. **Duplica la carpeta del proyecto** con otro nombre.
2. **Crea un proyecto de Supabase nuevo** para el cliente (nunca reuses el
   mismo proyecto de Supabase entre clientes distintos).
3. Corre en el SQL Editor del proyecto nuevo, en este orden:
   - `supabase/schema.sql` (productos + pedidos)
   - `supabase/storage_policies.sql` (después de crear el bucket `product-images`)
   - `supabase/schema_blog.sql` (blog)
4. Actualiza `apps/web/.env` con la URL y anon key del proyecto nuevo.
5. Confirma que las variables de entorno del hosting (Hostinger u otro)
   tengan `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` cargadas antes de
   compilar — sin respaldo hardcodeado en el código, si faltan, el sitio no
   arranca (mensaje de error claro en consola).
6. Crea el usuario admin del cliente en Supabase (Authentication → Add user).
7. Cambia el tema visual (`src/index.css`) y el contenido de `Layout.jsx`.
8. Cambia `STORE_WHATSAPP_NUMBER` en `CheckoutPage.jsx` por el número del cliente.
9. Si el cliente también usa n8n, actualiza `VITE_N8N_WEBHOOK_URL`.
10. Crea un repositorio de GitHub nuevo, conecta el hosting del cliente
    (Hostinger u otro) siguiendo la configuración de
    `Directorio de salida: dist/apps/web` que ya validamos.
11. Borra los productos/posts de ejemplo de IronFuel antes de entregar.

---

## 5. Notas de despliegue (para no repetir la pelea que ya tuvimos)

- Hostinger usa **pnpm 11**, que bloquea scripts de instalación por defecto.
  `pnpm-workspace.yaml` ya tiene `ignoreScripts: true` para evitarlo.
- El binario de `esbuild` pierde permisos de ejecución en el filesystem de
  Hostinger — por eso el script `build` en el `package.json` raíz hace un
  `chmod +x` manual antes de compilar. **No quites esa línea.**
- El campo **"Directorio de salida"** en la configuración de Git de
  Hostinger debe ser `dist/apps/web` — si queda vacío, Hostinger publica el
  repositorio completo (código fuente) en vez del sitio compilado.
- Las variables de entorno de Hostinger a veces fallan al guardar más de una
  a la vez desde la interfaz — si eso pasa, prueba "Importar .env" en vez de
  agregarlas a mano, o guárdalas una por una confirmando cada vez con F5.
