"use client";

import React from "react";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";
import WelcomeWidgets from "@/components/dashboard/WelcomeWidgets";
import FocusActions from "@/components/dashboard/FocusActions";
import AllProjectsView from "@/components/dashboard/AllProjectsView";
import TendersView from "@/components/dashboard/TendersView";
import SurveysView from "@/components/dashboard/SurveysView";
import PricingView from "@/components/dashboard/PricingView";
import BriefsView from "@/components/dashboard/BriefsView";
import ProjectDetailView from "@/components/project/ProjectDetailView";
import UploadModal from "@/components/upload/UploadModal";
import SuccessModal from "@/components/upload/SuccessModal";

export default function Home() {
  const [active, setActive] = React.useState("focus");
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const briefsTabChangeHandlerRef = React.useRef<(() => void) | null>(null);

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
    setIsUploadModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    // Navigate to briefs tab to show the upload
    setActive("briefs");
  };

  const handleTabChange = (newTab: string) => {
    // Call the briefs tab change handler if we're switching away from briefs
    if (active === "briefs" && newTab !== "briefs" && briefsTabChangeHandlerRef.current) {
      briefsTabChangeHandlerRef.current();
    }
    setActive(newTab);
  };

  // Check for URL parameters on component mount
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const projectIdParam = urlParams.get('projectId');
    
    console.log('URL params:', { tabParam, projectIdParam, currentActive: active });
    
    if (tabParam) {
      setActive(tabParam);
    } else {
      // Default to focus if no tab parameter
      setActive('focus');
    }
  }, []);

  // Update URL when active tab changes
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (active === 'focus') {
      url.searchParams.set('tab', 'focus');
    } else if (active !== 'focus') {
      url.searchParams.set('tab', active);
    }
    window.history.replaceState({}, '', url.toString());
  }, [active]);

  return (
    <div className="min-h-screen">
      <Header 
        customerName="Energise" 
        showBreadcrumbs={active === "project-detail"}
        breadcrumbItems={active === "project-detail" ? [
          {
            label: "All Projects",
            onClick: () => {
              // Get the source tab from URL parameters or default to 'all'
              const urlParams = new URLSearchParams(window.location.search);
              const sourceTab = urlParams.get('sourceTab') || 'all';
              window.location.href = `/?tab=${sourceTab}`;
            }
          },
          {
            label: "Solar PV - Schenkendorfstraße"
          }
        ] : undefined}
        onLogoClick={() => {
          console.log('Logo clicked from main page!');
          setActive('focus');
        }}
        onStartNewProject={handleStartNewProject}
      />
      {active !== "project-detail" && (
        <Navigation
          activeId={active}
          onChange={handleTabChange}
          items={[
            { id: "focus", label: "Focus here now" },
            { id: "all", label: "All Projects" },
            { id: "briefs", label: "Briefs" },
            { id: "tenders", label: "Tenders" },
            { id: "surveys", label: "Surveys" },
            { id: "pricing", label: "Pricing" },
          ]}
        />
      )}

      <main className="container-page pt-0 pb-8 space-y-5">
        {active === "focus" && (
          <>
            <section>
              <div
                className="text-[var(--text-primary)] font-extrabold"
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  paddingTop: "var(--Distance-32, 32px)",
                  paddingBottom: "var(--Distance-32, 32px)",
                }}
              >
                Welcome back, Alex
              </div>
              <div>
                <WelcomeWidgets
                  onViewMeetings={() => setActive("tenders")}
                  onViewSurveys={() => setActive("surveys")}
                />
              </div>
            </section>

                    <section>
          <FocusActions />
        </section>
          </>
        )}

        {active === "all" && (
          <section>
            <div
              className="text-[var(--text-primary)] font-extrabold"
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                paddingTop: "var(--Distance-32, 32px)",
                paddingBottom: "var(--Distance-32, 32px)",
              }}
            >
              Welcome back, Alex
            </div>
            <AllProjectsView />
          </section>
        )}

        {active === "tenders" && (
          <section>
            <TendersView />
          </section>
        )}

        {active === "surveys" && (
          <section>
            <SurveysView />
          </section>
        )}

        {active === "pricing" && (
          <section>
            <PricingView />
          </section>
        )}

        {active === "briefs" && (
          <section>
            <BriefsView onTabChange={(handler) => {
              briefsTabChangeHandlerRef.current = handler;
            }} />
          </section>
        )}

        {active === "project-detail" && (
          <section>
            <ProjectDetailView />
          </section>
        )}

        {active !== "focus" && active !== "all" && active !== "tenders" && active !== "surveys" && active !== "pricing" && active !== "briefs" && active !== "project-detail" && (
          <section>
            <div
              className="text-[var(--text-primary)] font-extrabold"
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                paddingTop: "var(--Distance-32, 32px)",
                paddingBottom: "var(--Distance-32, 32px)",
              }}
            >
              Welcome back, Alex
            </div>
            <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 text-[14px] text-[var(--text-secondary)]">
              {active.charAt(0).toUpperCase() + active.slice(1)} content coming soon
            </div>
          </section>
        )}
      </main>

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
        fileCount={1}
        userEmail="alex.johnson@company.com"
      />
    </div>
  );
}
