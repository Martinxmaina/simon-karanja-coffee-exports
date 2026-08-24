"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { observeReveal } from "@/lib/revealObserver";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export default function Reveal({
  children,
  className = "",
  onReveal,
}: {
  children: ReactNode;
  className?: string;
  onReveal?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion) {
      onReveal?.();
      return;
    }
    const el = ref.current;
    if (!el) return;
    return observeReveal(el, () => {
      setVisible(true);
      onReveal?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const shown = reducedMotion || visible;

  return (
    <div ref={ref} className={`rv${shown ? " in" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
