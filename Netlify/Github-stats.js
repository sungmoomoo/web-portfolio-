export default async (req, context) => {
  const query = `
    query {
      user(login: "YOUR_GITHUB_USERNAME") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data.data.user.contributionsCollection), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config = {
  path: "/api/github-stats",
};

async function loadGitHubStats() {
  const response = await fetch('/api/github-stats');
  const data = await response.json();
  
  const totalCommits = data.contributionCalendar.totalContributions;
  console.log(`Total Contributions: ${totalCommits}`);

  // Use 'data.contributionCalendar.weeks' to build your own custom grid/chart
}

loadGitHubStats();
