// src/app/dashboard/billing/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

// This is the dedicated page for billing management.
export default function BillingPage() {
  // This is the single, universal link to your Paddle Customer Portal.
  // You can find this in your Paddle dashboard under Checkout > Customer Portal.
  const paddlePortalUrl = "https://customer-portal.paddle.com/cpl_01hyngxpzbvxcbvy91q4dssffz";

  return (
    <div className="w-full">
      {/* Full-Width Banner Header */}
      <div className="relative w-full mb-12 overflow-hidden bg-card border-b border-border">
        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px]">
          <Image
            src="https://assets.modernmarketinghouse.com/Modern-Marketing-House-Banner.svg"
            alt="Modern Marketing House Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Card */}
        <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 mb-4">
                    <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Access Your Secure Billing Portal
                </h1>
                <p className="mt-4 max-w-md mx-auto text-muted-foreground">
                    View invoices, update your payment method, and manage your subscription details at any time in your dedicated customer portal, managed by our secure payment partner, Paddle.
                </p>
                <div className="mt-8">
                    <Link href={paddlePortalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-primary-foreground bg-primary rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        Access Secure Portal
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
