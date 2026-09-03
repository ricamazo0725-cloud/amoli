# AMOLI — Guía de despliegue: Next.js en Hostinger (Node.js Apps)

Esta guía documenta el paso a paso para poner en producción la nueva versión
Next.js de la tienda (`apps/web-next`), que reemplaza a la app Vite
(`apps/web`) para resolver el problema de SEO de raíz: ahora el HTML que
reciben Google y demás crawlers ya trae el `<title>`, la meta description,
el canonical y el JSON-LD correctos de cada página — no dependen de que el
navegador ejecute JavaScript primero.

## ⚠️ Antes de tocar nada en producción

- **amolisabores.com está viva y recibiendo pedidos reales.** Haz este
  cambio en un horario de bajo tráfico y ten a mano 15-20 minutos para
  verificar que todo quedó bien antes de dar por cerrado el cambio.
- Antes de modificar cualquier configuración en hPanel, **toma capturas de
  pantalla** de cómo está configurado hoy el dominio y la integración Git
  actual (directorio de salida `dist/apps/web`, etc.). Si algo falla,
  necesitas poder volver exactamente a ese estado en minutos.
- Todo lo de este documento ya fue **verificado localmente** antes de
  escribir esta guía: `npm install`, `next build` y el arranque real de
  `node server.js` funcionan sin errores y sirven HTML correcto (títulos,
  canonical, JSON-LD, robots.txt, sitemap.xml). Lo que falta es la parte que
  solo se puede hacer desde el panel de Hostinger.

## Qué cambió en el repo (ya está en tu carpeta local)

- App nueva completa en `apps/web-next/` (Next.js 14.2.35 — App Router).
  `apps/web/` (la app Vite original) se deja intacta, sin tocar, por si
  necesitas volver atrás.
- `pnpm-workspace.yaml` ahora excluye explícitamente `apps/web-next`
  (`"!apps/web-next"`) para que el pnpm del monorepo nunca intente instalar
  esa app — **tiene que instalarse con `npm`, no con `pnpm`**, porque
  cuando Hostinger corre un proceso Node.js aislado (fuera del monorepo
  pnpm), los symlinks que crea pnpm se rompen y la app no arranca (da un
  503 sin logs claros). Esto ya quedó resuelto en el repo, pero es
  importante que en el panel de Hostinger elijas **npm** como gestor de
  paquetes para esta app si te lo pregunta.
- `.gitignore` raíz ahora también ignora `.next/` (antes solo ignoraba
  `dist/`, `build/`, `.vite/`).
- Durante la migración corregí dos bugs reales que encontré verificando el
  build (detalle al final de este documento): un `<title>` duplicado en el
  home y la versión de Next.js traía una vulnerabilidad de seguridad
  conocida (ya está en la `14.2.35`, la última corregida de la rama 14.2).

**Nada de esto se ha subido a GitHub todavía.** El primer paso de despliegue
es hacer commit y push desde tu computador (o pídeme que lo haga yo si
prefieres).

---

## Paso 1 — Subir el código a GitHub

Desde `C:\amoli\amoli-tienda`:

```bash
git add apps/web-next pnpm-workspace.yaml .gitignore
git commit -m "Agregar app Next.js (apps/web-next) para SSR/SEO"
git push
```

(Tu rama actual tenía cambios locales sin commitear de antes — revísalos
con `git status` para no mezclarlos por accidente con este commit si no son
parte de esto.)

## Paso 2 — Crear la aplicación Node.js en hPanel

En hPanel: **Avanzado → Node.js** (o "Aplicación Node.js", el nombre exacto
puede variar un poco según la versión del panel) → **Crear aplicación**.

| Campo | Valor |
|---|---|
| Versión de Node.js | **20.x (LTS)** — Next 14.2.35 requiere Node ≥ 18.17, pero usa la LTS más reciente disponible |
| Directorio raíz de la aplicación | `apps/web-next` |
| Archivo de inicio (startup file) | `server.js` |
| Modo | **Producción** |
| Gestor de paquetes | **npm** (si el panel lo pregunta explícitamente) |

Si el panel te pide un dominio o subdominio en este paso, y quieres probar
antes de tocar el dominio principal, usa un subdominio temporal (por
ejemplo `next.amolisabores.com` o el subdominio `*.hostinger...` que te
asigne) — así puedes verificar todo en vivo sin tocar
`amolisabores.com` hasta el Paso 6.

## Paso 3 — Variables de entorno

Estas son las mismas variables que ya usa la app Vite, con el prefijo
cambiado de `VITE_` a `NEXT_PUBLIC_`:

