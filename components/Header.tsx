"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { getCommon } from "@/lib/content/common";
import { company, navOrder, routes, type RouteKey } from "@/lib/data";
import { hrefFor, type Locale } from "@/lib/i18n";
import { Icon } from "./IconSprite";
import LangSwitcher from "./LangSwitcher";
import ThemeToggle from "./ThemeToggle";

/**
 * Nine routes do not fit one row in either language — "Контроль качества" and
 * "Вопросы и ответы" alone eat ~280px — so the header row carries the five a
 * buyer actually navigates between and the menu panel carries all nine. The
 * button is therefore visible at every width, not just on phones.
 */
const PRIMARY: readonly RouteKey[] = ["products", "sourcing", "quality", "logistics", "contact"];

const PANEL_ID = "site-menu";

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const t = getCommon(lang);
  const panel = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // <dialog> already gives us the focus trap, Escape-to-close, focus restore
  // and an inert background. React only has to keep aria-expanded in step.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const items = navOrder.map((key) => ({
    key,
    href: hrefFor(lang, routes.find((r) => r.key === key)?.path ?? ""),
    label: t.nav[key],
  }));

  // Delegated: any link inside the panel closes it, so a client-side
  // navigation never leaves the sheet hanging over the new page. A click that
  // lands on the dialog itself is a click on the backdrop.
  function closeOnLinkOrBackdrop(event: MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement;
    if (target === event.currentTarget || target.closest("a")) setOpen(false);
  }

  return (
    <>
      <header className="top">
        <div className="shell top-in">
          <Link
            className="brand"
            href={hrefFor(lang, "")}
            aria-label={`${company.name} — ${t.nav.home}`}
          >
            {/* Three cherries on one branch — one large, two smaller — carrying
                the "& Sons" of the name. Sizes and positions are deliberately
                asymmetric: an even trio reads as a cartoon mouse.
                The --ground stroke separates overlapping fruit and tracks the
                header background (.top uses --ground) in both themes. */}
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="18.5" stroke="var(--forest)" strokeWidth="1.5" />
              <path
                d="M19.2 20.5C18.4 15 18.2 11.6 18.6 9.8"
                stroke="var(--forest)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M19 14c2.5.2 4.5-1.5 4.9-4-2.7-.4-4.7 1.2-4.9 4Z" fill="var(--brass)" />
              <circle cx="11.8" cy="20.2" r="3.8" fill="var(--cherry)" stroke="var(--ground)" strokeWidth="1.1" />
              <circle cx="27.2" cy="22.4" r="4.5" fill="var(--cherry)" stroke="var(--ground)" strokeWidth="1.1" />
              <circle cx="19.2" cy="24.2" r="6.1" fill="var(--cherry)" stroke="var(--ground)" strokeWidth="1.1" />
            </svg>
            <span className="brand-txt">
              <b>{company.shortName}</b>
              <span>{t.brandTagline}</span>
            </span>
          </Link>

          <nav className="nav" aria-label={t.mainNavLabel}>
            {items
              .filter((item) => PRIMARY.includes(item.key))
              .map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="top-actions">
            <LangSwitcher lang={lang} />
            <ThemeToggle lang={lang} />
            <Link className="btn top-cta" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {t.headerCta}
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls={PANEL_ID}
              aria-label={t.openMenu}
              onClick={() => setOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> on purpose: .top sets backdrop-filter, which
          makes it a containing block for its descendants. */}
      <dialog
        id={PANEL_ID}
        ref={panel}
        className="menu-panel"
        aria-label={t.menuLabel}
        onClose={() => setOpen(false)}
        onClick={closeOnLinkOrBackdrop}
      >
        <div className="menu-in">
          <div className="menu-head">
            {/* First focusable child, so showModal() lands focus here. */}
            <button
              type="button"
              className="theme-toggle menu-close"
              aria-label={t.closeMenu}
              onClick={() => setOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <span className="menu-title">{t.menuLabel}</span>
          </div>

          <nav className="menu-nav" aria-label={t.menuLabel}>
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="menu-foot">
            <Link className="btn" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {t.headerCta}
            </Link>
            <div className="menu-foot-row">
              <LangSwitcher lang={lang} />
              <ThemeToggle lang={lang} />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
