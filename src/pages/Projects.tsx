import { PageShell } from "../components/PageShell";
import { ProjectCard } from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";
import "./Projects.css";

export function Projects() {
  return (
    <PageShell className="projects-page">
      <div className="projects">
        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
