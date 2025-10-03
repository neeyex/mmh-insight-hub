// PhaseCard.tsx - Updated
'use client';
import { useState } from 'react';

interface ChecklistItem {
  link: string;
  title: string;
  description: string;
}

interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  description: string;
  checklist: ChecklistItem[];
  icon: React.ReactNode;
  type?: string;
}

const PhaseCard = ({ phaseNumber, title, description, checklist, icon, type }: PhaseCardProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklist.length).fill(false)
  );

  const handleToggle = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const allChecked = checkedItems.every(Boolean);

  return (
    <div className="bg-[#faebeb] border border-orange-200 rounded-3xl shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden max-w-lg w-full">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff4f00]"></div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-[#ff4f00] rounded-lg flex items-center justify-center text-white flex-shrink-0">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-[#0a0a10]">{title}</h2>
      </div>
      
      <div className="text-base text-[#6f6f7e] mb-6 leading-relaxed">
        {description}
      </div>
          
      <h3 className="text-sm font-semibold text-[#0a0a10] mb-4 no-underline">Onboarding Checklist:</h3>
      <ul className="space-y-3 mb-6">
        {checklist.map((item, index) => (
          <li key={index} className="group">
            <div 
              onClick={(e) => handleToggle(index, e)}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50/70 transition-all duration-200 cursor-pointer"
            >
              <div className="relative flex-shrink-0 mt-0.5">
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  checkedItems[index] 
                    ? 'bg-[#ff4f00] border-[#ff4f00] shadow-md scale-105' 
                    : 'border-gray-300 bg-white hover:border-[#ff4f00] hover:shadow-sm'
                }`}>
                  {checkedItems[index] && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#0a0a10] group-hover:text-[#ff4f00] transition-colors duration-200 no-underline">
                  {item.title}
                </h4>
                <p className="text-sm text-[#6f6f7e] mt-1 break-words leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {allChecked && (
        <div className="relative mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-800 break-words">
                Once all three steps are confirmed, our system will automatically begin Phase 2. Thank you for your patience.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseCard;