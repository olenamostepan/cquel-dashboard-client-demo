"use client";

import React from "react";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import ResponsibilityBadge from "@/components/dashboard/ResponsibilityBadge";

interface DocumentUpload {
  id: string;
  files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
  }>;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  uploadedAt: Date;
  userId: string;
}

interface DocumentUploadsSectionProps {
  uploads: DocumentUpload[];
}

export const DocumentUploadsSection: React.FC<DocumentUploadsSectionProps> = ({ uploads }) => {
  if (uploads.length === 0) return null;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">
        Document Uploads ({uploads.length})
      </h2>
      <div className="space-y-2">
        {uploads.map((upload) => (
          <div 
            key={upload.id}
            className="flex items-center gap-4 p-4"
            style={{
              borderRadius: "var(--CornerRadius, 8px)",
              border: "1px solid var(--Colours-BorderLight, #F3F4F6)",
              background: "var(--Colours-ContainerBg, #FFF)"
            }}
          >
            {/* Document Icon */}
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
              <img
                src="/assets/Documents pack.svg"
                alt=""
                className="w-14 h-14 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/heat pumps.svg";
                }}
              />
            </div>
            
            {/* Project Info */}
            <div className="flex-1 min-w-0 max-w-[200px] mr-32">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                  New Upload
                </div>
                <ExternalLink size={16} className="text-[var(--text-tertiary)] shrink-0" />
              </div>
              <div className="text-[12px] text-[var(--text-secondary)] truncate">
                Documents uploaded at {formatDate(upload.uploadedAt)}
              </div>
            </div>
            
            {/* Responsibility Badge */}
            <div className="w-[100px] mr-12 flex-shrink-0">
              <ResponsibilityBadge responsibility="cquel" />
            </div>
            
            {/* Status */}
            <div className="flex-1 min-w-0 max-w-[280px] mr-12">
              <div className="text-[14px] text-[var(--text-secondary)]">
                {upload.status === 'uploading' && 'Uploading...'}
                {upload.status === 'processing' && 'Processing'}
                {upload.status === 'completed' && 'Completed'}
                {upload.status === 'error' && 'Error'}
              </div>
              <div className="text-[12px] text-[var(--text-tertiary)]">
                File counts: {upload.files.length}
              </div>
            </div>
            
            {/* Three dots menu */}
            <div className="ml-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploadsSection;
