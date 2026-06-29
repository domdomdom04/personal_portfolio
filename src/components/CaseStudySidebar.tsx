import { useActiveSection } from "../hooks/useActiveSection";
import "./CaseStudySidebar.css";

export type CaseStudyNavItem = {
  id: string;
  label: string;
};

export const CASE_STUDY_ACCENT_COLORS = ["#7a9bb8", "#ede4a8", "#ebc4d8"] as const;

type CaseStudySidebarProps = {
  items: CaseStudyNavItem[];
  tryItYourselfHref?: string | null;
};

export function CaseStudySidebar({
  items,
  tryItYourselfHref = null,
}: CaseStudySidebarProps) {
  const sectionIds = items.map((item) => item.id);
  const { activeId, scrollToSection } = useActiveSection(sectionIds);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <aside className="case-study-sidebar" aria-label="Case study navigation">
      <nav className="case-study-sidebar__nav">
        <ul>
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const accent = CASE_STUDY_ACCENT_COLORS[index % CASE_STUDY_ACCENT_COLORS.length];

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={
                    isActive
                      ? "case-study-sidebar__link case-study-sidebar__link--active"
                      : "case-study-sidebar__link"
                  }
                  style={{ "--link-accent": accent } as React.CSSProperties}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {tryItYourselfHref ? (
          <a
            href={tryItYourselfHref}
            className="case-study-sidebar__cta"
            onClick={(e) => {
              if (!tryItYourselfHref.startsWith("#")) return;
              e.preventDefault();
              scrollToSection(tryItYourselfHref.slice(1));
            }}
          >
            try it yourself →
          </a>
        ) : null}
      </nav>
    </aside>
  );
}
