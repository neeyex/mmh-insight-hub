// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const getSupabaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL is not set');
    return 'https://placeholder-url.supabase.co'; // Placeholder for build
  }
  return url;
};

const getSupabaseAnonKey = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
    return 'placeholder-key'; // Placeholder for build
  }
  return key;
};

// The function is now async
export async function createSupabaseServerClient() {
  // We now await the cookieStore to ensure it's ready
  const cookieStore = await cookies() 
  
  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // We also need to make these functions async
        set: async (name: string, value: string, options: CookieOptions) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: async (name: string, options: CookieOptions) => {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
