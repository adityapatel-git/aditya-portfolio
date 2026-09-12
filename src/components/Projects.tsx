import Link from "next/link";
import { projects } from "@/data/projects";

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-28">
        {/* Heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
              03 / Projects
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Things I&apos;ve built.
            </h2>
          </div>

          <Link
            href="/projects"
            className="group flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-600 transition hover:text-zinc-300"
          >
            View all
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Featured projects */}
        <div className="space-y-5">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] transition duration-300 hover:border-white/20 hover:bg-white/[0.025]"
            >
              {/* Decorative background */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/[0.025] blur-3xl transition duration-500 group-hover:bg-white/[0.05]" />

              <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* Project information */}
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-700">
                      0{index + 1}
                    </span>

                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-20">
                    <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {project.name}
                    </h3>

                    <p className="mt-5 max-w-xl text-base leading-7 text-zinc-500">
                      {project.shortDescription}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-zinc-600 transition-colors group-hover:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project preview */}
                <div className="relative min-h-[280px] overflow-hidden border-t border-white/10 bg-zinc-950 lg:min-h-[420px] lg:border-l lg:border-t-0">
                  {/* Grid */}
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Abstract project preview */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-zinc-900/80 shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:border-white/20">
                      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />
                        <span className="h-2 w-2 rounded-full bg-zinc-700" />

                        <span className="ml-auto font-mono text-[9px] text-zinc-700">
                          {project.name.toLowerCase()}
                        </span>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="h-2 w-24 rounded bg-zinc-700" />
                        <div className="h-2 w-40 rounded bg-zinc-800" />

                        <div className="grid grid-cols-3 gap-2 pt-3">
                          <div className="h-16 rounded-lg border border-white/5 bg-zinc-950" />
                          <div className="h-16 rounded-lg border border-white/5 bg-zinc-950" />
                          <div className="h-16 rounded-lg border border-white/5 bg-zinc-950" />
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="h-2 w-full rounded bg-zinc-800" />
                          <div className="h-2 w-4/5 rounded bg-zinc-800" />
                          <div className="h-2 w-3/5 rounded bg-zinc-800" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950 text-zinc-500 transition duration-300 group-hover:border-white/30 group-hover:text-white">
                    ↗
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}