// src/pages/dashboard/Dashboard.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image'
;
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const navigate = useNavigate();
  const [clientProfile, setClientProfile] = useState<{ full_name: string } | null>(null);
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
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (data) {
        setClientProfile({
          full_name: data.full_name || 'User'
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Enhanced checklist data with actionable steps
  const phase1Checklist = [
    {
      link: "#",
      title: "Start Our Proprietary Fine-Tuning",
      description: "Forge its Core Intelligence; Define its Mission."
    },
    {
      link: "#",
      title: "Upload Your Brand Data Sources",
      description: "Build its Digital Brain; Grant it Your Expertise."
    },
    {
      link: "#",
      title: "Connect Your Tools",
      description: "Activate its Capabilities; Empower it to Take Action"
    }
  ];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f1f1f3ff'}}>
      <div className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%2230%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-[#ff4f00]/10 border border-[#ff4f00]/20 rounded-full text-[#ff4f00] text-sm font-medium mb-4">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Build Your Fine-Tuned AI Sales Agent For Revenue Acceleration
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-[#ff4f00] to-orange-400 bg-clip-text text-transparent">
                  {clientProfile?.full_name || 'Demo Niyaz'}
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
                This is where strategic intelligence transforms into autonomous revenue generation.
                Each phase is a critical milestone in building your most sophisticated sales asset.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Banner Header - covers entire viewport width */}
      <div className="relative w-full mb-0 overflow-hidden !pb-0">
        {/* Banner Image Container - Just the banner image */}
        <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 !pb-0">
          <Image
            src="https://assets.modernmarketinghouse.com/Modern-Marketing-House-Banner.svg"
            alt="Modern Marketing House Banner"
            width={900}
            height={220}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Professional Gap After Header */}
      <div className="py-16">
        {/* Strategic Intelligence Framework */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Fine-Tuning Icon */}
          <div className="flex justify-center mb-8">
            <Image
              src="https://assets.modernmarketinghouse.com/Fine-Tuning-icon.svg"
              alt="Fine-Tuning Icon"
              width={200}
              height={200}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
            />
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Strategic Intelligence Framework</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The symbiotic relationship between your sales expertise and our engineering precision
              creates an unstoppable revenue-generating machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Your Strategic Input Card */}
            <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#ff4f00]/30" style={{backgroundColor: '#f0f0f2'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff4f00]/5 to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-20 h-20 bg-[#FF4F00] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Strategic Input</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Sales instincts, market knowledge, and revenue objectives become the agent's core intelligence
                </p>
                <div className="mt-6">
                  <div className="inline-flex items-center text-[#ff4f00] font-semibold text-sm">
                    <span>Your Expertise</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Engineering Process Card */}
            <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#ff4f00]/30" style={{backgroundColor: '#f0f0f2'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff4f00]/5 to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-20 h-20 bg-[#FF4F00] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Engineering Process</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Advanced AI architectures transform your expertise into scalable, autonomous sales capabilities
                </p>
                <div className="mt-6">
                  <div className="inline-flex items-center text-[#ff4f00] font-semibold text-sm">
                    <span>AI Engineering</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Multiplication Card */}
            <div className="group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#ff4f00]/30" style={{backgroundColor: '#f0f0f2'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff4f00]/5 to-orange-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-20 h-20 bg-[#FF4F00] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue Multiplication</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  The result: 24/7 revenue generation that scales your best sales performance infinitely
                </p>
                <div className="mt-6">
                  <div className="inline-flex items-center text-[#ff4f00] font-semibold text-sm">
                    <span>Infinite Scale</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Engineering Pipeline */}
      <div className="py-16" style={{backgroundColor: '#f0f0f2'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready To Build Your AI Sales Agent?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Never have building AI sales agent for your business with deep sales and marketing revenue goal installed architecture.
            </p>
          </div>

          {/* Horizontal Phase Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Phase 1: Intelligence Capture */}
            <div className="relative">
              <div id="onboarding-section" className="absolute -top-4 left-4 z-10">
                <div className="bg-[#ff4f00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Phase 1
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-[#ff4f00] mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Onboarding</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Provide the blueprint for your agent. Complete these steps to kick off the engineering process. This is where your sales genius becomes algorithmic power.
                </p>
                <div className="space-y-4">
                  {phase1Checklist.map((item, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-gray-700">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 2: Engineering & Development */}
            <div className="relative">
              <div className="absolute -top-4 left-4 z-10">
                <div className="bg-[#ff4f00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Phase 2
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-[#ff4f00] mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Neural Architecture Engineering</h3>
                </div>
                <p className="text-gray-600">
                  Your intelligence undergoes sophisticated transformation. Our proprietary algorithms analyze every nuance of your sales approach.
                </p>
              </div>
            </div>

            {/* Phase 3: Deployment & Revenue Generation */}
            <div className="relative">
              <div className="absolute -top-4 left-4 z-10">
                <div className="bg-[#ff4f00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Phase 3
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-[#ff4f00] mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Autonomous Revenue Operations</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Upon successful completion of the engineering phase, your agent will be deployed and will begin actively working for your business.
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <strong>Keep Agent Smart:</strong> To update your agent's knowledge, please email us first.
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Share Insights:</strong> See a conversation that could be improved?{' '}
                    <a href="mailto:hi@modernmarketinghouse.com" className="text-[#ff4f00] hover:underline">
                      Email us
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#ff4f00] rounded-full shadow-lg"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff4f00] to-orange-400 rounded"></div>
              <div className="w-4 h-4 bg-orange-300 rounded-full shadow-lg"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-300 to-orange-200 rounded"></div>
              <div className="w-4 h-4 bg-orange-200 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
