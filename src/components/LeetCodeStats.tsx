import { getLeetCodeProfile } from "@/lib/leetcode";

export default async function LeetCodeStats() {
  const profile = await getLeetCodeProfile();

  const stats = profile.submitStats.acSubmissionNum;

  const all = stats.find((item) => item.difficulty === "All");
  const easy = stats.find((item) => item.difficulty === "Easy");
  const medium = stats.find((item) => item.difficulty === "Medium");
  const hard = stats.find((item) => item.difficulty === "Hard");

  return (
    <div className="border-t border-white/10 pt-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
            leetcode.stats
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            Problem solving
          </h3>
        </div>

        <a
          href={`https://leetcode.com/u/${profile.username}/`}
          target="_blank"
          rel="noreferrer"
          className="group flex w-fit items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          @{profile.username}

          <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Main stats */}
      <div className="mt-8 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4">
        <Stat label="Solved" value={all?.count ?? 0} />
        <Stat label="Easy" value={easy?.count ?? 0} />
        <Stat label="Medium" value={medium?.count ?? 0} />
        <Stat label="Hard" value={hard?.count ?? 0} />
      </div>

      {/* Additional stats */}
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-white/5 py-5 sm:border-b-0 sm:border-r sm:pr-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
            Global ranking
          </p>

          <p className="mt-2 text-xl font-semibold text-zinc-300">
            #{profile.profile.ranking.toLocaleString()}
          </p>
        </div>

        <div className="py-5 sm:pl-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
            Reputation
          </p>

          <p className="mt-2 text-xl font-semibold text-zinc-300">
            {profile.profile.reputation.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-b border-white/5 py-5 first:pr-4 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0">
      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-200">
        {value}
      </p>
    </div>
  );
}