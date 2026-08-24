import { Icon } from "./IconSprite";

const icons = ["i-cherry", "i-drop", "i-sun", "i-scale", "i-cup", "i-ship"];

export default function ChainSteps({
  steps,
  stepWord,
}: {
  steps: { title: string; text: string }[];
  /** "Step" / "Шаг" — prefixes the zero-padded step number. */
  stepWord: string;
}) {
  return (
    <div className="chain">
      {steps.map((step, i) => (
        <div className="step" key={step.title}>
          <p className="step-n">
            {stepWord} {String(i + 1).padStart(2, "0")}
          </p>
          <Icon id={icons[i]} size={22} className="ic" />
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </div>
  );
}
