'use client';

import React from 'react';

// The icon imports have been removed as requested.
// The parent component is now responsible for importing and passing the icon.

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PhaseCard2 = ({ phaseNumber, title, description, icon }: PhaseCardProps) => {
  return (
    <div className="bg-[#faebeb] border border-orange-200 rounded-3xl shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden max-w-lg w-full">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff4f00]"></div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-[#ff4f00] rounded-lg flex items-center justify-center text-white flex-shrink-0 p-1">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-[#0a0a10]">{title}</h2>
      </div>
      <div className="text-base text-[#6f6f7e] mb-6 leading-relaxed">
        This is where the core engineering work will take place. We will apply our proprietary fine-tuning process to forge your agent's core intelligence. It's a complex, resource-intensive step, but it is what will transform your agent into a powerful, autonomous asset for your brand. <br /><br />
        During this phase, your agent will learn to replicate your decision-making patterns, communication style, and strategic approaches with remarkable precision. <br /><br />
        Once this phase begins, you will be able to track our progress live on the{' '}
        <a 
          href="/dashboard/status"
          className="text-[#ff4f00] font-semibold hover:underline"
        >
          AI Sales Agent Engineering Status
        </a>{' '} page.
      </div>
      <h4 className="text-sm font-semibold text-[#0a0a10] mb-4">Current Status:</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-2">
          {/* Icons removed here */}
          Core Intelligence Build
        </div>
        <div className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full flex items-center gap-2">
          {/* Icons removed here */}
          Integration
        </div>
        <div className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-full flex items-center gap-2">
          {/* Icons removed here */}
          Proprietary Fine-Tuning
        </div>
      </div>
    </div>
  );
};

export default PhaseCard2;
