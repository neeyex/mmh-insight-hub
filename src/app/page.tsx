import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If a user is already logged in, we immediately send them to their dashboard.
  // This is a professional touch that creates a seamless experience for returning users.
  if (user) {
    redirect('/dashboard');
  }

  // This is the main UI for the public-facing landing page.
  return (
    // We use a full-screen layout to create a focused, immersive experience.
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl mx-auto text-center">
        
        {/* The main brand logo, given prominence to anchor the page. */}
        <Image
          src="https://assets.modernmarketinghouse.com/MMH-Modern-Marketing-House-Logo.svg"
          alt="Modern Marketing House Logo"
          width={160}
          height={160}
          priority
          className="mx-auto mb-8"
        />
        
        {/* The headline is large and confident, reinforcing the brand's premium positioning. */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          MMH Agent Center
        </h1>
        
        {/* The sub-headline is reassuring and explains the purpose of this private application. */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          This is the private command hub for our partners. Please log in to access your dashboard, manage your agent, and track your autonomous revenue operations.
        </p>

        {/* A single, clear, and impressive call-to-action button. */}
        <div className="mt-12">
          <Link
            href="/login"
            className="group inline-flex items-center justify-center px-8 py-4 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            <span>Access Your Agent Center</span>
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* A subtle link back to the main marketing site. */}
        <div className="mt-16">
            <Link href="https://modernmarketinghouse.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Return to ModernMarketingHouse.com
            </Link>
        </div>
      </div>
    </main>
  );
}
