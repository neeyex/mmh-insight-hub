// src/pages/dashboard/Plan.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/integrations/supabase/client';

// Plan details component - displays plan information
const PlanDetails = ({ planName }: { planName: string | undefined }) => {
  if (!planName) {
    return <div className="text-center p-8 bg-card border border-border rounded-lg">Could not load your plan details. Please contact support.</div>;
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-4">Your Active Plan</h2>
      <p className="text-lg text-muted-foreground mb-6">
        You are currently subscribed to the <strong>{planName}</strong> plan.
      </p>
      <p className="text-muted-foreground">
        For more details about your plan features and benefits, please contact support or visit your billing portal.
      </p>
    </div>
  );
};

export default function Plan() {
  const navigate = useNavigate();
  const [clientProfile, setClientProfile] = useState<{ plan_name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

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

  return (
    <div className="w-full">
      {/* Full-Width Banner Header */}
      <div className="relative w-full mb-12 overflow-hidden bg-card border-b border-border">
        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px]">
          <Image
            src="https://assets.modernmarketinghouse.com/Modern-Marketing-House-Banner.svg"
            alt="Modern Marketing House Banner"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Your AI Sales Agent Plan
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            This is a complete breakdown of your active plan with Modern Marketing House, including all features and capabilities.
          </p>
        </div>

        <PlanDetails planName={clientProfile?.plan_name} />
      </div>
    </div>
  );
}
