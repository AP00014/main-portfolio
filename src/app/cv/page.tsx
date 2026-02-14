import {
  Award,
  Briefcase,
  Code,
  Download,
  FileText,
  GraduationCap,
} from "lucide-react";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Tech Innovations Inc",
    period: "2022 - Present",
    description:
      "Developed scalable web applications using React, Node.js, and cloud services.",
    technologies: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Solutions Ltd",
    period: "2020 - 2022",
    description: "Built responsive interfaces and optimized web performance.",
    technologies: ["React", "Vue.js", "Sass", "Webpack"],
  },
];

const education = [
  {
    id: 1,
    degree: "BSc Computer Science",
    institution: "University of Technology",
    period: "2016 - 2020",
    description: "Specialized in software engineering and modern systems.",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
];

export default function CVPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Curriculum Vitae</h1>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Ask the Assistant about my experience or specific skills.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download PDF
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-b border-gray-200 pb-6 last:border-0 last:pb-0 dark:border-gray-700"
                >
                  <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="font-medium text-primary">{exp.company}</p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="font-medium text-primary">{edu.institution}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Skills</h2>
            </div>
            <div className="space-y-6">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-3 font-semibold text-primary">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Certifications</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                AWS Certified Developer
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                React Advanced Certification
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                Node.js Professional Certificate
              </li>
            </ul>
          </Card>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            <p className="font-semibold">Assistant Tips</p>
            <p className="mt-2">
              Try saying: &quot;What&apos;s your experience with React?&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
