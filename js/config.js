/**
 * SalarySeed Client Configuration
 * 
 * Replace placeholders below with your Supabase credentials, OR provide
 * VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your local .env file.
 * 
 * SECURITY RULE:
 * Only use the public 'anon' key here. NEVER expose the service_role key!
 */

// Check if Vite environment variables exist, otherwise fallback to local configuration
const viteUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL;
const viteAnonKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_CONFIG = {
  // Replace these placeholders with your actual Supabase project keys
  url: viteUrl || "https://your-project-id.supabase.co",
  anonKey: viteAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-placeholder",
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
