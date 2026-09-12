import GithubStats from "./GithubStats";
import LeetCodeStats from "./LeetCodeStats";

export default function DeveloperActivity() {
  return (
    <section
      id="developerActivity"
      className="border-t border-white/5"
    >
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-14">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            04 / Developer Activity
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Code in public.
            </h2>

            <p className="max-w-md text-sm leading-6 text-zinc-600">
              Open-source contributions and problem solving activity.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          <GithubStats />
          <LeetCodeStats />
        </div>
      </div>
    </section>
  );
}