| Variable Vite (actual) | Variable Next.js (nueva) |
|---|---|
| `VITE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `VITE_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `VITE_GOOGLE_MAPS_API_KEY` | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` |
| `VITE_N8N_WEBHOOK_URL` | `NEXT_PUBLIC_N8N_WEBHOOK_URL` |

Copia los **valores** (no los nombres) desde donde los tengas guardados hoy
para la app Vite — son las mismas llaves de Supabase, etc.

Como ya sabes por la app Vite, la interfaz de Hostinger a veces falla al
guardar varias variables de una sola vez. Si te pasa, usa **"Importar
.env"** en vez de agregarlas una por una a mano.

**Importante:** en Next.js, las variables `NEXT_PUBLIC_*` quedan
incrustadas en el código durante el `build`, no se leen en caliente como en
un servidor tradicional. Si más adelante cambias alguna (por ejemplo,
rotas la llave de Supabase), **no basta con reiniciar la app** — tienes que
volver a correr el build (Paso 5) para que el cambio quede reflejado.

## Paso 4 — Instalar dependencias

Desde el panel de la app Node.js, usa el botón de **"Ejecutar NPM
install"** (o el equivalente). Debe detectar `apps/web-next/package.json` y
`package-lock.json` (ya están en el repo) e instalar con npm.

Si el panel te da acceso a una terminal SSH para esta app, puedes
verificarlo manualmente:

```bash
cd apps/web-next
npm install
```

## Paso 5 — Compilar (build)

```bash
npm run build
```

Debe terminar mostrando la tabla de rutas (seguramente muy parecida a la
que verifiqué localmente: `/`, `/productos`, `/marcas`, `/combos`,
`/ofertas`, `/blog`, `/blog/[slug]`, `/product/[id]`, `/checkout`,
`/success`, `/admin` y sus subrutas) y terminar con código de salida 0. Si
el panel tiene un campo separado de "comando de build", pon ahí
`npm run build`.

## Paso 6 — Arrancar y verificar (antes de tocar el dominio principal)

Reinicia/arranca la aplicación desde el panel. En los logs deberías ver:

```
> AMOLI (Next.js) listo en http://0.0.0.0:<puerto>
```

Prueba primero en el subdominio temporal o la URL que te dé Hostinger:

- Abre **"Ver código fuente"** (Ctrl+U), no las herramientas de desarrollo,
  en la página de inicio y en un producto — el `<title>`, la
  `<meta name="description">` y el `<link rel="canonical">` deben aparecer
  ya en el HTML crudo, sin necesidad de ejecutar JavaScript. Esa es la
  prueba de que el problema de SEO original quedó resuelto.
- Prueba el flujo de compra completo: catálogo → agregar al carrito →
  checkout → éxito.
- Entra a `/admin`, inicia sesión y revisa que el panel de productos,
  pedidos y blog carguen bien.
- Revisa `/robots.txt` y `/sitemap.xml` — deben cargar y el sitemap debe
  traer los productos y posts reales (no solo las rutas estáticas).

## Paso 7 — Apuntar el dominio principal

Este es el paso que reemplaza la integración Git estática actual (la que
usa `dist/apps/web` como directorio de salida) por la nueva app Node.js.

En hPanel, bajo **Dominios / Sitios web**, cambia la configuración de
`amolisabores.com` para que apunte a la aplicación Node.js que acabas de
crear (en vez del directorio estático `dist/apps/web`). El nombre exacto de
esta opción varía: puede ser un selector de "aplicación" al editar el
dominio, o mover/reconectar el dominio dentro de la sección Node.js del
panel. Si no lo ves directo, el soporte de Hostinger puede indicarte dónde
está en tu plan específico — es un paso común de su producto Node.js Apps.

No borres ni desactives la integración Git estática anterior todavía —
déjala ahí, solo desconectada del dominio, como plan de rollback (ver
abajo).

## Paso 8 — Verificación final en producción

Con el dominio ya apuntando a la app Next.js:

- Repite las pruebas del Paso 6 pero en `https://amolisabores.com` directo.
- En Google Search Console, ve a **Sitemaps** y reenvía
  `https://amolisabores.com/sitemap.xml` (ya lo tenías registrado, pero
  ahora el contenido es dinámico y siempre está sincronizado con los
  productos reales — antes era un archivo estático desactualizado).
- Usa la herramienta de **"Inspección de URLs"** de Search Console sobre la
  home y un par de productos, y pide "Probar URL en vivo" — debe mostrar el
  título y meta description correctos.
- Deja monitoreados los logs de la app en hPanel por unos minutos después
  del cambio, por si aparece algún error 500 con tráfico real.

## Plan de reversión (si algo sale mal)

Como no borraste la integración Git estática original, revertir es
reconectar el dominio `amolisabores.com` a esa configuración estática de
nuevo (directorio de salida `dist/apps/web`, tal como estaba antes de este
cambio) — usando las capturas de pantalla que tomaste al inicio como
referencia. Eso regresa el sitio al estado exacto de antes de este
despliegue en minutos, mientras investigas con calma qué falló en la app
Node.js.

---

## Apéndice — Cambios que hice durante la migración, más allá de portar el código

Documento esto para que no te sorprenda si comparas con la versión Vite:

- **`<title>` duplicado en el home:** en la versión Next.js original que
  armé, el home mostraba `"AMOLI | Guacamole artesanal, real y honesto |
  AMOLI"` (el nombre de la marca aparecía dos veces) por cómo interactúan
  el título del layout raíz con el de la página. Lo detecté verificando el
  HTML servido por el `build` local y ya está corregido.
- **`<h1>` duplicado en el home:** la versión Vite original tenía dos
  `<h1>` en la misma página (el título "AMOLI" del hero y el título del
  producto destacado). Cambié el del hero a un `<p>` — el título del
  producto sigue siendo el único `<h1>` de la página, que es mejor
  práctica de SEO.
- **Next.js 14.2.18 → 14.2.35:** la versión que originalmente instalé traía
  una vulnerabilidad de seguridad conocida y publicada por el equipo de
  Next.js. La actualicé a la última versión corregida dentro de la misma
  rama 14.2 (sin saltar a Next 15, para minimizar el riesgo de la
  migración).
- **`OrdersPanel.jsx` no se portó:** en el panel de administración de
  pedidos original había una importación y un estado (`activeTab`) que no
  se usaban en ningún render real — era código muerto. No lo incluí en la
  versión Next.js.
- **El enlace `/aliados` en el pie de página no tiene una ruta real** ni en
  la versión Vite ni en la nueva — lo dejé igual (sin "arreglarlo") porque
  no sé si es intencional o pendiente de tu parte. Avísame si quieres que
  le cree la página o que quite el enlace.
