"use client";

import React from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

interface CoBrandingProps {
  customerName: string;
  customerLogoSrc?: string;
}



const CoBrandingHeader: React.FC<CoBrandingProps> = ({ customerName, customerLogoSrc }) => {
  return (
    <div className="w-full bg-white border-b border-[var(--border-light)]">
      <div className="container-page flex items-center justify-between py-4">
        {/* Left cluster: Logo → Powered by CQuel → Title */}
        <div className="flex items-center gap-4">
          {/* Customer logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
              src={customerLogoSrc || "/logos/Strategy&_logo.svg.png"}
              alt={`${customerName} logo`}
              className="h-[32px] w-auto object-contain"
            onError={(e) => {
              // Fallback to a simple placeholder if PNG fails
              (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA2OCA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHJ4PSI4IiBmaWxsPSIjRjVGN0ZCIi8+CiAgPHRleHQgeD0iMzQiIHk9IjQyIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2NjY2Ij5TPC90ZXh0Pgo8L3N2Zz4K";
            }}
          />
          <div className="inline-flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--page)] border border-[var(--border-light)] px-4 h-10">
              <span className="text-[12px] text-[var(--text-secondary)]">Powered by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/cquel logo.svg"
                alt="CQuel"
                className="h-5 w-auto"
                onError={(e) => {
                  // Fallback to a simple text-based logo if SVG fails
                  (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA2MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8dGV4dCB4PSIwIiB5PSIxNSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzBFN0M2NiI+Q1F1ZWw8L3RleHQ+Cjwvc3ZnPgo=";
                }}
              />
            </div>
            <div className="text-[var(--text-primary)] font-extrabold" style={{ fontSize: "var(--text-h5)", lineHeight: "32px" }}>
              Projects Dashboard
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary">Start new project</Button>
          <Avatar name="Alex Johnson" size={36} />
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC<CoBrandingProps> = (props) => {
  return (
    <header className="sticky top-0 z-50">
      <CoBrandingHeader {...props} />
    </header>
  );
};

export default Header;


