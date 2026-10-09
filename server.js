// server.js - Production-ready HTTP server for SalarySeed (Azure App Service & Local)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port and Host configuration for Azure App Service Linux
const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '0.0.0.0';

// Determine static root: serve Vite dist/ if it exists, otherwise fallback to root
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_DIR = fs.existsSync(DIST_DIR) && fs.statSync(DIST_DIR).isDirectory()
  ? DIST_DIR
  : __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Safe local .env parser (fallback when not running with Azure App Service app settings)
function parseEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envVars = {};
  if (fs.existsSync(envPath)) {
    try {
      const lines = fs.readFileSync(envPath, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          envVars[key] = val;
        }
      }
    } catch {
      // Ignore read errors
    }
  }
  return envVars;
}

const localEnv = parseEnvFile();

const server = http.createServer((req, res) => {
  // Common security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Health check endpoint for Azure App Service probes
  if (pathname === '/health' || pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('OK');
    return;
  }

  // Runtime environment script: dynamically injected without exposing private secrets
  if (pathname === '/js/env.js') {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || localEnv.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      localEnv.VITE_SUPABASE_PUBLISHABLE_KEY ||
      localEnv.VITE_SUPABASE_ANON_KEY ||
      '';
    const siteUrl = process.env.VITE_SITE_URL || localEnv.VITE_SITE_URL || '';

    const publicEnv = {
      VITE_SUPABASE_URL: supabaseUrl,
      VITE_SUPABASE_PUBLISHABLE_KEY: supabaseKey,
      VITE_SUPABASE_ANON_KEY: supabaseKey,
      VITE_SITE_URL: siteUrl,
    };

    const body = `window.__ENV__ = ${JSON.stringify(publicEnv)};`;
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(body);
    return;
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(STATIC_DIR, safePath);

  // Check if directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Support clean URLs: /about -> /about.html, /salary-calculator -> /salary-calculator.html
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // If still not found, return 404
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found - SalarySeed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 4rem 1rem; color: #1e293b; background: #f8fafc; }
    .box { max-width: 500px; margin: 0 auto; background: #fff; padding: 2.5rem; border-radius: 16px; border: 1px solid #e2e8f0; }
    h1 { font-size: 2.5rem; color: #064e3b; margin-bottom: 0.5rem; }
    p { font-size: 1rem; color: #64748b; margin-bottom: 2rem; }
    a { background: #064e3b; color: #fff; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; }
  </style>
</head>
<body>
  <div class="box">
    <h1>404</h1>
    <p>The page you requested could not be found on SalarySeed.</p>
    <a href="/">Return to Homepage</a>
  </div>
</body>
</html>`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Apply caching policies
  if (pathname.startsWith('/assets/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (ext === '.html') {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`==================================================`);
  console.log(`🌱 SalarySeed Production Server Running`);
  console.log(`📡 URL: http://${HOST}:${PORT}`);
  console.log(`📁 Static Directory: ${STATIC_DIR}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`==================================================`);
});

// Graceful termination for Azure container management
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});
