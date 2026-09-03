/**
 * NOIR CUT DESIGN REMINDER — The application shell stays in permanent dark mode so the
 * editorial Ink Black framing and Paper White typography remain visually stable site-wide.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { BrandRouteTransition } from "./components/BrandRouteTransition";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getRouterBase } from "./lib/routerBase";
import Home from "./pages/Home";

const NotFound = lazy(() => import("@/pages/NotFound"));
const InfoPage = lazy(() => import("@/pages/InfoPage"));
const MusicLanding = lazy(() => import("@/pages/MusicLanding"));
const ShopRedirect = lazy(() => import("@/pages/ShopRedirect"));
const TrackDetail = lazy(() => import("@/pages/TrackDetail"));
const Admin = lazy(() => import("@/pages/Admin"));
const ControlCenter = lazy(() => import("@/pages/ControlCenter"));

function RouteFallback() {
  return <main className="route-fallback" aria-live="polite">LOADING / NEXT FRAME</main>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const resetScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    resetScroll();
    const afterPaint = window.requestAnimationFrame(resetScroll);
    const afterRestoration = window.setTimeout(resetScroll, 60);

    return () => {
      window.cancelAnimationFrame(afterPaint);
      window.clearTimeout(afterRestoration);
    };
  }, [location]);

  return null;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <WouterRouter base={getRouterBase(import.meta.env.BASE_URL)}>
      <ScrollToTop />
      <BrandRouteTransition>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/music"><Suspense fallback={<RouteFallback />}><MusicLanding /></Suspense></Route>
          <Route path="/music/:slug"><Suspense fallback={<RouteFallback />}><TrackDetail /></Suspense></Route>
          <Route path="/shop"><Suspense fallback={<RouteFallback />}><ShopRedirect /></Suspense></Route>
          <Route path="/admin"><Suspense fallback={<RouteFallback />}><Admin /></Suspense></Route>
          <Route path="/control"><Suspense fallback={<RouteFallback />}><ControlCenter /></Suspense></Route>
          <Route path="/booking"><Suspense fallback={<RouteFallback />}><InfoPage kind="booking" /></Suspense></Route>
          <Route path="/press"><Suspense fallback={<RouteFallback />}><InfoPage kind="press" /></Suspense></Route>
          <Route path="/impressum"><Suspense fallback={<RouteFallback />}><InfoPage kind="impressum" /></Suspense></Route>
          <Route path="/datenschutz"><Suspense fallback={<RouteFallback />}><InfoPage kind="datenschutz" /></Suspense></Route>
          <Route path="/404"><Suspense fallback={<RouteFallback />}><NotFound /></Suspense></Route>
          <Route><Suspense fallback={<RouteFallback />}><NotFound /></Suspense></Route>
        </Switch>
      </BrandRouteTransition>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
