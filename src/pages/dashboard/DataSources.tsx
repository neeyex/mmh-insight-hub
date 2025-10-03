// src/pages/dashboard/DataSources.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/integrations/supabase/client';

// This helper function gets the Tally URL and securely adds the client's ID.
const getTallyFormUrl = (userId: string | undefined): string => {
  const baseUrl = "https://tally.so/r/wLrJYy"; // The common URL for Step 2 for all tiers.
  if (!userId) return baseUrl;

  // Securely embed the user's ID as a hidden field in the URL.
  return `${baseUrl}?clientId=${userId}`;
};

export default function DataSources() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setUserId(user.id);
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // We get the secure, personalized URL using our helper function.
  const tallyFormUrl = getTallyFormUrl(userId);

  return (
    <div className="w-full">
      {/* Full-Width Banner Header - Consistent with other pages */}
      <div className="relative w-full mb-0 overflow-hidden !pb-0">
        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 !pb-0">
          <Image
            src="https://assets.modernmarketinghouse.com/Modern-Marketing-House-Banner.svg"
            alt="Modern Marketing House Banner"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

       {/* Title Section - Below the banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 mb-12">
        {/* UPDATED: Using your custom SVG icon */}
        <div className="flex justify-center mb-6">
            <Image
              src="https://assets.modernmarketinghouse.com/Icon-Data.svg"
              alt="Data Sources Icon"
              width={128}
              height={128}
            />
        </div>
        <p className="text-base font-semibold text-primary uppercase tracking-wider">
          Step 2: The Knowledge Base
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
          Build Your Agent's Digital Brain
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
          An agent's intelligence is only as good as its library. This is where you provide the core knowledge for your business, like sending your new agent to training with all the company manuals.
        </p>
        <div className="flex justify-center mb-8">
          <div className="w-32 h-0.5 bg-border rounded-full"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Main Process Description */}
          <div className="lg:col-span-2 space-y-12">
            {/* The Process Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-primary">The Curriculum:</span> <span className="text-foreground">What Your Agent Will Learn</span>
              </h2>
              <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">1</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Product & Service Fluency</h3>
                      <p className="text-muted-foreground text-sm">
                          Your agent will study your marketing materials to learn exactly what you sell, how to talk about it, and how to prove its value to prospects.
                      </p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">2</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Objection Handling Expertise</h3>
                      <p className="text-muted-foreground text-sm">
                          Your FAQ documents are pure gold. They are a primary source for training your agent to handle common questions and objections instantly and accurately.
                      </p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">3</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Insider Knowledge</h3>
                      <p className="text-muted-foreground text-sm">
                          Internal documents like sales playbooks or old scripts give your agent the "insider" knowledge of how your best people sell, making its conversations more effective.
                      </p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          {/* Right Column: Security & Evolution Cards */}
          <div className="space-y-6">
            {/* Knowledge Vault */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Your Knowledge Vault
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                The information you upload here is the crown jewel of your business. <strong>Your data stays yours. Period.</strong>
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary">
                  This intelligence remains exclusively yours.
                </p>
              </div>
            </div>
            {/* Update Later Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                Want to update later?
              </h3>
              <p className="text-sm text-muted-foreground">
                Great agents are never static. To update your agent's knowledge, just <a href="mailto:hi@modernmarketinghouse.com?subject=Updating%20Data%20Source" className="text-primary font-medium hover:underline">send us an email</a> first. This protects the integrity of your agent.
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Professional Call to Action Section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 mb-12">
          <div className="bg-black border border-gray-700 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Build the Library?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Click below to access the secure form for uploading your business documents and URLs. The more you provide, the smarter your agent will be.
            </p>
            <a
              href={tallyFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
                </svg>
              Open Secure Upload Form
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
