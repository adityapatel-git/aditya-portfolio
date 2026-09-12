import { profile } from "@/data/profile";

const skillGroups = [
  {
    label: "Backend",
    skills: ["C#", ".NET Core", "ASP.NET", "Node.js"],
  },
  {
    label: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "KendoUI"],
  },
  {
    label: "Data",
    skills: ["Microsoft SQL Server", "OracleDB", "SSRS"],
  },
  {
    label: "Cloud & Tools",
    skills: ["Azure", "Docker", "Terraform"],
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-28">
        {/* Section heading */}
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            01 / About
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Engineer by trade.
            <br />
            <span className="text-zinc-500">Builder by nature.</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          {/* About text */}
          <div className="max-w-xl space-y-6 text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            <p>
              I&apos;m a software engineer focused on backend development,
              enterprise applications, and cloud technologies.
            </p>

            <p>
              I enjoy taking complex requirements and turning them into
              reliable, maintainable software. My experience spans .NET,
              ASP.NET, C#, SQL Server, REST APIs, and modern web technologies.
            </p>

            <p>
              Currently pursuing a{" "}
              <span className="text-zinc-200">
                Master&apos;s in Applied Computer Science
              </span>{" "}
              at Dalhousie University.
            </p>
          </div>

          {/* Skills */}
          <div>
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
                Technology
              </span>

              <span className="font-mono text-xs text-zinc-700">
                {profile.skills.length.toString().padStart(2, "0")} tools
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-4 py-5 sm:grid-cols-[120px_1fr]"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                    {group.label}
                  </span>

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm text-zinc-300 transition-colors hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Small metadata row */}
        <div className="mt-20 grid border-y border-white/5 sm:grid-cols-3">
          <div className="border-b border-white/5 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
              Focus
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Backend & Cloud
            </p>
          </div>

          <div className="border-b border-white/5 py-5 sm:border-b-0 sm:border-r sm:px-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
              Education
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Dalhousie University
            </p>
          </div>

          <div className="py-5 sm:px-6 sm:pr-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
              Location
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Canada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}