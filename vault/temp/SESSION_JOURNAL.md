## 2026-08-11 03:00:59.801Z load
- url: http://localhost:3000/

## 2026-08-11 03:01:52.961Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id] {\n\t\tcursor: pointer;\n\t\toutline: 2px dashed #357DF9;\n\t\toutline-offset: 2px;\n\t\tmin-height: 1em;\n\t\toverflow-wrap: anywhere;\n\t\tmin-width: 0;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] img[data-edit-id] {\n\t\toutline-offset: -2px;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id]:hover {\n\t\tbackground-color: #357DF933;\n\t\toutline-color: #357DF9..."}

## 2026-08-11 03:02:00.138Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id] {\n\t\tcursor: pointer;\n\t\toutline: 2px dashed #357DF9;\n\t\toutline-offset: 2px;\n\t\tmin-height: 1em;\n\t\toverflow-wrap: anywhere;\n\t\tmin-width: 0;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] img[data-edit-id] {\n\t\toutline-offset: -2px;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id]:hover {\n\t\tbackground-color: #357DF933;\n\t\toutline-color: #357DF9..."}

## 2026-08-11 03:02:12.123Z load
- url: http://192.168.40.9:3000/

## 2026-08-11 03:02:18.124Z console.error
- text: Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. Crea un archivo .env en la raíz del proyecto (apps/web/.env) con esos valores. Revisa apps/web/.env.example.

## 2026-08-11 03:02:18.128Z window.error
- message: Uncaught Error: supabaseUrl is required.
- source: http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a
- line: 19912
- col: 26
- stack: 
    Error: supabaseUrl is required.
        at validateSupabaseUrl (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:19912:26)
        at new SupabaseClient (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:20144:21)
        at createClient (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:20370:10)
        at http://localhost:3000/src/lib/supabaseClient.js:15:25

## 2026-08-11 03:02:18.308Z console.error
- text: Faltan las variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. Crea un archivo .env en la raíz del proyecto (apps/web/.env) con esos valores. Revisa apps/web/.env.example.

## 2026-08-11 03:02:18.312Z window.error
- message: Uncaught Error: supabaseUrl is required.
- source: http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a
- line: 19912
- col: 26
- stack: 
    Error: supabaseUrl is required.
        at validateSupabaseUrl (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:19912:26)
        at new SupabaseClient (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:20144:21)
        at createClient (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=acf1d10a:20370:10)
        at http://192.168.40.9:3000/src/lib/supabaseClient.js:15:25

## 2026-08-11 03:04:08.191Z load
- url: http://localhost:3000/

## 2026-08-11 03:04:10.287Z load
- url: http://192.168.40.9:3000/

## 2026-08-11 03:04:13.253Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 03:04:13.165Z navigate
- url: http://192.168.40.9:3000/
- via: replaceState

## 2026-08-11 03:04:15.424Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1947

