"use client";

import Image from "next/image";
import { Code, ExternalLink, Github } from "lucide-react";
import Card from "@/components/UI/Card";

type HostedProject = {
  id: number;
  name: string;
  description: string;
  image: string;
  liveUrl: string;
  repoUrl?: string;
  status: "Ongoing" | "Completed";
};

const hostedProjects: HostedProject[] = [
  {
    id: 1,
    name: "Efieplans",
    description:
      "Efie Plans designs luxury homes and commercial buildings for Ghanaians and Africans worldwide, creating personalized dream homes.",
    image: "https://res.cloudinary.com/dpzndrhse/image/upload/v1770855784/Screenshot_2026-02-12_002217_upoxvo.png",
    liveUrl: "https://efieplans.com",
    repoUrl: "https://github.com/yourname/efieplans",
    status: "Completed",
  },
  {
    id: 2,
    name: "News Blog Website",
    description:
      "Editorial CMS with categories, trending stories, and fast-loading article pages.",
    image: "", // Add your image URL
    liveUrl: "https://yourdomain.com/news",
    repoUrl: "https://github.com/yourname/news-blog",
    status: "Completed",
  },
  {
    id: 3,
    name: "School Management Website",
    description:
      "Student records, attendance, grading, and parent communication in one portal.",
    image: "", // Add your image URL
    liveUrl: "https://yourdomain.com/school",
    repoUrl: "https://github.com/yourname/school-management",
    status: "Ongoing",
  },
  {
    id: 4,
    name: "E-Commerce Website",
    description:
      "Product catalog, cart, and checkout with inventory and order tracking.",
    image: "", // Add your image URL
    liveUrl: "https://yourdomain.com/shop",
    repoUrl: "https://github.com/yourname/ecommerce-site",
    status: "Completed",
  },
  {
    id: 5,
    name: "Hotel Booking System",
    description:
      "Room availability, dynamic pricing, and reservation management for hotels.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d0?auto=format&fit=crop&w=900&q=80",
    liveUrl: "https://yourdomain.com/hotel",
    repoUrl: "https://github.com/yourname/hotel-booking",
    status: "Ongoing",
  },
];

export default function ProjectsGrid() {
  const renderHostedProjects = (projects: HostedProject[]) => (
    <div className="projects-grid">
      {projects.map((project) => (
        <Card key={project.id} className="projects-card projects-card-hosted">
          <div className="projects-card-media">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                className="projects-card-img"
                width={900}
                height={600}
              />
            ) : (
              <div className="projects-card-img projects-card-placeholder" />
            )}
          </div>
          <div className="projects-card-body">
            <div className="projects-card-row">
              <h3 className="projects-card-title">
                <Code className="projects-card-icon" />
                {project.name}
              </h3>
              <span
                className={`projects-card-status status-${project.status
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                {project.status}
              </span>
            </div>
            <p className="projects-card-desc">
              {project.description}
            </p>
            <div className="projects-card-actions">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-card-live"
              >
                <ExternalLink className="h-4 w-4" />
                Live Project
              </a>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-card-repo"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="projects-section">
      {renderHostedProjects(hostedProjects)}
    </div>
  );
}
