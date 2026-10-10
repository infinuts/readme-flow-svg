import test from 'node:test';
import assert from 'node:assert/strict';
import { withAltText } from '../src/markdown.js';
import { workflowMarkdown } from '../src/links.js';

test('custom alt text preserves hosted URLs, local paths, and automatic descriptions', () => {
  for (const local of [true, false]) {
    const original = workflowMarkdown({ steps: ['Read', 'Build', 'Export'] }, local);
    assert.equal(withAltText(original, '  '), original);
    const edited = withAltText(original, 'Build [a] \\ workflow\n<safe> $&');
    assert.ok(edited.includes('![Build  a    workflow  safe  $&]'));
    assert.equal(edited.slice(edited.indexOf('](')), original.slice(original.indexOf('](')));
  }
});
