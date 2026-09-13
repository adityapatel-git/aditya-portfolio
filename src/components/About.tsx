import { getProfile, getSkills } from "@/lib/portfolio";

const categories = [
  "Backend",
  "Frontend",
  "Data",
  "Cloud & Infrastructure",
];

export default async function About() {
  const [profile, skills] = await Promise.all([
    getProfile(),
    getSkills(),
  ]);

  const groupedSkills = categories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  }));

  return (
    <section
      id="about"
      className="flex min-h-[100svh] snap-start items-center border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            01 / About
          </p>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Engineer by trade.
            <br />
            <span className="text-zinc-500">
              Curious about everything underneath.
            </span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl space-y-6 text-base leading-8 text-zinc-500">
            <p>
              {profile?.intro}
            </p>

            <p>
              I work primarily with enterprise .NET applications, legacy
              modernization, backend systems, databases, and cloud
              infrastructure. I also build full-stack applications when the
              problem calls for it.
            </p>

            <p>
              Currently pursuing a Master of Applied Computer Science at
              Dalhousie University while continuing to build and explore
              software outside of work.
            </p>
          </div>

          <div className="border-t border-white/10">
            {groupedSkills.map(({ category, skills }) => (
              <div
                key={category}
                className="grid grid-cols-[150px_1fr] gap-6 border-b border-white/10 py-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  {category}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-sm text-zinc-500"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}