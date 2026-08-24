import { altitudeCeiling, altitudeFloor, regions, type RegionKey } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

const X0 = 200;
const X1 = 830;
const A0 = 1350;
const A1 = 2050;
const H = 364;
const AXIS_Y = 334;
const ROW_H = 46;
const ROW0 = 64;

function x(alt: number) {
  return X0 + ((alt - A0) * (X1 - X0)) / (A1 - A0);
}

export default function AltitudeChart({
  lang,
  regionNames,
  zoneLabel,
  unit,
  ariaLabel,
}: {
  lang: Locale;
  regionNames: Record<RegionKey, string>;
  /** Band caption over the specialty zone, e.g. "SPECIALTY ZONE · 1,600–2,000 M". */
  zoneLabel: string;
  /** Altitude unit, "m" / "м". */
  unit: string;
  /** Sentence for screen readers; a "{range}" token is replaced by the sourced altitude span. */
  ariaLabel: string;
}) {
  const ticks = [1400, 1600, 1800, 2000];
  const sourced = range(altitudeFloor, altitudeCeiling, lang);

  return (
    <svg
      className="alt-svg"
      viewBox={`0 0 940 ${H}`}
      role="img"
      aria-label={ariaLabel.replace("{range}", sourced)}
    >
      <rect className="zone" x={x(1600)} y={44} width={x(2000) - x(1600)} height={AXIS_Y - 44} />
      <text className="zlab" x={x(1600) + 10} y={36}>
        {zoneLabel}
      </text>

      {ticks.map((a) => (
        <g key={a}>
          <line className="grid" x1={x(a)} y1={44} x2={x(a)} y2={AXIS_Y} />
          <text className="tick" x={x(a)} y={AXIS_Y + 20} textAnchor="middle">
            {num(a, lang)}
          </text>
        </g>
      ))}
      <line className="grid" x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} />

      {regions.map((r, i) => {
        const y = ROW0 + i * ROW_H;
        return (
          <g key={r.key}>
            <text className="rlab" x={0} y={y - 2}>
              {regionNames[r.key]}
            </text>
            <text className="rmeta" x={0} y={y + 14}>
              {r.varieties}
            </text>
            <rect className="band-fill" x={x(r.minAlt)} y={y - 7} width={x(r.maxAlt) - x(r.minAlt)} height={14} rx={2} />
            <line className="ridge" x1={x(r.minAlt)} y1={y} x2={x(r.maxAlt)} y2={y} />
            <circle className="pin" cx={x(r.minAlt)} cy={y} r={4.5} />
            <circle className="pin" cx={x(r.maxAlt)} cy={y} r={4.5} />
            <text className="rmeta" x={x(r.maxAlt) + 14} y={y + 4}>
              {range(r.minAlt, r.maxAlt, lang)} {unit}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
