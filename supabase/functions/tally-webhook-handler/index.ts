// supabase/functions/paddle-webhook-handler/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { corsHeaders } from '../_shared/cors.ts'
// UPDATED: We now import our shared email function.
import { sendAdminNotification } from '../_shared/sendgrid-client.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const paddleApiKey = Deno.env.get('PADDLE_API_KEY')

    if (!supabaseUrl || !supabaseServiceKey || !paddleApiKey) {
      throw new Error('Missing environment variables')
    }

    // TODO: Add Paddle signature verification here for production security

    const payload = await req.json()

    if (payload.event_type === 'subscription.created') {
      const subscriptionData = payload.data
      const customerId = subscriptionData.customer_id
      const planName = subscriptionData.items[0].price.description || 'Unknown Plan'
      const paddleSubscriptionId = subscriptionData.id

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

      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        email_confirm: true,
      });
      if (authError) throw authError;
      const newUserId = authData.user.id;

      // Send password reset email using the new API
      const { error: resetError } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
        redirectTo: `${Deno.env.get('SUPABASE_URL')}/auth/v1/verify?redirect_to=http://localhost:8080/update-password`,
      });
      if (resetError) throw resetError;

      const { error: clientError } = await supabaseAdmin.from("clients").insert({
        id: newUserId,
        full_name: fullName,
        email: email,
        plan_name: planName,
        paddle_subscription_id: paddleSubscriptionId,
        subscription_status: 'active'
      });
      if (clientError) throw clientError;

      const { error: statusError } = await supabaseAdmin.from("agent_status").insert({ client_id: newUserId });
      if (statusError) throw statusError;

      const { error: blueprintError } = await supabaseAdmin.from("agent_blueprints").insert({ client_id: newUserId });
      if (blueprintError) throw blueprintError;
      
      // --- NEW: Send Admin Notification for New Client ---
      const subject = `[MMH NEW CLIENT] ${fullName} has subscribed!`;
      const htmlContent = `
        <h2>🎉 New Client Subscription</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Plan:</strong> ${planName}</p>
        <p>Their account and project have been automatically created. They have been sent the welcome email to set their password.</p>
      `;
      await sendAdminNotification(subject, htmlContent);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Paddle Webhook Error:', errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
