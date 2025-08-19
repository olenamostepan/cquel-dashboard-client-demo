import React from "react";
import { Search, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Statistics Cards Component for Tenders
const TenderStatisticsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">12</div>
          <div className="text-[14px] text-[var(--text-secondary)]">Active tenders</div>
        </div>
      </Card>
      
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">⏰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">5.3</div>
          <div className="text-[14px] text-[var(--text-secondary)]">days avg response</div>
          <div className="text-[12px] text-[var(--text-tertiary)] mt-1">Last 30 days</div>
        </div>
      </Card>
      
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">78%</div>
          <div className="text-[14px] text-[var(--text-secondary)]">response rate</div>
          <div className="text-[12px] text-[var(--text-tertiary)] mt-1">Industry avg: 65%</div>
        </div>
      </Card>
    </div>
  );
};

// Responsibility Badge Component (reused from AllProjectsView)
const ResponsibilityBadge: React.FC<{ type: 'your' | 'cquel' | 'supplier' }> = ({ type }) => {
  const styles = {
    your: {
      background: '#fdeee9',
      text: '#e9571f',
      border: '#fbddd2'
    },
    cquel: {
      background: '#eaf8f1',
      text: '#126e53',
      border: '#d4f0e3'
    },
    supplier: {
      background: '#e8f1f8',
      text: '#004b75',
      border: '#d2e3f2'
    }
  };

  const labels = {
    your: 'Your Action',
    cquel: "CQuel's Action",
    supplier: "Supplier's Action"
  };

  const style = styles[type];
  
  return (
    <span
      className="px-3 py-1 rounded-full text-[12px] font-bold border"
      style={{
        backgroundColor: style.background,
        color: style.text,
        borderColor: style.border
      }}
    >
      {labels[type]}
    </span>
  );
};

// Tender Card Component
const TenderCard: React.FC<{
  projectName: string;
  location: string;
  responsibility: 'your' | 'cquel' | 'supplier';
  status: string;
  actionButton: string;
  solutionType: 'led' | 'solar' | 'heat-pumps' | 'ev-charging';
}> = ({ projectName, location, responsibility, status, actionButton, solutionType }) => {
  const getSolutionIcon = (type: string) => {
    switch (type) {
      case 'led':
        return '/assets/choose supplier.svg';
      case 'solar':
        return '/assets/publishing.svg';
      case 'heat-pumps':
        return '/assets/pricing.svg';
      case 'ev-charging':
        return '/assets/New project.svg';
      default:
        return '/assets/choose supplier.svg';
    }
  };

  return (
    <div 
      className="flex items-center justify-between p-4 border border-[var(--border-default)] rounded-lg bg-white"
      style={{ height: "72px" }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Solution Type Icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <img
            src={getSolutionIcon(solutionType)}
            alt={solutionType}
            className="w-8 h-8 object-contain"
          />
        </div>
        
        {/* Project Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[14px] font-bold text-[var(--text-primary)]">{projectName}</span>
            <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
          </div>
          <div className="text-[12px] text-[var(--text-secondary)]">{location}</div>
        </div>
        
        {/* Responsibility Badge */}
        <div className="flex items-center">
          <ResponsibilityBadge type={responsibility} />
        </div>
        
        {/* Status */}
        <div className="text-[14px] text-[var(--text-primary)] min-w-[120px]">
          {status}
        </div>
      </div>
      
      {/* Action Button */}
      <div className="ml-4">
        <Button variant="neutral" size="sm">
          {actionButton}
        </Button>
      </div>
    </div>
  );
};

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search Input */}
        <div className="relative" style={{ width: "200px" }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-tertiary)] w-4 h-4" />
          <input
            type="text"
            placeholder="Search tenders..."
            className="w-full pl-10 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            style={{ 
              height: "40px", 
              padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
              borderRadius: "var(--Distance-8, 8px)",
              border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
              background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
            }}
          />
        </div>
        
        {/* Filter Dropdown */}
        <div className="flex gap-4">
          <select 
            className="text-[14px] font-bold focus:outline-none" 
            style={{ 
              display: "flex",
              width: "148px",
              padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              borderRadius: "var(--Distance-8, 8px)",
              border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
              background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
            }}
          >
            <option value="">Filter by: Next Step</option>
            <option value="needs-attention">Needs Attention</option>
            <option value="active">Active Tenders</option>
            <option value="complete">Tendering Complete</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Needs Attention Section
const NeedsAttentionSection: React.FC = () => {
  const tenders = [
    {
      projectName: "Stuttgart Office LED",
      location: "Berlin • AroundTown",
      responsibility: "your" as const,
      status: "Meeting with Supplier scheduled on 13:00 25 Aug 2025",
      actionButton: "View Supplier Info",
      solutionType: "led" as const
    },
    {
      projectName: "Birmingham Warehouse Solar",
      location: "Birmingham • LogisPark",
      responsibility: "your" as const,
      status: "Choosing Supplier",
      actionButton: "Go to Tender results",
      solutionType: "solar" as const
    },
    {
      projectName: "Edinburgh Data Centre LED",
      location: "Edinburgh • ScotTech",
      responsibility: "your" as const,
      status: "Scheduling a meeting with Supplier",
      actionButton: "View Supplier Info",
      solutionType: "led" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Needs Attention</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} />
        ))}
      </div>
    </div>
  );
};

// Active Tenders Section
const ActiveTendersSection: React.FC = () => {
  const tenders = [
    {
      projectName: "Liverpool Office EV Charging",
      location: "Liverpool • MerseyCorp",
      responsibility: "supplier" as const,
      status: "Gathering Responses",
      actionButton: "View Progress",
      solutionType: "ev-charging" as const
    },
    {
      projectName: "Bristol Retail Heat Pumps",
      location: "Bristol • GreenSpace",
      responsibility: "supplier" as const,
      status: "Preparing Quotes",
      actionButton: "View Progress",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Active Tenders</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} />
        ))}
      </div>
    </div>
  );
};

// Tendering Complete Section
const TenderingCompleteSection: React.FC = () => {
  const tenders = [
    {
      projectName: "Newcastle Facility Solar",
      location: "Newcastle • IndustrialPark",
      responsibility: "your" as const,
      status: "Meeting with Supplier happened on 25 Apr 2025",
      actionButton: "Go to Tender results",
      solutionType: "solar" as const
    },
    {
      projectName: "Stuttgart Office Heat Pumps",
      location: "Berlin • AroundTown",
      responsibility: "your" as const,
      status: "Meeting with Supplier happened on 1 May 2025",
      actionButton: "Go to Tender results",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Tendering Complete</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} />
        ))}
      </div>
    </div>
  );
};

export const TendersView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Statistics */}
        <div className="lg:col-span-2">
          <TenderStatisticsCards />
        </div>
        
        {/* Right side: Meeting Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[var(--border-light)] rounded-lg shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] p-5">
            <div className="flex items-start justify-between">
              <div className="text-[20px] font-extrabold text-[var(--text-primary)]">Your next meeting</div>
              <a
                className="text-[14px] font-extrabold cursor-pointer"
                style={{ color: "var(--link-blue)" }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
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
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[var(--text-primary)] font-extrabold mb-6" style={{ fontSize: "var(--text-h5)" }}>
          All Tenders
        </h2>
        <SearchFilterBar />
        
        <NeedsAttentionSection />
        <ActiveTendersSection />
        <TenderingCompleteSection />
      </div>
    </div>
  );
};

export default TendersView;
