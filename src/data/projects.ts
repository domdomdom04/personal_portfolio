export type ProjectPreview = {
  background: string;
  mock: "nini-cake" | "trade-me" | "datacom" | "eden-park";
};

export type Project = {
  id: string;
  title: string;
  descriptor: string;
  meta: string;
  href?: string;
  preview: ProjectPreview;
};

export const PROJECTS: Project[] = [
  {
    id: "datacom-tip",
    title: "Datacom Technical Intelligence Platform",
    descriptor: "surfacing software health at scale",
    meta: "DATACOM · AI 2025",
    href: "/projects/datacom-tip",
    preview: {
      background: "#d8eaf5",
      mock: "datacom",
    },
  },
  {
    id: "eden-park",
    title: "Eden Park Powerade G9 Scoring System",
    descriptor: "live scoring for a golf tournament",
    meta: "EDEN PARK · SHIPPED 2025",
    href: "/projects/eden-park",
    preview: {
      background: "#d8eaf5",
      mock: "eden-park",
    },
  },
  {
    id: "nini-cake",
    title: "Nini Cake",
    descriptor: "custom cake website for a local business",
    meta: "NINI CAKE · WEB 2025",
    href: "/projects/nini-cake",
    preview: {
      background: "#d8eaf5",
      mock: "nini-cake",
    },
  },
  {
    id: "trade-me",
    title: "Trade Me",
    descriptor: "improving the online browsing experience",
    meta: "TRADE ME · WEB · MOBILE 2025",
    href: "/projects/trade-me",
    preview: {
      background: "#f5f0d4",
      mock: "trade-me",
    },
  },
];
