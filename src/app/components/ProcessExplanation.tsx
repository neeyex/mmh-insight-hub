'use client';

import React from 'react';

const ProcessExplanation = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 mb-12">
      <div className="bg-gradient-to-r from-slate-100/80 to-gray-200/60 border border-gray-300/50 rounded-2xl p-8 sm:p-10 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center shadow-md">
            {/* Using a larger, self-contained SVG for better compatibility */}
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">What Happens When You Begin Any of the 3 Blueprint Steps:</h3>
        
        {/* Divider line */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-px bg-gray-300"></div>
        </div>
        
        <div className="space-y-6 text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            When you begin any of the three blueprint steps by clicking the button of the corresponding blueprint section - whether you click{' '}
            <a href="/dashboard/fine-tuning" className="font-semibold text-white bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded-full inline-block transition-transform duration-200 ease-in-out hover:scale-105 text-sm">Start Proprietary Fine-Tuning</a>,{' '}
            <a href="/dashboard/data-sources" className="font-semibold text-white bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded-full inline-block transition-transform duration-200 ease-in-out hover:scale-105 text-sm">Upload Your Knowledge Base</a>, or{' '}
            <a href="/dashboard/connect-tools" className="font-semibold text-white bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded-full inline-block transition-transform duration-200 ease-in-out hover:scale-105 text-sm">Connect Your Tools</a> - you'll enter our proprietary questioning system facilitated by our partner Tally.so. The data you provide will then be fed to our securely encrypted server, where our algorithm extracts deeper data for the AI sales agent to understand and behave for your brand with built-in context awareness of your business market and human psychology.
          </p>
          <div className="mt-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">The Experience You Can Expect:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                This isn't a simple data form. You'll experience a series of strategically designed questions that feel effortless but are engineered with advanced extraction technology.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Here's the Intelligence Behind It:</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                Each question is specifically crafted so our AI system can extract deeper behavioral data from your simpler responses. While you provide straightforward answers, our algorithms are simultaneously analyzing multiple layers of your decision-making patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessExplanation;
