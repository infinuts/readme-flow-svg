import test from 'node:test';
import assert from 'node:assert/strict';
import { createHistory, arrangeCards, importWorkflow } from '../src/editor-state.js';
import { normalizeConfig } from '../src/config.js';

test('undo/redo detach snapshots, group field edits, invalidate redo and bound history', () => {
  const config = normalizeConfig(),
    history = createHistory(config),
    field = {};
  config.steps[0] = 'First';
  history.record(config, field);
  config.steps[0] = 'First edit';
  history.record(config, field);
  assert.equal(history.undo().steps[0], 'Upload');
  assert.equal(history.redo().steps[0], 'First edit');
  const restored = history.undo();
  restored.steps[1] = 'Branch';
  history.record(restored);
  assert.equal(history.canRedo, false);
  for (let i = 0; i < 120; i++) history.record({ ...config, title: String(i) });
  let count = 0;
  while (history.canUndo) {
    history.undo();
    count++;
  }
  assert.equal(count, 99);
  assert.equal(history.undo(), null);
});

test('alignment separates overlapping cards, distribution is even and fitting preserves edges', () => {
  const input = normalizeConfig({
    steps: Array.from({ length: 12 }, (_, i) => 'Step ' + i),
    positions: Array.from({ length: 12 }, () => ({ x: 2490, y: 2090 })),
    connectionMode: 'custom',
    connections: [{ from: 0, to: 11, label: 'Done' }],
  });
  for (const action of ['align-x', 'align-y', 'distribute-x', 'distribute-y']) {
    const arranged = arrangeCards(input, action),
      axis = action.endsWith('x') ? 'x' : 'y';
    assert.deepEqual(arranged.connections, input.connections);
    assert.equal(arranged.positions.length, 12);
    if (action.startsWith('align'))
      assert.equal(new Set(arranged.positions.map((p) => p[axis])).size, 1);
    const spread = action.startsWith('align') ? (axis === 'x' ? 'y' : 'x') : axis;
    const values = arranged.positions.map((p) => p[spread]).sort((a, b) => a - b);
    assert.ok(values[0] >= 60);
    assert.ok(values.at(-1) <= (spread === 'x' ? 2500 : 2100));
    for (let i = 1; i < values.length; i++)
      assert.ok(values[i] - values[i - 1] >= (spread === 'x' ? 118 : 96));
  }
  const fitted = arrangeCards(input, 'fit');
  assert.equal(Math.min(...fitted.positions.map((p) => p.x)), 80);
  assert.equal(Math.min(...fitted.positions.map((p) => p.y)), 70);
  assert.ok(fitted.canvasSize.width < input.canvasSize.width);
  assert.deepEqual(fitted.connections, input.connections);
  assert.equal(input.positions[0].x, 2490);
});

test('workflow JSON round trips and rejects malformed, oversized or unrelated files', () => {
  const config = normalizeConfig({
    preset: 'review',
    theme: 'dark',
    positions: [{ x: 400, y: 300 }],
  });
  assert.deepEqual(importWorkflow(JSON.stringify(config)), config);
  for (const text of [
    'bad',
    'null',
    '{}',
    '{"steps":["Only one"]}',
    '{"steps":[1,2,3]}',
    JSON.stringify({ steps: ['A', 'B', 'C'], junk: 'é'.repeat(9000) }),
  ])
    assert.throws(() => importWorkflow(text));
});
