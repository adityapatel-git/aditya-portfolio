import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          03 / Projects
        </p>

        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I&apos;ve built.
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900/60"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold">{project.name}</h3>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 transition group-hover:text-white"
                >
                  ↗
                </a>
              </div>

              <p className="mt-4 leading-relaxed text-zinc-500">
                {project.description}
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

              <div className="mt-6 flex gap-4 text-sm">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-300 hover:text-white"
                >
                  Live ↗
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-500 hover:text-zinc-300"
                >
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}