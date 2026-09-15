import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "@/components/site/SiteLayout";
import MVRBackgroundCheckEmployerGuide from "./pages/MVRBackgroundCheckEmployerGuide";
import AppWithWeeklyGuides from "./AppWithWeeklyGuides";

function MVRGuideApp() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <SiteLayout>
            <MVRBackgroundCheckEmployerGuide />
          </SiteLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default function AppWithMVRGuide() {
  return (
    <Switch>
      <Route path="/resources/mvr-background-checks-employer-guide" component={MVRGuideApp} />
      <Route component={AppWithWeeklyGuides} />
    </Switch>
  );
}
