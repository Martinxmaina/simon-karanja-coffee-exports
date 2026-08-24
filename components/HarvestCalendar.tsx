import { calendarLanes, type LaneKey } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

const cellClass = {
  main: "cell cell--main",
  fly: "cell cell--fly",
  process: "cell cell--process",
} as const;

export default function HarvestCalendar({
  months,
  laneLabels,
  legend,
}: {
  /** Accepted for API symmetry with the other figures; the calendar prints no numbers. */
  lang?: Locale;
  /** Twelve short month names, Jan..Dec. */
  months: string[];
  laneLabels: Record<LaneKey, string>;
  /** Three swatch captions: main crop, fly crop, processing / shipping. */
  legend: string[];
}) {
  return (
    <div className="cal-in">
      <div className="cal-months">
        <span></span>
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      {calendarLanes.map((lane) => (
        <div className="cal-row" key={lane.key}>
          <span className="cal-lab">{laneLabels[lane.key]}</span>
          {lane.months.map((on, i) => (
            <span key={i} className={on ? cellClass[lane.kind] : "cell"} />
          ))}
        </div>
      ))}
      <div className="legend">
        <div>
          <span className="sw sw--main"></span>{legend[0]}
        </div>
        <div>
          <span className="sw sw--fly"></span>{legend[1]}
        </div>
        <div>
          <span className="sw sw--process"></span>{legend[2]}
        </div>
      </div>
    </div>
  );
}
