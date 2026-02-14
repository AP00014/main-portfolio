import { Code, Filter } from "lucide-react";
import ProjectsGrid from "@/components/Sections/ProjectsGrid";
import Card from "@/components/UI/Card";

export default function ProjectsPage() {
  return (
    <div id="projects" className="projects-page">
      <div className="projects-hero">
        <div className="projects-hero-icon">
          <Code className="projects-hero-icon-svg" />
        </div>
        <h1 className="projects-hero-title">My Projects</h1>
        <p className="projects-hero-subtitle">
          Explore hosted case studies with images and live links, or switch to
          GitHub to see the repositories.
        </p>
      </div>

      <div className="projects-switcher">
        <div className="projects-switcher-text">
          <h2 className="projects-switcher-title">
            <Filter className="projects-switcher-icon" />
            Projects & GitHub
          </h2>
          <p className="projects-switcher-subtitle">
            Use the tabs to switch between hosted projects and GitHub repos.
          </p>
        </div>
      </div>

      <ProjectsGrid />

      <Card className="projects-assistant">
        <h3 className="projects-assistant-title">
          <Code className="projects-assistant-icon" />
          How to interact with the Assistant about projects
        </h3>
        <ul className="projects-assistant-list">
          <li className="projects-assistant-item">
            <span className="projects-assistant-dot" />
            Say <strong>&quot;Explain [project name]&quot;</strong> to get details
          </li>
          <li className="projects-assistant-item">
            <span className="projects-assistant-dot" />
            Say <strong>&quot;Show me [language] projects&quot;</strong> to filter
          </li>
          <li className="projects-assistant-item">
            <span className="projects-assistant-dot" />
            Say <strong>&quot;Latest project&quot;</strong> to see most recent
          </li>
          <li className="projects-assistant-item">
            <span className="projects-assistant-dot" />
            Say <strong>&quot;Most popular project&quot;</strong> to see top
            starred
          </li>
        </ul>
      </Card>
    </div>
  );
}
