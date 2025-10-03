// src/pages/dashboard/FineTuning.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/integrations/supabase/client';

// This is our new "smart" helper function.
// It takes the plan name and the client's unique ID, and returns the correct, personalized Tally form URL.
const getTallyFormUrl = (planName: string | undefined, clientId: string | undefined): string => {
  const defaultUrl = "https://tally.so/r/mY1pd5"; // Fallback to Hustler

  if (!planName || !clientId) return defaultUrl;

  const lowerCasePlan = planName.toLowerCase();
  let baseUrl = defaultUrl;

  if (lowerCasePlan.includes('hustler')) {
    baseUrl = "https://tally.so/r/mY1pd5";
  } else if (lowerCasePlan.includes('growth')) {
    baseUrl = "https://tally.so/r/3jjkq6";
  } else if (lowerCasePlan.includes('professional') || lowerCasePlan.includes('enterprise')) {
    // Professional and Enterprise use the same advanced form for Step 1
    baseUrl = "https://tally.so/r/mY1xEW";
  }

  // This is where we automatically add the client's ID as a hidden field to the URL.
  return `${baseUrl}?clientId=${clientId}`;
};

export default function FineTuning() {
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

  // We use our helper function to get the correct, plan-specific URL,
  // embedding the user's ID at the same time.
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
              src="https://assets.modernmarketinghouse.com/Fine-Tuning.svg"
              alt="Fine-Tuning Icon"
              width={128}
              height={128}
            />
        </div>
        <p className="text-base font-semibold text-primary uppercase tracking-wider">
          Step 1: Proprietary Fine-Tuning Process
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
          Cognitive Revenue DNA Extraction & AI Sales Architecture
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
          This isn't just configuration. It's <strong>revenue archaeology</strong>. We're excavating your profit-generating instincts and crystallizing them into a powerful autonomous sales agent that works 24/7 toward your revenue goals.
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
            {/* What's Really Happening Section with Hero Image */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-primary">The Process:</span> <span className="text-foreground">How We Engineer Your Revenue Engine</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                      <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">1</div>
                          <div>
                          <h3 className="font-bold text-foreground text-lg mb-1">Minimal Input, Maximum Revenue Extraction</h3>
                          <p className="text-muted-foreground text-sm">
                              Each question triggers our algorithms to decode multiple layers of your sales psychology, revealing your revenue patterns, deal-closing instincts, and profit-maximizing decisions.
                          </p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">2</div>
                          <div>
                          <h3 className="font-bold text-foreground text-lg mb-1">Revenue Pattern Mining</h3>
                          <p className="text-muted-foreground text-sm">
                              We map your neural sales pathways - how you unconsciously identify high-value prospects, spot revenue opportunities, and convert interest into actual dollars.
                          </p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">3</div>
                          <div>
                          <h3 className="font-bold text-foreground text-lg mb-1">Sales DNA Synthesis</h3>
                          <p className="text-muted-foreground text-sm">
                              Your responses become your AI agent's core revenue-generating architecture, encoding the "why" behind your most profitable sales moments into 100% autonomous operation.
                          </p>
                          </div>
                      </div>
                  </div>
                  <div className="flex justify-center items-center">
                      <Image
                          src="https://assets.modernmarketinghouse.com/MMH-Revenue-Pipeline.svg"
                          alt="MMH Revenue Pipeline"
                          width={350}
                          height={350}
                          className="max-w-full h-auto"
                      />
                  </div>
              </div>
            </div>
            {/* Plan Tier Notice - Above the button */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-green-800 text-lg mb-2">Revenue Engine Level Based on Your Plan</h4>
                  <p className="text-green-700 mb-4">
                    The depth and sophistication of your AI revenue engine will be calibrated according to your subscription tier. Higher-tier plans unlock more advanced revenue analytics, deeper profit pattern recognition, and more nuanced deal-closing capabilities.
                  </p>
                  <div className="bg-white/50 rounded-lg p-4 border border-green-300">
                    <p className="text-sm text-green-600 font-medium">
                      <strong>Current Plan:</strong> Your fine-tuning session will extract and encode revenue-generating intelligence appropriate to your <strong className="text-green-700">{clientProfile?.plan_name || 'plan'}</strong>. Upgrade anytime to unlock deeper revenue-maximizing capabilities for your AI revenue engine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Security & Evolution Cards */}
          <div className="space-y-6">
            {/* Competitive Intelligence Vault */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Your Revenue Intelligence Vault
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                The revenue blueprint we're extracting represents your most valuable asset: the <strong>profit-generating expertise</strong> that separates you from average performers.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary">
                  Your revenue-generating intelligence remains exclusively yours.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Our extraction algorithms work in an isolated, encrypted environment where your revenue DNA can never be accessed by competitors.
                </p>
              </div>
            </div>
            {/* Evolution Protocol */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Continuous Evolution Protocol
              </h3>
              <p className="text-sm text-muted-foreground">
                As your revenue-generating strategies evolve, our secure re-extraction process captures your growth, ensuring your AI revenue engine never falls behind your real-world success and profit maximization techniques.
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Professional Call to Action Section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 mb-12">
          <div className="bg-black border border-gray-700 rounded-2xl p-8 sm:p-12 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Begin?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Click below to start the most advanced revenue-generating intelligence extraction system ever created. In less than 15 minutes, you'll have an AI revenue engine that thinks, closes, and maximizes profits exactly like you.
            </p>
            <a
              href={tallyFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
                <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              START PROPRIETARY FINE-TUNING
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
