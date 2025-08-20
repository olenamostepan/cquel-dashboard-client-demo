import React, { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ResponsibilityBadge from "./ResponsibilityBadge";
import UploadModal from "@/components/upload/UploadModal";
import SuccessModal from "@/components/upload/SuccessModal";
import SuccessBanner from "@/components/upload/SuccessBanner";
import DocumentUploadsSection from "@/components/upload/DocumentUploadsSection";

// Brief Interface
interface Brief {
  id: string;
  name: string;
  location: string;
  type: 'HVAC' | 'Solar PV' | 'LED' | 'EV Charging';
  status: 'optimised' | 'generated' | 'published';
  courtStatus?: 'your' | 'cquel' | 'supplier';
  timestamp: string;
  action?: string;
}

// Briefs Metrics Section
const BriefsMetricsSection: React.FC<{ onStartNewProject: () => void }> = ({ onStartNewProject }) => {
  return (
    <div className="flex gap-6 mb-8">
      {/* Generated Briefs */}
      <Card elevated className="p-6" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">📝</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">12</div>
          <div className="text-[14px] text-[var(--text-secondary)]">generated briefs</div>
        </div>
      </Card>
      
      {/* Optimised Briefs */}
      <Card elevated className="p-6" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">📈</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">78%</div>
          <div className="text-[14px] text-[var(--text-secondary)]">optimised briefs</div>
        </div>
      </Card>
      
      {/* Published Briefs */}
      <Card elevated className="p-6" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">✅</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">5.3</div>
          <div className="text-[14px] text-[var(--text-secondary)]">published briefs</div>
        </div>
      </Card>
      
      {/* Creating Brief CTA */}
      <Card elevated className="p-6" style={{
        width: "450px",
        background: "var(--Colours-BgGreen, #EAF8F1)",
        border: "1px solid var(--Colours-BorderGreen, #D4F0E3)"
      }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-[18px] font-bold text-[var(--text-primary)] mb-2">Creating Brief</div>
          <div className="text-[14px] text-[var(--text-secondary)] mb-4 flex-grow">
            Upload your project documents to generate a brief ready for tendering
          </div>
          <Button 
            variant="primary" 
            className="w-full"
            style={{ background: "#29b273" }}
            onClick={onStartNewProject}
          >
            Start new project
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Custom Dropdown Component
const CustomDropdown: React.FC<{ 
  options: { value: string; label: string }[];
  placeholder: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onSelect?: (value: string, label: string) => void;
  selectedValue?: string;
}> = ({ options, placeholder, isOpen = false, onToggle, onSelect, selectedValue }) => {
  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-[14px] font-bold focus:outline-none flex items-center justify-between w-full whitespace-nowrap"
        style={{ 
          display: "flex",
          width: "160px",
          padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          borderRadius: "var(--Distance-8, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
        }}
      >
        <span>{displayText}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10"
          style={{ width: "160px" }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-3 py-2 text-[14px] hover:bg-[var(--Colours-ContainerBgGrey, #F9FAFB)] focus:outline-none"
              onClick={() => {
                onSelect?.(option.value, option.label);
                onToggle?.();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Search and Filter Bar
const SearchFilterBar: React.FC = () => {
  const [courtOpen, setCourtOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [nextStepOpen, setNextStepOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");
  const [selectedNextStep, setSelectedNextStep] = useState<string>("");

  const courtOptions = [
    { value: "all", label: "All" },
    { value: "your-action", label: "Your Action" },
    { value: "cquel-action", label: "CQuel's Action" },
    { value: "supplier-action", label: "Supplier's Action" }
  ];

  const solutionOptions = [
    { value: "all", label: "All" },
    { value: "HVAC", label: "HVAC" },
    { value: "Solar PV", label: "Solar PV" },
    { value: "LED", label: "LED" },
    { value: "EV Charging", label: "EV Charging" }
  ];

  const nextStepOptions = [
    { value: "all", label: "All" },
    { value: "optimise", label: "Optimise Brief" },
    { value: "publish", label: "Publish Brief" },
    { value: "generating", label: "Generating" }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
        style={{
          width: "310px",
          padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
          borderRadius: "var(--Distance-8, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
        }}
      />

      {/* Filters on the right */}
      <div className="flex items-center gap-4">
        {/* Court Filter */}
        <CustomDropdown
          options={courtOptions}
          placeholder="Court"
          isOpen={courtOpen}
          onToggle={() => setCourtOpen(!courtOpen)}
          onSelect={(value, label) => {
            setSelectedCourt(value);
            setCourtOpen(false);
          }}
          selectedValue={selectedCourt}
        />

        {/* Solution Type Filter */}
        <CustomDropdown
          options={solutionOptions}
          placeholder="Solution Type"
          isOpen={solutionOpen}
          onToggle={() => setSolutionOpen(!solutionOpen)}
          onSelect={(value, label) => {
            setSelectedSolution(value);
            setSolutionOpen(false);
          }}
          selectedValue={selectedSolution}
        />

        {/* Next Step Filter */}
        <CustomDropdown
          options={nextStepOptions}
          placeholder="Next Step"
          isOpen={nextStepOpen}
          onToggle={() => setNextStepOpen(!nextStepOpen)}
          onSelect={(value, label) => {
            setSelectedNextStep(value);
            setNextStepOpen(false);
          }}
          selectedValue={selectedNextStep}
        />
      </div>
    </div>
  );
};

// Get Solution Icon
const getSolutionIcon = (type: string) => {
  switch (type) {
    case "HVAC":
      return "/assets/heat pumps.svg";
    case "Solar PV":
      return "/assets/solar.svg";
    case "LED":
      return "/assets/heat pumps.svg"; // Using heat pumps as fallback since LED.svg doesn't exist
    case "EV Charging":
      return "/assets/ev charging.svg";
    default:
      return "/assets/heat pumps.svg";
  }
};

// Brief Card Component
const BriefCard: React.FC<{ brief: Brief }> = ({ brief }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border" style={{ 
      height: "72px",
      borderRadius: "var(--CornerRadius, 8px)",
      border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
      background: "var(--Colours-ContainerBg, #FFF)"
    }}>
      {/* Project Icon */}
      <div className="w-14 h-14 flex items-center justify-center mr-2 flex-shrink-0">
        <img
          src={getSolutionIcon(brief.type)}
          alt=""
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Project Info */}
      <div className="flex-1 min-w-0 max-w-[200px] mr-32">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
            onClick={() => {
              // Navigate to project detail page
              window.location.href = `/?tab=project-detail&projectId=${brief.id}&sourceTab=briefs`;
            }}
          >
            {brief.name}
          </div>
          <ExternalLink size={16} className="text-[var(--text-tertiary)] shrink-0" />
        </div>
        <div className="text-[12px] text-[var(--text-secondary)] truncate">{brief.location}</div>
      </div>

      {/* Responsibility Badge */}
      <div className="w-[100px] mr-12 flex-shrink-0">
        {brief.courtStatus ? (
          <ResponsibilityBadge responsibility={brief.courtStatus} />
        ) : (
          <div className="h-6"></div>
        )}
      </div>

      {/* Status */}
      <div className="flex-1 min-w-0 max-w-[280px] mr-12">
        <div className="text-[14px] text-[var(--text-secondary)]">{brief.timestamp}</div>
      </div>

      {/* Action Button */}
      <div className="ml-3 flex-shrink-0">
        {brief.action ? (
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => {
              const briefBuilderUrl = `https://cquel-brief-builder.vercel.app/?briefId=${brief.id}&userId=456`;
              window.open(briefBuilderUrl, '_blank');
            }}
          >
            {brief.action}
          </Button>
        ) : (
          <div className="w-[140px]"></div>
        )}
      </div>
    </div>
  );
};

// Optimised Briefs Section
const OptimisedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "1",
      name: "Manchester Office HVAC",
      location: "Manchester • TechHub",
      type: "HVAC",
      status: "optimised",
      courtStatus: "your",
      timestamp: "Optimised 14:30 26 Aug 2025",
      action: "Publish Brief"
    },
    {
      id: "2",
      name: "Birmingham Warehouse Solar",
      location: "Birmingham • LogisPark",
      type: "Solar PV",
      status: "optimised",
      courtStatus: "your",
      timestamp: "Optimised 16:45 27 Aug 2025",
      action: "Publish Brief"
    },
    {
      id: "3",
      name: "Edinburgh Data Centre LED",
      location: "Edinburgh • ScotTech",
      type: "LED",
      status: "optimised",
      courtStatus: "cquel",
      timestamp: "Updating 11:20 28 Aug 2025"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Optimised Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};

// Generated Briefs Section
const GeneratedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "4",
      name: "Liverpool Office EV Charging",
      location: "Liverpool • MerseyCorp",
      type: "EV Charging",
      status: "generated",
      courtStatus: "your",
      timestamp: "Created 09:15 29 Aug 2025",
      action: "Optimise Brief"
    },
    {
      id: "5",
      name: "Bristol Retail Heat Pumps",
      location: "Bristol • GreenSpace",
      type: "HVAC",
      status: "generated",
      courtStatus: "cquel",
      timestamp: "Generating 15:10 25 Aug 2025"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Generated Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};

// Uploaded Plans Section
const UploadedPlansSection: React.FC = () => {
  const uploadedPlans = [
    {
      id: "upload-1",
      name: "New Upload",
      location: "Documents uploaded at 12:00 21 Aug 2025",
      fileCount: 5,
      status: "Generating",
      courtStatus: "cquel" as const
    },
    {
      id: "upload-2", 
      name: "New Upload",
      location: "Documents uploaded at 14:30 20 Aug 2025",
      fileCount: 3,
      status: "Generating",
      courtStatus: "cquel" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Uploaded Plans ({uploadedPlans.length})</h2>
      <div className="space-y-2">
        {uploadedPlans.map((plan) => (
          <div key={plan.id} className="flex items-center justify-between p-4 bg-white rounded-lg border" style={{ 
            height: "72px",
            borderRadius: "var(--CornerRadius, 8px)",
            border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
            background: "var(--Colours-ContainerBg, #FFF)"
          }}>
            {/* Document Icon */}
            <div className="w-14 h-14 flex items-center justify-center mr-2 flex-shrink-0">
              <img
                src="/assets/Documents pack.svg"
                alt=""
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* Project Info */}
            <div className="flex-1 min-w-0 max-w-[200px] mr-32">
              <div className="flex items-center gap-2 mb-1">
                <div 
                  className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
                  onClick={() => {
                    // Navigate to project detail page
                    window.location.href = `/?tab=project-detail&projectId=${plan.id}&sourceTab=briefs`;
                  }}
                >
                  {plan.name}
                </div>
                <ExternalLink size={16} className="text-[var(--text-tertiary)] shrink-0" />
              </div>
              <div className="text-[12px] text-[var(--text-secondary)] truncate">{plan.location}</div>
            </div>

            {/* Responsibility Badge */}
            <div className="w-[100px] mr-12 flex-shrink-0">
              <ResponsibilityBadge responsibility={plan.courtStatus} />
            </div>

            {/* Status */}
            <div className="flex-1 min-w-0 max-w-[280px] mr-12">
              <div className="text-[14px] text-[var(--text-secondary)]">{plan.status}</div>
              <div className="text-[12px] text-[var(--text-tertiary)]">File counts: {plan.fileCount}</div>
            </div>

            {/* No Action Button - Empty space */}
            <div className="ml-3 flex-shrink-0">
              <div className="w-[140px]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Published Briefs Section
const PublishedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "6",
      name: "Newcastle Facility Solar",
      location: "Newcastle • IndustrialPark",
      type: "Solar PV",
      status: "published",
      timestamp: "Published 15:10 25 May 2025",
      action: "Go to Brief"
    },
    {
      id: "7",
      name: "Stuttgart Office Heat Pumps",
      location: "Stuttgart • AroundTown",
      type: "HVAC",
      status: "published",
      timestamp: "Published 15:15 30 Apr 2025",
      action: "Go to Brief"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Published Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};

const BriefsView: React.FC<{ onTabChange?: (handler: () => void) => void }> = ({ onTabChange }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [activeBriefsTab, setActiveBriefsTab] = useState("uploaded");
  const [uploads, setUploads] = useState<Array<{
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
    isHighlighted?: boolean;
  }>>([]);

  const handleStartNewProject = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = (files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
  }>) => {
    const newUpload = {
      id: Math.random().toString(36).substr(2, 9),
      files,
      status: 'processing' as const,
      uploadedAt: new Date(),
      userId: '456',
      isHighlighted: true
    };

    setUploads(prev => [newUpload, ...prev]);
    setIsUploadModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setShowSuccessBanner(true);
  };

  const handleSuccessBannerDismiss = () => {
    setShowSuccessBanner(false);
  };

  const handleTabChange = React.useCallback(() => {
    // Remove highlighting from all uploads when tab changes
    setUploads(prev => prev.map(upload => ({ ...upload, isHighlighted: false })));
    setShowSuccessBanner(false);
  }, []);

  // Register the tab change handler when component mounts
  React.useEffect(() => {
    if (onTabChange) {
      onTabChange(handleTabChange);
    }
  }, []); // Only run once on mount

  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header */}
      <div>
        <h2 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-6">
          Welcome back, Alex
        </h2>
      </div>

      {/* Success Banner */}
      <SuccessBanner 
        isVisible={showSuccessBanner}
        onDismiss={handleSuccessBannerDismiss}
        fileCount={uploads.length > 0 ? uploads[0].files.length : 0}
      />

      {/* Metrics Section */}
      <BriefsMetricsSection onStartNewProject={handleStartNewProject} />

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] mb-6">
          All Briefs
        </h2>
        
        {/* Search and Filter Bar */}
        <SearchFilterBar />
        
        {/* Briefs Tab Bar */}
        <div className="flex border-b border-[var(--Colours-BorderLight,#F3F4F6)] mb-6">
          <button
            onClick={() => setActiveBriefsTab('uploaded')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'uploaded' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Uploaded Plans
            {activeBriefsTab === 'uploaded' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('generated')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'generated' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Generated Briefs
            {activeBriefsTab === 'generated' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('optimised')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'optimised' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Optimised Briefs
            {activeBriefsTab === 'optimised' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('published')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'published' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Published Briefs
            {activeBriefsTab === 'published' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
        </div>
        
        {/* Success Banner */}
        {showSuccessBanner && (
          <div 
            className="mb-6 p-4 rounded-lg"
            style={{
              background: "var(--Colours-BgGreen, #EAF8F1)",
              border: "1px solid var(--Colours-BorderGreen, #D4F0E3)"
            }}
          >
            <div className="flex items-center gap-3">
              <div className="text-sm text-[#1E2832]">
                🎉 Documents uploaded successfully! We&apos;ll create comprehensive brief(s) and notify you when it&apos;s ready for review (typically 2-3 business days).
              </div>
              <button
                onClick={() => setShowSuccessBanner(false)}
                className="p-1 hover:bg-green-100 rounded transition-colors"
              >
                <X className="w-4 h-4 text-green-600" />
              </button>
            </div>
          </div>
        )}
        
        {/* Brief Sections */}
        <div className="space-y-8">
          {activeBriefsTab === 'uploaded' && (
            <DocumentUploadsSection uploads={uploads} />
          )}
          {activeBriefsTab === 'generated' && (
            <GeneratedBriefsSection />
          )}
          {activeBriefsTab === 'optimised' && (
            <OptimisedBriefsSection />
          )}
          {activeBriefsTab === 'published' && (
            <PublishedBriefsSection />
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        fileCount={uploads.length > 0 ? uploads[0].files.length : 0}
        userEmail="alex.johnson@company.com"
      />
    </div>
  );
};

export default BriefsView;
