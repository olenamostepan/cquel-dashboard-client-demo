"use client";

import React from "react";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";
import WelcomeWidgets from "@/components/dashboard/WelcomeWidgets";
import FocusActions from "@/components/dashboard/FocusActions";
import AllProjectsView from "@/components/dashboard/AllProjectsView";
import TendersView from "@/components/dashboard/TendersView";
import SurveysView from "@/components/dashboard/SurveysView";

export default function Home() {
  const [active, setActive] = React.useState("focus");

  return (
    <div className="min-h-screen">
      <Header customerName="Energise" />
      <Navigation
        activeId={active}
        onChange={setActive}
        items={[
          { id: "focus", label: "Focus here now" },
          { id: "all", label: "All Projects" },
          { id: "briefs", label: "Briefs" },
          { id: "tenders", label: "Tenders" },
          { id: "surveys", label: "Surveys" },
          { id: "pricing", label: "Pricing" },
        ]}
      />

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

        {active !== "focus" && active !== "all" && active !== "tenders" && active !== "surveys" && (
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
    </div>
  );
}
