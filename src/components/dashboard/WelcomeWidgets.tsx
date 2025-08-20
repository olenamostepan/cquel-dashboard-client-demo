import React from "react";
import Card from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";

export interface WelcomeWidgetsProps {
  onViewMeetings?: () => void;
  onViewSurveys?: () => void;
}

export const WelcomeWidgets: React.FC<WelcomeWidgetsProps> = ({ onViewMeetings, onViewSurveys }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card elevated className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-black text-[var(--text-primary)]">Your next meeting</div>
          <a
            className="text-[14px] font-extrabold cursor-pointer"
            style={{ color: "var(--link-blue)" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewMeetings?.();
            }}
          >
            View all
          </a>
        </div>
        <div className="mt-3 rounded-lg border border-[var(--border-light)] bg-[var(--page)] p-5">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: icon on top, text below */}
            <div className="flex flex-col">
              <span className="text-[28px] leading-none">⏰</span>
              <div className="mt-4">
                <div className="text-[14px] text-[var(--text-secondary)]">Date & Time:</div>
                <div className="mt-2 text-[20px] font-extrabold text-[var(--text-primary)]">13:00 – 14:00</div>
                <div className="mt-1 text-[16px] font-semibold text-[var(--text-primary)]">21 Aug 2025</div>
              </div>
            </div>

            {/* Right: supplier + project */}
            <div className="min-w-0">
              <div className="text-[14px] text-[var(--text-secondary)]">Supplier:</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="text-[16px] font-bold text-[var(--text-primary)] truncate">Green Energy Solutions</div>
                <ExternalLink size={18} className="text-[var(--text-tertiary)] shrink-0" />
              </div>
              <div className="my-3 h-px bg-[var(--border-light)]" />
              <div className="text-[14px] text-[var(--text-secondary)]">Project:</div>
              <div className="mt-1 text-[14px] font-bold text-[var(--text-primary)] truncate">Hamburg Office HVAC</div>
              <div className="mt-1 text-[14px] text-[var(--text-secondary)] truncate">Hamburg • TechCorp</div>
            </div>
          </div>
        </div>
      </Card>

      <Card elevated className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-[20px] font-black text-[var(--text-primary)]">Your next survey</div>
          <a
            className="text-[14px] font-extrabold cursor-pointer"
            style={{ color: "var(--link-blue)" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewSurveys?.();
            }}
          >
            View all
          </a>
        </div>
        <div className="mt-3 rounded-lg border border-[var(--border-light)] bg-[var(--page)] p-5">
          <div className="grid grid-cols-2 gap-6">
            {/* Left: icon on top, text below */}
            <div className="flex flex-col">
              <span className="text-[28px] leading-none">⏰</span>
              <div className="mt-4">
                <div className="text-[14px] text-[var(--text-secondary)]">Date & Time:</div>
                <div className="mt-2 text-[20px] font-extrabold text-[var(--text-primary)]">9:00 – 11:00</div>
                <div className="mt-1 text-[16px] font-semibold text-[var(--text-primary)]">25 Aug 2025</div>
              </div>
            </div>

            {/* Right: supplier + project */}
            <div className="min-w-0">
              <div className="text-[14px] text-[var(--text-secondary)]">Supplier:</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="text-[16px] font-bold text-[var(--text-primary)] truncate">EcoTech Systems</div>
                <ExternalLink size={18} className="text-[var(--text-tertiary)] shrink-0" />
              </div>
              <div className="my-3 h-px bg-[var(--border-light)]" />
              <div className="text-[14px] text-[var(--text-secondary)]">Project:</div>
              <div className="mt-1 text-[14px] font-bold text-[var(--text-primary)] truncate">Munich Warehouse Solar</div>
              <div className="mt-1 text-[14px] text-[var(--text-secondary)] truncate">Munich • LogiCorp</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeWidgets;


