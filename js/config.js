/**
 * SalarySeed Client Configuration
 * Automatically loads from:
 * 1. Vite environment variables (import.meta.env)
 * 2. Local development server environment variables (window.__ENV__)
 * 3. Fallback placeholder
 */

export const SUPABASE_CONFIG = {
  get url() {
    const win = typeof window !== 'undefined' ? window.__ENV__?.VITE_SUPABASE_URL : null;
    const vite = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : null;
    return win || vite || "https://your-project-id.supabase.co";
  },
  get anonKey() {
    const win = typeof window !== 'undefined'
      ? (window.__ENV__?.VITE_SUPABASE_PUBLISHABLE_KEY || window.__ENV__?.VITE_SUPABASE_ANON_KEY)
      : null;
    const vite = typeof import.meta !== 'undefined'
      ? (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY)
      : null;
    return win || vite || "your-anon-key-placeholder";
  }
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
