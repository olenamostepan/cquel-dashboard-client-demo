"use client";

import React from "react";
import { Check, FileText, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileCount: number;
  userEmail: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  fileCount, 
  userEmail 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Documents uploaded successfully!
          </h2>
          <p className="text-gray-600">
            We&apos;ll create comprehensive brief(s) and notify you when it&apos;s ready for review (typically 2-3 business days).
          </p>
        </div>

        {/* Status Information Box */}
        <div className="mx-8 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  ✅ {fileCount} files processed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  📧 Updates will be sent to {userEmail}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* What you can do now */}
        <div className="px-8 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What you can do now</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              Check your email for our confirmation message
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              We&apos;ll send progress updates over the next few days
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              No need to check back - we&apos;ll notify you when your briefs are ready
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              Briefs will be created based on your Net Zero plan analysis
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-200">
          <Button 
            variant="primary" 
            onClick={onClose}
            className="w-full"
          >
            Return to Briefs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
