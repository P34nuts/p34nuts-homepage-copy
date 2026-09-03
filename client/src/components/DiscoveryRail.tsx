/** NOIR CUT FINAL AUDIT — A fast, non-generic entry point for listeners who do not know P34nuts yet. */
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { HomeShopConversion } from "@/components/HomeShopConversion";
import {
  DISCOVERY_ROTATION_INTERVAL_MS,
  discoveryPaths,
  getRotatingDiscoveryPaths,
  getTrackBySlug,
} from "@/data/artistData";

export function DiscoveryRail() {
  const reduceMotion = useReducedMotion();
  const [paths, setPaths] = useState(() => discoveryPaths);
  const [flippingSlots, setFlippingSlots] = useState<number[]>([]);
  const [navigationLocked, setNavigationLocked] = useState(false);
  const pathsRef = useRef(paths);
  const flipTimeoutsRef = useRef<number[]>([]);

  const prepareTopNavigation = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const handleDiscoveryClick = () => {
    prepareTopNavigation();
    setNavigationLocked(true);
  };

  useEffect(() => {
    pathsRef.current = paths;
  }, [paths]);

  useEffect(() => {
    if (navigationLocked) return;
    const clearFlipTimeouts = () => {
      flipTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      flipTimeoutsRef.current = [];
    };

    const runRotation = () => {
      clearFlipTimeouts();
      const nextPaths = getRotatingDiscoveryPaths(pathsRef.current.map((path) => path.trackSlug));

      if (reduceMotion) {
        pathsRef.current = nextPaths;
        setPaths(nextPaths);
        return;
      }

      nextPaths.forEach((nextPath, index) => {
        const startTimeout = window.setTimeout(() => {
          setFlippingSlots((slots) => Array.from(new Set([...slots, index])));

          const swapTimeout = window.setTimeout(() => {
            setPaths((currentPaths) => {
              const updatedPaths = currentPaths.map((path, pathIndex) => pathIndex === index ? nextPath : path);
              pathsRef.current = updatedPaths;
              return updatedPaths;
            });
          }, 280);

          const finishTimeout = window.setTimeout(() => {
            setFlippingSlots((slots) => slots.filter((slot) => slot !== index));
          }, 560);

          flipTimeoutsRef.current.push(swapTimeout, finishTimeout);
        }, index * 500);

        flipTimeoutsRef.current.push(startTimeout);
      });
    };

    const interval = window.setInterval(runRotation, DISCOVERY_ROTATION_INTERVAL_MS);
    return () => {
      window.clearInterval(interval);
      clearFlipTimeouts();
    };
  }, [navigationLocked, reduceMotion]);

  return (
    <>
      <section id="start-here" className="discovery-section" aria-labelledby="discovery-title">
        <div className="section-wrap">
          <div className="discovery-heading"><p className="eyebrow">Start here / new listener guide</p><h2 id="discovery-title">FIND YOUR<br /><em>ENTRY.</em></h2><p>Kein Kontext nötig. Such dir einen Einstieg nach Stimmung aus – der Rest folgt im Archiv.</p></div>
          <div className="discovery-grid">
            {paths.map((path, index) => {
              const track = getTrackBySlug(path.trackSlug);
              if (!track) return null;
              const isFlipping = flippingSlots.includes(index);
              return <Link key={index} href={`/music/${track.slug}`} onClick={handleDiscoveryClick} className={`discovery-card discovery-card--cover ${isFlipping ? "discovery-card--flipping" : ""} ${track.coverStyle}`}><img className="discovery-card-cover" src={track.cover} alt="" loading="lazy" decoding="async" /><span>0{index + 1} / {path.label}</span><strong>{track.title}</strong><p>{path.title}</p><ArrowUpRight size={17} /></Link>;
            })}
          </div>
        </div>
      </section>
      <HomeShopConversion />
    </>
  );
}
