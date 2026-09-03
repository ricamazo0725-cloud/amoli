const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		handle(req, res);
	}).listen(port, hostname, (err) => {
		if (err) throw err;
		console.log(`> AMOLI (Next.js) listo en http://${hostname}:${port}`);
	});
});
