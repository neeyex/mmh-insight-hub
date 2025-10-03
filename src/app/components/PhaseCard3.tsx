// PhaseCard3.tsx - Updated
'use client';
import React from 'react';

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bestPractices: { label: React.ReactNode }[];
}

const PhaseCard3 = ({ phaseNumber, title, description, icon, bestPractices }: PhaseCardProps) => {
  return (
    <div className="bg-[#faebeb] border border-[hsl(15,60%,92%)] rounded-3xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[hsl(15,100%,50%,0.4)] relative overflow-hidden p-8 max-w-lg w-full mx-auto">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(15,100%,50%)]"></div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-[hsl(15,100%,50%)] rounded-lg flex items-center justify-center text-[hsl(0,0%,98%)] flex-shrink-0">
          {icon}
        </div>
        <div className="text-xl font-semibold text-[hsl(240,10%,3.9%)] leading-tight">{title}</div>
      </div>
      
      <div className="text-[hsl(240,3.8%,46.1%)] mb-6 text-lg leading-relaxed">
        {description}
      </div>

      <h4 className="mb-4 text-[hsl(240,10%,3.9%)] font-semibold">Best Practices:</h4>
      
      <ul className="text-[hsl(240,3.8%,46.1%)] leading-relaxed list-none p-0">
        {bestPractices.map((practice, index) => (
          <li key={index} className="mb-3 pl-4 relative">
            <span className="absolute left-0 text-[hsl(15,100%,50%)]">•</span>
            {practice.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhaseCard3;