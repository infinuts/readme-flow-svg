import test from 'node:test';
import assert from 'node:assert/strict';
import { withAltText } from '../src/markdown.js';
import { workflowMarkdown } from '../src/links.js';

test('embed links support plain images, editor URLs and safe custom documentation URLs', () => {
  const plain = workflowMarkdown({}, false, { link: 'none' });
  assert.ok(plain.startsWith('!['));
  assert.ok(
    workflowMarkdown({}, false, { link: 'editor' }).includes(
      '](https://readme-flow-svg.vercel.app/?steps=',
    ),
  );
  assert.ok(
    workflowMarkdown({}, true, { link: 'custom', href: 'https://example.com/docs(v2)' }).endsWith(
      '](https://example.com/docs%28v2%29)',
    ),
  );
  for (const href of ['javascript:alert(1)', 'data:text/html,bad', 'not a URL', ''])
    assert.equal(workflowMarkdown({}, false, { link: 'custom', href }), plain);
});

test('adaptive embeds include both color schemes and escaped HTML descriptions and links', () => {
  const picture = workflowMarkdown({}, false, {
    link: 'none',
    adaptive: true,
    alt: 'Build "A" & ship',
  });
  assert.ok(picture.startsWith('<picture>\n'));
  assert.ok(picture.includes('prefers-color-scheme: dark'));
  assert.ok(picture.includes('theme=dark'));
  assert.ok(picture.includes('prefers-color-scheme: light'));
  assert.ok(picture.includes('alt="Build &quot;A&quot; &amp; ship"'));
  const linked = workflowMarkdown({}, false, {
    link: 'custom',
    href: 'https://example.com/?a=1&b=2',
    adaptive: true,
  });
  assert.ok(linked.startsWith('<a href="https://example.com/?a=1&amp;b=2">'));
  assert.ok(!workflowMarkdown({}, true, { adaptive: true }).includes('<picture>'));
});

test('custom alt text preserves hosted URLs, local paths, and automatic descriptions', () => {
  for (const local of [true, false]) {
    const original = workflowMarkdown({ steps: ['Read', 'Build', 'Export'] }, local);
    assert.equal(withAltText(original, '  '), original);
    const edited = withAltText(original, 'Build [a] \\ workflow\n<safe> $&');
    assert.ok(edited.includes('![Build  a    workflow  safe  $&]'));
    assert.equal(edited.slice(edited.indexOf('](')), original.slice(original.indexOf('](')));
  }
});
