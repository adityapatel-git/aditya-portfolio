import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] snap-start items-center overflow-hidden">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Soft center glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
        <div className="max-w-5xl">

          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Building systems
            <br />
            <span className="text-zinc-500">that solve problems.</span>
          </h1>

          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            <span className="h-px w-8 bg-zinc-700" />
            Software Engineer · Backend · Cloud
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition duration-200 hover:border-zinc-400 hover:bg-white/[0.04]"
            >
              GitHub
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition duration-200 hover:border-zinc-400 hover:bg-white/[0.04]"
            >
              LinkedIn
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <a
              href={profile.links.leetcode}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition duration-200 hover:border-zinc-400 hover:bg-white/[0.04]"
            >
              LeetCode
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>


          </div>

          {/* Bottom metadata */}
          <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-6 font-mono text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <span>{profile.handle}</span>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              {profile.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}