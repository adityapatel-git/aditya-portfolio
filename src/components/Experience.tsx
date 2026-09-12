import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-28">
        {/* Heading */}
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            02 / Experience
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Where I&apos;ve worked.
            </h2>

            <p className="max-w-sm text-sm leading-6 text-zinc-600">
              Experience building and maintaining enterprise software in
              production environments.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10" />

          <div className="space-y-14">
            {experience.map((job, index) => (
              <article
                key={`${job.company}-${job.role}`}
                className="relative pl-10"
              >
                {/* Timeline marker */}
                <span className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-zinc-600 bg-zinc-950">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                </span>

                <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
                  {/* Date */}
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                      {job.period}
                    </p>

                    {index === 0 && (
                      <p className="mt-2 text-xs text-zinc-700">
                        Most recent
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                          {job.role}
                        </h3>

                        <a
                          href={job.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-500 transition hover:text-zinc-200"
                        >
                          {job.company}
                          <span>↗</span>
                        </a>
                      </div>

                      <span className="hidden font-mono text-xs text-zinc-700 sm:block">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
                      {job.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {job.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 border-t border-white/5 pt-6">
          <p className="font-mono text-xs text-zinc-700">
            SOFTWARE ENGINEERING · ENTERPRISE APPLICATIONS · CLOUD
          </p>
        </div>
      </div>
    </section>
  );
}