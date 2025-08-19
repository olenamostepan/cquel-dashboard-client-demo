import React from "react";
import { Search, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import WelcomeWidgets from "./WelcomeWidgets";

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
  action: string;
  actionButton: string;
}> = ({ projectName, location, responsibility, status, action, actionButton }) => {
  return (
    <Card elevated className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px] font-bold text-[var(--text-primary)]">{projectName}</span>
            <ExternalLink className="w-4 h-4 text-[var(--text-tertiary)]" />
          </div>
          <div className="text-[14px] text-[var(--text-secondary)] mb-3">{location}</div>
          <div className="flex items-center gap-3 mb-3">
            <ResponsibilityBadge type={responsibility} />
          </div>
          <div className="text-[14px] text-[var(--text-primary)] mb-3">{status}</div>
          <div className="text-[12px] text-[var(--text-tertiary)]">{action}</div>
        </div>
        <div className="ml-4">
          <Button variant="neutral" size="sm">
            {actionButton}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  return (
    <div className="bg-white rounded-lg mb-6">
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
      action: "Your action required",
      actionButton: "View Supplier Info"
    },
    {
      projectName: "Birmingham Warehouse Solar",
      location: "Birmingham • LogisPark",
      responsibility: "your" as const,
      status: "Choosing Supplier",
      action: "Review supplier responses",
      actionButton: "Go to Tender results"
    },
    {
      projectName: "Edinburgh Data Centre LED",
      location: "Edinburgh • ScotTech",
      responsibility: "your" as const,
      status: "Scheduling a meeting with Supplier",
      action: "Coordinate meeting time",
      actionButton: "View Supplier Info"
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
      action: "Waiting for supplier action",
      actionButton: "View Progress"
    },
    {
      projectName: "Bristol Retail Heat Pumps",
      location: "Bristol • GreenSpace",
      responsibility: "supplier" as const,
      status: "Preparing Quotes",
      action: "Supplier preparing response",
      actionButton: "View Progress"
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
      action: "Tendering process completed",
      actionButton: "Go to Tender results"
    },
    {
      projectName: "Stuttgart Office Heat Pumps",
      location: "Berlin • AroundTown",
      responsibility: "your" as const,
      status: "Meeting with Supplier happened on 1 May 2025",
      action: "Tendering process completed",
      actionButton: "Go to Tender results"
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
          <WelcomeWidgets 
            onViewMeetings={() => {}} 
            onViewSurveys={() => {}}
          />
        </div>
      </div>
      
      <SearchFilterBar />
      
      <NeedsAttentionSection />
      <ActiveTendersSection />
      <TenderingCompleteSection />
    </div>
  );
};

export default TendersView;
