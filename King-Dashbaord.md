/* King's Dashboard: Your Admin Playbook
This document is your official guide to managing the client journey from your Supabase dashboard. Every change you make here will be reflected in real-time in your client's private Command Center.

The agent_status Table: Your Project Control Panel
This table is the heart of your operation. It tracks the real-time progress of every client's agent build using two distinct sets of data: the client's onboarding progress and your internal engineering progress.

Part 1: Tracking Client Onboarding (step columns)
The step1_status, step2_status, and step3_status columns are used to automatically track the client's completion of their Phase 1 blueprint tasks.

How it Works:

When a client submits the "Fine-Tuning" Tally form, a webhook will automatically update step1_status to completed.

This process repeats for the "Data Sources" (step2_status) and "Connect Tools" (step3_status) forms.

Client's View: The checklist on the main /dashboard page will automatically check off these items as the client completes them, providing instant positive feedback.

Part 2: Managing Your Engineering Workflow (engineering columns)
The engineering_phase and engineering_status columns are what you, the admin, will manually update to control the client's view of your internal progress (Phases 2-5).

Initial State: Phase 1 - Blueprint & Strategy
This is the default state for every new client.

engineering_phase: Set to Blueprint & Strategy

engineering_status: Set to Waiting for You

Once all three step columns are marked as completed by the Tally webhooks, it's your turn to begin the engineering work.

Your Workflow: Updating the Phases
To start Phase 2 (Core Intelligence Engineering):

Change engineering_phase to Core Intelligence Engineering

Change engineering_status to In Progress

Client's View: The "Agent Status" page will now show Phase 1 as "Completed" and Phase 2 as "In Progress."

To start Phase 3 (Integration & Testing):

Change engineering_phase to Integration & Testing

Change engineering_status to In Progress

Client's View: The "Agent Status" page will now show Phase 2 as "Completed" and Phase 3 as "In Progress."

To start Phase 4 (Live Deployment - The Handover):

Change engineering_phase to Live Deployment

Change engineering_status to Completed

In the deployment_details column, paste the JSON with the agent's code snippet.

Client's View: The /dashboard/deployment page will transform to show the final "Your Agent is Live" view.

The monthly_lead_report Table: Your Value Delivery System
This table is where you will deliver the tangible results for your MVP analytics.

How to Add a New Lead Report:
At the end of each month for your Growth and Professional clients, you will manually add new rows to this table for each significant interaction their agent had.

Click the "Insert row" button.

client_id: Select the correct client from the dropdown.

reporting_month: Enter the first day of the month you're reporting on (e.g., 2025-09-01).

lead_name: Enter the name of the prospect.

status: Enter one of the key statuses: Converted, Nurturing, Disqualified, or Ghosted.

assessment: This is where you provide your expert analysis.

Good Example: "Agent successfully navigated complex pricing objections and booked a demo. This lead is highly qualified."

Great Example: "Agent identified that this lead's budget was too small and correctly disqualified them, saving your sales team an estimated 2 hours of wasted time."

Client's View: The /dashboard/analytics page will automatically populate with this new data, creating a rich, impressive report that proves the agent's value.*/