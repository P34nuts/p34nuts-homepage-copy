/**
 * NOIR CUT DESIGN REMINDER — Kinetic type strips are editorial transitions, never decoration.
 * They carry a restrained, continuous rhythm in Paper White and Cut Red.
 */

type MarqueeProps = {
  text: string;
  reverse?: boolean;
};

export function Marquee({ text, reverse = false }: MarqueeProps) {
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`} aria-label={text}>
      <div className="marquee-track" aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
