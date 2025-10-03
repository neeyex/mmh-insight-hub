// src/app/components/plans/HustlerPlan.tsx

const FeatureListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
    <span>{children}</span>
  </li>
);

const HustlerPlan = () => {
  return (
    <div className="bg-orange border border-border rounded-2xl p-8 shadow-sm">
      <div className="flex justify-between items-start pb-4 mb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-foreground">The Hustler Plan</h2>
          <p className="text-sm text-muted-foreground">The Modern Receptionist</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">$69<span className="text-base font-normal text-muted-foreground">/month</span></p>
          <p className="text-xs text-muted-foreground mt-1">Replaces 1 Virtual Assistant (~$400/mo)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase text-primary mb-3">Core Architecture</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <FeatureListItem>1 Basic Agent</FeatureListItem>
            <FeatureListItem>Build Type: Template-Based Build</FeatureListItem>
            <FeatureListItem>UX Design: Template Design</FeatureListItem>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-primary mb-3">Intelligence & Performance</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <FeatureListItem>Core Intelligence: Basic Fine-Tuning</FeatureListItem>
            <FeatureListItem>Strategic Scope: Core Lead Capture</FeatureListItem>
            <FeatureListItem>Up to 50 Monthly Interactions</FeatureListItem>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase text-primary mb-3">Operations & Support</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <FeatureListItem>1 Pre-built Automation Workflow</FeatureListItem>
            <FeatureListItem>Support: Email</FeatureListItem>
            <FeatureListItem>Agent Engineering: 3-5 business days</FeatureListItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HustlerPlan;
