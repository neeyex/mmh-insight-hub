// src/app/dashboard/status/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const milestones = [
  {
    phase: 1,
    name: "Blueprint & Strategy",
    description: "You define the agent's core mission. The strategic choices, brand data, and tool connections you provide here become the foundational DNA for the engineering process.",
    actionBy: "You",
  },
  {
    phase: 2,
    name: "Core Intelligence Engineering",
    description: "We take your blueprint and enrich it with our exclusive datasets on sales psychology and human buying behavior to engineer a truly revenue-focused intelligence.",
    actionBy: "Us (MMH Engineering)",
  },
  {
    phase: 3,
    name: "Integration & Testing",
    description: "Our engineering team builds the secure connections between your agent and your tools, then runs rigorous simulations to ensure every automated workflow is flawless.",
    actionBy: "Us (MMH Engineering)",
  },
  {
    phase: 4,
    name: "Live Deployment",
    description: "Launch day. Your agent is deployed and begins actively engaging your market. We monitor all initial interactions in real-time to ensure a smooth and successful activation.",
    actionBy: "Us (MMH Engineering)",
  },
  {
    phase: 5,
    name: "Performance Monitoring",
    description: "The initial 30 days are a critical learning period. We continuously monitor performance, allowing the agent to learn from live data and become progressively smarter.",
    actionBy: "Us (MMH Engineering)",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor, textColor, dotColor;
  switch (status.toLowerCase()) {
    case 'completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      dotColor = 'bg-green-500';
      break;
    case 'in progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      dotColor = 'bg-blue-500 animate-pulse';
      break;
    case 'waiting for you':
        bgColor = 'bg-orange-100';
        textColor = 'text-orange-800';
        dotColor = 'bg-orange-500';
        break;
    default: // Not Started
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-600';
      dotColor = 'bg-gray-400';
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
      <span className={`w-2 h-2 mr-2 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};


export default async function AgentStatusPage() {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: agentStatus } = await supabase
    .from('agent_status')
    .select('engineering_phase, engineering_status')
    .eq('client_id', user.id)
    .single();

  return (
    <div className="w-full">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            AI Sales Agent Engineering Status
          </h1>
          {/* CORRECTED: Replaced the apostrophe with its HTML entity */}
          <p className="mt-2 text-lg text-muted-foreground">
            This is the official roadmap for your agent&apos;s creation and launch. This page is your live tracker for the entire journey.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-secondary/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Phase</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Action By</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {milestones.map((milestone) => {
                let status = 'Not Started';
                if (agentStatus) {
                  const currentPhaseIndex = milestones.findIndex(m => m.name === agentStatus.engineering_phase);
                  if (milestone.phase - 1 < currentPhaseIndex) {
                    status = 'Completed';
                  } else if (milestone.phase - 1 === currentPhaseIndex) {
                    status = agentStatus.engineering_status;
                  }
                }
                
                return (
                  <tr key={milestone.phase} className="hover:bg-accent/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-foreground">{milestone.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">{milestone.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{milestone.actionBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
