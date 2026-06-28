import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ContactLinks } from "./ContactLinks";
import { LocationBadge } from "./LocationBadge";
import { WeatherWidget } from "./WeatherWidget";
import { BottomNav } from "./BottomNav";
import "./PageShell.css";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={`page-shell${className ? ` ${className}` : ""}`}>
      <header className="page-shell__header">
        <ContactLinks />
        <ThemeToggle />
      </header>

      <main className="page-shell__main">{children}</main>

      <footer className="page-shell__bottom">
        <LocationBadge />
        <BottomNav />
        <WeatherWidget />
      </footer>
    </div>
  );
}
