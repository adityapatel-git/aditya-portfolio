const skills = [
  "C#",
  ".NET Core",
  "ASP.NET",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Microsoft SQL Server",
  "Docker",
  "Terraform",
  "Azure",
  "OracleDB",
  "KendoUI",
  "SSRS",
];

const projects = [
  {
    name: "Portfolio",
    description:
      "A minimal personal site built with Next.js and Tailwind CSS.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    url: "https://adityapatel.in",
  },
];

const experience = [
  {
    role: "Software Engineer I",
    company: "MRI Software",
    period: "May 2025 — May 2026",
    techStack: [".NET", "ASP.NET", "C#", "Microsoft SQL Server"],
    description:
      "Developed and maintained enterprise-grade applications using .NET, ASP.NET, C#, and Microsoft SQL Server. Designed scalable backend functionality, RESTful APIs, and database-driven solutions while collaborating with cross-functional teams in agile environments.",
  },
  {
    role: "Software Engineering Intern",
    company: "MRI Software",
    period: "January 2025 — April 2025",
    techStack: [".NET", "ASP.NET", "C#", "Microsoft SQL Server"],
    description:
      "Completed intensive .NET development training and gained practical experience with ASP.NET, C#, SQL Server, API integration, debugging, database operations, and enterprise software development practices.",
  },
];

const education = [
  {
    degree: "Masters in Applied Computer Science",
    school: "Dalhousie University",
    period: "September 2026 — Present",
  },
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "GSFC University",
    period: "June 2021 — May 2025",
    grade: "8.24/10 CGPA",
  },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="font-mono text-lg font-semibold">
            <span className="text-zinc-500">&lt;</span>
            AP
            <span className="text-zinc-500">/&gt;</span>
          </a>

          <div className="hidden gap-6 text-sm text-zinc-400 sm:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#experience" className="transition hover:text-white">
              Experience
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#education" className="transition hover:text-white">
              Education
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-20 pt-32">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-sm text-zinc-500">
            {`> hello, world`}
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-zinc-400">Aditya Patel.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400 sm:text-2xl">
            Software engineer focused on building scalable backend systems,
            cloud-native applications, and clean developer-first digital
            experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://github.com/adityapatel-git"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-900"
            >
              GitHub ↗
            </a>

            <a
              href="https://linkedin.com/in/4118adi"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-900"
            >
              LinkedIn ↗
            </a>

            <a
              href="mailto:patel.aditya@dal.ca"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-14 flex items-center gap-3 font-mono text-sm text-zinc-600">
            <span className="h-px w-10 bg-zinc-800" />
            @adityapatel
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="01 / About" title="A little about me." />

          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 text-lg leading-relaxed text-zinc-400">
              <p>
                I&apos;m a software engineer with a focus on backend
                development, enterprise applications, and cloud technologies.
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
                {skills.map((skill) => (
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

      {/* Experience */}
      <section id="experience" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow="02 / Experience"
            title="Where I've worked."
          />

          <div className="space-y-12">
            {experience.map((job) => (
              <article
                key={`${job.company}-${job.role}`}
                className="grid gap-4 border-l border-zinc-800 pl-6 md:grid-cols-[180px_1fr]"
              >
                <p className="font-mono text-sm text-zinc-600">{job.period}</p>

                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>

                  <p className="mt-1 text-zinc-400">{job.company}</p>

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

      {/* Projects */}
      <section id="projects" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading eyebrow="03 / Projects" title="Things I've built." />

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900/60"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-zinc-600 transition group-hover:text-white">
                    ↗
                  </span>
                </div>

                <p className="mt-4 leading-relaxed text-zinc-500">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <p className="mt-8 font-mono text-sm text-zinc-600">
            More projects coming soon...
          </p>
        </div>
      </section>

      {/* GitHub / LeetCode */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow="04 / Developer Activity"
            title="Code in public."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <a
              href="https://github.com/adityapatel-git"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-800 p-6 transition hover:border-zinc-600"
            >
              <p className="font-mono text-sm text-zinc-600">github.com</p>
              <h3 className="mt-3 text-2xl font-semibold">GitHub</h3>
              <p className="mt-3 text-zinc-500">
                Repositories, contributions, open-source work, and experiments.
              </p>
              <span className="mt-6 inline-block text-sm text-zinc-300">
                View GitHub ↗
              </span>
            </a>

            <a
              href="https://leetcode.com/u/4118adi/"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-800 p-6 transition hover:border-zinc-600"
            >
              <p className="font-mono text-sm text-zinc-600">leetcode.com</p>
              <h3 className="mt-3 text-2xl font-semibold">LeetCode</h3>
              <p className="mt-3 text-zinc-500">
                Problem solving, algorithms, data structures, and competitive
                programming.
              </p>
              <span className="mt-6 inline-block text-sm text-zinc-300">
                View LeetCode ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            eyebrow="05 / Education"
            title="Where I've studied."
          />

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

      {/* Contact */}
      <section id="contact" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-32">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-sm text-zinc-600">
              06 / Contact
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s build something.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-500">
              Whether it&apos;s a software project, an interesting problem, or
              just a conversation about technology, feel free to reach out.
            </p>

            <a
              href="mailto:patel.aditya@dal.ca"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              patel.aditya@dal.ca ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-8 text-sm text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Aditya Patel</p>

          <div className="flex gap-5">
            <a
              href="https://github.com/adityapatel-git"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/4118adi"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-300"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/4118adi/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-300"
            >
              LeetCode
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}