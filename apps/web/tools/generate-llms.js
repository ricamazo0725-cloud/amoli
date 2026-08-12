#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// ============================================================
// Genera public/llms.txt a partir de las rutas PÚBLICAS reales
// definidas en src/App.jsx (nunca incluye rutas /admin/*).
//
// Para cada ruta intenta obtener título/descripción, en este orden:
//   1. Props inline en la propia ruta (title="…" description="…"),
//      usado por páginas genéricas reutilizadas como CatalogPage.
//   2. El <Helmet><title>…</title></Helmet> del archivo de esa página,
//      si el título es texto fijo (no una variable de React).
//   3. Un texto de respaldo legible, si el título depende de datos
//      dinámicos (ej. el título de un producto o post específico).
// ============================================================

const SITE_NAME = 'AMOLI';
const SITE_DESCRIPTION =
	'Guacamole artesanal elaborado con aguacate Hass montañero de Antioquia, ' +
	'mediante un proceso artesanal, fresco y responsable. Sabores Limonudo y Picante.';

// Páginas con contenido dinámico (el <title> depende de datos que no existen
// en tiempo de build) — les damos una descripción genérica pero útil.
const DYNAMIC_FALLBACKS = {
	ProductDetailPage: { title: 'Detalle de producto', description: 'Ficha de un producto del catálogo AMOLI, con precio, stock e imágenes.' },
	BlogPostPage: { title: 'Artículo del blog', description: 'Un artículo del blog de AMOLI con recetas y tips de guacamole.' },
	CatalogPage: { title: 'Productos', description: 'Catálogo completo de guacamole artesanal AMOLI: Limonudo y Picante.' },
};

function readFile(filePath) {
	try {
		return fs.readFileSync(filePath, 'utf8');
	} catch {
		return null;
	}
}

function extractRouteTags(appJsxContent) {
	// Captura cada <Route ... /> (self-closing), sin importar el nivel de anidación.
	return [...appJsxContent.matchAll(/<Route\s+[^>]*\/>/gs)].map((m) => m[0]);
}

function getAttr(tag, attrName) {
	const match = tag.match(new RegExp(`${attrName}=["']([^"']*)["']`));
	return match ? match[1] : null;
}

function getComponentName(tag) {
	// Busca cualquier identificador que termine en "Page" dentro del tag,
	// sin importar si está envuelto en <div>, <ProtectedRoute>, etc.
	const match = tag.match(/(\w+Page)\b/);
	return match ? match[1] : null;
}

function extractHelmetTitleAndDescription(pageFileContent) {
	const helmetMatch = pageFileContent.match(/<Helmet[^>]*>([\s\S]*?)<\/Helmet>/i);
	if (!helmetMatch) return null;

	const helmetContent = helmetMatch[1];
	const titleMatch = helmetContent.match(/<title[^>]*>\s*(.*?)\s*<\/title>/is);
	const descMatch = helmetContent.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is);

	const rawTitle = titleMatch?.[1]?.trim();
	const rawDesc = descMatch?.[1]?.trim();

	// Si el título contiene una expresión de React (ej. {post.title}), no es texto fijo utilizable.
	const titleIsDynamic = !rawTitle || rawTitle.includes('{');
	const descIsDynamic = !rawDesc || rawDesc.includes('{');

	return {
		title: titleIsDynamic ? null : rawTitle,
		description: descIsDynamic ? null : rawDesc,
	};
}

function buildPageEntries() {
	const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');
	const pagesDir = path.join(process.cwd(), 'src', 'pages');

	const appJsxContent = readFile(appJsxPath);
	if (!appJsxContent) return [];

	const routeTags = extractRouteTags(appJsxContent);
	const seenUrls = new Set();
	const entries = [];

	for (const tag of routeTags) {
		const routePath = getAttr(tag, 'path');
		if (!routePath) continue;
		if (routePath.startsWith('/admin')) continue; // nunca listamos el panel de administrador
		if (routePath === '*') continue; // el wrapper de layout, no es una página real
		if (seenUrls.has(routePath)) continue;

		const componentName = getComponentName(tag);
		let title = getAttr(tag, 'title');
		let description = getAttr(tag, 'description');

		if ((!title || !description) && componentName) {
			const pageFilePath = path.join(pagesDir, `${componentName}.jsx`);
			const pageFileContent = readFile(pageFilePath);
			if (pageFileContent) {
				const helmetData = extractHelmetTitleAndDescription(pageFileContent);
				if (helmetData) {
					title = title || helmetData.title;
					description = description || helmetData.description;
				}
			}
		}

		if ((!title || !description) && componentName && DYNAMIC_FALLBACKS[componentName]) {
			title = title || DYNAMIC_FALLBACKS[componentName].title;
			description = description || DYNAMIC_FALLBACKS[componentName].description;
		}

		if (!title && !description) continue; // no logramos obtener info útil, mejor omitir

		seenUrls.add(routePath);
		entries.push({
			url: routePath,
			title: title || componentName || routePath,
			description: description || 'Sin descripción disponible.',
		});
	}

	return entries;
}

function generateLlmsTxt(pages) {
	const sortedPages = [...pages].sort((a, b) => a.url.localeCompare(b.url));
	const pageEntries = sortedPages
		.map((page) => `- [${page.title}](${page.url}): ${page.description}`)
		.join('\n');

	return `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\n## Pages\n${pageEntries}\n`;
}

function ensureDirectoryExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function main() {
	const pages = buildPageEntries();

	if (pages.length === 0) {
		console.error('❌ No se encontraron rutas públicas para generar llms.txt');
		process.exit(1);
	}

	const llmsTxtContent = generateLlmsTxt(pages);
	const outputPath = path.join(process.cwd(), 'public', 'llms.txt');

	ensureDirectoryExists(path.dirname(outputPath));
	fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
	console.log(`✅ llms.txt generado con ${pages.length} páginas públicas.`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
	main();
}

export { buildPageEntries, generateLlmsTxt };