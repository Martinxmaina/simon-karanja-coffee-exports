import { Icon } from "./IconSprite";

const icons = ["i-cup", "i-leaf", "i-hands", "i-search"];

export default function WhyGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="why">
      {items.map((item, i) => (
        <div className="why-item" key={item.title}>
          <Icon id={icons[i]} size={26} className="ic" />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
