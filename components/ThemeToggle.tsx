"use client";

import { useSyncExternalStore } from "react";
import { getCommon } from "@/lib/content/common";
import type { Locale } from "@/lib/i18n";
import { Icon } from "./IconSprite";

type Theme = "light" | "dark";

/**
 * The <html data-theme> attribute is the source of truth (the inline script in
 * the layout sets it before first paint). Subscribing to the attribute rather
 * than keeping local state means every instance of this button — header and
 * mobile menu — stays in step without a context or a store.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// On the server we do not know the visitor's theme, so the button renders as an
// invisible placeholder of the same size: no layout shift, no hydration warning.
function getServerSnapshot(): "" {
  return "";
}

export default function ThemeToggle({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = getCommon(lang);

  if (!theme) {
    return <span className={`theme-toggle ${className}`.trim()} aria-hidden="true" style={{ visibility: "hidden" }} />;
  }

  const isDark = theme === "dark";
  const label = isDark ? t.themeToLight : t.themeToDark;

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Icon id={isDark ? "i-sunny" : "i-moon"} size={16} />
    </button>
  );
}
