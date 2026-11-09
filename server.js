'use strict';
// Public demonstration only. Pure static host: no reads from source, databases or trading systems.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const host = '0.0.0.0';
const port = Number.parseInt(process.env.PORT || '3000', 10);
const index = path.join(__dirname, 'public', 'index.html');
const html = fs.readFileSync(index);
const robots = 'User-agent: *\nDisallow: /\n';
const headers = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'"
};
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const server = http.createServer((req, res) => {
  const method = req.method;
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { ...headers, Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(method === 'HEAD' ? undefined : 'Method not allowed');
    return;
  }
  const url = (req.url || '').split('?')[0];
  let status = 200, type = 'text/html; charset=utf-8', data = html;
  if (url === '/healthz') {
    type = 'application/json; charset=utf-8';
    data = Buffer.from(JSON.stringify({status:'ok',service:'elpatron-intelligence-public-demo',mode:'ANALYSIS_ONLY'}));
  } else if (url === '/version') {
    type = 'application/json; charset=utf-8';
    data = Buffer.from(JSON.stringify({service:'elpatron-intelligence-public-demo',build_sha:process.env.RAILWAY_GIT_COMMIT_SHA||'UNKNOWN',source_identity:'NO_ELPATRON_SOURCE_CONNECTED',deployed_execution_identity:'NOT_APPLICABLE',runtime_data_connected:false,mode:'ANALYSIS_ONLY'}));
  } else if (url === '/robots.txt') {
    type = 'text/plain; charset=utf-8'; data = Buffer.from(robots);
  } else if (url === '/favicon.ico') {
    res.writeHead(204, headers);res.end();return;
  } else if (url !== '/' && url !== '/index.html') {
    status = 404;type = 'text/plain; charset=utf-8';data = Buffer.from('Not found');
  }
  res.writeHead(status, {...headers, 'Content-Type':type, 'Content-Length':data.length});
  res.end(method === 'HEAD' ? undefined : data);
});
server.listen(port, host, () => process.stdout.write(`ELPATRON Intelligence public demo listening on ${host}:${port}\n`));
