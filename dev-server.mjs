// Servidor local de teste: executa o MESMO worker.js com um D1 simulado e serve a pasta public/.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import worker from '../src/worker.js'; import { makeD1 } from './d1shim.mjs';
const PUB = new URL('../public/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
export function start(port = 8787, env = {}) {
  const DB = makeD1(env.DBFILE || ':memory:');
  const E = { DB, SETUP_CODE: 'codigo-de-teste', PBKDF2_ITER: '100000', ...env,
    ASSETS: { fetch: async (req) => { let p = new URL(req.url).pathname; if (p === '/') p = '/index.html'; const f = path.join(PUB, p); if (!f.startsWith(PUB) || !fs.existsSync(f)) return new Response('404', { status: 404 }); return new Response(fs.readFileSync(f), { headers: { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' } }); } } };
  const srv = http.createServer(async (rq, rs) => {
    const chunks = []; for await (const c of rq) chunks.push(c);
    const url = 'http://' + rq.headers.host + rq.url;
    const init = { method: rq.method, headers: rq.headers }; if (!['GET', 'HEAD'].includes(rq.method)) init.body = Buffer.concat(chunks);
    const res = await worker.fetch(new Request(url, init), E);
    const h = {}; res.headers.forEach((v, k) => { h[k] = v; }); const sc = res.headers.getSetCookie ? res.headers.getSetCookie() : []; if (sc.length) h['set-cookie'] = sc;
    rs.writeHead(res.status, h); rs.end(Buffer.from(await res.arrayBuffer()));
  });
  return new Promise((r) => srv.listen(port, () => r({ srv, env: E, port })));
}
if (process.argv[1] === new URL(import.meta.url).pathname) { start(+process.env.PORT || 8787).then((x) => console.log('Teste local em http://localhost:' + x.port)); }
