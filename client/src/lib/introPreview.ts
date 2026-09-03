/** A non-linked QA switch that keeps the intro overlay visible for visual checks. */
export function shouldShowIntroPreview(search: string) {
  return new URLSearchParams(search).get("intro") === "1";
}
