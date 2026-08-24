"use client";

import { useState } from "react";
import { cupBonusTotal, cupScores, cupTotal, type CupKey } from "@/lib/data";
import { num, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

const MIN = 6;
const MAX = 10;

export default function CuppingChart({
  lang,
  labels,
  caption,
  tableCaption,
  heads,
  bonusRow,
  totalRow,
  showTableLabel,
  outOfLabel = "/ 10",
}: {
  lang: Locale;
  labels: Record<CupKey, string>;
  /** Note under the chart: scale, sample size, how the bonus points are awarded. */
  caption: string;
  tableCaption: string;
  /** Two column headings: attribute, score. */
  heads: [string, string];
  /** Row label for sweetness · uniformity · clean cup. */
  bonusRow: string;
  totalRow: string;
  /** Summary text of the <details> table fallback. */
  showTableLabel: string;
  /** Tooltip suffix after the score, e.g. "out of 10" / "из 10". */
  outOfLabel?: string;
}) {
  const [active, setActive] = useState(false);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);

  function showTip(e: React.MouseEvent, label: string, value: number) {
    setTip({ x: e.clientX, y: e.clientY, text: `${label} · ${num(value, lang, 2)} ${outOfLabel}` });
  }

  return (
    <div>
      <Reveal onReveal={() => setActive(true)}>
        <div className="chart">
          {cupScores.map((s) => {
            const pct = Math.max(0, Math.min(100, ((s.value - MIN) / (MAX - MIN)) * 100));
            return (
              <div
                className="dotrow"
                key={s.key}
                onMouseMove={(e) => showTip(e, labels[s.key], s.value)}
                onMouseLeave={() => setTip(null)}
              >
                <span className="clab">{labels[s.key]}</span>
                <span className="dtrack">
                  <b style={{ left: active ? `${pct}%` : "0%" }}></b>
                </span>
                <span className="cval">{num(s.value, lang, 2)}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
      <div className="chart-axis">
        <span></span>
        <span className="ax">
          {[6, 7, 8, 9, 10].map((n) => (
            <span key={n}>{num(n, lang)}</span>
          ))}
        </span>
        <span></span>
      </div>
      <p className="chart-cap">{caption}</p>

      <details className="tv">
        <summary>{showTableLabel}</summary>
        <div className="tbl-wrap">
          <table>
            <caption>{tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">{heads[0]}</th>
                <th scope="col">{heads[1]}</th>
              </tr>
            </thead>
            <tbody>
              {cupScores.map((s) => (
                <tr key={s.key}>
                  <td>{labels[s.key]}</td>
                  <td className="n">{num(s.value, lang, 2)}</td>
                </tr>
              ))}
              <tr>
                <td>{bonusRow}</td>
                <td className="n">{num(cupBonusTotal, lang, 2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>{totalRow}</strong>
                </td>
                <td className="n">
                  <strong>{num(cupTotal, lang, 2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {tip && (
        <div className="tip on" style={{ left: tip.x, top: tip.y }} role="presentation">
          {tip.text}
        </div>
      )}
    </div>
  );
}
