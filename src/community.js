import repositories from '../community/repos.json' with {type:'json'};

export function validateRepositories(entries) {
  if (!Array.isArray(entries)) throw new Error('Community repositories must be an array.');
  const seen = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.repo !== 'string' || !/^[a-z\d](?:[a-z\d-]{0,38})\/[a-z\d_.-]{1,100}$/i.test(entry.repo)) throw new Error('Use an owner/repository name in community/repos.json.');
    if (typeof entry.description !== 'string' || !entry.description.trim() || entry.description.length > 160) throw new Error('Each repository needs a description of 1–160 characters.');
    const key = entry.repo.toLowerCase();
    if (seen.has(key)) throw new Error(`Duplicate community repository: ${entry.repo}`);
    seen.add(key);
  }
  return entries;
}

export const COMMUNITY_REPOS = validateRepositories(repositories);
