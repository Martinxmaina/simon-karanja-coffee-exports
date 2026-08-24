type Point = { x: number; y: number; anchor: "start" | "middle" | "end"; up: boolean };

// Geometry only — Nairobi, Mombasa, Novorossiysk, St Petersburg, inland Russia.
const A: Point = { x: 56, y: 124, anchor: "start", up: true };
const B: Point = { x: 214, y: 124, anchor: "middle", up: true };
const C: Point = { x: 524, y: 60, anchor: "middle", up: true };
const D: Point = { x: 524, y: 188, anchor: "middle", up: false };
const E: Point = { x: 700, y: 124, anchor: "end", up: true };

const points = [A, B, C, D, E];

export default function RouteMap({
  nodes,
  legFast,
  legSlow,
  ariaLabel,
}: {
  /** Five labels in geographic order: origin warehouse, load port, two discharge ports, inland. */
  nodes: { label: string; meta: string }[];
  /** Caption over the northern lane, e.g. "BY SEA · 25–32 DAYS". */
  legFast: string;
  /** Caption under the southern lane. */
  legSlow: string;
  ariaLabel: string;
}) {
  return (
    <svg className="route-svg" viewBox="0 0 760 250" role="img" aria-label={ariaLabel}>
      <line className="lane-live" x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
      <path className="lane-live" fill="none" d={`M${B.x} ${B.y} C 330 ${B.y}, 390 ${C.y}, ${C.x} ${C.y}`} />
      <path className="lane-live" fill="none" d={`M${B.x} ${B.y} C 330 ${B.y}, 390 ${D.y}, ${D.x} ${D.y}`} />
      <path className="lane" fill="none" strokeDasharray="3 4" d={`M${C.x} ${C.y} C 612 ${C.y}, 644 ${E.y}, ${E.x} ${E.y}`} />
      <path className="lane" fill="none" strokeDasharray="3 4" d={`M${D.x} ${D.y} C 612 ${D.y}, 644 ${E.y}, ${E.x} ${E.y}`} />
      <text className="leg" x={372} y={30} textAnchor="middle">
        {legFast}
      </text>
      <text className="leg" x={372} y={238} textAnchor="middle">
        {legSlow}
      </text>
      {points.map((p, i) => {
        const n = nodes[i] ?? { label: "", meta: "" };
        return (
          <g key={i}>
            <circle className="node" cx={p.x} cy={p.y} r={7} />
            <circle className="node-fill" cx={p.x} cy={p.y} r={3} />
            <text className="nlab" x={p.x} y={p.y + (p.up ? -24 : 32)} textAnchor={p.anchor}>
              {n.label.toUpperCase()}
            </text>
            <text className="nmeta" x={p.x} y={p.y + (p.up ? -39 : 47)} textAnchor={p.anchor}>
              {n.meta}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
