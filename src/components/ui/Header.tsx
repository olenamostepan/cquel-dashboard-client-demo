"use client";

import React from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

interface CoBrandingProps {
  customerName: string;
  customerLogoSrc?: string;
}

const BrowserBar: React.FC = () => {
  return (
    <div className="w-full bg-white border-b border-[var(--border-light)]">
      <div className="container-page flex items-center h-10 gap-3">
        {/* System dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></span>
        </div>
        {/* Tabs mock */}
        <div className="flex items-center gap-2 ml-2">
          <div className="h-7 px-3 rounded-md bg-[var(--border-light)] text-[12px] flex items-center text-[var(--text-secondary)]">
            <span className="w-3 h-3 mr-2 bg-[var(--text-tertiary)] rounded-sm"></span>
            CQuel – Projects
          </div>
          <div className="h-7 px-3 rounded-md text-[12px] flex items-center text-[var(--text-tertiary)] hover:bg-[var(--border-light)]">+
          </div>
        </div>
        {/* Address bar */}
        <div className="ml-auto flex items-center gap-2 min-w-[300px] flex-1 max-w-xl">
          <div className="flex-1 h-7 bg-[var(--border-light)] rounded-md border border-[var(--border-default)] px-3 text-[12px] text-[var(--text-secondary)] flex items-center">
            <span className="w-3 h-3 mr-2 rounded-sm bg-[var(--brand-primary)]"></span>
            cquel.io
          </div>
          <div className="w-7 h-7 rounded-md border border-[var(--border-default)] bg-white"></div>
          <div className="w-7 h-7 rounded-md border border-[var(--border-default)] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

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

export interface HeaderProps extends CoBrandingProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="sticky top-0 z-50">
      <CoBrandingHeader {...props} />
    </header>
  );
};

export default Header;


