export const CASE_STUDY_NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "problem-space", label: "Problem Space" },
  { id: "user-flow", label: "User Flow" },
  { id: "opportunity", label: "Opportunity & Ideation" },
  { id: "final-design", label: "Final Design" },
  { id: "ui-kit", label: "UI Kit / Design System" },
  { id: "reflection", label: "Reflection" },
] as const;

/** Case study images live under public/case-study/nini-cake. */
export const CASE_STUDY_IMG = "/case-study/nini-cake";

export function getCaseStudyToolbarMeta(meta: string): string {
  const parts = meta.split("·").map((part) => part.trim());
  if (parts.length > 1) {
    return parts.slice(1).join(" · ");
  }
  return meta;
}

export function getCaseStudyBadgeLabel(meta: string, title: string): string {
  const label = meta.split("·")[0]?.trim();
  return label || title.toUpperCase();
}
