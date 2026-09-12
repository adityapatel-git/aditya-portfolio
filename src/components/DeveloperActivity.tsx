import { profile } from "@/data/profile";
import GithubStats from "./GithubStats";
import LeetCodeStats from "./LeetCodeStats";

export default function DeveloperActivity() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          04 / Developer Activity
        </p>

        <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          Code in public.
        </h2>

        {/* GitHub */}
        <GithubStats />

        {/* LeetCode */}
        <div className="mt-6">
          <LeetCodeStats />
        </div>

        {/* External links */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-800 p-6 transition hover:border-zinc-600"
          >
            <p className="font-mono text-sm text-zinc-600">
              github.com
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              GitHub
            </h3>

            <p className="mt-3 text-zinc-500">
              Explore my repositories and open-source work.
            </p>

            <span className="mt-6 inline-block text-sm text-zinc-300">
              View GitHub ↗
            </span>
          </a>

          <a
            href={profile.links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-zinc-800 p-6 transition hover:border-zinc-600"
          >
            <p className="font-mono text-sm text-zinc-600">
              leetcode.com
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              LeetCode
            </h3>

            <p className="mt-3 text-zinc-500">
              View my problem-solving progress and profile.
            </p>

            <span className="mt-6 inline-block text-sm text-zinc-300">
              View LeetCode ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}