import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

interface ProjectsGridProps {
  projects: Project[];
}

/**
 * Projects grid. Each card links to `/projects/[slug]` — the full
 * case study page. The legacy modal (`components/modals/project-modal.tsx`)
 * is no longer rendered here; it's left in the repo as a reference but
 * unused. Remove the file if you're confident you won't reintroduce a
 * modal preview flow.
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} priority={i < 3} />
      ))}
    </div>
  );
}
