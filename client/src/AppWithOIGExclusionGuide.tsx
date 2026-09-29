import type { ReactNode } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "@/components/site/SiteLayout";
import OIGExclusionScreeningHealthcareGuide from "./pages/OIGExclusionScreeningHealthcareGuide";
import ResourcesWithOIGExclusionGuide from "./pages/ResourcesWithOIGExclusionGuide";
import AppWithMVRGuide from "./AppWithMVRGuide";

function PageShell({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <SiteLayout>{children}</SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function OIGGuideApp() {
  return <PageShell><OIGExclusionScreeningHealthcareGuide /></PageShell>;
}

function ResourcesHubApp() {
  return <PageShell><ResourcesWithOIGExclusionGuide /></PageShell>;
}

export default function AppWithOIGExclusionGuide() {
  return (
    <Switch>
      <Route path="/resources/oig-exclusion-screening-healthcare-employers" component={OIGGuideApp} />
      <Route path="/resources" component={ResourcesHubApp} />
      <Route component={AppWithMVRGuide} />
    </Switch>
  );
}
