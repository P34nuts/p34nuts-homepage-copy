/**
 * NOIR CUT DESIGN REMINDER — Small monospaced frame captions and Cut Red register marks
 * provide documentary precision between the large editorial compositions.
 */

type SectionLabelProps = {
  index: string;
  label: string;
  align?: "left" | "right";
};

export function SectionLabel({ index, label, align = "left" }: SectionLabelProps) {
  return (
    <div className={`section-label ${align === "right" ? "section-label-right" : ""}`}>
      <span className="section-cut" aria-hidden="true" />
      <span className="section-index">{index}</span>
      <span>{label}</span>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}
