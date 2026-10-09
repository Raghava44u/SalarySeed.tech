/**
 * Supabase Client Initialization Module
 * Handles official Supabase Auth client singleton
 */

import { SUPABASE_CONFIG, isSupabaseConfigured } from './config.js';

let supabaseClient = null;

/**
 * Dynamically loads and returns the Supabase client
 */
export async function getSupabase() {
  if (supabaseClient) return supabaseClient;

  if (!isSupabaseConfigured()) {
    console.warn(
      "[SalarySeed] Supabase credentials not yet configured. Please update js/config.js or .env"
    );
    return null;
  }

  try {
    // Attempt ESM import from esm.sh CDN for vanilla HTML/JS without bundler
    let createClient;
    if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
      createClient = window.supabase.createClient;
    } else {
      const module = await import('https://esm.sh/@supabase/supabase-js@2.48.0');
      createClient = module.createClient;
    }

    supabaseClient = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });

    return supabaseClient;
  } catch (err) {
    console.error("[SalarySeed] Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Get the currently logged in user session
 */
export async function getSession() {
  const supabase = await getSupabase();
  if (!supabase) return null;
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("[SalarySeed] Error getting session:", error.message);
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

/**
 * Signs out current user and removes session
 */
export async function signOutUser() {
  const supabase = await getSupabase();
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}
