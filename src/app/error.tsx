'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-card rounded-2xl shadow-lg border border-border">
        <Image
            src="https://assets.modernmarketinghouse.com/MMH-Modern-Marketing-House-Logo.svg"
            alt="Modern Marketing House Logo"
            width={96}
            height={96}
            className="mx-auto"
        />
        <h2 className="text-2xl font-bold text-destructive">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {/* CORRECTED: Replaced the apostrophe with its HTML entity */}
          We&apos;re sorry, but an unexpected error occurred. Our team has been notified.
        </p>
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90"
          >
            Try Again
          </button>
          <Link href="/dashboard/support" className="flex-1 flex justify-center py-3 px-4 border border-border rounded-lg shadow-sm text-sm font-semibold text-foreground bg-secondary hover:bg-accent">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

