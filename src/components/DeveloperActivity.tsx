import { profile } from "@/data/profile";
import GithubStats from "./GithubStats";
import LeetCodeStats from "./LeetCodeStats";

export default function DeveloperActivity() {
  return (
    <section id="developerActivity" className="border-t border-white/5">
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
      </div>
    </section>
  );
}