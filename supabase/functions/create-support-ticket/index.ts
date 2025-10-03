// supabase/functions/create-support-ticket/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { corsHeaders } from "../_shared/cors.ts";
import { sendAdminNotification } from "../_shared/sendgrid-client.ts";

// This is the main function that runs when a client submits a new support ticket.
serve(async (req) => {
  // Handle preflight requests for CORS, a standard security requirement.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get secrets from our environment variables.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    // Get the ticket details (subject and message) from the request body.
    const { subject, message } = await req.json();
    if (!subject || !message) {
      throw new Error("Subject and message are required.");
    }

    // Create a Supabase admin client. This client can bypass RLS to perform secure operations.
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        // This is important for security when using the admin client.
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Securely get the logged-in user who is making this request.
    // The browser client passes the user's JWT in the Authorization header.
    const { data: { user } } = await supabaseAdmin.auth.getUser(req.headers.get('Authorization')!.replace('Bearer ', ''));
    if (!user) {
      throw new Error("User not found. Authentication required.");
    }
    const clientId = user.id;
    const clientEmail = user.email;

    // --- Core Logic ---

    // 1. Insert the new ticket into our 'support_tickets' table.
    // The 'ticket_id' is a SERIAL, so the database will automatically assign the next number.
    const { data: newTicket, error: insertError } = await supabaseAdmin
      .from('support_tickets')
      .insert({
        client_id: clientId,
        subject: subject,
        message: message,
        status: 'Open',
      })
      .select('ticket_id') // We ask the database to return the new ticket_id
      .single();

    if (insertError) throw insertError;
    
    const ticketId = newTicket.ticket_id;

    // 2. Send a confirmation email to the client.
    const clientEmailSubject = `[MMH Support] Your Ticket #${ticketId} has been received`;
    const clientEmailBody = `
      <p>Hi there,</p>
      <p>This is an automated confirmation that we have received your support request regarding "${subject}".</p>
      <p>Your Ticket ID is: <strong>MMH-${ticketId}</strong></p>
      <p>A member of our team will review your request and get back to you as soon as possible. Thank you for your patience.</p>
      <p>Best,<br>The Modern Marketing House Team</p>
    `;

    // We'll re-use our powerful admin notification helper, but send it to the client.
    await sendAdminNotification(clientEmailSubject, clientEmailBody, clientEmail || '');


    // 3. Send an alert email to you, the admin.
    const adminEmailSubject = `[ACTION REQUIRED] New Support Ticket #${ticketId} from ${clientEmail}`;
    const adminEmailBody = `
      <p>A new support ticket has been submitted.</p>
      <ul>
        <li><strong>Client Email:</strong> ${clientEmail}</li>
        <li><strong>Ticket ID:</strong> MMH-${ticketId}</li>
        <li><strong>Subject:</strong> ${subject}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p>Please review and respond in a timely manner.</p>
    `;

    await sendAdminNotification(adminEmailSubject, adminEmailBody);
    
    // --- End of Core Logic ---

    // Return a success response to the client's browser.
    return new Response(JSON.stringify({ success: true, ticketId: ticketId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    // If anything goes wrong, log the error and return an error response.
    console.error("Create Ticket Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
