const LEETCODE_USERNAME = "4118adi";

type LeetCodeProfileResponse = {
  data: {
    matchedUser: {
      username: string;
      profile: {
        ranking: number;
        reputation: number;
      };
      submitStats: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
          submissions: number;
        }[];
      };
    } | null;
  };
};

export async function getLeetCodeProfile() {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username

        profile {
          ranking
          reputation
        }

        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    },

    body: JSON.stringify({
      query,
      variables: {
        username: LEETCODE_USERNAME,
      },
    }),

    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(
      `LeetCode request failed: ${response.status}`,
    );
  }

  const data =
    (await response.json()) as LeetCodeProfileResponse;

  if (!data.data.matchedUser) {
    throw new Error(
      `LeetCode user ${LEETCODE_USERNAME} was not found.`,
    );
  }

  return data.data.matchedUser;
}