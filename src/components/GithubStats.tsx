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
      <div className="space-y-6">
        {/* Profile statistics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-zinc-600">
                github.activity
              </p>
  
              <h3 className="mt-1 font-semibold">
                {contributions.totalContributions} contributions
              </h3>
            </div>
  
            <a
              href="https://github.com/adityapatel-git"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-500 hover:text-white"
            >
              View profile ↗
            </a>
          </div>
  
          <div className="overflow-x-auto">
            <div className="flex min-w-[700px] gap-1">
              {contributions.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      className={`h-3 w-3 rounded-sm ${getContributionClass(
                        day.contributionLevel,
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
  
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-zinc-600">
            Less
  
            <span className="h-3 w-3 rounded-sm bg-zinc-900" />
            <span className="h-3 w-3 rounded-sm bg-zinc-700" />
            <span className="h-3 w-3 rounded-sm bg-zinc-500" />
            <span className="h-3 w-3 rounded-sm bg-zinc-300" />
  
            More
          </div>
        </div>
  
        {/* Languages */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <p className="font-mono text-xs text-zinc-600">
            github.languages()
          </p>
  
          <div className="mt-5 flex flex-wrap gap-2">
            {topLanguages.map(([language]) => (
              <span
                key={language}
                className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300"
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
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
        <p className="text-xs text-zinc-600">{label}</p>
  
        <p className="mt-2 text-2xl font-semibold">{value}</p>
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