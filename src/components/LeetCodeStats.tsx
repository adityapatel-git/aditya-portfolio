import { getLeetCodeProfile } from "@/lib/leetcode";

export default async function LeetCodeStats() {
  const profile = await getLeetCodeProfile();

  const stats = profile.submitStats.acSubmissionNum;

  const all = stats.find(
    (item) => item.difficulty === "All",
  );

  const easy = stats.find(
    (item) => item.difficulty === "Easy",
  );

  const medium = stats.find(
    (item) => item.difficulty === "Medium",
  );

  const hard = stats.find(
    (item) => item.difficulty === "Hard",
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-zinc-600">
            leetcode.stats()
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            LeetCode
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            @{profile.username}
          </p>
        </div>

        <a
          href={`https://leetcode.com/u/${profile.username}/`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-500 hover:text-white"
        >
          Profile ↗
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="Solved"
          value={all?.count ?? 0}
        />

        <Stat
          label="Easy"
          value={easy?.count ?? 0}
        />

        <Stat
          label="Medium"
          value={medium?.count ?? 0}
        />

        <Stat
          label="Hard"
          value={hard?.count ?? 0}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-600">
            Global ranking
          </p>

          <p className="mt-2 text-xl font-semibold">
            #{profile.profile.ranking.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4">
          <p className="text-xs text-zinc-600">
            Reputation
          </p>

          <p className="mt-2 text-xl font-semibold">
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
      <p className="text-xs text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}