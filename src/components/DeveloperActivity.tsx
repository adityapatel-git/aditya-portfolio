import GithubStats from "./GithubStats";
import LeetCodeStats from "./LeetCodeStats";

export default function DeveloperActivity() {
  return (
    <section
      id="developerActivity"
      className="relative overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
              04 / Developer Activity
            </p>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Code in public.
            </h2>

            <p className="mt-4 max-w-xl text-zinc-500">
              A snapshot of what I&apos;m building, learning, and solving
              across the developer ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            LIVE DATA
          </div>
        </div>

        {/* GitHub */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] p-1 transition duration-300 hover:border-white/20">
          <div className="rounded-xl bg-zinc-950/80">
            <GithubStats />
          </div>
        </div>

        {/* LeetCode */}
        <div className="mt-6 group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] p-1 transition duration-300 hover:border-white/20">
          <div className="rounded-xl bg-zinc-950/80">
            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}