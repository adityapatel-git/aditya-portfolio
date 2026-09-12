import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          01 / About
        </p>

        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          A little about me.
        </h2>

        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-relaxed text-zinc-400">
            <p>
              I&apos;m a software engineer focused on backend development,
              enterprise applications, and cloud technologies.
            </p>

            <p>
              My experience spans .NET, ASP.NET, C#, SQL Server, REST APIs,
              and modern web technologies. I enjoy turning complex
              requirements into reliable, maintainable software.
            </p>

            <p>
              I&apos;m currently pursuing a{" "}
              <span className="text-zinc-200">
                Master&apos;s in Applied Computer Science at Dalhousie
                University
              </span>
              .
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-sm text-zinc-500">
              technologies.i_use()
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}