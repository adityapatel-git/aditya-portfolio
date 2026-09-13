import { getExperiences } from "@/lib/portfolio";

export default async function Experience() {
  const experiences = await getExperiences();

  return (
    <section
      id="experience"
      className="flex min-h-[100svh] snap-start items-center border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            02 / Experience
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Where I&apos;ve worked.
            </h2>

            <p className="max-w-md text-sm leading-6 text-zinc-600">
              Experience building and maintaining software across enterprise
              applications and infrastructure.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="grid gap-6 border-b border-white/10 py-8 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-10"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                  {experience.period}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-200 sm:text-2xl">
                    {experience.role}
                  </h3>

                  {experience.url ? (
                    <a
                      href={experience.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-600 transition hover:text-zinc-300"
                    >
                      {experience.company} ↗
                    </a>
                  ) : (
                    <span className="text-sm text-zinc-600">
                      {experience.company}
                    </span>
                  )}
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
                  {experience.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {experience.tech_stack.map((technology: string) => (
                    <span
                      key={technology}
                      className="font-mono text-[10px] uppercase tracking-wider text-zinc-600"
                    >
                      {technology}
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