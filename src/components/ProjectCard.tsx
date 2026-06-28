import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

function NiniCakeMock() {
  return (
    <div className="project-mock project-mock--nini">
      <div className="project-mock__nini-hero">
        <span className="project-mock__nini-logo">NINI CAKE</span>
        <div className="project-mock__nini-cakes" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function TradeMeMock() {
  return (
    <div className="project-mock project-mock--trade-me">
      <div className="project-mock__trade-desktop" aria-hidden="true">
        <div className="project-mock__trade-bar" />
        <div className="project-mock__trade-image" />
        <p>Wooden Desk</p>
      </div>
      <div className="project-mock__trade-mobile" aria-hidden="true">
        <div className="project-mock__trade-image" />
        <p>Wooden Desk</p>
      </div>
    </div>
  );
}

function DatacomMock() {
  return (
    <div className="project-mock project-mock--datacom" aria-hidden="true">
      <div className="project-mock__datacom-header" />
      <div className="project-mock__datacom-grid">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function EdenParkMock() {
  return (
    <div className="project-mock project-mock--eden" aria-hidden="true">
      <div className="project-mock__eden-header">Hole 2</div>
      <div className="project-mock__eden-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const { preview } = project;

  const mock =
    preview.mock === "nini-cake" ? (
      <NiniCakeMock />
    ) : preview.mock === "trade-me" ? (
      <TradeMeMock />
    ) : preview.mock === "datacom" ? (
      <DatacomMock />
    ) : (
      <EdenParkMock />
    );

  return (
    <div
      className="project-card__preview"
      style={{ background: preview.background }}
    >
      {mock}
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [hovering, setHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const card = (
    <>
      <ProjectPreview project={project} />
      <div className="project-card__footer">
        <h2 className="project-card__descriptor">{project.descriptor}</h2>
        <p className="project-card__meta">{project.meta}</p>
      </div>
    </>
  );

  const tooltip =
    hovering &&
    createPortal(
      <span
        className="hover-tooltip hover-tooltip--icon"
        style={{ left: mousePos.x + 18, top: mousePos.y + 18 }}
      >
        <svg
          className="hover-tooltip__star"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5 14.4 8.6l6.4.6-4.8 4.2 1.4 6.2L12 16.9 6.6 19.6 8 13.4 3.2 9.2l6.4-.6L12 2.5Z" />
        </svg>
        view case study
      </span>,
      document.body
    );

  const pointerHandlers = {
    onPointerEnter: (e: React.PointerEvent) => {
      setHovering(true);
      setMousePos({ x: e.clientX, y: e.clientY });
    },
    onPointerMove: handlePointerMove,
    onPointerLeave: () => setHovering(false),
  };

  if (project.href?.startsWith("/")) {
    return (
      <Link className="project-card" to={project.href} {...pointerHandlers}>
        {card}
        {tooltip}
      </Link>
    );
  }

  if (project.href) {
    return (
      <a className="project-card" href={project.href} {...pointerHandlers}>
        {card}
        {tooltip}
      </a>
    );
  }

  return (
    <article
      className="project-card"
      onPointerEnter={(e) => {
        setHovering(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      {card}
      {tooltip}
    </article>
  );
}
