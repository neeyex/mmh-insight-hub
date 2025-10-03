// src/app/auth/callback/route.ts
    
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// This function is already async, which is perfect.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (code) {
    // We just need to add the 'await' keyword here.
    const supabase = await createSupabaseServerClient(); 
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/update-password`);
    }
  }

  // return the user to an error page if something went wrong
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
