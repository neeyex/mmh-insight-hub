// src/pages/dashboard/Plan.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/lib/supabase/client';
// CORRECTED: Import paths now point to the correct dashboard/plan directory
import HustlerPlan from '@/app/dashboard/plan/HustlerPlan';
import GrowthPlan from '@/app/dashboard/plan/GrowthPlan';
import ProfessionalPlan from '@/app/dashboard/plan/ProfessionalPlan';
import EnterprisePlan from '@/app/dashboard/plan/EnterprisePlan';

// This helper component is the "brain" of the page.
const PlanDetails = ({ planName }: { planName: string | undefined }) => {
  if (planName?.toLowerCase().includes('hustler')) {
    return <HustlerPlan />;
  }
  if (planName?.toLowerCase().includes('growth')) {
    return <GrowthPlan />;
  }
  if (planName?.toLowerCase().includes('professional')) {
    return <ProfessionalPlan />;
  }
  if (planName?.toLowerCase().includes('enterprise')) {
    return <EnterprisePlan />;
  }

  return <div className="text-center p-8 bg-gray-100 rounded-lg">Could not load your plan details. Please contact support.</div>;
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
