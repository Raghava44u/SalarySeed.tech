/**
 * SalarySeed Authentication Guard Module
 * Enforces mandatory login for protected routes (/dashboard.html, /salary-calculator.html)
 * Prevents unauthorized viewing, flashes of protected content, and open redirect exploits.
 */

import { getSupabase, getSession, signOutUser } from './supabase-client.js';
import { isSupabaseConfigured } from './config.js';

/**
 * Validates that a redirect path is internal and safe against open-redirect attacks
 */
export function sanitizeRedirectPath(path) {
  if (!path) return '/dashboard.html';
  try {
    // Must start with '/' and must NOT start with '//' (protocol-relative URL)
    if (path.startsWith('/') && !path.startsWith('//')) {
      return path;
    }
  } catch (e) {
    // Fallback
  }
  return '/dashboard.html';
}

/**
 * Guard for protected pages (/dashboard.html, /salary-calculator.html)
 * Call this on page load before revealing private content.
 */
export async function requireAuth() {
  const protectedContent = document.getElementById('protected-content');
  const skeletonLoader = document.getElementById('skeleton-loader');
  const configAlert = document.getElementById('config-alert');

  // If Supabase credentials are missing, show setup alert
  if (!isSupabaseConfigured()) {
    if (skeletonLoader) skeletonLoader.style.display = 'none';
    if (configAlert) {
      configAlert.style.display = 'block';
    } else {
      renderConfigMissingBanner();
    }
    return null;
  }

  const session = await getSession();

  if (!session || !session.user) {
    // Unauthenticated! Redirect to login and preserve internal target
    const currentPath = window.location.pathname + window.location.search;
    const safeRedirect = encodeURIComponent(currentPath);
    window.location.href = `/auth/login.html?redirect=${safeRedirect}`;
    return null;
  }

  // Authenticated! Hide loader and display protected content
  if (skeletonLoader) skeletonLoader.style.display = 'none';
  if (protectedContent) protectedContent.style.display = 'block';

  // Setup user details and logout listener
  setupUserNav(session.user);

  // Subscribe to auth state change (token refresh or sign out)
  const supabase = await getSupabase();
  if (supabase) {
    supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'SIGNED_OUT' || !newSession) {
        window.location.href = '/auth/login.html';
      }
    });
  }

  return session.user;
}

/**
 * Guard for guest pages (/auth/login.html, /auth/signup.html)
 * If already logged in, redirect to dashboard or intended redirect target.
 */
export async function redirectIfAuthenticated() {
  if (!isSupabaseConfigured()) return;

  const session = await getSession();
  if (session && session.user) {
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = sanitizeRedirectPath(params.get('redirect'));
    window.location.href = redirectUrl;
  }
}

/**
 * Set up dynamic header navigation based on auth status
 */
export function setupUserNav(user) {
  const userEmailEl = document.getElementById('user-email-display');
  if (userEmailEl && user) {
    userEmailEl.textContent = user.email || 'User';
  }

  const logoutBtns = document.querySelectorAll('.btn-logout');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      btn.textContent = 'Logging out...';
      btn.setAttribute('disabled', 'true');
      await signOutUser();
      window.location.href = '/';
    });
  });
}

function renderConfigMissingBanner() {
  const main = document.querySelector('main') || document.body;
  const banner = document.createElement('div');
  banner.className = 'container';
  banner.innerHTML = `
    <div class="alert alert-warning" style="margin-top: 2rem;">
      <div>
        <strong>Supabase Credentials Needed:</strong>
        <p>Protected features require your Supabase URL & Anon Key to authenticate. Please add your credentials in <code>js/config.js</code> or your local <code>.env</code> file. Refer to <code>SUPABASE_SETUP.md</code> for step-by-step guidance.</p>
        <div style="margin-top: 0.5rem;">
          <a href="/" class="btn btn-sm btn-outline">Return to Public Homepage</a>
        </div>
      </div>
    </div>
  `;
  main.prepend(banner);
}
