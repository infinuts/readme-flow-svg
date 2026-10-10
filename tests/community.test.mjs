import test from 'node:test';
import assert from 'node:assert/strict';
import { COMMUNITY_REPOS, validateRepositories } from '../src/community.js';

test('community submissions use repository names, bounded descriptions, and unique entries', () => {
  assert.ok(COMMUNITY_REPOS.length);
  const valid = {
    repo: 'someone/useful-project',
    description: 'A project with a workflow in its README.',
  };
  assert.deepEqual(validateRepositories([valid]), [valid]);
  for (const entries of [
    null,
    [{ ...valid, repo: 'https://example.com' }],
    [{ ...valid, repo: 'owner/repo/extra' }],
    [{ ...valid, description: '' }],
    [{ ...valid, description: 'x'.repeat(161) }],
    [valid, { ...valid, repo: valid.repo.toUpperCase() }],
  ])
    assert.throws(() => validateRepositories(entries));
});
