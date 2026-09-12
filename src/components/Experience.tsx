import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          02 / Experience
        </p>

        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve worked.
        </h2>

        <div className="space-y-12">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="grid gap-4 border-l border-zinc-800 pl-6 md:grid-cols-[180px_1fr]"
            >
              <p className="font-mono text-sm text-zinc-600">
                {job.period}
              </p>

              <div>
                <h3 className="text-xl font-semibold">{job.role}</h3>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-zinc-400 hover:text-white"
                >
                  {job.company} ↗
                </a>

                <p className="mt-4 max-w-3xl leading-relaxed text-zinc-500">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}