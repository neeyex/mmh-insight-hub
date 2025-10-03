// src/app/components/InfoCard.tsx
'use client';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard = ({ title, icon, children }: InfoCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-bold text-foreground flex items-center mb-4 text-lg">
        <span className="mr-3 text-primary">{icon}</span>
        {title}
      </h3>
      <div className="space-y-4 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
