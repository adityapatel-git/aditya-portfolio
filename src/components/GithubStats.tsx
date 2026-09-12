import {
  getGithubContributions,
  getGithubProfile,
  getGithubRepositories,
} from "@/lib/github";

export default async function GithubStats() {
  const [profile, repositories, contributions] = await Promise.all([
    getGithubProfile(),
    getGithubRepositories(),
    getGithubContributions(),
  ]);

  const languages = repositories.reduce<Record<string, number>>(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }

      return acc;
    },
    {},
  );

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
            github.activity
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            GitHub
          </h3>
        </div>

        <a
          href="https://github.com/adityapatel-git"
          target="_blank"
          rel="noreferrer"
          className="group flex w-fit items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          @{profile.login}
          <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 border-b border-white/10 sm:grid-cols-4">
        <Stat
          label="Repositories"
          value={profile.public_repos.toString()}
        />

        <Stat
          label="Followers"
          value={profile.followers.toString()}
        />

        <Stat
          label="Following"
          value={profile.following.toString()}
        />

        <Stat
          label="Contributions"
          value={contributions.totalContributions.toString()}
        />
      </div>

      {/* Contribution graph */}
      <div className="pt-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            {contributions.totalContributions} contributions
          </p>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-700">
            <span>Less</span>

            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-900" />
            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-500" />
            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-300" />

            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[700px] gap-1">
            {contributions.weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col gap-1"
              >
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`h-3 w-3 rounded-[2px] ${getContributionClass(
                      day.contributionLevel,
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
        <p className="shrink-0 font-mono text-xs uppercase tracking-wider text-zinc-700">
          Languages
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {topLanguages.map(([language]) => (
            <span
              key={language}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {language}
            </span>
          ))}
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
  value: string;
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

function getContributionClass(level: string) {
  switch (level) {
    case "FIRST_QUARTILE":
      return "bg-zinc-800";

    case "SECOND_QUARTILE":
      return "bg-zinc-600";

    case "THIRD_QUARTILE":
      return "bg-zinc-400";

    case "FOURTH_QUARTILE":
      return "bg-zinc-200";

    default:
      return "bg-zinc-900";
  }
}