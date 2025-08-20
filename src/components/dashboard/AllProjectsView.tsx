import React from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Statistics Cards Component
const StatisticsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">💼</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">24</div>
          <div className="text-[14px] text-[var(--text-secondary)]">Active projects</div>
        </div>
      </Card>
      
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">⏰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">4</div>
          <div className="text-[14px] text-[var(--text-secondary)]">Need your action</div>
        </div>
      </Card>
      
      <Card elevated className="p-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">£5.3M</div>
          <div className="text-[14px] text-[var(--text-secondary)]">Total pipeline</div>
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

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  const [actionOpen, setActionOpen] = React.useState(false);
  const [solutionOpen, setSolutionOpen] = React.useState(false);
  const [nextStepOpen, setNextStepOpen] = React.useState(false);
  const [sortOpen, setSortOpen] = React.useState(false);
  
  const [selectedAction, setSelectedAction] = React.useState("");
  const [selectedSolution, setSelectedSolution] = React.useState("");
  const [selectedNextStep, setSelectedNextStep] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState("");

  return (
    <div className="bg-white rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search Input */}
        <div className="relative" style={{ width: "200px" }}>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            style={{ 
              height: "40px", 
              padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
              borderRadius: "var(--Distance-8, 8px)",
              border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
              background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
            }}
          />
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex gap-4">
          <CustomDropdown
            options={[
              { value: "your-action", label: "Your Action" },
              { value: "cquel-action", label: "CQuel Action" },
              { value: "supplier-action", label: "Supplier Action" }
            ]}
            placeholder="Action"
            isOpen={actionOpen}
            onToggle={() => setActionOpen(!actionOpen)}
            onSelect={(value) => setSelectedAction(value)}
            selectedValue={selectedAction}
          />
          
          <CustomDropdown
            options={[
              { value: "led", label: "LED" },
              { value: "solar", label: "Solar" },
              { value: "heat-pumps", label: "Heat Pumps" },
              { value: "ev-charging", label: "EV Charging" }
            ]}
            placeholder="Solution Type"
            isOpen={solutionOpen}
            onToggle={() => setSolutionOpen(!solutionOpen)}
            onSelect={(value) => setSelectedSolution(value)}
            selectedValue={selectedSolution}
          />
          
          <CustomDropdown
            options={[
              { value: "optimising-brief", label: "Optimising brief" },
              { value: "gathering-responses", label: "Gathering responses" },
              { value: "preparing-quotes", label: "Preparing quotes" },
              { value: "choosing-supplier", label: "Choosing Supplier" },
              { value: "meeting-supplier", label: "Meeting Supplier" },
              { value: "scheduling-survey", label: "Scheduling Survey" },
              { value: "finalising-price", label: "Finalising Price" }
            ]}
            placeholder="Next Step"
            isOpen={nextStepOpen}
            onToggle={() => setNextStepOpen(!nextStepOpen)}
            onSelect={(value) => setSelectedNextStep(value)}
            selectedValue={selectedNextStep}
          />
          
          {/* Sort Dropdown */}
          <CustomDropdown
            options={[
              { value: "name", label: "Sort by Name" },
              { value: "date", label: "Sort by Date" },
              { value: "status", label: "Sort by Status" },
              { value: "solution-type", label: "Sort by Solution type" }
            ]}
            placeholder="Sort by"
            isOpen={sortOpen}
            onToggle={() => setSortOpen(!sortOpen)}
            onSelect={(value) => setSelectedSort(value)}
            selectedValue={selectedSort}
          />
        </div>
      </div>
    </div>
  );
};

// Responsibility Badge Component
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
      className="px-2 py-0.5 rounded-full text-[12px] font-bold border whitespace-nowrap"
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

// Projects Table Component
const ProjectsTable: React.FC = () => {
  const projects = [
    {
      name: "Solar PV - Schenkendorfstraße",
      location: "Edinburgh",
      type: "LED",
      nextStep: "Optimising brief",
      nextAction: "Publishing Brief",
      responsibility: "your" as const,
      action: "Go to Brief"
    },
    {
      name: "Schonebeck Solar AroundTown",
      location: "Berlin",
      type: "Solar",
      nextStep: "Gathering responses",
      nextAction: "Preparing Quotes",
      responsibility: "cquel" as const,
      action: "Go to Results"
    },
    {
      name: "Wellington Street HVAC",
      location: "Manchester",
      type: "Heat Pumps",
      nextStep: "Preparing quotes",
      nextAction: "Choosing Supplier",
      responsibility: "supplier" as const,
      action: "Go to Results"
    },
    {
      name: "Sonnenstraße Solar PV",
      location: "Edinburgh",
      type: "LED",
      nextStep: "Choosing Supplier",
      nextAction: "Meeting Supplier",
      responsibility: "your" as const,
      action: "Go to Results"
    },
    {
      name: "Avenue Victor Hugo LED",
      location: "Edinburgh",
      type: "LED",
      nextStep: "Meeting Supplier",
      nextAction: "Scheduling Survey",
      responsibility: "your" as const,
      action: "Go to Tenders"
    },
    {
      name: "Avenue Victor Hugo Solar PV",
      location: "Berlin",
      type: "EV Charging",
      nextStep: "Scheduling Survey",
      nextAction: "Finalising Price",
      responsibility: "cquel" as const,
      action: "Go to Scheduling"
    },
    {
      name: "Friedrichstraße Solar PV",
      location: "Berlin",
      type: "EV Charging",
      nextStep: "Finalising Price",
      nextAction: "Signing Contract",
      responsibility: "your" as const,
      action: "Go to Pricing"
    }
  ];

  return (
          <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[var(--text-primary)] font-extrabold mb-6" style={{ fontSize: "20px" }}>
          All Projects
        </h2>
      <SearchFilterBar />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9fafb]">
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[200px]">
                Project Name
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[120px]">
                Location
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[120px]">
                Project type
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[180px]">
                Next step
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[80px]">
                Responsibility
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] w-[140px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-b border-[var(--border-default)] hover:bg-[#f9fafb]">
                <td className="px-6 py-4 w-[200px]">
                  <div className="flex items-center gap-2">
                    <span 
                  className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
                  onClick={() => {
                    window.location.href = `/?tab=project-detail&projectId=${index + 1}&sourceTab=all`;
                  }}
                >
                  {project.name}
                </span>
                    <ExternalLink className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                  </div>
                </td>
                <td className="px-6 py-4 text-[14px] text-[var(--text-secondary)] w-[120px]">
                  {project.location}
                </td>
                <td className="px-6 py-4 text-[14px] text-[var(--text-secondary)] w-[120px]">
                  {project.type}
                </td>
                <td className="px-6 py-4 w-[180px]">
                  <div className="flex flex-col">
                    <span className="text-[14px] text-[var(--text-primary)]">{project.nextStep}</span>
                    <span className="text-[12px] text-[var(--text-tertiary)]">Next: {project.nextAction}</span>
                  </div>
                </td>
                <td className="px-6 py-4 w-[80px]">
                  <ResponsibilityBadge type={project.responsibility} />
                </td>
                <td className="px-6 py-4 w-[140px]">
                  <Button variant="neutral" size="custom" className="w-[140px] whitespace-nowrap">
                    {project.action}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AllProjectsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatisticsCards />
      <ProjectsTable />
    </div>
  );
};

export default AllProjectsView;
