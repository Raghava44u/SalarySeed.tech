/**
 * SalarySeed Client Configuration
 * Automatically loads from:
 * 1. Vite environment variables (import.meta.env)
 * 2. Local development server environment variables (window.__ENV__)
 * 3. Fallback placeholder
 */

const viteUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL;
const viteAnonKey = typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY);

const winUrl = typeof window !== 'undefined' && window.__ENV__?.VITE_SUPABASE_URL;
const winAnonKey = typeof window !== 'undefined' && (window.__ENV__?.VITE_SUPABASE_PUBLISHABLE_KEY || window.__ENV__?.VITE_SUPABASE_ANON_KEY);

export const SUPABASE_CONFIG = {
  url: viteUrl || winUrl || "https://your-project-id.supabase.co",
  anonKey: viteAnonKey || winAnonKey || "your-anon-key-placeholder",
};

/**
 * Returns true if real Supabase credentials have been configured
 */
export function isSupabaseConfigured() {
  return (
    SUPABASE_CONFIG.url &&
    SUPABASE_CONFIG.url.startsWith("https://") &&
    !SUPABASE_CONFIG.url.includes("your-project-id") &&
    SUPABASE_CONFIG.anonKey &&
    !SUPABASE_CONFIG.anonKey.includes("your-anon-key-placeholder")
  );
}
