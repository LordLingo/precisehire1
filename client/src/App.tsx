/*
 * PreciseHire — App router
 * Style commitment: Trusted Modernism design system applies globally.
 * SiteLayout wraps every route with Header/Footer and the cream background.
 */
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import SiteLayout from "@/components/site/SiteLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Compliance from "./pages/Compliance";
import Audit from "./pages/Audit";
import Checklist from "./pages/Checklist";
import Integrations from "./pages/Integrations";
import Industries from "./pages/Industries";
import IndustriesHealthcare from "./pages/IndustriesHealthcare";
import IndustriesTransportation from "./pages/IndustriesTransportation";
import IndustriesStaffing from "./pages/IndustriesStaffing";
import Trust from "./pages/Trust";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import GetAQuote from "./pages/GetAQuote";
import TalkToAnExpert from "./pages/TalkToAnExpert";
import Legal from "./pages/Legal";
import Resources from "./pages/Resources";
import ResourcePost from "./pages/ResourcePost";
import Support from "./pages/Support";
import AuthorPage from "./pages/AuthorPage";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/industries" component={Industries} />
        <Route path="/industries/healthcare" component={IndustriesHealthcare} />
        <Route path="/industries/transportation" component={IndustriesTransportation} />
        <Route path="/industries/staffing" component={IndustriesStaffing} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/trust" component={Trust} />
        <Route path="/compliance" component={Compliance} />
        <Route path="/compliance/audit" component={Audit} />
        <Route path="/compliance/checklist" component={Checklist} />
        <Route path="/integrations" component={Integrations} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/get-a-quote" component={GetAQuote} />
        <Route path="/talk-to-an-expert" component={TalkToAnExpert} />
        <Route path="/support" component={Support} />
        <Route path="/legal/:slug" component={Legal} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/:slug" component={ResourcePost} />
        <Route path="/authors/:slug" component={AuthorPage} />
        <Route path="/thanks" component={Thanks} />
        {/* Legacy WordPress blog URLs redirect into the new Resources index */}
        <Route path="/blog" component={Resources} />

        {/* Legacy WordPress URLs for the fast-background-check pillar.
            Each of these used to rank — they now serve the new pillar in place. */}
        <Route path="/category/background-checks/fast-background-check">
          {() => <LegacyPostRedirect to="/resources/fast-background-check-employer-guide" />}
        </Route>
        <Route path="/category/background-checks/fast-background-check/:rest*">
          {() => <LegacyPostRedirect to="/resources/fast-background-check-employer-guide" />}
        </Route>
        <Route path="/how-to-conduct-a-fast-background-check">
          {() => <LegacyPostRedirect to="/resources/fast-background-check-employer-guide" />}
        </Route>
        <Route path="/fast-background-check">
          {() => <LegacyPostRedirect to="/resources/fast-background-check-employer-guide" />}
        </Route>
        <Route path="/resources/how-to-conduct-a-fast-background-check">
          {() => <LegacyPostRedirect to="/resources/fast-background-check-employer-guide" />}
        </Route>
        {/* Generic WordPress category fallback — sends any other /category/* into Resources index */}
        <Route path="/category/:cat*" component={Resources} />

        {/* Legacy redirects from old WordPress URLs to new equivalents */}
        <Route path="/criminal-background-checks">{() => <ServiceDetail />}</Route>
        <Route path="/employment-verification">{() => <ServiceDetail />}</Route>
        <Route path="/driving-record-checks-mvr">{() => <ServiceDetail />}</Route>
        <Route path="/drug-testing">{() => <ServiceDetail />}</Route>
        <Route path="/education-verification">{() => <ServiceDetail />}</Route>
        <Route path="/international-background-checks">{() => <ServiceDetail />}</Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

/**
 * LegacyPostRedirect — sends old WordPress URLs to their new home with a 200-style
 * client redirect. We use replaceState so the old URL is removed from history,
 * and we render a tiny visible note for the brief moment before navigation.
 */
function LegacyPostRedirect({ to }: { to: string }) {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to, navigate]);
  return (
    <div className="container py-24 text-center text-ink-700">
      Loading…
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
