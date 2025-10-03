// src/app/dashboard/plan/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
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

export default async function YourPlanPage() {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: clientProfile } = await supabase
    .from('clients')
    .select('plan_name')
    .eq('id', user.id)
    .single();

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
