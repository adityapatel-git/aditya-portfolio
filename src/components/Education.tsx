import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          05 / Education
        </p>

        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          Where I&apos;ve studied.
        </h2>

        <div className="space-y-8">
          {education.map((item) => (
            <div
              key={item.degree}
              className="flex flex-col justify-between gap-3 border-b border-zinc-900 pb-8 sm:flex-row"
            >
              <div>
                <h3 className="text-lg font-medium">{item.degree}</h3>

                <p className="mt-1 text-zinc-500">{item.school}</p>

                {item.grade && (
                  <p className="mt-2 font-mono text-sm text-zinc-600">
                    {item.grade}
                  </p>
                )}
              </div>

              <p className="font-mono text-sm text-zinc-600">
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}