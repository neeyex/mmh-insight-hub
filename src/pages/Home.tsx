import { Link } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl mx-auto text-center">

        <Image
          src="https://assets.modernmarketinghouse.com/MMH-Modern-Marketing-House-Logo.svg"
          alt="Modern Marketing House Logo"
          width={160}
          height={160}
          priority
          className="mx-auto mb-8"
        />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          MMH Agent Center
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          This is the private command hub for our partners. Please log in to access your dashboard, manage your agent, and track your autonomous revenue operations.
        </p>

        <div className="mt-12">
          <Link
            to="/login"
            className="group inline-flex items-center justify-center px-8 py-4 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            <span>Access Your Agent Center</span>
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16">
            <a href="https://modernmarketinghouse.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Return to ModernMarketingHouse.com
            </a>
        </div>
      </div>
    </main>
  );
}
