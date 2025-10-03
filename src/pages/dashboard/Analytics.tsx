// src/pages/dashboard/Analytics.tsx - Converted to Vite/React Router

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image';
import { supabase } from '@/lib/supabase/client';

// This defines the structure of a single lead report item.
// Using TypeScript interfaces like this is a best practice for clarity.
interface LeadReport {
  id: string;
  lead_name: string;
  lead_company: string | null;
  status: string;
  assessment: string;
}

// Helper component for rendering the status badge in the table
const LeadStatusBadge = ({ status }: { status: string }) => {
    let bgColor, textColor;
    switch (status.toLowerCase()) {
      case 'converted':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'nurturing':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'disqualified':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      case 'ghosted':
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-700';
        break;
      default:
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
    }
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

export default function Analytics() {
  const navigate = useNavigate();
  const [leadReports, setLeadReports] = useState<LeadReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch all lead reports for the currently logged-in user.
      const { data, error } = await supabase
        .from('monthly_lead_report')
        .select('*')
        .eq('client_id', user.id)
        .order('reporting_month', { ascending: false }); // Show the newest reports first

      if (!error && data) {
        setLeadReports(data);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0a0a10] tracking-tight">
            Agent Performance Report
          </h1>
          <p className="mt-2 text-lg text-[#6f6f7e]">
            A summary of your agent's significant interactions and outcomes. This report is updated monthly.
          </p>
        </div>

        {/* Main Content: The Report Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {leadReports && leadReports.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Our Assessment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadReports.map((report: LeadReport) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-[#0a0a10]">{report.lead_name}</div>
                      <div className="text-sm text-[#6f6f7e]">{report.lead_company || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <LeadStatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#6f6f7e]">{report.assessment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // This is the placeholder shown if there are no reports yet.
            <div className="text-center p-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No reports available yet</h3>
              <p className="mt-1 text-sm text-gray-500">Your first performance report will appear here after your agent's first month of operation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
