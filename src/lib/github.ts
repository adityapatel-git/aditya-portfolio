import { Octokit } from "octokit";

const username = "adityapatel-git";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getGithubProfile() {
  const response = await octokit.rest.users.getByUsername({
    username,
  });

  return response.data;
}

export async function getGithubRepositories() {
  const response = await octokit.rest.repos.listForUser({
    username,
    sort: "updated",
    per_page: 100,
  });

  return response.data;
}

type GithubContributionsResponse = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
            contributionLevel: string;
          }[];
        }[];
      };
    };
  };
};

export async function getGithubContributions() {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const response = await octokit.graphql<GithubContributionsResponse>(
    query,
    {
      login: username,
    },
  );

  return response.user.contributionsCollection.contributionCalendar;
}