// supabase/functions/paddle-webhook-handler/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { corsHeaders } from "../_shared/cors.ts";

// This is the main function that runs when the webhook is called
serve(async (req) => {
  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get secrets from environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const paddleApiKey = Deno.env.get("PADDLE_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey || !paddleApiKey) {
      throw new Error("Missing environment variables");
    }

    // TODO: Add Paddle signature verification here for production security

    const payload = await req.json();

    // We only care about the 'subscription.created' event
    if (payload.event_type === "subscription.created") {
      
      const subscriptionData = payload.data;
      const customerId = subscriptionData.customer_id;
      const planName = subscriptionData.items[0].price.description || 'Default Plan Name';
      const paddleSubscriptionId = subscriptionData.id;

      // --- Fetch customer details from Paddle API ---
      const paddleResponse = await fetch(`https://api.paddle.com/customers/${customerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paddleApiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!paddleResponse.ok) {
        throw new Error(`Failed to fetch customer from Paddle: ${await paddleResponse.text()}`);
      }

      const customerData = await paddleResponse.json();
      const email = customerData.data.email;
      const fullName = customerData.data.name;
      
      // Create a Supabase admin client
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      
      // --- CORRECTED LOGIC: Use the inviteUserByEmail flow ---
      // This is the standard, professional way to onboard a new user.
      const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          // This explicitly tells Supabase to use our secure callback route in the email link.
          redirectTo: 'http://localhost:3000/auth/callback', 
        }
      );
      if (inviteError) throw inviteError;
      const newUserId = inviteData.user.id;

      // --- The rest of the logic remains the same ---

      // Create a record in our 'clients' table
      const { error: clientError } = await supabaseAdmin.from("clients").insert({
        id: newUserId,
        full_name: fullName,
        email: email,
        plan_name: planName,
        paddle_subscription_id: paddleSubscriptionId,
        subscription_status: 'active'
      });
      if (clientError) throw clientError;

      // Create a corresponding record in our 'agent_status' table
      const { error: statusError } = await supabaseAdmin.from("agent_status").insert({
        client_id: newUserId
      });
      if (statusError) throw statusError;
    }

    // Return a success response to Paddle
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Webhook Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
