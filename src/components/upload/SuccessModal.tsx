"use client";

import React from "react";
import { Check } from "lucide-react";
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
          <h2 className="text-gray-900 mb-2" style={{ fontSize: "20px", fontWeight: "800" }}>
            Documents uploaded successfully!
          </h2>
          <p className="text-gray-600" style={{ fontSize: "14px" }}>
            The CQuel team will analyze your Net Zero plans and supporting documents to create project briefs based on your specific requirements. Your briefs will be ready in 2-3 business days
          </p>
        </div>

        {/* Status Information Box */}
        <div className="mx-8 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                ✅ {fileCount} files processed
              </div>
              <div className="text-sm text-gray-700">
                📧 Updates will be sent to {userEmail}
              </div>
            </div>
          </div>
        </div>

        {/* What you can do now */}
        <div className="px-8 mb-8">
          <h3 className="text-gray-900 mb-4" style={{ fontSize: "16px", fontWeight: "700" }}>What you can do now</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
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
        <div className="px-8 pb-8 border-t border-gray-200">
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
