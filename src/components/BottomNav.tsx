import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const RESUME_PATH = "/resume.pdf";
const RESUME_FILENAME = "Janna_Buaya_Resume.pdf";

type NavRouteItem = {
  type: "route";
  to: string;
  label: string;
  end?: boolean;
  icon: ReactNode;
};

type NavDownloadItem = {
  type: "download";
  label: string;
  icon: ReactNode;
};

const NAV_ITEMS: Array<NavRouteItem | NavDownloadItem> = [
  {
    type: "route",
    to: "/",
    label: "Home",
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    type: "route",
    to: "/projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2C6.48 2 2 6.48 2 12c0 3.86 2.28 7.19 5.57 8.72.45.2.93-.18.93-.68v-1.4c0-.55.45-1 1-1h1.6c2.21 0 4-1.79 4-4 0-.55.45-1 1-1h.4c1.1 0 2-.9 2-2v-.64C19.5 6.48 16.02 2 12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="9.5" r="0.9" fill="currentColor" />
        <circle cx="10.5" cy="6.5" r="0.9" fill="currentColor" />
        <circle cx="14" cy="7.5" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    type: "route",
    to: "/fun",
    label: "Fun",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5 14.2 9l5.8.5-4.4 3.8 1.3 5.7L12 16.8 7.1 19l1.3-5.7L4 9.5l5.8-.5L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    type: "route",
    to: "/about",
    label: "About Me",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "download",
    label: "Resume",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 3h8l4 4v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 3v4h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12h6M9 15h6M9 18h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const NAV_ACCENTS = ["blue", "yellow", "pink"] as const;

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <ul className="bottom-nav__list">
        {NAV_ITEMS.map((item, index) => {
          const accent = NAV_ACCENTS[index % NAV_ACCENTS.length];
          const accentClass = `bottom-nav__link--accent-${accent}`;

          return (
          <li key={item.type === "route" ? item.to : "resume"} className="bottom-nav__item">
            {item.type === "route" ? (
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `bottom-nav__link ${accentClass}${isActive ? " bottom-nav__link--active" : ""}`
                }
              >
                {item.icon}
                <span className="bottom-nav__tooltip">{item.label}</span>
              </NavLink>
            ) : (
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className={`bottom-nav__link ${accentClass}`}
              >
                {item.icon}
                <span className="bottom-nav__tooltip">{item.label}</span>
              </a>
            )}
          </li>
          );
        })}
      </ul>
    </nav>
  );
}
