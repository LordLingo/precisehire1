import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "@/components/site/SiteLayout";
import OIGExclusionScreeningHealthcareGuide from "./pages/OIGExclusionScreeningHealthcareGuide";
import AppWithMVRGuide from "./AppWithMVRGuide";

function OIGGuideApp() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <SiteLayout><OIGExclusionScreeningHealthcareGuide /></SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default function AppWithOIGExclusionGuide() {
  return (
    <Switch>
      <Route path="/resources/oig-exclusion-screening-healthcare-employers" component={OIGGuideApp} />
      <Route component={AppWithMVRGuide} />
    </Switch>
  );
}
