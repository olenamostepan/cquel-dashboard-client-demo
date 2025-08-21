"use client";

import React, { useState } from "react";

interface UserPlan {
  planName: string;
  creditsRemaining: number;
  totalCredits?: number;
  nextRenewal?: string;
}

interface PlanCreditsProps {
  userPlan: UserPlan;
  onUpgradeClick?: () => void;
}

const PlanCredits: React.FC<PlanCreditsProps> = ({ userPlan, onUpgradeClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Determine text color based on credit level
  const getCreditTextColor = (credits: number) => {
    if (credits > 10) return "text-[#4d5761]"; // Normal gray
    if (credits >= 5) return "text-[#e9571f]"; // Orange warning
    return "text-[#dc2626]"; // Red warning
  };

  const creditTextColor = getCreditTextColor(userPlan.creditsRemaining);

  return (
    <div className="relative">
      <div 
        className="flex flex-col gap-1 items-center justify-start cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={onUpgradeClick}
      >
        {/* Plan Badge */}
        <div className="flex flex-row gap-2.5 items-center justify-center px-1.5 py-0.5" style={{
          borderRadius: "32px",
          background: "var(--Colours-IconActive, #1C75BC)"
        }}>
          <div className="font-['Wix_Madefor_Display'] font-bold text-[#ffffff] text-[14px] whitespace-pre">
            {userPlan.planName}
          </div>
        </div>
        
        {/* Credits Text */}
        <div className="font-['Wix_Madefor_Display'] text-[#4d5761] text-[12px] whitespace-pre">
          <span className="font-normal">Credits left: </span>
          <span className="font-bold">{userPlan.creditsRemaining}</span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-[var(--border-light)] rounded-lg shadow-lg p-4 z-50 min-w-[280px]">
          <div className="space-y-3">
            {/* Plan Info */}
            <div>
              <div className="text-[16px] font-bold text-[var(--text-primary)] mb-1">
                {userPlan.planName} Plan
              </div>
              {userPlan.totalCredits && (
                <div className="text-[14px] text-[var(--text-secondary)]">
                  {userPlan.totalCredits - userPlan.creditsRemaining} of {userPlan.totalCredits} credits used
                </div>
              )}
            </div>
            
            {/* Credits Remaining */}
            <div className="text-[14px] text-[var(--text-secondary)]">
              <span className="font-bold">{userPlan.creditsRemaining}</span> credits remaining
            </div>
            
            {/* Next Renewal */}
            {userPlan.nextRenewal && (
              <div className="text-[14px] text-[var(--text-secondary)]">
                Renews: {userPlan.nextRenewal}
              </div>
            )}
            
            {/* Upgrade Button */}
            {onUpgradeClick && (
              <button 
                className="w-full mt-3 px-4 py-2 bg-[var(--brand-primary)] text-white rounded-md text-[14px] font-bold hover:brightness-[0.95] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpgradeClick();
                }}
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCredits;
