const GITHUB_USERNAME: string = "AP00014";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
}

type GitHubApiRepo = GitHubRepo & { fork: boolean };

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    if (GITHUB_USERNAME === "YOUR_GITHUB_USERNAME") {
      return [];
    }

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = (await response.json()) as GitHubApiRepo[];

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        homepage: repo.homepage,
      }));
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function getPinnedRepos(): Promise<GitHubRepo[]> {
  const repos = await getGitHubRepos();
  return repos.slice(0, 6);
}
