import { useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { assets } from "@/data/artistData";

type BrandRouteTransitionProps = {
  children: ReactNode;
};

/** A brief brand stamp that appears when a route becomes active, without delaying navigation. */
export function BrandRouteTransition({ children }: BrandRouteTransitionProps) {
  const [location] = useLocation();
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setIsActive(false);
      return;
    }

    let timeout: number | undefined;
    const showBrandStamp = () => {
      window.clearTimeout(timeout);
      setIsActive(true);
      timeout = window.setTimeout(() => setIsActive(false), 520);
    };

    showBrandStamp();
    window.addEventListener("popstate", showBrandStamp);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("popstate", showBrandStamp);
    };
  }, [location, reduceMotion]);

  return (
    <>
      {children}
      <div className={`brand-route-transition${isActive ? " is-active" : ""}`} aria-hidden="true">
        <img src={assets.mark} alt="" />
        <span>THE NEXT FRAME</span>
      </div>
    </>
  );
}
