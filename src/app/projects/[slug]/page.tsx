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
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Back */}
        <a
          href="/#projects"
          className="font-mono text-sm text-zinc-600 transition hover:text-zinc-300"
        >
          ← Back to projects
        </a>

        {/* Header */}
        <header className="mt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
              {project.status}
            </span>

            {project.featured && (
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
            {project.name}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-500">
            {project.shortDescription}
          </p>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                Live Demo ↗
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="my-16 h-px bg-zinc-900" />

        {/* Description */}
        <section>
          <p className="font-mono text-sm text-zinc-600">
            project.overview
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">
            {project.description}
          </p>
        </section>

        {/* Technology */}
        <section className="mt-16">
          <p className="font-mono text-sm text-zinc-600">
            technology.stack
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* Future content */}
        <section className="mt-20">
          <p className="font-mono text-sm text-zinc-600">
            more.coming_soon()
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Placeholder title="Architecture" />

            <Placeholder title="Screenshots" />

            <Placeholder title="Technical details" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-800 p-6">
      <p className="text-sm text-zinc-500">{title}</p>

      <p className="mt-2 text-xs text-zinc-700">
        Coming soon
      </p>
    </div>
  );
}