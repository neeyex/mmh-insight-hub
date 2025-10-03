// src/pages/dashboard/ConnectTools.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/lib/supabase/client';

// This is our new "smart" helper function for this specific step.
// It takes the plan name and the client's unique ID, and returns the correct, personalized Tally form URL.
const getTallyFormUrl = (planName: string | undefined, clientId: string | undefined): string => {
  const defaultUrl = "https://tally.so/r/w7AEx6"; // Fallback to Hustler

  if (!planName || !clientId) return defaultUrl;

  const lowerCasePlan = planName.toLowerCase();
  let baseUrl = defaultUrl;

  if (lowerCasePlan.includes('hustler')) {
    baseUrl = "https://tally.so/r/w7AEx6";
  } else if (lowerCasePlan.includes('growth')) {
    baseUrl = "https://tally.so/r/mByek4";
  } else if (lowerCasePlan.includes('professional') || lowerCasePlan.includes('enterprise')) {
    baseUrl = "https://tally.so/r/mY1xEW";
  }

  // Securely embed the user's ID as a hidden field in the URL.
  return `${baseUrl}?clientId=${clientId}`;
};

export default function ConnectTools() {
  const navigate = useNavigate();
  const [clientProfile, setClientProfile] = useState<{ plan_name: string } | null>(null);
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

      const { data } = await supabase
        .from('clients')
        .select('plan_name')
        .eq('id', user.id)
        .single();

      setClientProfile(data);
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // We use our helper function to get the correct, plan-specific, and secure URL.
  const tallyFormUrl = getTallyFormUrl(clientProfile?.plan_name, userId);

  return (
    <div className="w-full">
      {/* Full-Width Banner Header */}
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
              src="https://assets.modernmarketinghouse.com/Icon-Tools.svg"
              alt="Connect Tools Icon"
              width={128}
              height={128}
          />
        </div>
        <p className="text-base font-semibold text-primary uppercase tracking-wider">
          Step 3: The Automation
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
          Activate Your Agent's Capabilities
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
          This is where you unlock your agent's full potential. By securely connecting your existing tools, you enable your agent to execute powerful automation workflows.
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
                <span className="text-primary">The Power of Integration:</span> <span className="text-foreground">Turning Conversations into Actions</span>
              </h2>
              <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">1</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Automated CRM Updates</h3>
                      <p className="text-muted-foreground text-sm">
                          When your agent qualifies a lead, it can automatically create a new contact in your CRM, assign it to the right person, and add the full conversation history.
                      </p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">2</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Seamless Meeting Scheduling</h3>
                      <p className="text-muted-foreground text-sm">
                          Your agent can intelligently offer your scheduling link at the perfect moment in a conversation, allowing qualified leads to book meetings directly on your calendar.
                      </p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">3</div>
                      <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">Intelligent Lead Nurturing</h3>
                      <p className="text-muted-foreground text-sm">
                          By connecting to your email marketing platform, your agent can add new leads to specific nurture sequences based on the topics discussed in their conversation.
                      </p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          {/* Right Column: Security & Evolution Cards */}
          <div className="space-y-6">
            {/* API & Data Security Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                API & Data Security
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We understand that API keys are the most sensitive data you can share. They are encrypted and stored in a secure, isolated vault.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary">
                  Your keys are only used to power your approved workflows.
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
                Great agents are never static. To update your agent's integrations, just <a href="mailto:hi@modernmarketinghouse.com?subject=Updating%20Tool" className="text-primary font-medium hover:underline">send us an email</a> first. This protects the integrity of your agent.
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Professional Call to Action Section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 mb-12">
          <div className="bg-black border border-gray-700 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Connect Your Tools?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Click below to access the secure form for providing your tool details and API keys. This is the final step to creating a truly autonomous operation.
            </p>
            <a
              href={tallyFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              Open Secure Integration Form
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
