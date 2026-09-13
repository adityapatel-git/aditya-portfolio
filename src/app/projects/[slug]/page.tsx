import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-12">
        {/* Back */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-zinc-600 transition hover:text-zinc-300"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to projects
        </Link>

        {/* Header */}
        <header className="mt-24">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            <span>
              {project.status}
            </span>

            <span className="h-px w-6 bg-zinc-800" />

            <span>
              {project.featured
                ? "Featured project"
                : "Project"}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-[-0.04em] sm:text-7xl">
            {project.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-500 sm:text-xl">
            {project.shortDescription}
          </p>

          {/* Links */}
          {(project.url || project.github) && (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white"
                >
                  Live Demo
                  <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                  GitHub
                  <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Project metadata */}
        <div className="mt-16 grid border-y border-white/10 sm:grid-cols-[1fr_2fr]">
          <div className="border-b border-white/5 py-5 sm:border-b-0 sm:border-r sm:pr-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Project
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              {project.name}
            </p>
          </div>

          <div className="py-5 sm:pl-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Stack
            </p>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {project.techStack.map((technology) => (
                <span
                  key={technology}
                  className="text-sm text-zinc-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mt-20">
          <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              01 / Overview
            </p>

            <div>
              <p className="max-w-3xl text-lg leading-8 text-zinc-400">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Technical focus */}
        {project.slug === "hallsight" && (
          <section className="mt-20 border-t border-white/5 pt-10">
            <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                02 / Technical focus
              </p>

              <div className="grid gap-8 sm:grid-cols-2">
                <TechnicalItem
                  title="Backend"
                  description="RESTful APIs with authentication, authorization, and role-based access control."
                />

                <TechnicalItem
                  title="Database"
                  description="MySQL database operations implemented through Prisma ORM and defined using entity-relationship models."
                />

                <TechnicalItem
                  title="Application"
                  description="Designed for real-time event seat occupancy and attendance tracking."
                />

                <TechnicalItem
                  title="Tooling"
                  description="Postman used for API development and testing alongside the Next.js application stack."
                />
              </div>
            </div>
          </section>
        )}

        {project.slug === "canteen-point" && (
          <section className="mt-20 border-t border-white/5 pt-10">
            <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                02 / What it does
              </p>

              <div className="grid gap-8 sm:grid-cols-3">
                <TechnicalItem
                  title="Orders"
                  description="Interface for streamlining customer order placement."
                />

                <TechnicalItem
                  title="Payments"
                  description="Payment processing functionality within the canteen workflow."
                />

                <TechnicalItem
                  title="Inventory"
                  description="Inventory management backed by MySQL data storage."
                />
              </div>
            </div>
          </section>
        )}

        {/* Bottom navigation */}
        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600 transition hover:text-zinc-300"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All projects
          </Link>

          <Link
            href="/#contact"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600 transition hover:text-zinc-300"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

function TechnicalItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-zinc-300">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-600">
        {description}
      </p>
    </div>
  );
}