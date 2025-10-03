    // supabase/functions/_shared/sendgrid-client.ts

    // This is our central, reusable function for sending all admin notification emails.
    export async function sendAdminNotification(subject: string, htmlContent: string) {
      const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
      if (!sendgridApiKey) {
        console.error('SendGrid API key not found.');
        return; // Don't block the process if sending email fails
      }

      const emailPayload = {
        personalizations: [
          {
            to: [
              { email: 'hi@modernmarketinghouse.com' },
              { email: 'ninayazvaz@gmail.com' }
            ],
            subject: subject
          }
        ],
        from: { email: 'notifications@modernmarketinghouse.com', name: 'MMH System Alert' },
        content: [
          {
            type: 'text/html',
            value: htmlContent
          }
        ]
      };

      try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Failed to send admin notification: ${response.status} ${errorBody}`);
        } else {
          console.log('Admin notification email sent successfully.');
        }
      } catch (error) {
        console.error('Error sending SendGrid email:', error);
      }
    }

    // NEW: This is our new, dedicated function for sending emails to clients.
    export async function sendClientNotification(recipientEmail: string, subject: string, htmlContent: string) {
        const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY');
        if (!sendgridApiKey) {
          console.error('SendGrid API key not found.');
          return;
        }
      
        const emailPayload = {
          personalizations: [{
            to: [{ email: recipientEmail }], // It uses the dynamic recipient email
            subject: subject,
          }],
          from: { email: 'support@modernmarketinghouse.com', name: 'MMH Support' }, // A more professional 'from' address
          content: [{
            type: 'text/html',
            value: htmlContent,
          }],
        };
      
        try {
          const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${sendgridApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
          });
      
          if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Failed to send client notification to ${recipientEmail}: ${response.status} ${errorBody}`);
          } else {
            console.log(`Client notification email sent successfully to ${recipientEmail}.`);
          }
        } catch (error) {
          console.error('Error sending SendGrid email:', error);
        }
      }
    

