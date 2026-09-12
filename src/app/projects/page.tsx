import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="font-mono text-sm text-zinc-600 hover:text-zinc-300"
        >
          ← Home
        </Link>

        <header className="mt-20">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-600">
            Projects
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
            Things I&apos;ve built.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            A collection of software projects, experiments, and things I&apos;m
            currently building.
          </p>
        </header>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:-translate-y-1 hover:border-zinc-600"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-zinc-600">
                    {project.status}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    {project.name}
                  </h2>
                </div>

                <span className="text-zinc-600 group-hover:text-white">
                  ↗
                </span>
              </div>

              <p className="mt-4 leading-relaxed text-zinc-500">
                {project.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}