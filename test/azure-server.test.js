import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.dirname(__dirname);

// Random test port to prove server does NOT assume port 3000
const TEST_PORT = 45821;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

function fetchEndpoint(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

test('Azure App Service: dist directory contains all 15 HTML pages and SEO assets', () => {
  const distDir = path.join(ROOT_DIR, 'dist');
  assert.ok(fs.existsSync(distDir), 'dist/ directory must exist after build');

  const requiredFiles = [
    'index.html',
    'about.html',
    'methodology.html',
    'privacy.html',
    'dashboard.html',
    'salary-calculator.html',
    'auth/login.html',
    'auth/signup.html',
    'auth/forgot-password.html',
    'auth/reset-password.html',
    'guides/5-lpa-in-hand-salary.html',
    'guides/10-lpa-in-hand-salary.html',
    'guides/ctc-vs-in-hand-salary.html',
    'guides/salary-breakup-guide.html',
    'guides/old-vs-new-tax-regime.html',
    'robots.txt',
    'sitemap.xml',
    'js/env.js'
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(distDir, relPath);
    assert.ok(fs.existsSync(fullPath), `Missing built file in dist: ${relPath}`);
  }
});

test('Azure App Service: server starts on dynamic PORT and serves built assets', async (t) => {
  // Launch server child process with custom PORT and NODE_ENV
  const serverProcess = spawn('node', ['server.js'], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      PORT: String(TEST_PORT),
      NODE_ENV: 'production',
      VITE_SUPABASE_URL: 'https://test-azure-project.supabase.co',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test_key_123',
      SECRET_SHOULD_NOT_LEAK: 'super_secret_password'
    }
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    // 1. Health check probe (used by Azure App Service health checks)
    const health = await fetchEndpoint('/health');
    assert.equal(health.statusCode, 200);
    assert.equal(health.body, 'OK');

    // 2. Homepage (root)
    const home = await fetchEndpoint('/');
    assert.equal(home.statusCode, 200);
    assert.match(home.headers['content-type'], /text\/html/);
    assert.match(home.body, /SalarySeed/);

    // 3. Clean URLs without .html extension
    const about = await fetchEndpoint('/about');
    assert.equal(about.statusCode, 200);
    assert.match(about.body, /About SalarySeed/);

    const calc = await fetchEndpoint('/salary-calculator');
    assert.equal(calc.statusCode, 200);
    assert.match(calc.body, /In-Hand Salary Calculator/);

    const guide5 = await fetchEndpoint('/guides/5-lpa-in-hand-salary');
    assert.equal(guide5.statusCode, 200);
    assert.match(guide5.body, /5 LPA In-Hand Salary/);

    const login = await fetchEndpoint('/auth/login');
    assert.equal(login.statusCode, 200);

    // 4. Static SEO files
    const robots = await fetchEndpoint('/robots.txt');
    assert.equal(robots.statusCode, 200);
    assert.match(robots.body, /User-agent:/);

    const sitemap = await fetchEndpoint('/sitemap.xml');
    assert.equal(sitemap.statusCode, 200);
    assert.match(sitemap.body, /<urlset/);

    // 5. Runtime /js/env.js endpoint: verifies public keys injected without leaking server secrets
    const envRes = await fetchEndpoint('/js/env.js');
    assert.equal(envRes.statusCode, 200);
    assert.match(envRes.headers['content-type'], /application\/javascript/);
    assert.match(envRes.body, /https:\/\/test-azure-project\.supabase\.co/);
    assert.match(envRes.body, /sb_publishable_test_key_123/);
    assert.ok(!envRes.body.includes('super_secret_password'), 'Server secrets must NEVER leak in /js/env.js');
    assert.ok(!envRes.body.includes('SECRET_SHOULD_NOT_LEAK'), 'Private environment variables must not appear');

    // 6. Security headers
    assert.equal(home.headers['x-content-type-options'], 'nosniff');
    assert.equal(home.headers['x-frame-options'], 'SAMEORIGIN');

    // 7. Unknown routes return 404 status code
    const notFound = await fetchEndpoint('/non-existent-random-route-xyz');
    assert.equal(notFound.statusCode, 404);
    assert.match(notFound.body, /404/);

  } finally {
    serverProcess.kill('SIGTERM');
  }
});
