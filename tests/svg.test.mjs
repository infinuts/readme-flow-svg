import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  renderSvg,
  normalizeConfig,
  normalizePalette,
  PRESETS,
  ICONS,
  THEMES,
  TRAVELERS,
} from '../src/svg.js';
import { readFile } from 'node:fs/promises';

test('SVG output matches reviewed classic and routed snapshots', async () => {
  for (const [name, config] of [
    ['classic', {}],
    ['routed', { preset: 'review', title: 'Review & release', theme: 'github' }],
  ])
    assert.equal(
      renderSvg(config) + '\n',
      (await readFile(new URL(`./fixtures/${name}.svg`, import.meta.url), 'utf8')).replace(
        /\r\n/g,
        '\n',
      ),
    );
});

test('inline SVGs have scoped accessible names, including identical configurations', () => {
  for (const config of [{}, { preset: 'release' }]) {
    const one = renderSvg(config, false, 'main'),
      two = renderSvg(config, false, 'dialog');
    const ids = (svg) => [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set([...ids(one), ...ids(two)]).size, 4);
    for (const svg of [one, two]) {
      const references = svg.match(/aria-labelledby="([^"]+)"/)[1].split(' ');
      assert.deepEqual(references, ids(svg));
    }
  }
  assert.ok(!renderSvg({}, false, '"><script>').includes('<script>'));
});

test('long card labels wrap in two escaped text lines and keep short labels stable', () => {
  const label = 'Review pull request changes';
  for (const layout of ['horizontal', 'grid']) {
    const svg = renderSvg({ steps: [label, 'Test', 'A'.repeat(32)], layout });
    const firstCard = svg.match(/<g data-step="0">([\s\S]*?)<\/g><text[\s\S]*?<\/g>/)?.[0] || svg;
    assert.ok(firstCard.includes('Review pull'));
    assert.ok(svg.includes('request changes'));
    assert.ok(!svg.includes('textLength='));
    assert.ok(!svg.includes('NaN'));
    assert.ok(svg.includes('>Test</text>'));
  }
});
test('untrusted labels are XML-escaped and cannot inject markup', () => {
  const svg = renderSvg({ steps: ['<script>alert(1)</script>', '" & >', 'Download'] });
  assert.ok(!svg.includes('<script>'));
  assert.ok(svg.includes('&lt;script&gt;'));
  assert.ok(svg.includes('&quot; &amp; &gt;'));
  assert.ok(!svg.includes('foreignObject'));
});
test('normalization bounds the workflow and animation settings', () => {
  assert.equal(normalizeConfig({ steps: [] }).steps.length, 3);
  assert.equal(
    normalizeConfig({
      steps: Array(30).fill('x'),
      duration: 100,
      theme: 'invalid',
      preset: '__proto__',
    }).steps.length,
    12,
  );
  assert.equal(normalizeConfig({ duration: 100 }).duration, 30);
  assert.equal(normalizeConfig({ duration: -10 }).duration, 2);
  assert.equal(normalizeConfig({ theme: 'invalid' }).theme, 'light');
  assert.equal(normalizeConfig({ preset: '__proto__' }).preset, 'files');
});
test('all presets, themes, and moving elements export self-contained SVG with reduced motion support', () => {
  for (const preset of Object.keys(PRESETS))
    for (const theme of Object.keys(THEMES))
      for (const traveler of Object.keys(TRAVELERS)) {
        const svg = renderSvg({ preset, theme, traveler });
        assert.ok(svg.startsWith('<svg'));
        assert.ok(svg.endsWith('</svg>'));
        assert.ok(svg.includes('prefers-reduced-motion'));
        assert.ok(svg.includes('@keyframes travel'));
        assert.ok(!svg.includes('<script'));
        assert.ok(!svg.includes('href='));
        assert.ok(svg.includes(PRESETS[preset].steps[0]));
        assert.ok(svg.includes(`data-element="${traveler}"`));
      }
});
test('six steps fit in the viewBox and paused exports can resume', () => {
  const svg = renderSvg({ steps: ['1', '2', '3', '4', '5', '6'] }, true);
  assert.ok(svg.includes('viewBox="0 0 1024 204"'));
  assert.equal((svg.match(/class="stage animated"/g) || []).length, 6);
  assert.ok(svg.includes('animation-play-state:paused'));
});
test('custom stage icons render in exports, while invalid icons fall back safely', () => {
  const config = normalizeConfig({
    steps: ['One', 'Two', 'Three', 'Four', 'Five'],
    icons: ['deploy', 'check', 'file', 'invalid', '__proto__'],
  });
  assert.deepEqual(config.icons, ['deploy', 'check', 'file', 'download', 'file']);
  const svg = renderSvg(config);
  assert.ok(svg.includes(ICONS.deploy));
  assert.ok(svg.includes(ICONS.check));
  assert.deepEqual(normalizeConfig({ preset: 'api' }).icons, PRESETS.api.icons);
});
test('custom palettes accept hex colors, expand shorthand, and reject injected styles', () => {
  const palette = normalizePalette({
    background: '#123',
    accent: '#FaC',
    text: 'red;}</style><script>alert(1)</script>',
    card: 'url(https://example.com)',
    extra: '#000000',
  });
  assert.equal(palette.background, '#112233');
  assert.equal(palette.accent, '#ffaacc');
  assert.equal(palette.text, THEMES.light.text);
  assert.equal(palette.card, THEMES.light.card);
  assert.ok(!Object.hasOwn(palette, 'extra'));
  const svg = renderSvg({ theme: 'custom', customTheme: palette, traveler: 'rocket' });
  assert.ok(svg.includes('fill="#112233"'));
  assert.ok(svg.includes('stroke="#ffaacc"'));
  assert.ok(!svg.includes('<script>'));
  assert.ok(svg.includes(ICONS.deploy));
  assert.equal(normalizeConfig({ traveler: '__proto__' }).traveler, 'dot');
});
