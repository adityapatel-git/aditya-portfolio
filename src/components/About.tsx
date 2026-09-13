import { profile } from "@/data/profile";

const skillGroups = [
  {
    label: "Backend",
    skills: [
      "C#",
      ".NET",
      "ASP.NET",
      "Node.js",
      "Express.js",
    ],
  },
  {
    label: "Frontend",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Kendo UI",
      "jQuery",
      "Ext.js",
    ],
  },
  {
    label: "Data",
    skills: [
      "SQL Server",
      "Oracle DB",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    skills: [
      "Azure",
      "Google Cloud",
      "Docker",
      "Terraform",
      "Nginx",
    ],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-[100svh] snap-start items-center border-t border-white/5"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mb-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
          01 / About
        </p>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Engineer by trade.
          <br />
          <span className="text-zinc-500">
            Curious about everything underneath.
          </span>
        </h2>
      </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div className="max-w-xl space-y-6 text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            <p>
              I&apos;m a software engineer with experience building and
              maintaining enterprise applications using C#, .NET, ASP.NET,
              SQL, and modern JavaScript frameworks.
            </p>

            <p>
              At MRI Software, I work on legacy modernization, application
              performance, bug resolution, and maintaining existing .NET
              systems. My experience also includes migrating legacy ExtJS
              functionality to Kendo UI and working with Oracle databases.
            </p>

            <p>
              Outside enterprise software, I enjoy building full-stack
              systems, experimenting with cloud infrastructure, and
              understanding how applications work from the database to the
              deployment layer.
            </p>

            <p>
              Currently pursuing a{" "}
              <span className="text-zinc-200">
                Master&apos;s in Applied Computer Science
              </span>{" "}
              at Dalhousie University.
            </p>
          </div>

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
                  className="grid gap-4 py-5 sm:grid-cols-[150px_1fr]"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                    {group.label}
                  </span>

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm text-zinc-400"
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


      </div>
    </section>
  );
}