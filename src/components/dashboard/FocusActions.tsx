import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Building2 } from "lucide-react";

interface ActionCardProps {
  title: string;
  project?: string;
  description?: string;
  cta: string;
  highlight?: boolean;
  iconSrc?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, project, description, cta, highlight, iconSrc }) => {
  return (
    <Card elevated className={highlight ? "p-6" : "p-6"} style={highlight ? {
      borderRadius: "var(--CornerRadius, 8px)",
      border: "1px solid var(--Colours-BorderGreen, #D4F0E3)",
      background: "var(--Colours-BgGreen, #EAF8F1)"
    } : undefined}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-start flex-grow">
          {/* Icon */}
          <div className="w-[56px] h-[56px] flex items-center justify-center mb-3">
            {iconSrc && (
              <img
                src={iconSrc}
                alt=""
                className="w-[56px] h-[56px] object-contain"
              />
            )}
          </div>
          <div className="text-[18px] font-bold text-[var(--text-primary)] mb-2">{title}</div>
          {description && (
            <div className="text-[14px] text-[var(--text-secondary)] mb-3">{description}</div>
          )}
                  {project && (
          <div className="text-[14px] text-[var(--text-secondary)] flex items-start gap-2 mb-3">
            <Building2 size={16} className="mt-0.5 text-[var(--text-tertiary)]" />
            <div className="flex flex-col">
              <span className="font-bold">{project.split(',')[0]}</span>
              <span className="text-[12px] font-normal">{project.split(',').slice(1).join(',').trim()}</span>
            </div>
          </div>
        )}
        </div>
        <div className="mt-auto pt-4">
          <Button variant={highlight ? "primary" : "neutral"} fullWidth>
            {cta}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const FocusActions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
      <h2 className="text-[var(--text-primary)] font-extrabold mb-6" style={{ fontSize: "var(--text-h5)" }}>
        Focus here now
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Choose Your Supplier"
            description="Review the qualified suppliers and their bids, then choose who you want to work with."
            project="Frankfurt Data Center LED, Frankfurt • DataFlow"
            cta="Go to tender results"
            highlight
            iconSrc="/assets/choose supplier.svg"
          />
          <ActionCard
            title="Publish Your Brief"
            description="Send your completed brief to suppliers and begin the tendering process"
            project="Birmingham Warehouse Solar, Birmingham • LogisPark"
            cta="Go to brief"
            iconSrc="/assets/publishing.svg"
          />
          <ActionCard
            title="Accept Pricing"
            description="Review the final pricing from your selected supplier and approve to proceed with the project"
            project="Leeds Retail HVAC, Leeds • ShopCentre"
            cta="View pricing"
            iconSrc="/assets/pricing.svg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            title="Start New Project"
            description="Upload your project documents and create a comprehensive brief ready for tendering"
            cta="Create new project"
            iconSrc="/assets/New project.svg"
          />
          <ActionCard
            title="Optimise Your Brief"
            description="Enhance your brief with additional details and technical specifications before publishing"
            project="Birmingham Warehouse Solar, Birmingham • LogisPark"
            cta="Optimise brief"
            iconSrc="/assets/optimising brief.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default FocusActions;