## 2026-08-11 03:04:15.430Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://192.168.40.9:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://192.168.40.9:3000/:491:23)
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://192.168.40.9:3000/src/api/products.js:33:27)
        at async fetchProducts (http://192.168.40.9:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:15.428Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1935

## 2026-08-11 03:04:15.428Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:491:23)
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://localhost:3000/src/api/products.js:33:27)
        at async fetchProducts (http://localhost:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:21.932Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 3405

## 2026-08-11 03:04:21.932Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://192.168.40.9:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://192.168.40.9:3000/:491:23)
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://192.168.40.9:3000/src/api/products.js:33:27)
        at async fetchProducts (http://192.168.40.9:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:27.510Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1924

## 2026-08-11 03:04:27.510Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://192.168.40.9:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://192.168.40.9:3000/:491:23)
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://192.168.40.9:3000/src/api/products.js:33:27)
        at async fetchProducts (http://192.168.40.9:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:29.259Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 11030

## 2026-08-11 03:04:29.260Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:491:23)
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://localhost:3000/src/api/products.js:33:27)
        at async fetchProducts (http://localhost:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:34.400Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1924

## 2026-08-11 03:04:34.400Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:491:23)
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://localhost:3000/src/api/products.js:33:27)
        at async fetchProducts (http://localhost:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:34.399Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1961

## 2026-08-11 03:04:34.400Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://192.168.40.9:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://192.168.40.9:3000/:491:23)
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://192.168.40.9:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://192.168.40.9:3000/src/api/products.js:33:27)
        at async fetchProducts (http://192.168.40.9:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:04:41.017Z network.error
- method: GET
- url: https://tuproyecto.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc&limit=4
- message: Failed to fetch
- durationMs: 1975

## 2026-08-11 03:04:41.017Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:491:23)
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://localhost:3000/src/api/products.js:33:27)
        at async fetchProducts (http://localhost:3000/src/components/ProductsList.jsx:164:22)

## 2026-08-11 03:10:40.090Z load
- url: http://192.168.40.9:3000/

## 2026-08-11 03:10:40.102Z load
- url: http://localhost:3000/

## 2026-08-11 03:11:17.905Z load
- url: http://localhost:3000/

## 2026-08-11 03:11:24.860Z load
- url: http://localhost:3000/

## 2026-08-11 03:11:24.550Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 03:11:40.922Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Conoce los sabores"}

## 2026-08-11 03:11:40.926Z navigate
- url: http://localhost:3000/marcas
- via: pushState

## 2026-08-11 03:11:44.001Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Inicio"}

## 2026-08-11 03:11:44.002Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 03:13:34.470Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sabores"}

## 2026-08-11 03:13:34.474Z navigate
- url: http://localhost:3000/marcas
- via: pushState

## 2026-08-11 03:13:36.150Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 03:13:36.152Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 03:13:37.530Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Inicio"}

## 2026-08-11 03:13:37.530Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 03:16:04.849Z load
- url: http://localhost:3000/

## 2026-08-11 03:16:04.383Z console.warn
- text: GoTrueClient@sb-kkygujzfiiyvpjqbkkvg-auth-token:1 (2.112.2) 2026-08-11T03:16:04.382Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.

## 2026-08-11 03:16:04.390Z console.warn
- text: GoTrueClient@sb-kkygujzfiiyvpjqbkkvg-auth-token:2 (2.112.2) 2026-08-11T03:16:04.390Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.

## 2026-08-11 03:16:05.045Z window.error
- message: Uncaught TypeError: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
- source: http://localhost:3000/src/components/Layout.jsx
- line: 20
- col: 11
- stack: 
    TypeError: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
        at Layout (http://localhost:3000/src/components/Layout.jsx:20:11)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 03:16:05.056Z window.error
- message: Uncaught TypeError: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
- source: http://localhost:3000/src/components/Layout.jsx
- line: 20
- col: 11
- stack: 
    TypeError: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
        at Layout (http://localhost:3000/src/components/Layout.jsx:20:11)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 03:16:05.070Z console.error
- text: 
    The above error occurred in the <Layout> component:
    
        at Layout (http://localhost:3000/src/components/Layout.jsx:16:19)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:6647:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7572:3)
        at CartProvider (http://localhost:3000/src/hooks/useCart.jsx?t=1786418162265:12:32)
        at AuthProvider (http://localhost:3000/src/hooks/useAuth.jsx:11:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7511:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:10816:3)
        at App
    
    Consider adding an error boundary to your tree to customize error handling behavior.
    Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

## 2026-08-11 03:16:05.112Z unhandledrejection
- message: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
- stack: 
    TypeError: Cannot destructure property 'cartItems' of 'useCart(...)' as it is undefined.
        at Layout (http://localhost:3000/src/components/Layout.jsx:20:11)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18786:28)
        at performSyncWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18932:28)

## 2026-08-11 03:16:08.763Z load
- url: http://localhost:3000/

## 2026-08-11 03:16:09.264Z load
- url: http://localhost:3000/

## 2026-08-11 03:16:37.566Z load
- url: http://localhost:3000/

## 2026-08-11 03:16:38.153Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 03:16:57.023Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 03:16:57.429Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🍋 Limonudo"}

## 2026-08-11 03:16:57.965Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 03:16:58.864Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Conoce los sabores"}

## 2026-08-11 03:16:58.868Z navigate
- url: http://localhost:3000/marcas
- via: pushState

## 2026-08-11 03:17:00.129Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guacamole AMOLI Picante 450gAMOLI$ 22.000 Añadir al carrito"}

## 2026-08-11 03:17:00.130Z navigate
- url: http://localhost:3000/product/707cd912-d94e-4653-87b0-29cccb432c30
- via: pushState

## 2026-08-11 03:17:06.225Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANAL"}

## 2026-08-11 03:17:06.226Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 03:17:11.401Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 03:17:11.995Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI"}

## 2026-08-11 03:17:12.642Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🍋 Limonudo"}

## 2026-08-11 03:17:13.195Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI"}

## 2026-08-11 03:17:32.227Z load
- url: http://localhost:3000/admin

## 2026-08-11 03:17:33.007Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 03:17:33.329Z navigate
- url: http://localhost:3000/admin/login
- via: replaceState

## 2026-08-11 03:17:34.882Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Correo"}

## 2026-08-11 03:17:35.205Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo","value":"","valueLength":0,"text":""}

## 2026-08-11 03:17:35.306Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo","value":"","valueLength":0,"text":""}

## 2026-08-11 03:17:41.490Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo","value":"rmazov3@gmail.com","valueLength":17,"text":""}

## 2026-08-11 03:17:41.490Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo","value":"rmazov3@gmail.com","valueLength":17,"text":""}

## 2026-08-11 03:17:41.492Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":"password","placeholder":null,"label":"Contraseña","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-11 03:17:47.208Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":"password","placeholder":null,"label":"Contraseña","value":"[redacted:length=0]","valueLength":0,"text":""}

## 2026-08-11 03:17:48.552Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":"password","placeholder":null,"label":"Contraseña","value":"[redacted:length=18]","valueLength":18,"text":""}

## 2026-08-11 03:17:48.553Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"password","id":"password","placeholder":null,"label":"Contraseña","value":"[redacted:length=18]","valueLength":18,"text":""}

## 2026-08-11 03:17:48.626Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Iniciar sesión"}

## 2026-08-11 03:17:48.629Z submit
- action: http://localhost:3000/admin/login
- fields: [{"label":"Correo","type":"email","value":"rmazov3@gmail.com","length":17,"redacted":false},{"label":"Contraseña","type":"password","value":"[redacted:length=18]","length":18,"redacted":true},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 03:17:49.158Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 03:17:49.188Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 03:17:51.219Z load
- url: http://localhost:3000/

## 2026-08-11 03:17:58.163Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 03:18:00.965Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 03:18:00.965Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 03:18:07.222Z network.error
- method: POST
- url: https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/product-images/products/1786418286532-1.jpg
- status: 400
- requestBody: {"cacheControl":"3600","":{"fileName":"1.jpg","type":"image/jpeg","size":447217}}
- response: {"statusCode":"404","error":"Bucket not found","message":"Bucket not found","code":"NoSuchBucket"}
- durationMs: 661

## 2026-08-11 03:18:07.223Z console.error
- text: Fetch error from https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/product-images/products/1786418286532-1.jpg: {"statusCode":"404","error":"Bucket not found","message":"Bucket not found","code":"NoSuchBucket"}

## 2026-08-11 03:20:29.455Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 03:20:29.455Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 03:20:42.356Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 03:20:42.360Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Picante 450g","length":28,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Picante","length":7,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.","length":141,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"22000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786418434222-1.jpg","length":109,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 03:20:47.966Z load
- url: http://localhost:3000/

## 2026-08-11 03:21:46.504Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Añadir al carrito"}

## 2026-08-11 03:21:47.818Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito1"}

## 2026-08-11 03:21:50.489Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 03:21:51.122Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Continuar con el pedido"}

## 2026-08-11 03:21:51.124Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-11 03:21:53.686Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 03:21:53.780Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 03:21:56.087Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"fddf","valueLength":4,"text":""}

## 2026-08-11 03:21:56.088Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"fddf","valueLength":4,"text":""}

## 2026-08-11 03:22:01.305Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"fddf","valueLength":4,"text":""}

## 2026-08-11 03:22:01.320Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"fddf","valueLength":4,"text":""}

## 2026-08-11 03:22:01.440Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57","valueLength":3,"text":""}

## 2026-08-11 03:22:01.490Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57","valueLength":3,"text":""}

## 2026-08-11 03:22:06.032Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 2121212","valueLength":15,"text":""}

## 2026-08-11 03:22:06.032Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 2121212","valueLength":15,"text":""}

## 2026-08-11 03:22:06.052Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo (opcional)","value":"","valueLength":0,"text":""}

## 2026-08-11 03:22:06.119Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo (opcional)","value":"","valueLength":0,"text":""}

## 2026-08-11 03:22:06.930Z click
- element: {"tag":"body","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\t 100% aguacate Hass montañero de Antioquia Guacamole real, sin artificios Envío refrigerado a tu puerta 100% aguacate Hass montañero de Antioquia Guacamole real, sin artificios Envío refrigerado a tu puertaAMOLIGUACAMOLE ARTESANALInicioProductosSaboresCombosOfertasRecetas Carrito1 Seguir comprandoFinalizar pedidoPago manual: te confirmamos el pedido y coordinamos el pago por transferencia o WhatsApp.Resumen del pedido1 x Guacamole AMOLI Picante 450g$ 22.000Total$ 22.000Tus datosNombre completo *Teléfono / WhatsApp *AfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntigua and BarbudaArgentinaArmeniaArubaAscension IslandAustraliaAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBelarusBelgiumBelizeBeninBermudaBhutanBoliviaBonaire, Sint Eustatius and SabaBosnia and HerzegovinaBotswanaBrazilBritish Indian Ocean TerritoryBrunei DarussalamBulgariaBurkina FasoBurundiCambodiaCameroonCanadaCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandCocos (Keeling) IslandsColombiaComorosCongoCongo, Democratic Republic of theCook IslandsCosta RicaCote d'IvoireCroatiaCubaCuraçaoCyprusCzech RepublicDenmarkDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaFalkland IslandsFaroe IslandsFederated States of MicronesiaFijiFinlandFranceFrench GuianaFrench PolynesiaGabonGambiaGeorgiaGermanyGhanaGibraltarGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHoly See (Vatican City State)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJapanJerseyJordanKazakhstanKenyaKiribatiKosovoKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacaoMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMexicoMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueMyanmarNamibiaNauruNepalNetherlandsNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorth KoreaNort..."}

## 2026-08-11 03:22:08.584Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"Envigado","valueLength":8,"text":"MedellínEnvigadoItagüíSabanetaLa EstrellaBelloCaldasCopacabanaRionegroBogotáCaliBarranquillaCartagenaBucaramangaOtra ciudad"}

## 2026-08-11 03:22:08.587Z click
- element: {"tag":"div","role":"option","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Envigado"}

## 2026-08-11 03:22:09.150Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-11 03:22:09.258Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-11 03:22:11.966Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"dfsdsfgfdsgfgfd","valueLength":15,"text":""}

## 2026-08-11 03:22:11.966Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"dfsdsfgfdsgfgfd","valueLength":15,"text":""}

## 2026-08-11 03:22:12.064Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Confirmar pedido"}

## 2026-08-11 03:22:12.067Z submit
- action: http://localhost:3000/checkout
- fields: [{"label":"Nombre completo *","type":"text","value":"fddf","length":4,"redacted":false},{"label":"Phone number country","type":"select-one","value":"CO","length":2,"redacted":false},{"label":"Teléfono / WhatsApp *","type":"tel","value":"+57 310 2121212","length":15,"redacted":false},{"label":"Correo (opcional)","type":"email","value":"","length":0,"redacted":false},{"label":"Ciudad *","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Envigado","length":8,"redacted":false},{"label":"Dirección de entrega *","type":"text","value":"dfsdsfgfdsgfgfd","length":15,"redacted":false},{"label":"Notas adicionales","type":"textarea","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 03:22:13.281Z navigate
- url: http://localhost:3000/success
- via: pushState

## 2026-08-11 14:28:09.080Z load
- url: http://localhost:3000/

## 2026-08-11 14:28:15.517Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 14:28:23.271Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:28:24.496Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:28:25.600Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:28:58.588Z load
- url: http://localhost:3000/admin

## 2026-08-11 14:28:59.150Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 14:29:33.793Z load
- url: http://localhost:3000/

## 2026-08-11 14:29:34.061Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 14:29:55.117Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:29:56.132Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:29:57.396Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:29:58.124Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:29:58.813Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 PicanteAMOLI🍋 Limonudo"}

## 2026-08-11 14:30:00.077Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:30:00.950Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:30:01.756Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:30:02.300Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:30:02.713Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:30:03.223Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:30:03.864Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:30:05.618Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:30:06.203Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:30:25.150Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Seleccionar"}

## 2026-08-11 14:30:34.506Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Seleccionar"}

## 2026-08-11 14:30:41.128Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedir Ahora"}

## 2026-08-11 14:31:07.137Z click
- element: {"tag":"p","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Con el carácter justo del ají natural y pimienta seleccionada. Picor equilibrado."}

## 2026-08-11 14:31:13.820Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:31:14.600Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 14:31:21.805Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 14:31:34.882Z click
- element: {"tag":"nav","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"InicioProductosSaboresCombosOfertasRecetas"}

## 2026-08-11 14:31:35.236Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 14:31:35.239Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 14:31:38.486Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Añadir al carrito"}

## 2026-08-11 14:31:53.319Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Inicio"}

## 2026-08-11 14:31:53.321Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 14:33:05.035Z load
- url: http://192.168.40.9:3000/

## 2026-08-11 14:33:06.692Z navigate
- url: http://192.168.40.9:3000/
- via: replaceState

## 2026-08-11 16:16:24.759Z load
- url: http://localhost:3000/

## 2026-08-11 16:16:27.174Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 16:16:37.540Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"450gAMOLI🍋 LIMONUDO"}

## 2026-08-11 16:16:38.588Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 16:16:38.592Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 16:17:17.294Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGuacamole elaborado mediante un proceso artesanal, fresco y responsable, con aguacate Hass montañero de Antioquia.TiendaProductosSaboresCombosOfertasRecetasEnvíos y pagosEnvío refrigerado en ciudades principalesEntrega 24-72 hTransferencia bancaria y PSEPago contra entrega en AntioquiaContactoWhatsApp: +57 300 290 2010saboresamoli@gmail.comCra. 39B #45A Sur-07, Envigado, Ant."}

## 2026-08-11 16:17:38.801Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Envíos y pagosEnvío refrigerado en ciudades principalesEntrega 24-72 hTransferencia bancaria y PSEPago contra entrega en Antioquia"}

## 2026-08-11 16:17:41.041Z click
- element: {"tag":"li","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pago contra entrega en Antioquia"}

## 2026-08-11 16:17:41.271Z click
- element: {"tag":"li","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pago contra entrega en Antioquia"}

## 2026-08-11 16:17:41.489Z click
- element: {"tag":"li","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pago contra entrega en Antioquia"}

## 2026-08-11 16:18:14.898Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guacamole AMOLI Picante 450gAMOLI$ 22.000 Añadir al carrito"}

## 2026-08-11 16:18:14.899Z navigate
- url: http://localhost:3000/product/707cd912-d94e-4653-87b0-29cccb432c30
- via: pushState

## 2026-08-11 16:18:22.041Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:23.545Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:24.501Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:24.886Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:25.770Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:25.969Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:18:31.649Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Volver a la tienda"}

## 2026-08-11 16:18:31.651Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 16:19:47.379Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guacamole AMOLI Picante 450gAMOLI$ 22.000 Añadir al carritoGuacamole AMOLI Limonudo 450gAMOLI$ 22.000 Añadir al carrito"}

## 2026-08-11 16:27:09.465Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANAL"}

## 2026-08-11 16:27:09.467Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 16:27:21.202Z load
- url: http://localhost:3000/

## 2026-08-11 16:27:33.482Z load
- url: http://localhost:3000/

## 2026-08-11 16:29:30.950Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:29:32.255Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:40:34.301Z load
- url: http://localhost:3000/

## 2026-08-11 16:41:54.079Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Manifesto AMOLIGUACAMOLE REAL, SIN ARTIFICIOSSin trucos, sin aditivos y sin rellenos. Una receta honesta que respeta la frescura del aguacate de nuestras montañas.0%Sin Aditivos Ni RellenosGarantizamos un sabor limpio. No diluimos la receta con agua, harinas ni colorantes sintéticos.🌿100%Aguacate Hass MontañeroCultivado en el campo antioqueño. Mantenemos trocitos reales para dar la mejor textura en cada cucharada.🥑HONESTOProceso ArtesanalIngredientes seleccionados minuciosamente para ofrecer un sabor casero y una experiencia auténtica.✨"}

## 2026-08-11 16:42:09.487Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 16:42:11.659Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:42:12.915Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 16:42:15.252Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito3"}

## 2026-08-11 16:42:17.334Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quitar"}

## 2026-08-11 16:42:18.059Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quitar"}

## 2026-08-11 16:42:18.989Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Carrito de comprasTu carrito está vacío."}

## 2026-08-11 16:42:21.225Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 16:42:22.313Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:42:23.250Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 16:42:25.029Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:42:26.423Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:42:28.406Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:42:31.367Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"FRASCO DE VIDRIO • 450G(128)"}

## 2026-08-11 16:42:32.040Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":"productos","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🌿 100% Natural🍋 Limonudo450g CONT. NETOAMOLI🔥 PicanteAMOLI🍋 LimonudoSin ConservantesReceta LimpiaSabor HonestoSin RellenosOrigen LocalEnvigado, AntioquiaFRASCO DE VIDRIO • 450G(128)Guacamole AMOLI Limonudo 450gAMOLI$ 22.000Frescura garantizada1. SELECCIONA EL SABOR: GUACAMOLE AMOLI LIMONUDO 450G🔥 PICANTE🍋 LIMONUDO2. PRESENTACIÓN ÚNICA:🫙Frasco de Vidrio 450gPorción ideal para disfrutar en su punto óptimo450 GRAMOS1Añadir al CarritoPedir por WhatsApp ($ 22.000) Ingredientes y Nutrición Conservación en Frío"}

## 2026-08-11 16:42:34.202Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":"productos","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🌿 100% Natural🍋 Limonudo450g CONT. NETOAMOLI🔥 PicanteAMOLI🍋 LimonudoSin ConservantesReceta LimpiaSabor HonestoSin RellenosOrigen LocalEnvigado, AntioquiaFRASCO DE VIDRIO • 450G(128)Guacamole AMOLI Limonudo 450gAMOLI$ 22.000Frescura garantizada1. SELECCIONA EL SABOR: GUACAMOLE AMOLI LIMONUDO 450G🔥 PICANTE🍋 LIMONUDO2. PRESENTACIÓN ÚNICA:🫙Frasco de Vidrio 450gPorción ideal para disfrutar en su punto óptimo450 GRAMOS1Añadir al CarritoPedir por WhatsApp ($ 22.000) Ingredientes y Nutrición Conservación en Frío"}

## 2026-08-11 16:43:06.036Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"NUESTRA TIENDA"}

## 2026-08-11 16:43:06.253Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"NUESTRA TIENDA"}

## 2026-08-11 16:43:09.850Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"NUESTRA TIENDA"}

## 2026-08-11 16:43:10.074Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"NUESTRA TIENDA"}

## 2026-08-11 16:43:10.308Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"NUESTRA TIENDA"}

## 2026-08-11 16:43:49.861Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:45:26.009Z console.error
- text: [vite] Failed to reload /src/pages/HomePage.jsx. This could be due to syntax errors or importing non-existent modules. (see errors above)

## 2026-08-11 16:45:31.783Z click
- element: {"tag":"vite-error-overlay","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:47:48.175Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Frasco de Vidrio450g CONT. NETO"}

## 2026-08-11 16:48:54.439Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ingredientes y Nutrición"}

## 2026-08-11 16:48:55.262Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ingredientes y Nutrición"}

## 2026-08-11 16:48:55.696Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ingredientes y Nutrición"}

## 2026-08-11 16:48:56.051Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ingredientes y Nutrición"}

## 2026-08-11 16:48:57.012Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conservación en Frío"}

## 2026-08-11 16:48:58.226Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conservación en Frío"}

## 2026-08-11 16:50:51.933Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:50:52.781Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:51:55.289Z load
- url: http://localhost:3000/admin

## 2026-08-11 16:51:55.798Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 16:52:01.128Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:52:05.602Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 16:52:05.665Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 16:52:05.936Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 16:52:06.216Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 16:52:10.302Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"20000","valueLength":5,"text":""}

## 2026-08-11 16:52:10.302Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"20000","valueLength":5,"text":""}

## 2026-08-11 16:52:10.304Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"stock","placeholder":null,"label":"Stock disponible *","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:52:10.373Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"stock","placeholder":null,"label":"Stock disponible *","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:52:10.732Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"stock","placeholder":null,"label":"Stock disponible *","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:52:12.305Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"stock","placeholder":null,"label":"Stock disponible *","value":"20","valueLength":2,"text":""}

## 2026-08-11 16:52:12.406Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 16:52:12.407Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:53:41.983Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 16:53:41.984Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:53:56.542Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 16:53:56.548Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Limonudo 450g","length":29,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Limonudo","length":8,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, con un toque cítrico de limón. Elaborado mediante un proceso artesanal, fresco y responsable.","length":157,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"20000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467232890-guacamoleamolilimon.jpg","length":127,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 16:54:02.694Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:54:05.962Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:54:43.660Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 16:54:43.660Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:54:58.136Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 16:54:58.143Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Picante 450g","length":28,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Picante","length":7,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.","length":141,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"22000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467293103-guacamolelimonamoli.png","length":127,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 16:55:05.835Z load
- url: http://localhost:3000/

## 2026-08-11 16:55:06.417Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 16:56:11.478Z load
- url: http://localhost:3000/admin

## 2026-08-11 16:56:12.100Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 16:56:16.377Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:56:20.637Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:56:21.468Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 16:56:21.469Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:56:39.091Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 16:56:39.096Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Picante 450g","length":28,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Picante","length":7,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.","length":141,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"22000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467390352-guacamolepicanteamoli.png","length":129,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 16:56:41.431Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:56:47.152Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 16:56:48.387Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Subir imagen"}

## 2026-08-11 16:56:48.388Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"file","id":null,"placeholder":null,"label":"[file]","value":"","valueLength":0,"text":""}

## 2026-08-11 16:57:08.833Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 16:57:08.837Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Limonudo 450g","length":29,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Limonudo","length":8,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, con un toque cítrico de limón. Elaborado mediante un proceso artesanal, fresco y responsable.","length":157,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"20000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467421800-guacamolelimonamoli.png","length":127,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 16:57:15.811Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 16:57:15.812Z navigate
- url: http://localhost:3000/admin/orders
- via: pushState

## 2026-08-11 16:57:19.554Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Blog"}

## 2026-08-11 16:57:19.555Z navigate
- url: http://localhost:3000/admin/blog
- via: pushState

## 2026-08-11 16:57:19.915Z network.error
- method: GET
- url: https://kkygujzfiiyvpjqbkkvg.supabase.co/rest/v1/posts?select=*&order=created_at.desc
- status: 404
- response: {"code":"PGRST205","details":null,"hint":null,"message":"Could not find the table 'public.posts' in the schema cache"}
- durationMs: 334

## 2026-08-11 16:57:19.916Z console.error
- text: Fetch error from https://kkygujzfiiyvpjqbkkvg.supabase.co/rest/v1/posts?select=*&order=created_at.desc: {"code":"PGRST205","details":null,"hint":null,"message":"Could not find the table 'public.posts' in the schema cache"}

## 2026-08-11 16:57:20.587Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 16:57:20.588Z navigate
- url: http://localhost:3000/admin/orders
- via: pushState

## 2026-08-11 16:57:21.793Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 16:57:21.794Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-11 16:57:26.870Z load
- url: http://localhost:3000/

## 2026-08-11 16:57:27.203Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 16:57:30.617Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:57:31.483Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:57:32.830Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 16:57:33.619Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 16:58:16.762Z network.error
- method: GET
- url: https://kkygujzfiiyvpjqbkkvg.supabase.co/rest/v1/products?select=*&is_active=eq.true&order=order.asc%2Ccreated_at.desc
- message: Failed to fetch
- durationMs: 536

## 2026-08-11 16:58:16.769Z console.error
- text: 
    TypeError: Failed to fetch
        at window.fetch (http://localhost:3000/@id/virtual:session-journal-client:328:28)
        at window.fetch (http://localhost:3000/:491:23)
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19821:23
        at http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:19860:12
        at async executeWithRetry (http://localhost:3000/node_modules/.vite/deps/@supabase_supabase-js.js?v=7d1b6f8b:637:19)
        at async getProducts (http://localhost:3000/src/api/products.js:33:27)
        at async loadProducts (http://localhost:3000/src/pages/HomePage.jsx?t=1786467494635:66:22)

## 2026-08-11 16:58:16.875Z load
- url: http://localhost:3000/

## 2026-08-11 17:14:01.240Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:01.261Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:01.268Z console.error
- text: 
    The above error occurred in the <Layout> component:
    
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:8:19)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:6647:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7572:3)
        at CartProvider (http://localhost:3000/src/hooks/useCart.jsx:12:32)
        at AuthProvider (http://localhost:3000/src/hooks/useAuth.jsx:11:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7511:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:10816:3)
        at App
    
    Consider adding an error boundary to your tree to customize error handling behavior.
    Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

## 2026-08-11 17:14:01.275Z unhandledrejection
- message: Cannot read properties of undefined (reading 'reduce')
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18786:28)
        at performSyncWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18932:28)

## 2026-08-11 17:14:01.585Z root.empty
- url: http://localhost:3000/

## 2026-08-11 17:14:08.689Z load
- url: http://localhost:3000/

## 2026-08-11 17:14:09.064Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:09.091Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:09.094Z console.error
- text: 
    The above error occurred in the <Layout> component:
    
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:8:19)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:6647:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7572:3)
        at CartProvider (http://localhost:3000/src/hooks/useCart.jsx:12:32)
        at AuthProvider (http://localhost:3000/src/hooks/useAuth.jsx:11:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7511:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:10816:3)
        at App
    
    Consider adding an error boundary to your tree to customize error handling behavior.
    Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

## 2026-08-11 17:14:09.096Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b
- line: 19466
- col: 13
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18786:28)
        at performConcurrentWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18734:30)

## 2026-08-11 17:14:35.986Z load
- url: http://localhost:3000/

## 2026-08-11 17:14:36.348Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:36.365Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/src/components/Layout.jsx?t=1786468439642
- line: 13
- col: 27
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at HTMLUnknownElement.callCallback2 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3680:22)
        at Object.invokeGuardedCallbackDev (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3705:24)
        at invokeGuardedCallback (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:3739:39)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19818:15)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)

## 2026-08-11 17:14:36.367Z console.error
- text: 
    The above error occurred in the <Layout> component:
    
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:8:19)
        at RenderedRoute (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:6647:26)
        at Routes (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7572:3)
        at CartProvider (http://localhost:3000/src/hooks/useCart.jsx:12:32)
        at AuthProvider (http://localhost:3000/src/hooks/useAuth.jsx:11:32)
        at Router (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:7511:13)
        at BrowserRouter (http://localhost:3000/node_modules/.vite/deps/react-router-dom.js?v=7d1b6f8b:10816:3)
        at App
    
    Consider adding an error boundary to your tree to customize error handling behavior.
    Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

## 2026-08-11 17:14:36.367Z window.error
- message: Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
- source: http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b
- line: 19466
- col: 13
- stack: 
    TypeError: Cannot read properties of undefined (reading 'reduce')
        at Layout (http://localhost:3000/src/components/Layout.jsx?t=1786468439642:13:27)
        at renderWithHooks (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:11596:26)
        at mountIndeterminateComponent (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:14974:21)
        at beginWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:15962:22)
        at beginWork$1 (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19806:22)
        at performUnitOfWork (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19251:20)
        at workLoopSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19190:13)
        at renderRootSync (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:19169:15)
        at recoverFromConcurrentError (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18786:28)
        at performConcurrentWorkOnRoot (http://localhost:3000/node_modules/.vite/deps/chunk-LSH5YFAV.js?v=7d1b6f8b:18734:30)

## 2026-08-11 17:14:55.633Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conservación en Frío"}

## 2026-08-11 17:14:56.128Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Conservación en Frío"}

## 2026-08-11 17:15:26.953Z load
- url: http://localhost:3000/

## 2026-08-11 17:16:09.000Z load
- url: http://localhost:3000/

## 2026-08-11 17:16:13.780Z load
- url: http://localhost:3000/

## 2026-08-11 17:17:01.218Z click
- element: {"tag":"span","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"FRASCO DE VIDRIO • 450G"}

## 2026-08-11 17:17:41.809Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Sabores"}

## 2026-08-11 17:17:41.813Z navigate
- url: http://localhost:3000/marcas
- via: pushState

## 2026-08-11 17:17:45.175Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:17:45.176Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 17:19:52.910Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Inicio"}

## 2026-08-11 17:19:52.915Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 17:21:58.997Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANALAliados B2B Carrito2"}

## 2026-08-11 17:22:00.066Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANALAliados B2B Carrito2"}

## 2026-08-11 17:23:14.242Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANALProductosNuestra FilosofíaAliados B2BContacto Carrito2"}

## 2026-08-11 17:23:15.262Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANALProductosNuestra FilosofíaAliados B2BContacto Carrito2"}

## 2026-08-11 17:23:16.596Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLIGUACAMOLE ARTESANALProductosNuestra FilosofíaAliados B2BContacto Carrito2"}

## 2026-08-11 17:24:08.010Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:24:08.012Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:24:09.485Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:24:09.486Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:24:10.125Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:24:10.126Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:24:10.893Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:24:10.894Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:24:38.938Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ver Productos"}

## 2026-08-11 17:24:38.939Z navigate
- url: http://localhost:3000/#producto-destacado
- via: popstate

## 2026-08-11 17:24:42.606Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 PicanteAMOLI🍋 Limonudo"}

## 2026-08-11 17:24:43.079Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:24:43.835Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 17:24:44.751Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:24:45.437Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 17:24:53.639Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contacto"}

## 2026-08-11 17:24:53.640Z navigate
- url: http://localhost:3000/#contacto
- via: popstate

## 2026-08-11 17:24:55.134Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:24:55.135Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:24:56.053Z click
- element: {"tag":"nav","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosNuestra FilosofíaAliados B2BContacto"}

## 2026-08-11 17:24:56.487Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:24:56.487Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:24:57.457Z click
- element: {"tag":"nav","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosNuestra FilosofíaAliados B2BContacto"}

## 2026-08-11 17:24:58.164Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:24:58.165Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:35:33.415Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:35:33.416Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:35:34.885Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:35:34.886Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:35:36.726Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contacto"}

## 2026-08-11 17:35:36.727Z navigate
- url: http://localhost:3000/#contacto
- via: popstate

## 2026-08-11 17:35:38.282Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Aliados B2B"}

## 2026-08-11 17:35:38.285Z navigate
- url: http://localhost:3000/aliados
- via: pushState

## 2026-08-11 17:35:39.281Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:35:39.713Z load
- url: http://localhost:3000/#filosofia

## 2026-08-11 17:35:40.056Z navigate
- url: http://localhost:3000/#filosofia
- via: replaceState

## 2026-08-11 17:35:41.827Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:35:41.828Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:37:45.923Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI"}

## 2026-08-11 17:37:45.926Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 17:37:47.694Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI"}

## 2026-08-11 17:37:47.695Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 17:40:56.255Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:40:56.256Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:40:57.255Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:40:57.256Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:40:59.273Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Contacto"}

## 2026-08-11 17:40:59.275Z navigate
- url: http://localhost:3000/#contacto
- via: popstate

## 2026-08-11 17:41:00.135Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:41:00.136Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:41:04.130Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Aliados B2B"}

## 2026-08-11 17:41:04.131Z navigate
- url: http://localhost:3000/aliados
- via: pushState

## 2026-08-11 17:41:05.265Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:41:05.595Z load
- url: http://localhost:3000/#productos

## 2026-08-11 17:41:06.137Z navigate
- url: http://localhost:3000/#productos
- via: replaceState

## 2026-08-11 17:42:23.637Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 17:42:24.816Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito3"}

## 2026-08-11 17:42:28.787Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 17:42:29.519Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Continuar con el pedido"}

## 2026-08-11 17:42:29.521Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-11 17:42:32.265Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:42:32.338Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:42:46.021Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito3"}

## 2026-08-11 17:42:47.956Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quitar"}

## 2026-08-11 17:42:48.566Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quitar"}

## 2026-08-11 17:42:49.238Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 17:42:50.970Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:42:51.368Z load
- url: http://localhost:3000/#productos

## 2026-08-11 17:42:51.778Z navigate
- url: http://localhost:3000/#productos
- via: replaceState

## 2026-08-11 17:43:08.280Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:43:10.337Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 17:43:11.809Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 17:43:12.884Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-11 17:43:13.683Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito2"}

## 2026-08-11 17:43:16.546Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 17:43:17.243Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Continuar con el pedido"}

## 2026-08-11 17:43:17.245Z navigate
- url: http://localhost:3000/checkout
- via: pushState

## 2026-08-11 17:43:19.122Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:43:19.219Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:43:22.294Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"ricardo mazo","valueLength":12,"text":""}

## 2026-08-11 17:43:22.294Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"ricardo mazo","valueLength":12,"text":""}

## 2026-08-11 17:43:22.317Z focus
- element: {"tag":"select","role":null,"ariaLabel":"Phone number country","name":null,"type":null,"id":null,"placeholder":null,"label":"Phone number country","value":"CO","valueLength":2,"text":"AfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntigua and BarbudaArgentinaArmeniaArubaAscension IslandAustraliaAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBelarusBelgiumBelizeBeninBermudaBhutanBoliviaBonaire, Sint Eustatius and SabaBosnia and HerzegovinaBotswanaBrazilBritish Indian Ocean TerritoryBrunei DarussalamBulgariaBurkina FasoBurundiCambodiaCameroonCanadaCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandCocos (Keeling) IslandsColombiaComorosCongoCongo, Democratic Republic of theCook IslandsCosta RicaCote d'IvoireCroatiaCubaCuraçaoCyprusCzech RepublicDenmarkDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaFalkland IslandsFaroe IslandsFederated States of MicronesiaFijiFinlandFranceFrench GuianaFrench PolynesiaGabonGambiaGeorgiaGermanyGhanaGibraltarGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHoly See (Vatican City State)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJapanJerseyJordanKazakhstanKenyaKiribatiKosovoKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacaoMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMexicoMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueMyanmarNamibiaNauruNepalNetherlandsNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorth KoreaNorth MacedoniaNorthern Mariana IslandsNorwayOmanPakistanPalauPalestinePanamaPapua New GuineaParaguayPeruPhilippinesPolandPortugalPuerto RicoQatarReunionRomaniaRussiaRwandaSaint BarthélemySaint HelenaSaint Kitts and NevisSaint LuciaSaint Martin (French Part)Saint Pierre and MiquelonSaint Vincent and the GrenadinesSamoaSan MarinoSao Tome and PrincipeSaudi ArabiaSenegalSerbiaSeychellesSierra LeoneSingaporeSint MaartenSlovakiaSloveniaSolomon IslandsSomaliaSouth AfricaSouth KoreaSouth SudanSpainSri LankaSudanSurinameSvalbard a..."}

## 2026-08-11 17:43:23.059Z blur
- element: {"tag":"select","role":null,"ariaLabel":"Phone number country","name":null,"type":null,"id":null,"placeholder":null,"label":"Phone number country","value":"CO","valueLength":2,"text":"AfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntigua and BarbudaArgentinaArmeniaArubaAscension IslandAustraliaAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBelarusBelgiumBelizeBeninBermudaBhutanBoliviaBonaire, Sint Eustatius and SabaBosnia and HerzegovinaBotswanaBrazilBritish Indian Ocean TerritoryBrunei DarussalamBulgariaBurkina FasoBurundiCambodiaCameroonCanadaCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandCocos (Keeling) IslandsColombiaComorosCongoCongo, Democratic Republic of theCook IslandsCosta RicaCote d'IvoireCroatiaCubaCuraçaoCyprusCzech RepublicDenmarkDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaFalkland IslandsFaroe IslandsFederated States of MicronesiaFijiFinlandFranceFrench GuianaFrench PolynesiaGabonGambiaGeorgiaGermanyGhanaGibraltarGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHoly See (Vatican City State)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJapanJerseyJordanKazakhstanKenyaKiribatiKosovoKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacaoMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMexicoMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueMyanmarNamibiaNauruNepalNetherlandsNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorth KoreaNorth MacedoniaNorthern Mariana IslandsNorwayOmanPakistanPalauPalestinePanamaPapua New GuineaParaguayPeruPhilippinesPolandPortugalPuerto RicoQatarReunionRomaniaRussiaRwandaSaint BarthélemySaint HelenaSaint Kitts and NevisSaint LuciaSaint Martin (French Part)Saint Pierre and MiquelonSaint Vincent and the GrenadinesSamoaSan MarinoSao Tome and PrincipeSaudi ArabiaSenegalSerbiaSeychellesSierra LeoneSingaporeSint MaartenSlovakiaSloveniaSolomon IslandsSomaliaSouth AfricaSouth KoreaSouth SudanSpainSri LankaSudanSurinameSvalbard a..."}

## 2026-08-11 17:43:23.072Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57","valueLength":3,"text":""}

## 2026-08-11 17:43:27.584Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 1221212","valueLength":15,"text":""}

## 2026-08-11 17:43:27.584Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 1221212","valueLength":15,"text":""}

## 2026-08-11 17:43:27.610Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo (opcional)","value":"","valueLength":0,"text":""}

## 2026-08-11 17:43:30.590Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n\t\timport { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n\t\t\n\n\t\t\n\t\t\n\t\t\n\t\t\n\t\tFinalizar pedido | AMOLI\n\t\tconst SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpostSitePages(await response.json());\n\t} catch (error) {\n\t\tconsole.error('[site-pages] Failed to send site pages to parent:', error);\n\t}\n}\n\nif (window.self !== window.top) {\n\twindow.addEventListener('load', sendSitePagesToParent);\n\twindow.addEventListener('message', (event) => {\n\t\tif (event.data?.type === INCOMING_REQUEST_SITE_PAGES_MESSAGE) {\n\t\t\tsendSitePagesToParent();\n\t\t}\n\t});\n}\n\n\t\t\n\t#root[data-edit-mode-enabled=\"true\"] {\n\t\tcursor: pointer;\n\t}\n\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id] {\n\t\tcursor: pointer;\n\t\toutline: 2px dashed #357DF9;\n\t\toutline-offset: 2px;\n\t\tmin-height: 1em;\n\t\toverflow-wrap: anywhere;\n\t\tmin-width: 0;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] img[data-edit-id] {\n\t\toutline-offset: -2px;\n\t}\n\t#root[data-edit-mode-enabled=\"true\"] [data-edit-id]:hover {\n\t\tbackground-color: #357DF933;\n..."}

## 2026-08-11 17:43:31.557Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"Cali","valueLength":4,"text":"MedellínEnvigadoItagüíSabanetaLa EstrellaBelloCaldasCopacabanaRionegroBogotáCaliBarranquillaCartagenaBucaramangaOtra ciudad"}

## 2026-08-11 17:43:31.561Z click
- element: {"tag":"div","role":"option","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Cali"}

## 2026-08-11 17:43:32.759Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:43:32.838Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-11 17:43:45.033Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"calle 45 25 356","valueLength":15,"text":""}

## 2026-08-11 17:43:45.033Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"calle 45 25 356","valueLength":15,"text":""}

## 2026-08-11 17:43:45.104Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Confirmar pedido"}

## 2026-08-11 17:43:45.107Z submit
- action: http://localhost:3000/checkout
- fields: [{"label":"Nombre completo *","type":"text","value":"ricardo mazo","length":12,"redacted":false},{"label":"Phone number country","type":"select-one","value":"CO","length":2,"redacted":false},{"label":"Teléfono / WhatsApp *","type":"tel","value":"+57 310 1221212","length":15,"redacted":false},{"label":"Correo (opcional)","type":"email","value":"","length":0,"redacted":false},{"label":"Ciudad *","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Cali","length":4,"redacted":false},{"label":"Dirección de entrega *","type":"text","value":"calle 45 25 356","length":15,"redacted":false},{"label":"Notas adicionales","type":"textarea","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-11 17:43:46.233Z navigate
- url: http://localhost:3000/success
- via: pushState

## 2026-08-11 17:43:52.511Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Seguir comprando"}

## 2026-08-11 17:43:52.511Z navigate
- url: http://localhost:3000/productos
- via: pushState

## 2026-08-11 17:44:06.473Z click
- element: {"tag":"nav","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosNuestra FilosofíaVende AMOLIContacto"}

## 2026-08-11 17:44:07.405Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI"}

## 2026-08-11 17:44:07.406Z navigate
- url: http://localhost:3000/
- via: pushState

## 2026-08-11 17:44:14.422Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:44:28.753Z load
- url: http://localhost:3000/admin

## 2026-08-11 17:44:29.419Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 17:44:35.849Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 17:44:40.614Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-11 17:44:44.281Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 17:44:44.359Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"22000","valueLength":5,"text":""}

## 2026-08-11 17:44:48.631Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"20000","valueLength":5,"text":""}

## 2026-08-11 17:44:48.632Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"number","id":"price","placeholder":null,"label":"Precio (COP) *","value":"20000","valueLength":5,"text":""}

## 2026-08-11 17:44:48.702Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":"root","placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosPedidosBlogADMINProductosSesión: rmazov3@gmail.com Nuevo producto SalirEditar productoNombre *Subtítulo / MarcaCategoríaDescripciónGuacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.Precio (COP) *Precio en oferta (opcional)Stock disponible *Etiqueta (ej. \"Nuevo\", \"Oferta\")Imágenes del productoSubir imagenJPG, PNG o WEBPO pega URLs de imágenes manualmentehttps://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467390352-guacamolepicanteamoli.pngVisible en la tiendaGuardar cambiosCancelarProductoCategoríaPrecioStockEstadoAccionesGuacamole AMOLI Picante 450gAMOLIPicante$ 22.00020VisibleGuacamole AMOLI Limonudo 450gAMOLILimonudo$ 20.00020Visible"}

## 2026-08-11 17:44:51.379Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Guardar cambios"}

## 2026-08-11 17:44:51.382Z submit
- action: http://localhost:3000/admin
- fields: [{"label":"Nombre *","type":"text","value":"Guacamole AMOLI Picante 450g","length":28,"redacted":false},{"label":"Subtítulo / Marca","type":"text","value":"AMOLI","length":5,"redacted":false},{"label":"Categoría","type":"text","value":"Picante","length":7,"redacted":false},{"label":"Descripción","type":"textarea","value":"Guacamole 100% natural con trocitos de aguacate Hass montañero, elaborado mediante un proceso artesanal, fresco y responsable. Sabor Picante.","length":141,"redacted":false},{"label":"Precio (COP) *","type":"number","value":"20000","length":5,"redacted":false},{"label":"Precio en oferta (opcional)","type":"number","value":"","length":0,"redacted":false},{"label":"Stock disponible *","type":"number","value":"20","length":2,"redacted":false},{"label":"Etiqueta (ej. \"Nuevo\", \"Oferta\")","type":"text","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"[file]","type":"file","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false},{"label":"https://ejemplo.com/imagen1.jpg https://ejemplo.com/imagen2.jpg","type":"textarea","value":"https://kkygujzfiiyvpjqbkkvg.supabase.co/storage/v1/object/public/product-images/products/1786467390352-guacamolepicanteamoli.png","length":129,"redacted":false},{"label":"Visible en la tienda","type":"button","value":"on","length":2,"redacted":false},{"label":"[checkbox]","type":"checkbox","value":"on","length":2,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false},{"label":"[button]","type":"button","value":"","length":0,"redacted":false}]

## 2026-08-11 17:45:02.163Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosPedidosBlogADMINProductosSesión: rmazov3@gmail.com Nuevo producto SalirProductoCategoríaPrecioStockEstadoAccionesGuacamole AMOLI Limonudo 450gAMOLILimonudo$ 20.00020VisibleGuacamole AMOLI Picante 450gAMOLIPicante$ 20.00020Visible"}

## 2026-08-11 17:45:02.969Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 17:45:02.972Z navigate
- url: http://localhost:3000/admin/orders
- via: pushState

## 2026-08-11 17:45:04.040Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:45:04.041Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-11 17:45:04.865Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 17:45:04.866Z navigate
- url: http://localhost:3000/admin/orders
- via: pushState

## 2026-08-11 17:45:05.889Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ricardo mazo#a1ec7b47 · 11/08/2026, 12:43 p. m.$ 42.000pendiente"}

## 2026-08-11 17:45:09.165Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"fddf#b978b869 · 10/08/2026, 10:22 p. m.$ 22.000pendiente"}

## 2026-08-11 17:45:11.542Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"fddf#b978b869 · 10/08/2026, 10:22 p. m.$ 22.000pendiente"}

## 2026-08-11 17:45:12.868Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Blog"}

## 2026-08-11 17:45:12.868Z navigate
- url: http://localhost:3000/admin/blog
- via: pushState

## 2026-08-11 17:45:13.078Z network.error
- method: GET
- url: https://kkygujzfiiyvpjqbkkvg.supabase.co/rest/v1/posts?select=*&order=created_at.desc
- status: 404
- response: {"code":"PGRST205","details":null,"hint":null,"message":"Could not find the table 'public.posts' in the schema cache"}
- durationMs: 196

## 2026-08-11 17:45:13.079Z console.error
- text: Fetch error from https://kkygujzfiiyvpjqbkkvg.supabase.co/rest/v1/posts?select=*&order=created_at.desc: {"code":"PGRST205","details":null,"hint":null,"message":"Could not find the table 'public.posts' in the schema cache"}

## 2026-08-11 17:45:14.158Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Pedidos"}

## 2026-08-11 17:45:14.159Z navigate
- url: http://localhost:3000/admin/orders
- via: pushState

## 2026-08-11 17:45:15.298Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:45:15.299Z navigate
- url: http://localhost:3000/admin
- via: pushState

## 2026-08-11 17:45:27.410Z load
- url: http://localhost:3000/

## 2026-08-11 17:45:28.037Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 17:51:34.786Z click
- element: {"tag":"nav","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"ProductosNuestra FilosofíaVende AMOLIContacto"}

## 2026-08-11 17:51:35.141Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:51:35.142Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:51:40.839Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:51:40.839Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:51:41.567Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:51:41.567Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:51:42.574Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:51:42.575Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:51:49.622Z click
- element: {"tag":"section","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🌿 100% natural · Aguacate Hass montañeroAMOLIGuacamole real, sin artificiosElaborado mediante un proceso artesanal, fresco y responsable. Sin aditivos, sin harinas ni conservantes sintéticos — solo el mejor aguacate de nuestras montañas e ingredientes seleccionados.Sin ConservantesSabor HonestoOrigen Antioquia Ver ProductosVende AMOLIPRESENTACIÓN ESTÁNDARAMOLIGUACAMOLE ARTESANALFrasco de Vidrio450g CONT. NETO"}

## 2026-08-11 17:52:06.455Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🌿 100% natural · Aguacate Hass montañeroAMOLIGuacamole real, sin artificiosElaborado mediante un proceso artesanal, fresco y responsable. Sin aditivos, sin harinas ni conservantes sintéticos — solo el mejor aguacate de nuestras montañas e ingredientes seleccionados.Sin ConservantesSabor HonestoOrigen Antioquia Ver ProductosVende AMOLIPRESENTACIÓN ESTÁNDARAMOLIGUACAMOLE ARTESANALFrasco de Vidrio450g CONT. NETO"}

## 2026-08-11 17:54:41.381Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Nuestra Filosofía"}

## 2026-08-11 17:54:41.385Z navigate
- url: http://localhost:3000/#filosofia
- via: popstate

## 2026-08-11 17:56:13.472Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Productos"}

## 2026-08-11 17:56:13.473Z navigate
- url: http://localhost:3000/#productos
- via: popstate

## 2026-08-11 17:56:16.053Z click
- element: {"tag":"a","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Ver Productos"}

## 2026-08-11 17:56:18.249Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:56:19.358Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 17:56:20.761Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 17:56:21.792Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 17:57:02.777Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"HONESTOProceso ArtesanalIngredientes seleccionados minuciosamente para ofrecer un sabor casero y una experiencia auténtica.✨"}

## 2026-08-11 17:58:47.084Z load
- url: http://localhost:3000/#productos

## 2026-08-11 17:58:52.593Z navigate
- url: http://localhost:3000/#productos
- via: replaceState

## 2026-08-11 17:59:59.397Z load
- url: http://192.168.40.9:3000/

## 2026-08-11 17:59:59.781Z navigate
- url: http://192.168.40.9:3000/
- via: replaceState

## 2026-08-11 18:00:05.285Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"🌿 100% Natural🔥 Picante450g CONT. NETOAMOLI🔥 PicanteAMOLI🍋 LimonudoSin ConservantesReceta LimpiaSabor HonestoSin RellenosOrigen LocalEnvigado, AntioquiaFRASCO DE VIDRIO • 450GGuacamole AMOLI Picante 450gAMOLI$ 20.000Frescura garantizada1. SELECCIONA EL SABOR: GUACAMOLE AMOLI PICANTE 450G🔥 PICANTE🍋 LIMONUDO2. PRESENTACIÓN ÚNICA:🫙Frasco de Vidrio 450gPorción ideal para disfrutar en su punto óptimo450 GRAMOS1Añadir al CarritoPedir por WhatsApp ($ 20.000) Ingredientes y Nutrición Conservación en Frío"}

## 2026-08-11 18:00:16.144Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-11 18:00:18.831Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🔥 Picante"}

## 2026-08-11 18:48:00.299Z load
- url: http://localhost:3000/

## 2026-08-11 18:48:03.738Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-11 18:48:04.445Z load
- url: http://localhost:3000/admin

## 2026-08-11 18:48:05.090Z navigate
- url: http://localhost:3000/admin
- via: replaceState

## 2026-08-11 19:01:29.902Z load
- url: http://localhost:3000/admin

## 2026-08-11 19:22:19.408Z load
- url: http://localhost:3000/admin
- title: AMOLI | Guacamole artesanal, real y honesto

## 2026-08-11 19:22:20.254Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a0v9260983210za200zd9260983210&_p=1786476138555&gcd=13l3l3l3l1l1&npa=0&dma=0&are=1&cid=359046859.1786476140&frm=0&ngs=1&pscdl=noapi&rcb=1&sr=1366x768&uaa=x86&uab=64&uafvl=Not%253DA%253FBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B151.0.7922.76%7CChromium%3B151.0.7922.76&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-us&_s=1&tag_exp=115616986~115938465~115938469~118395333~118897920~118897930~119367802~119367810~119404701~119527020~119896802~120385423&sid=1786476139&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fadmin&dr=http%3A%2F%2Flocalhost%3A3000%2Fadmin&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=1836
- status: 0
- durationMs: 206

## 2026-08-11 19:22:20.254Z console.error
- text: Fetch error from : 

## 2026-08-11 19:22:25.304Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a0v9260983210za200zd9260983210&_p=1786476138555&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=359046859.1786476140&frm=0&ngs=1&pscdl=noapi&rcb=1&sr=1366x768&uaa=x86&uab=64&uafvl=Not%253DA%253FBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B151.0.7922.76%7CChromium%3B151.0.7922.76&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-us&_s=2&tag_exp=115616986~115938465~115938469~118395333~118897920~118897930~119367802~119367810~119404701~119527020~119896802~120385423&sid=1786476139&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Fadmin&dr=http%3A%2F%2Flocalhost%3A3000%2Fadmin&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=scroll&epn.percent_scrolled=90&tfd=6997
- status: 0
- durationMs: 95

## 2026-08-11 19:22:25.304Z console.error
- text: Fetch error from : 

## 2026-08-12 01:48:39.450Z load
- url: http://localhost:3000/
- title: AMOLI | Guacamole artesanal, real y honesto

## 2026-08-12 01:48:40.001Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499319077&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AAAAAAQ&are=1&cid=359046859.1786476140&frm=0&ngs=1&pscdl=noapi&rcb=10&sr=1360x768&uaa=x86&uab=64&uafvl=Not%253DA%253FBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B151.0.7922.76%7CChromium%3B151.0.7922.76&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-us&_s=1&tag_exp=115616985~115938465~115938468~118897920~118897930~119367802~119367810~119381663~119527019~119896803&sid=1786499319&sct=3&seg=0&dl=http%3A%2F%2Flocalhost%2F&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=page_view&_ss=1&_ee=1&tfd=14695
- status: 0
- durationMs: 258

## 2026-08-12 01:48:40.001Z console.error
- text: Fetch error from : 

## 2026-08-12 01:48:44.859Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499319077&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=359046859.1786476140&frm=0&ngs=1&pscdl=noapi&rcb=10&sr=1360x768&uaa=x86&uab=64&uafvl=Not%253DA%253FBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B151.0.7922.76%7CChromium%3B151.0.7922.76&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-us&_s=2&tag_exp=115616985~115938465~115938468~118897920~118897930~119367802~119367810~119381663~119527019~119896803&sid=1786499319&sct=3&seg=0&dl=http%3A%2F%2Flocalhost%2F&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=scroll&epn.percent_scrolled=90&_et=16&tfd=19722
- status: 0
- durationMs: 92

## 2026-08-12 01:48:44.860Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:19.449Z load
- url: http://192.168.40.9:3000/
- title: AMOLI | Guacamole artesanal, real y honesto

## 2026-08-12 01:50:19.995Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499418804&gcd=13l3l3l3l1l1&npa=0&dma=0&are=1&cid=1077752495.1786499420&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1360x768&ul=en-us&_s=1&tag_exp=115616985~115938466~115938468~118395334~118897920~118897930~119367802~119367810~119404703~119527020~119896803&sid=1786499419&sct=1&seg=0&dl=http%3A%2F%2F192.168.40.9%2F&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=3588
- status: 0
- durationMs: 344

## 2026-08-12 01:50:19.995Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:22.007Z load
- url: http://localhost:3000/
- title: AMOLI | Guacamole artesanal, real y honesto

## 2026-08-12 01:50:22.059Z navigate
- url: http://192.168.40.9:3000/
- via: replaceState

## 2026-08-12 01:50:24.767Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499418804&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=1077752495.1786499420&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1360x768&ul=en-us&_s=2&tag_exp=115616985~115938466~115938468~118395334~118897920~118897930~119367802~119367810~119404703~119527020~119896803&sid=1786499419&sct=1&seg=0&dl=http%3A%2F%2F192.168.40.9%2F&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=scroll&epn.percent_scrolled=90&_et=14&tfd=8612
- status: 0
- durationMs: 94

## 2026-08-12 01:50:24.767Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:26.038Z navigate
- url: http://localhost:3000/
- via: replaceState

## 2026-08-12 01:50:28.013Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499421798&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=359046859.1786476140&frm=0&ngs=1&pscdl=noapi&rcb=6&sr=1360x768&uaa=x86&uab=64&uafvl=Not%253DA%253FBrand%3B99.0.0.0%7CGoogle%2520Chrome%3B151.0.7922.76%7CChromium%3B151.0.7922.76&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-us&_s=2&tag_exp=115938465~115938469~118897920~118897930~119367802~119367810~119404702~119527019~119896803~120125304~120315584&sid=1786499319&sct=3&seg=1&dl=http%3A%2F%2Flocalhost%2F&dt=AMOLI%20%7C%20Guacamole%20artesanal%2C%20real%20y%20honesto&en=scroll&epn.percent_scrolled=90&tfd=20915
- status: 0
- durationMs: 174

## 2026-08-12 01:50:28.014Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:32.340Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-12 01:50:34.234Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"AMOLI🍋 Limonudo"}

## 2026-08-12 01:50:34.889Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Añadir al Carrito"}

## 2026-08-12 01:50:35.609Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Carrito2"}

## 2026-08-12 01:50:37.177Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Quitar"}

## 2026-08-12 01:50:39.126Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"button","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":""}

## 2026-08-12 01:50:39.709Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Continuar con el pedido"}

## 2026-08-12 01:50:39.710Z navigate
- url: http://192.168.40.9:3000/checkout
- via: pushState

## 2026-08-12 01:50:41.665Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-12 01:50:41.749Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"","valueLength":0,"text":""}

## 2026-08-12 01:50:43.725Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"ricardo","valueLength":7,"text":""}

## 2026-08-12 01:50:43.737Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"name","placeholder":null,"label":"Nombre completo *","value":"ricardo","valueLength":7,"text":""}

## 2026-08-12 01:50:43.761Z focus
- element: {"tag":"select","role":null,"ariaLabel":"Phone number country","name":null,"type":null,"id":null,"placeholder":null,"label":"Phone number country","value":"CO","valueLength":2,"text":"AfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntigua and BarbudaArgentinaArmeniaArubaAscension IslandAustraliaAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBelarusBelgiumBelizeBeninBermudaBhutanBoliviaBonaire, Sint Eustatius and SabaBosnia and HerzegovinaBotswanaBrazilBritish Indian Ocean TerritoryBrunei DarussalamBulgariaBurkina FasoBurundiCambodiaCameroonCanadaCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandCocos (Keeling) IslandsColombiaComorosCongoCongo, Democratic Republic of theCook IslandsCosta RicaCote d'IvoireCroatiaCubaCuraçaoCyprusCzech RepublicDenmarkDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaFalkland IslandsFaroe IslandsFederated States of MicronesiaFijiFinlandFranceFrench GuianaFrench PolynesiaGabonGambiaGeorgiaGermanyGhanaGibraltarGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHoly See (Vatican City State)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJapanJerseyJordanKazakhstanKenyaKiribatiKosovoKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacaoMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMexicoMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueMyanmarNamibiaNauruNepalNetherlandsNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorth KoreaNorth MacedoniaNorthern Mariana IslandsNorwayOmanPakistanPalauPalestinePanamaPapua New GuineaParaguayPeruPhilippinesPolandPortugalPuerto RicoQatarReunionRomaniaRussiaRwandaSaint BarthélemySaint HelenaSaint Kitts and NevisSaint LuciaSaint Martin (French Part)Saint Pierre and MiquelonSaint Vincent and the GrenadinesSamoaSan MarinoSao Tome and PrincipeSaudi ArabiaSenegalSerbiaSeychellesSierra LeoneSingaporeSint MaartenSlovakiaSloveniaSolomon IslandsSomaliaSouth AfricaSouth KoreaSouth SudanSpainSri LankaSudanSurinameSvalbard a..."}

## 2026-08-12 01:50:43.854Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499418804&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=1077752495.1786499420&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1360x768&ul=en-us&_s=3&tag_exp=115616985~115938466~115938468~118395334~118897920~118897930~119367802~119367810~119404703~119527020~119896803&dl=http%3A%2F%2F192.168.40.9%3A3000%2Fcheckout&dr=http%3A%2F%2F192.168.40.9%3A3000%2F&sid=1786499419&sct=1&seg=1&dt=Finalizar%20pedido%20%7C%20AMOLI&en=page_view&_et=19319&tfd=27674
- status: 0
- durationMs: 119

## 2026-08-12 01:50:43.854Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:45.456Z blur
- element: {"tag":"select","role":null,"ariaLabel":"Phone number country","name":null,"type":null,"id":null,"placeholder":null,"label":"Phone number country","value":"CO","valueLength":2,"text":"AfghanistanÅland IslandsAlbaniaAlgeriaAmerican SamoaAndorraAngolaAnguillaAntigua and BarbudaArgentinaArmeniaArubaAscension IslandAustraliaAustriaAzerbaijanBahamasBahrainBangladeshBarbadosBelarusBelgiumBelizeBeninBermudaBhutanBoliviaBonaire, Sint Eustatius and SabaBosnia and HerzegovinaBotswanaBrazilBritish Indian Ocean TerritoryBrunei DarussalamBulgariaBurkina FasoBurundiCambodiaCameroonCanadaCape VerdeCayman IslandsCentral African RepublicChadChileChinaChristmas IslandCocos (Keeling) IslandsColombiaComorosCongoCongo, Democratic Republic of theCook IslandsCosta RicaCote d'IvoireCroatiaCubaCuraçaoCyprusCzech RepublicDenmarkDjiboutiDominicaDominican RepublicEcuadorEgyptEl SalvadorEquatorial GuineaEritreaEstoniaEthiopiaFalkland IslandsFaroe IslandsFederated States of MicronesiaFijiFinlandFranceFrench GuianaFrench PolynesiaGabonGambiaGeorgiaGermanyGhanaGibraltarGreeceGreenlandGrenadaGuadeloupeGuamGuatemalaGuernseyGuineaGuinea-BissauGuyanaHaitiHoly See (Vatican City State)HondurasHong KongHungaryIcelandIndiaIndonesiaIranIraqIrelandIsle of ManIsraelItalyJamaicaJapanJerseyJordanKazakhstanKenyaKiribatiKosovoKuwaitKyrgyzstanLaosLatviaLebanonLesothoLiberiaLibyaLiechtensteinLithuaniaLuxembourgMacaoMadagascarMalawiMalaysiaMaldivesMaliMaltaMarshall IslandsMartiniqueMauritaniaMauritiusMayotteMexicoMoldovaMonacoMongoliaMontenegroMontserratMoroccoMozambiqueMyanmarNamibiaNauruNepalNetherlandsNew CaledoniaNew ZealandNicaraguaNigerNigeriaNiueNorfolk IslandNorth KoreaNorth MacedoniaNorthern Mariana IslandsNorwayOmanPakistanPalauPalestinePanamaPapua New GuineaParaguayPeruPhilippinesPolandPortugalPuerto RicoQatarReunionRomaniaRussiaRwandaSaint BarthélemySaint HelenaSaint Kitts and NevisSaint LuciaSaint Martin (French Part)Saint Pierre and MiquelonSaint Vincent and the GrenadinesSamoaSan MarinoSao Tome and PrincipeSaudi ArabiaSenegalSerbiaSeychellesSierra LeoneSingaporeSint MaartenSlovakiaSloveniaSolomon IslandsSomaliaSouth AfricaSouth KoreaSouth SudanSpainSri LankaSudanSurinameSvalbard a..."}

## 2026-08-12 01:50:45.467Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57","valueLength":3,"text":""}

## 2026-08-12 01:50:45.544Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57","valueLength":3,"text":""}

## 2026-08-12 01:50:48.757Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 7008878","valueLength":15,"text":""}

## 2026-08-12 01:50:48.758Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"tel","id":"phone","placeholder":null,"label":"Teléfono / WhatsApp *","value":"+57 310 7008878","valueLength":15,"text":""}

## 2026-08-12 01:50:48.785Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":"email","id":"email","placeholder":null,"label":"Correo (opcional)","value":"","valueLength":0,"text":""}

## 2026-08-12 01:50:48.833Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499418804&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEEAAAQ&ae=a&are=1&cid=1077752495.1786499420&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1360x768&ul=en-us&_s=4&tag_exp=115616985~115938466~115938468~118395334~118897920~118897930~119367802~119367810~119404703~119527020~119896803&sid=1786499419&sct=1&seg=1&dl=http%3A%2F%2F192.168.40.9%2Fcheckout&dr=http%3A%2F%2F192.168.40.9%3A3000%2F&dt=Finalizar%20pedido%20%7C%20AMOLI&en=form_start&ep.form_id=&ep.form_destination=http%3A%2F%2F192.168.40.9%3A3000%2Fcheckout&epn.form_length=9&ep.first_field_id=name&epn.first_field_position=1&_et=3004&tfd=32684
- status: 0
- durationMs: 88

## 2026-08-12 01:50:48.833Z console.error
- text: Fetch error from : 

## 2026-08-12 01:50:50.174Z click
- element: {"tag":"div","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Ciudad *Selecciona tu ciudadMedellínEnvigadoItagüíSabanetaLa EstrellaBelloCaldasCopacabanaRionegroBogotáCaliBarranquillaCartagenaBucaramangaOtra ciudad"}

## 2026-08-12 01:50:50.533Z click
- element: {"tag":"html","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"\n  import { injectIntoGlobalHook } from \"/@react-refresh\";\ninjectIntoGlobalHook(window);\nwindow.$RefreshReg$ = () => {};\nwindow.$RefreshSig$ = () => (type) => type;\n\n  \n\n\t\n\t\n\t\n\n\t\n\tFinalizar pedido | AMOLI\n\t\n\t\n\t\n\t\n\n\t\n\t\n\t\n\t\n\t\n\t\n\t\n\t\n\n\t\n\t\n\t\n\t\n\t\n\n\t\n\t\n\t\n\t\n\t\n\t\t<link rel=\"stylesheet\"\n\t\t\thref=\"https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap\" />\n\t\n\n\t\n\t\n\t\t{\n\t\t\t\"@context\": \"https://schema.org\",\n\t\t\t\"@type\": \"Organization\",\n\t\t\t\"name\": \"AMOLI\",\n\t\t\t\"url\": \"https://amolisabores.com/\",\n\t\t\t\"logo\": \"https://amolisabores.com/logo.png\",\n\t\t\t\"description\": \"Guacamole artesanal elaborado con aguacate Hass montañero de Antioquia.\",\n\t\t\t\"contactPoint\": {\n\t\t\t\t\"@type\": \"ContactPoint\",\n\t\t\t\t\"telephone\": \"+57-300-290-2010\",\n\t\t\t\t\"contactType\": \"customer service\",\n\t\t\t\t\"areaServed\": \"CO\"\n\t\t\t}\n\t\t}\n\t\t\n\n\t\n\t\n\t\n\t\twindow.dataLayer = window.dataLayer || [];\n\t\tfunction gtag() { dataLayer.push(arguments); }\n\t\tgtag('js', new Date());\n\t\tgtag('config', 'G-494MCYFSWX');\n\t\n  const SITE_PAGES_ENDPOINT = '/__horizons/site-pages';\n\nconst OUTGOING_SITE_PAGES_MESSAGE = 'sitePages';\nconst INCOMING_REQUEST_SITE_PAGES_MESSAGE = 'request-site-pages';\n\nconst ALLOWED_PARENT_ORIGINS = [\n\t'https://horizons.hostinger.com',\n\t'https://horizons.hostinger.dev',\n\t'https://horizons-frontend-local.hostinger.dev',\n\t'http://localhost:4000',\n];\n\nfunction postSitePages(pages) {\n\tlet parentOrigin = window.location.ancestorOrigins?.[0];\n\tif (!parentOrigin && document.referrer) {\n\t\ttry {\n\t\t\tparentOrigin = new URL(document.referrer).origin;\n\t\t} catch {}\n\t}\n\tif (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {\n\t\twindow.parent.postMessage({ type: OUTGOING_SITE_PAGES_MESSAGE, payload: { pages } }, parentOrigin);\n\t}\n}\n\nasync function sendSitePagesToParent() {\n\tif (window.self === window.top) {\n\t\treturn;\n\t}\n\n\ttry {\n\t\tconst response = await fetch(SITE_PAGES_ENDPOINT);\n\t\tif (!response.ok) {\n\t\t\tthrow new Error(`HTTP ${response.status}`);\n\t\t}\n\t\tpost..."}

## 2026-08-12 01:50:51.596Z change
- element: {"tag":"select","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":"[select]","value":"Bogotá","valueLength":6,"text":"MedellínEnvigadoItagüíSabanetaLa EstrellaBelloCaldasCopacabanaRionegroBogotáCaliBarranquillaCartagenaBucaramangaOtra ciudad"}

## 2026-08-12 01:50:51.601Z click
- element: {"tag":"div","role":"option","ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Bogotá"}

## 2026-08-12 01:50:52.417Z focus
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-12 01:50:52.458Z click
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"","valueLength":0,"text":""}

## 2026-08-12 01:50:57.599Z change
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"calle 45 454 45","valueLength":15,"text":""}

## 2026-08-12 01:50:57.600Z blur
- element: {"tag":"input","role":null,"ariaLabel":null,"name":null,"type":null,"id":"address","placeholder":"Ej. Calle 10 # 43-20, apto 301","label":"Dirección de entrega *","value":"calle 45 454 45","valueLength":15,"text":""}

## 2026-08-12 01:50:57.718Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":"submit","id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":"Confirmar pedido"}

## 2026-08-12 01:50:57.726Z submit
- action: http://192.168.40.9:3000/checkout
- fields: [{"label":"Nombre completo *","type":"text","value":"ricardo","length":7,"redacted":false},{"label":"Phone number country","type":"select-one","value":"CO","length":2,"redacted":false},{"label":"Teléfono / WhatsApp *","type":"tel","value":"+57 310 7008878","length":15,"redacted":false},{"label":"Correo (opcional)","type":"email","value":"","length":0,"redacted":false},{"label":"Ciudad *","type":"button","value":"","length":0,"redacted":false},{"label":"[select]","type":"select-one","value":"Bogotá","length":6,"redacted":false},{"label":"Dirección de entrega *","type":"text","value":"calle 45 454 45","length":15,"redacted":false},{"label":"Notas adicionales","type":"textarea","value":"","length":0,"redacted":false},{"label":"[submit]","type":"submit","value":"","length":0,"redacted":false}]

## 2026-08-12 01:50:59.051Z navigate
- url: http://192.168.40.9:3000/success
- via: pushState

## 2026-08-12 01:51:01.272Z click
- element: {"tag":"button","role":null,"ariaLabel":null,"name":null,"type":null,"id":null,"placeholder":null,"label":null,"value":null,"valueLength":0,"text":" Confirmar por WhatsApp"}

## 2026-08-12 01:51:05.394Z network.error
- method: POST
- url: https://www.google-analytics.com/g/collect?v=2&tid=G-494MCYFSWX&gtm=45je68a1v9260983210za200zd9260983210&_p=1786499418804&gcd=13l3l3l3l1l1&npa=0&dma=0&_eu=AEAAAAQ&ae=a&are=1&cid=1077752495.1786499420&frm=0&ngs=1&pscdl=noapi&rcb=0&sr=1360x768&ul=en-us&tag_exp=115616985~115938466~115938468~118395334~118897920~118897930~119367802~119367810~119404703~119527020~119896803&dl=http%3A%2F%2F192.168.40.9%3A3000%2Fsuccess&dr=http%3A%2F%2F192.168.40.9%3A3000%2Fcheckout&sid=1786499419&sct=1&seg=1&dt=%C2%A1Pedido%20recibido!%20%7C%20AMOLI&_s=5&tfd=49246
- status: 0
- requestBody: 
    en=page_view&_et=16320
    en=click&ep.link_id=&ep.link_classes=&ep.link_url=https%3A%2F%2Fwa.me%2F573002902010%3Ftext%3DHola%252C%2520quiero%2520confirmar%2520mi%2520pedido%2520%25238cb3866a%253A%250A%25E2%2580%25A2%25201%2520x%2520Guacamole%2520AMOLI%2520Picante%2520450g%2520%25E2%2580%2594%2520%2524%25C2%25A023.900%250ATotal%253A%2520%2524%25C2%25A023.900%250ANombre%253A%2520ricardo%250ACiudad%253A%2520Bogot%25C3%25A1%250ADirecci%25C3%25B3n%253A%2520calle%252045%2520454%252045&ep.link_domain=wa.me&ep.outbound=true&_et=1214&dl=http%3A%2F%2F192.168.40.9%2Fsuccess
- durationMs: 87

## 2026-08-12 01:51:05.395Z console.error
- text: Fetch error from : 

