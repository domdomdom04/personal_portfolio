import { useCallback, useEffect, useState } from "react";

const SCROLL_OFFSET = 140;
const BOTTOM_THRESHOLD = 80;

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  const updateFromScroll = useCallback(() => {
    if (sectionIds.length === 0) return;

    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollBottom >= docHeight - BOTTOM_THRESHOLD) {
      setActiveId(sectionIds[sectionIds.length - 1]);
      return;
    }

    let current = sectionIds[0];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const { top } = el.getBoundingClientRect();
      if (top <= SCROLL_OFFSET) {
        current = id;
      }
    }

    setActiveId(current);
  }, [sectionIds]);

  useEffect(() => {
    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [updateFromScroll]);

  const scrollToSection = useCallback((id: string) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { activeId, scrollToSection };
}
