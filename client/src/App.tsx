/*
 * PreciseHire — App router
 * Style commitment: Trusted Modernism design system applies globally.
 * SiteLayout wraps every route with Header/Footer and the cream background.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
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
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Resources from "./pages/Resources";
import ResourcePost from "./pages/ResourcePost";
import Support from "./pages/Support";
import AuthorPage from "./pages/AuthorPage";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/industries" component={Industries} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/compliance" component={Compliance} />
        <Route path="/compliance/audit" component={Audit} />
        <Route path="/compliance/checklist" component={Checklist} />
        <Route path="/integrations" component={Integrations} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/support" component={Support} />
        <Route path="/legal/:slug" component={Legal} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/:slug" component={ResourcePost} />
        <Route path="/authors/:slug" component={AuthorPage} />
        {/* Legacy WordPress blog URLs redirect into the new Resources index */}
        <Route path="/blog" component={Resources} />
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
