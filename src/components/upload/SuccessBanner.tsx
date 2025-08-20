"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SuccessBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
  fileCount: number;
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({ 
  isVisible, 
  onDismiss, 
  fileCount 
}) => {
  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div 
      className="mb-6 relative"
      style={{
        borderRadius: "var(--CornerRadius, 8px)",
        border: "1px solid var(--Colours-BorderBlue, #D2E3F2)",
        background: "var(--Colours-BgBlue, #E8F1F8)",
        display: "flex",
        padding: "var(--Distance-12, 12px) var(--Distance-16, 16px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--Distance-8, 8px)",
        alignSelf: "stretch"
      }}
    >
      <div className="text-[16px] font-bold text-[var(--text-primary)]">
        🎉 Documents uploaded successfully!
      </div>
      <div className="text-[14px] text-[var(--text-secondary)]">
        We&apos;ll create comprehensive brief(s) and notify you when it&apos;s ready for review (typically 2-3 business days).
      </div>
      <div className="space-y-1">
        <div className="text-[14px] text-[var(--text-secondary)]">✅ {fileCount} files processed</div>
        <div className="text-[14px] text-[var(--text-secondary)]">📧 Updates will be sent to your email</div>
      </div>
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 p-1 hover:bg-blue-100 rounded transition-colors"
      >
        <X className="w-4 h-4 text-blue-600" />
      </button>
    </div>
  );
};

export default SuccessBanner;
