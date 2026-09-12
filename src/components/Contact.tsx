import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
        {/* Section label */}
        <p className="mb-14 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
          06 / Contact
        </p>

        {/* Main content */}
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          {/* Left */}
          <div>
            <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Let&apos;s work
              <br />
              <span className="text-zinc-500">together.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
              Have a project, opportunity, or just want to talk software?
              Feel free to reach out.
            </p>
          </div>

          {/* Right */}
          <div className="lg:pt-2">
            <div className="border-t border-white/10 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                Email
              </p>

              <a
                href={profile.links.email}
                className="group mt-3 flex w-fit items-center gap-2 text-base text-zinc-300 transition hover:text-white sm:text-lg"
              >
                {profile.email}

                <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                Elsewhere
              </p>

              <div className="mt-3 flex gap-6">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  GitHub ↗
                </a>

                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}