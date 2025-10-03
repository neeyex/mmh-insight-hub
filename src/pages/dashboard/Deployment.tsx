// src/pages/dashboard/Deployment.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';

// This is a new, reusable component for displaying the code snippet.
const CodeSnippet = ({ snippet }: { snippet: string }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 mt-4">
      <pre className="text-sm text-gray-300 overflow-x-auto">
        <code>{snippet}</code>
      </pre>
    </div>
  );
};

export default function Deployment() {
  const navigate = useNavigate();
  const [agentStatus, setAgentStatus] = useState<{
    engineering_phase: string;
    engineering_status: string;
    deployment_details: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch the current status and deployment details from our 'agent_status' table.
      const { data } = await supabase
        .from('agent_status')
        .select('engineering_phase, engineering_status, deployment_details')
        .eq('client_id', user.id)
        .single();

      setAgentStatus(data);
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isDeployed = agentStatus?.engineering_phase === 'Live Deployment' && agentStatus?.deployment_details;
  const isAwaitingBlueprint = agentStatus?.engineering_status === 'Waiting for You';

  // This function determines which content to show based on the agent's status.
  const renderContent = () => {
    if (isDeployed) {
      return (
        // STATE 1: Agent is Deployed
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">Deployment Snippet</h2>
          <p className="mt-2 text-muted-foreground">
            Copy and paste this code snippet into the <code>&lt;head&gt;</code> section of your website to activate your agent.
          </p>
          <CodeSnippet snippet={JSON.stringify(agentStatus.deployment_details, null, 2)} />
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-semibold text-foreground">Next Steps:</h3>
            <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
              <li>Integrate the snippet onto your website.</li>
              <li>Monitor initial conversations in your upcoming analytics dashboard.</li>
              <li>Provide feedback to our team for continuous optimization.</li>
            </ul>
          </div>
        </div>
      );
    } else if (isAwaitingBlueprint) {
      return (
        // STATE 2: Waiting for Client's Blueprint
        <div className="text-center">
           <p className="text-lg text-muted-foreground">
            The engineering process will begin as soon as you complete the three blueprint steps.
          </p>
          <Link to="/dashboard#onboarding-section" className="mt-6 inline-flex items-center justify-center px-6 py-3 font-semibold text-primary-foreground bg-primary rounded-lg shadow-sm hover:bg-primary/90">
            Return to Onboarding Checklist
          </Link>
        </div>
      );
    } else {
      return (
        // STATE 3: Engineering is in Progress
        <div className="text-center">
           <p className="text-sm text-gray-500">
            You can track our live progress on the <Link to="/dashboard/status" className="font-medium text-primary hover:underline">Agent Status</Link> page.
          </p>
        </div>
      );
    }
  };

  const getHeadline = () => {
    if (isDeployed) return 'Your Agent is Live';
    if (isAwaitingBlueprint) return 'Awaiting Your Blueprint';
    return 'Engineering in Progress';
  };

  const getSubtitle = () => {
    if (isDeployed) return "Your autonomous agent has been successfully deployed. You can now integrate it into your website using the code snippet below.";
    if (isAwaitingBlueprint) return "This is where you'll find the deployment details for your AI Sales Agent once you've completed the onboarding and our engineering process is finished.";
    return "Our team is currently in the engineering and testing phase. Your deployment details will appear here once the build is complete.";
  };

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
        <div className="max-w-3xl mx-auto text-center">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border mb-4 ${isDeployed ? 'bg-green-100 border-green-200' : isAwaitingBlueprint ? 'bg-primary/10 border-primary/20' : 'bg-blue-100 border-blue-200'}`}>
            {isDeployed ? (
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : isAwaitingBlueprint ? (
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
            ) : (
              <svg className="w-8 h-8 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            {getHeadline()}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {getSubtitle()}
          </p>
        </div>

        {/* Conditional Content */}
        <div className="max-w-3xl mx-auto mt-12">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
