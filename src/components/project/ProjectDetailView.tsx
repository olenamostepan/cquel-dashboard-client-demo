import React from "react";
import { ChevronRight, Check, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import ResponsibilityBadge from "@/components/dashboard/ResponsibilityBadge";

// Project Data Interface
interface Project {
  id: string;
  name: string;
  address: string;
  type: 'Solar PV' | 'HVAC' | 'LED' | 'EV Charging';
  category: 'RESIDENTIAL' | 'COMMERCIAL';
  status: 'OCCUPIED' | 'VACANT';
  capacity: string;
  currentStep: string;
  completedSteps: string[];
  nextSteps: ProjectStep[];
}

// Project Step Interface
interface ProjectStep {
  id: string;
  title: string;
  description: string;
  stepNumber: number;
  courtStatus: 'your' | 'cquel' | 'supplier';
  dependency: string;
  isActive?: boolean;
  icon?: string;
}

// Get Solution Icon
const getSolutionIcon = (type: string) => {
  switch (type) {
    case "HVAC":
      return "/assets/heat pumps.svg";
    case "Solar PV":
      return "/assets/solar.svg";
    case "LED":
      return "/assets/heat pumps.svg";
    case "EV Charging":
      return "/assets/ev charging.svg";
    default:
      return "/assets/heat pumps.svg";
  }
};

// Get Step Icon
const getStepIcon = (stepId: string) => {
  const iconMap: { [key: string]: string } = {
    "publishing-brief": "/assets/Single project/publishing brief.svg",
    "gathering-responses": "/assets/Single project/gathering responses.svg",
    "preparing-quotes": "/assets/Single project/preparing quotes.svg",
    "choosing-supplier": "/assets/Single project/choosing supplier.svg",
    "meeting-supplier": "/assets/Single project/meeting supplier.svg",
    "scheduling-survey": "/assets/Single project/scheduling survey.svg",
    "finalising-price": "/assets/Single project/finalising price.svg",
    "contract-signing": "/assets/Single project/contract signing.svg"
  };
  
  return iconMap[stepId] || "/assets/heat pumps.svg";
};

// Progress Stepper Component
const ProgressStepper: React.FC<{ currentStep: string; completedSteps: string[] }> = ({ currentStep, completedSteps }) => {
  const phases = [
    {
      id: "project-setup",
      title: "Project Setup",
      icon: "📝", // Notepad with pencil icon
      steps: [
        { id: "brief-created", label: "Brief Created", status: "done" },
        { id: "optimise-brief", label: "Optimise Brief", status: "in-progress" },
        { id: "brief-published", label: "Brief Published", status: "next" }
      ]
    },
    {
      id: "procurement",
      title: "Procurement", 
      icon: "🔄", // Refresh/loop icon
      steps: [
        { id: "responses-gathered", label: "Responses Gathered", status: "next" },
        { id: "quotes-prepared", label: "Quotes Prepared", status: "next" },
        { id: "choose-supplier", label: "Choose Supplier", status: "next" },
        { id: "meet-supplier", label: "Meet Supplier", status: "next" }
      ]
    },
    {
      id: "finalisation",
      title: "Finalisation",
      icon: "🏁", // Checkered flag icon
      steps: [
        { id: "survey-scheduled", label: "Survey Scheduled", status: "next" },
        { id: "price-accepted", label: "Price Accepted", status: "next" },
        { id: "contract-signed", label: "Contract Signed", status: "next" }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)]">Project Progress</h2>
      </div>
      
      <div className="flex gap-4">
        {phases.map((phase, phaseIndex) => (
          <React.Fragment key={phase.id}>
            {/* Phase Card */}
            <div 
              className="flex-1 p-4"
              style={{
                borderRadius: "var(--CornerRadius, 8px)",
                border: "1px solid var(--Colours-BorderLight, #F3F4F6)",
                background: "var(--Colours-ContainerBg, #FFF)"
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{phase.icon}</span>
                <h3 className="font-bold text-[var(--text-primary)]">{phase.title}</h3>
              </div>
              
              <div className="space-y-2">
                {phase.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    {step.status === "done" && (
                      <Check size={16} className="text-gray-400" />
                    )}
                    {step.status === "in-progress" && (
                      <Zap size={16} className="text-[#004b75]" />
                    )}
                    {step.status === "next" && (
                      <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded-full"></div>
                    )}
                    <span className={`text-sm ${
                      step.status === "done" ? "text-gray-400" :
                      step.status === "in-progress" ? "text-[#004b75] font-bold" :
                      "text-gray-500"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arrow between phases */}
            {phaseIndex < phases.length - 1 && (
              <div className="flex items-center">
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Focus Here Section
const FocusHereSection: React.FC<{ activeTab: string; onTabChange: (tab: string) => void; nextSteps: ProjectStep[] }> = ({ activeTab, onTabChange, nextSteps }) => {
  return (
    <div className="mb-8">
      <div 
        className="bg-white rounded-lg border"
        style={{
          borderRadius: "var(--CornerRadius, 8px)",
          border: "1px solid var(--Colours-BorderLight, #F3F4F6)",
          background: "var(--Colours-ContainerBg, #FFF)"
        }}
      >
        {/* Header with Tab Bar */}
        <div className="p-6 pb-0">
          <TabBar activeTab={activeTab} onTabChange={onTabChange} />
          <h2 className="text-[18px] font-bold text-[var(--text-primary)] mt-6">Focus Here</h2>
        </div>
        
        {/* Tab Content */}
        <div className="p-6 pt-4">
          {activeTab === 'active' && (
            <>
                          <div 
              className="flex items-center gap-4 px-4 mb-6"
              style={{
                height: "72px",
                borderRadius: "var(--CornerRadius, 8px)",
                border: "1px solid var(--Colours-BorderGreen, #D4F0E3)",
                background: "var(--Colours-BgGreen, #EAF8F1)"
              }}
            >
              {/* Stage Icon */}
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/Single project/optimising brief.svg"
                  alt=""
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/assets/heat pumps.svg";
                  }}
                />
              </div>
              
              {/* Stage Name and Description */}
              <div className="w-[300px] flex-shrink-0">
                <h3 className="text-[14px] font-bold text-[var(--text-primary)] truncate mb-1">Optimise Brief</h3>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  Enhance your brief with suggestions
                </p>
              </div>
              
              {/* Action Badge */}
              <div className="flex-shrink-0 mr-16">
                <ResponsibilityBadge responsibility="your" />
              </div>
              
              {/* Step */}
              <div className="w-[100px] flex-shrink-0">
                <div className="text-[14px] font-bold text-[var(--text-primary)]">
                  In progress
                </div>
              </div>
              

              
              {/* Action Button */}
              <div className="flex-shrink-0 ml-auto">
                <Button 
                  variant="primary" 
                  size="custom"
                  style={{ background: "#29b273" }}
                  onClick={() => {
                    const briefBuilderUrl = `https://cquel-brief-builder.vercel.app/?briefId=1&userId=456`;
                    window.open(briefBuilderUrl, '_blank');
                  }}
                >
                  Go to Brief
                </Button>
              </div>
            </div>
              
              {/* Coming Up Next Section */}
              <div>
                <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Coming Up Next</h2>
                
                <div className="space-y-3">
                  {nextSteps.map((step) => (
                    <div 
                      key={step.id}
                      className="flex items-center gap-4 px-4"
                      style={{
                        height: "72px",
                        borderRadius: "var(--CornerRadius, 8px)",
                        border: "1px solid var(--Colours-BorderLight, #F3F4F6)",
                        background: "var(--Colours-ContainerBg, #FFF)"
                      }}
                    >
                      {/* Stage Icon */}
                      <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                        <img
                          src={getStepIcon(step.id)}
                          alt=""
                          className="w-14 h-14 object-contain"
                          onError={(e) => {
                            // Fallback to a default icon if specific icon not found
                            (e.currentTarget as HTMLImageElement).src = "/assets/heat pumps.svg";
                          }}
                        />
                      </div>
                      
                      {/* Stage Name and Description */}
                      <div className="w-[300px] flex-shrink-0">
                        <h3 className="text-[14px] font-bold text-[var(--text-primary)] truncate mb-1">{step.title}</h3>
                        <p className="text-[12px] text-[var(--text-secondary)]">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Action Badge */}
                      <div className="flex-shrink-0 mr-16">
                        <ResponsibilityBadge responsibility={step.courtStatus} />
                      </div>
                      
                      {/* Step */}
                      <div className="w-[100px] flex-shrink-0">
                        <div className="text-[14px] font-bold text-[var(--text-primary)]">
                          Step {step.stepNumber}
                        </div>
                      </div>
                      
                      {/* After */}
                      <div className="flex-shrink-0">
                        <div className="text-[12px] text-[var(--text-secondary)]">
                          {step.dependency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'done' && (
            <div className="text-center py-8">
              <p className="text-[14px] text-[var(--text-secondary)]">No completed actions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



// Tab Bar Component
const TabBar: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
      <button
        onClick={() => onTabChange('active')}
        className={`px-6 py-3 text-[14px] relative ${
          activeTab === 'active' 
            ? 'text-[var(--text-primary)] font-bold' 
            : 'text-[var(--text-secondary)] font-normal'
        }`}
      >
        Active
        {activeTab === 'active' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
        )}
      </button>
      <button
        onClick={() => onTabChange('done')}
        className={`px-6 py-3 text-[14px] relative ${
          activeTab === 'done' 
            ? 'text-[var(--text-primary)] font-bold' 
            : 'text-[var(--text-secondary)] font-normal'
        }`}
      >
        Done
        {activeTab === 'done' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#29b273]"></div>
        )}
      </button>
    </div>
  );
};

// Project Detail View Component
export const ProjectDetailView: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('active');
  
  const project: Project = {
    id: "1",
    name: "Solar PV - Schenkendorfstraße",
    address: "Schenkendorfstraße 29, Mülheim an der Ruhr, 45472, DE",
    type: "Solar PV",
    category: "RESIDENTIAL",
    status: "OCCUPIED",
    capacity: "> 70KW SOLAR",
    currentStep: "optimise-brief",
    completedSteps: ["brief-created"],
    nextSteps: [
      {
        id: "publishing-brief",
        title: "Publishing Brief",
        description: "Publish your optimised brief for suppliers",
        stepNumber: 2,
        courtStatus: "your",
        dependency: "After: Optimising Brief"
      },
      {
        id: "gathering-responses",
        title: "Gathering Responses",
        description: "Collect responses from interested suppliers",
        stepNumber: 3,
        courtStatus: "cquel",
        dependency: "After: Publishing Brief"
      },
      {
        id: "preparing-quotes",
        title: "Preparing Quotes",
        description: "Suppliers prepare detailed quotes",
        stepNumber: 4,
        courtStatus: "supplier",
        dependency: "After: Gathering Responses"
      },
      {
        id: "choosing-supplier",
        title: "Choosing Supplier",
        description: "Select the best supplier for your project",
        stepNumber: 5,
        courtStatus: "your",
        dependency: "After: Preparing Quotes"
      },
      {
        id: "meeting-supplier",
        title: "Meeting Supplier",
        description: "Meet with your chosen supplier",
        stepNumber: 6,
        courtStatus: "your",
        dependency: "After: Choosing Supplier"
      },
      {
        id: "scheduling-survey",
        title: "Scheduling Survey",
        description: "Schedule site survey with supplier",
        stepNumber: 7,
        courtStatus: "cquel",
        dependency: "After: Meeting Supplier"
      },
      {
        id: "finalising-price",
        title: "Finalising Price",
        description: "Negotiate and finalise pricing",
        stepNumber: 8,
        courtStatus: "your",
        dependency: "After: Survey"
      },
      {
        id: "contract-signing",
        title: "Contract Signing",
        description: "Sign final contract with supplier",
        stepNumber: 9,
        courtStatus: "your",
        dependency: "After: Finalising Price"
      }
    ]
  };

  return (
    <div className="max-w-[1208px] mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        
        {/* Project Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src={getSolutionIcon(project.type)}
              alt=""
              className="w-16 h-16 object-contain"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-[28px] font-extrabold text-[var(--text-primary)] mb-2">
              {project.name}
            </h1>
            <p className="text-[16px] text-[var(--text-secondary)] mb-3">
              {project.address}
            </p>
            
            {/* Project Tags */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                {project.category}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                {project.status}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                {project.capacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <ProgressStepper 
        currentStep={project.currentStep} 
        completedSteps={project.completedSteps} 
      />

      {/* Focus Here Section */}
      <FocusHereSection activeTab={activeTab} onTabChange={setActiveTab} nextSteps={project.nextSteps} />
    </div>
  );
};

export default ProjectDetailView;
