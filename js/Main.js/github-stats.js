async function loadGitHubStats() {
  const response = await fetch('/api/github-stats');
  const data = await response.json();
  
  const totalCommits = data.contributionCalendar.totalContributions;
  console.log(`Total Contributions: ${totalCommits}`);

  // Use 'data.contributionCalendar.weeks' to build your own custom grid/chart
}

loadGitHubStats();
