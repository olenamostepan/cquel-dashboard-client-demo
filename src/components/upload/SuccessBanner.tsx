"use client";

import React, { useEffect } from "react";
import { X, FileText } from "lucide-react";

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
      className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
      style={{
        background: "var(--Colours-BgGreen, #EAF8F1)",
        border: "1px solid var(--Colours-BorderGreen, #D4F0E3)"
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-green-600" />
          <div className="text-sm text-gray-900">
            🎉 Documents uploaded successfully! We'll create comprehensive brief(s) and notify you when it's ready for review (typically 2-3 business days).
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-green-100 rounded transition-colors"
        >
          <X className="w-4 h-4 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default SuccessBanner;
