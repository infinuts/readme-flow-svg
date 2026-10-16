import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeConfig, renderSvg, workflowGeometry, LAYOUTS } from '../src/svg.js';
import { workflowParams, parseWorkflowParams } from '../src/links.js';
import { generateWorkflow, workflowSchema } from '../mcp/server.mjs';

test('partial positions always normalize to a complete, bounded canvas and survive editing', () => {
  for (const canvasSize of [
    null,
    undefined,
    { width: 220, height: 204 },
    { width: NaN, height: -1 },
  ]) {
    const config = normalizeConfig({
      steps: ['Build', 'Test', 'Ship'],
      positions: [{ x: 800, y: 700 }, null],
      canvasSize,
      title: 'Release',
      subtitle: 'With checks',
    });
    assert.equal(config.positions.length, 3);
    assert.ok(config.positions.every((p) => p && Number.isFinite(p.x) && p.y >= 146));
    for (const p of config.positions) {
      assert.ok(p.x + 80 <= config.canvasSize.width);
      assert.ok(p.y + 70 <= config.canvasSize.height);
    }
    assert.deepEqual(normalizeConfig(config), config);
    config.steps.push('Monitor');
    config.positions.push({ x: 800, y: 850 });
    const added = normalizeConfig(config);
    assert.equal(added.positions.length, 4);
    assert.ok(added.canvasSize.height >= 920);
    assert.deepEqual(normalizeConfig(parseWorkflowParams(workflowParams(added))), added);
  }
  for (const raw of [
    null,
    12,
    [],
    'bad',
    { positions: [null] },
    { positions: [{ x: Infinity, y: 10 }] },
  ])
    assert.deepEqual(normalizeConfig(raw).positions, []);
});

test('routing reacts to node and edge changes but appearance changes preserve paths', () => {
  const input = { preset: 'review', title: 'Routing' };
  const paths = (value) =>
    [...renderSvg(value).matchAll(/<g data-connection="[^"]+"><path d="([^"]+)"/g)].map(
      (match) => match[1],
    );
  const original = paths(input);
  assert.deepEqual(paths({ ...input, theme: 'dark', font: 'mono', duration: 25 }), original);
  const geometry = workflowGeometry(input);
  const moved = {
    ...input,
    positions: geometry.nodes.map((p, i) => ({ ...p, x: p.x + (i ? 0 : 20) })),
  };
  assert.notDeepEqual(paths(moved), original);
  assert.notDeepEqual(paths({ ...input, routing: 'straight' }), original);
  assert.equal(paths({ ...input, connectionMode: 'custom', connections: [] }).length, 0);
  assert.deepEqual(paths(input), original);
});

test('layouts keep twelve cards inside their canvas and snake rows reverse direction', () => {
  for (const layout of Object.keys(LAYOUTS))
    for (const columns of [2, 3, 4, 6])
      for (const spacing of [32, 120]) {
        const g = workflowGeometry({
          steps: Array.from({ length: 12 }, (_, i) => 'Step ' + i),
          layout,
          columns,
          spacing,
          title: 'A title',
          subtitle: 'Some context',
        });
        assert.equal(g.nodes.length, 12);
        for (const p of g.nodes) {
          assert.ok(p.x - 59 >= 0 && p.x + 59 <= g.width);
          assert.ok(p.y - 48 >= g.header && p.y + 48 <= g.height);
        }
        if (layout === 'snake') {
          assert.ok(g.nodes[0].x < g.nodes[1].x);
          assert.ok(g.nodes[columns].x > g.nodes[columns + 1].x);
        }
      }
});
test('all customization survives URL round trips and the API uses the same renderer', () => {
  const c = normalizeConfig({
    preset: 'release',
    title: 'Build & ship <safely>',
    subtitle: 'Tests, reviews, and releases',
    layout: 'snake',
    columns: 3,
    connectionMode: 'custom',
    connections: [
      { from: 0, to: 1, label: 'Success' },
      { from: 1, to: 0, label: 'Retry' },
      { from: 0, to: 4, label: 'Skip' },
    ],
    routing: 'elbow',
    lineStyle: 'dotted',
    lineWidth: 3,
    arrows: false,
    spacing: 90,
    radius: 4,
    font: 'mono',
    transparent: true,
    showNumbers: false,
    travelerSize: 1.5,
    duration: 24,
  });
  const decoded = normalizeConfig(parseWorkflowParams(workflowParams(c)));
  assert.deepEqual(decoded, c);
  const output = generateWorkflow(decoded);
  assert.equal(output.svg, renderSvg(c));
  assert.ok(output.markdown.includes('Build &amp;') === false);
  assert.ok(output.svg.includes('Build &amp; ship &lt;safely&gt;'));
  assert.ok(output.svg.includes('stroke-dasharray="1 5"'));
  assert.ok(!output.svg.includes(`<rect width=`));
  const sequential = { ...c, connectionMode: 'sequential' };
  assert.deepEqual(normalizeConfig(parseWorkflowParams(workflowParams(sequential))), sequential);
});
test('connections reject missing nodes, self links, duplicates and injected settings', () => {
  for (const connections of [
    [{ from: 0, to: 9 }],
    [{ from: 1, to: 1 }],
    [
      { from: 0, to: 1 },
      { from: 0, to: 1 },
    ],
  ])
    assert.equal(
      workflowSchema.safeParse({ steps: ['One', 'Two', 'Three'], connections }).success,
      false,
    );
  const c = normalizeConfig({
    connections: [
      { from: 0, to: 99 },
      null,
      { from: 0, to: 1, label: '<script>alert(1)</script>' },
    ],
    connectionMode: 'custom',
    title: '</text><script>',
    routing: '__proto__',
    font: '</style><script>',
  });
  assert.equal(c.connections.length, 1);
  const svg = renderSvg(c);
  assert.ok(!svg.includes('<script>'));
  assert.ok(!svg.includes('NaN'));
  assert.ok(svg.includes('&lt;script&gt;'));
});
test('empty connections, paused workflows and reduced motion remain valid', () => {
  const svg = renderSvg(
    { title: 'Independent tasks', connectionMode: 'custom', connections: [] },
    true,
  );
  assert.ok(!svg.includes('data-connection='));
  assert.ok(!svg.includes('NaN'));
  assert.ok(svg.includes('animation-play-state:paused'));
  assert.ok(svg.includes('prefers-reduced-motion'));
});
