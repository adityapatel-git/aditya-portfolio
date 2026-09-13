import { getEducation } from "@/lib/portfolio";

export default async function Education() {
  const education = await getEducation();

  return (
    <section
      id="education"
      className="flex min-h-[100svh] snap-start items-center border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            05 / Education
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Academic background.
          </h2>
        </div>

        <div className="border-t border-white/10">
          {education.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-10"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                {item.period}
              </p>

              <div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-200 sm:text-2xl">
                  {item.degree}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {item.school}
                </p>
              </div>

              {item.grade && (
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                  {item.grade}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}