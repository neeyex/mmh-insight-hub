// src/pages/dashboard/Support.tsx - Converted to Vite/React Router

import { useState, useEffect, useCallback } from 'react';
import Image from '@/components/ui/Image';
import { supabase } from '@/lib/supabase/client';

// Define the structure of a support ticket for TypeScript
type Ticket = {
  id: string;
  ticket_id: number;
  subject: string;
  status: string;
  updated_at: string;
};

// This is the dedicated page for the Support & Ticketing System.
export default function Support() {
  // State variables to manage the form inputs
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // State variables to manage the form's status (loading, success, error)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // State to store the list of the user's existing tickets
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);

  // CORRECTED: The fetchTickets function is now wrapped in useCallback.
  // This is a best practice that ensures the function has a stable identity
  // across re-renders, preventing unnecessary re-executions of the useEffect hook.
  const fetchTickets = useCallback(async () => {
    setIsLoadingTickets(true);
    const { data, error } = await supabase
      .from('support_tickets')
      .select('id, ticket_id, subject, status, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
    } else if (data) {
      setTickets(data);
    }
    setIsLoadingTickets(false);
  }, []);

  // CORRECTED: The useEffect hook now correctly lists 'fetchTickets' as a dependency,
  // satisfying the rules of React Hooks.
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('You must be logged in to submit a ticket.');

      const { data, error: invokeError } = await supabase.functions.invoke('create-support-ticket', {
        body: { subject, message },
      });

      if (invokeError) {
        throw new Error(invokeError.message);
      }

      setSuccess(`Your ticket #${data.ticketId} has been submitted successfully. We'll be in touch shortly.`);
      setSubject('');
      setMessage('');

      await fetchTickets();

    // CORRECTED: Replaced the 'any' type with 'unknown' for better type safety.
    // This is a more modern and secure way to handle potential errors.
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 flex items-center justify-center bg-primary/10 rounded-3xl">
              <svg className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375a9.375 9.375 0 100-18.75 9.375 9.375 0 000 18.75zm0-8.25h.01M12 12.75v-3.75" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Support & Help Center
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Have a question or need assistance? Our team is here to help. Submit a new ticket below or track the status of your existing requests.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Create New Ticket Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Create a New Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                >
                  <option value="" disabled>Select a topic...</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Billing Question">Billing Question</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="Please describe your issue in detail..."
                ></textarea>
              </div>

              {/* Display Success or Error Messages */}
              {success && <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-200 rounded-lg">{success}</div>}
              {error && <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">{error}</div>}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-4 font-bold text-lg text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Existing Tickets Table */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Ticket History</h2>
            {isLoadingTickets ? (
              <p className="text-muted-foreground">Loading your tickets...</p>
            ) : tickets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-3 text-sm font-semibold text-muted-foreground">Ticket ID</th>
                      <th className="p-3 text-sm font-semibold text-muted-foreground">Subject</th>
                      <th className="p-3 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="p-3 text-sm font-semibold text-muted-foreground text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(ticket => (
                      <tr key={ticket.id} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                        <td className="p-3 font-medium text-foreground">MMH-{ticket.ticket_id}</td>
                        <td className="p-3 text-muted-foreground">{ticket.subject}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground text-right text-sm">
                          {new Date(ticket.updated_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">You have no open support tickets.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
