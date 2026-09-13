import { education } from "@/data/education";

export default function Education() {
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
            Where I&apos;ve studied.
          </h2>
        </div>

        <div className="border-t border-white/10">
          {education.map((item, index) => (
            <article
              key={item.degree}
              className="group grid gap-6 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.015] sm:grid-cols-[80px_1fr_auto] sm:items-start sm:px-4"
            >
              {/* Number */}
              <span className="font-mono text-xs text-zinc-700">
                0{index + 1}
              </span>

              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-zinc-200">
                  {item.degree}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  {item.school}
                </p>

                {item.grade && (
                  <p className="mt-4 font-mono text-xs text-zinc-600">
                    {item.grade}
                  </p>
                )}
              </div>

              {/* Period */}
              <p className="font-mono text-xs text-zinc-600 sm:text-right">
                {item.period}
              </p>
            </article>
          ))}
        </div>
        {/* <div className="mt-12 border-t border-white/5 pt-6">
  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
    Certifications
  </p>

  <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
    <span className="text-sm text-zinc-400">
      Google Cloud Computing Foundations
    </span>

    <span className="text-sm text-zinc-600">
      NPTEL · 95 percentile
    </span>
  </div>
</div> */}
      </div>

    </section>
  );
}