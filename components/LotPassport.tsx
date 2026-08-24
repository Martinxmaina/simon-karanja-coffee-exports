import { Icon } from "./IconSprite";

export function LotCard({
  rows,
  title,
  caption,
  foot,
}: {
  /** Label / value pairs, already locale-formatted by the page. */
  rows: [string, string][];
  /** Lot identifier, e.g. lotPassport.id. */
  title: string;
  /** Small caption beside the identifier, e.g. "lot passport". */
  caption: string;
  foot: string;
}) {
  return (
    <div className="lot">
      <div className="lot-h">
        <b>{title}</b>
        <span>{caption}</span>
      </div>
      <dl className="lot-body">
        {rows.map(([k, v]) => (
          <div className="lot-row" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="lot-foot">
        <Icon id="i-shield" size={16} className="ic" />
        <span>{foot}</span>
      </div>
    </div>
  );
}

export function Pledges({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="pledge">
      {items.map((p) => (
        <li key={p.title}>
          <Icon id="i-check" size={21} className="ic" />
          <div>
            <b>{p.title}</b>
            <p>{p.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
