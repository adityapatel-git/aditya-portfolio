import Link from "next/link";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-[100svh] snap-start items-center border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            03 / Projects
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Things I&apos;ve built.
            </h2>

            <p className="max-w-md text-sm leading-6 text-zinc-600">
              Applications, experiments, and systems built across different
              technologies.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="border-t border-white/10">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block border-b border-white/10 py-7 transition-colors hover:bg-white/[0.015] sm:py-9"
            >
              <div className="grid gap-6 sm:grid-cols-[70px_1fr_auto] sm:items-start">
                {/* Number */}
                <span className="font-mono text-xs text-zinc-700">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Main content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-200 transition-colors group-hover:text-white sm:text-3xl">
                      {project.name}
                    </h3>

                    {project.featured && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                    {project.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 transition-colors group-hover:text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <span className="hidden text-xl text-zinc-700 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-200 sm:block">
                  ↗
                </span>
              </div>

              {/* Mobile arrow */}
              <div className="mt-5 flex items-center justify-between sm:hidden">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-700">
                  View project
                </span>

                <span className="text-lg text-zinc-700 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-zinc-200">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
          <span>{projects.length.toString().padStart(2, "0")} projects</span>

          <span>Selected work</span>
        </div>
      </div>
    </section>
  );
}