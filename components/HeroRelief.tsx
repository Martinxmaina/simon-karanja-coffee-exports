"use client";

import { useEffect, useRef } from "react";

export default function HeroRelief() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    function draw() {
      const host = canvas!.parentElement;
      if (!host) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      const g = canvas!.getContext("2d");
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);

      const css = getComputedStyle(document.documentElement);
      g.strokeStyle = (css.getPropertyValue("--on-band-2") || "#A3B7A8").trim();
      g.lineWidth = 1;

      const layers = 26;
      const base = h * 1.02;
      const span = h * 0.94;
      for (let l = 0; l < layers; l++) {
        const t = l / (layers - 1);
        g.globalAlpha = 0.075 + 0.085 * (1 - t);
        g.beginPath();
        for (let px = -20; px <= w + 20; px += 6) {
          const p = px / w;
          const ridge =
            Math.sin(p * 3.1 + 0.6) * 0.42 +
            Math.sin(p * 7.4 + 1.9) * 0.19 +
            Math.sin(p * 13.7 + 4.2) * 0.09 +
            Math.sin(p * 23.3 + 2.1) * 0.045;
          const y = base - span * (0.3 + 0.7 * t) * (0.55 + ridge);
          if (px === -20) g.moveTo(px, y);
          else g.lineTo(px, y);
        }
        g.stroke();
      }
      g.globalAlpha = 1;
    }

    draw();
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(draw, 150);
    };
    window.addEventListener("resize", onResize);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", draw);

    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", draw);
      clearTimeout(rt);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}
