import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { renderSvg } from '../src/svg.js';

test(
  'maximum-size workflows render repeatedly within a broad regression budget',
  { timeout: 10000 },
  () => {
    const steps = Array.from({ length: 12 }, (_, i) => 'Step ' + i);
    const connections = steps.flatMap((_, from) =>
      [1, 3].map((offset) => ({ from, to: (from + offset) % 12 })),
    );
    const start = performance.now();
    for (const routing of ['curved', 'elbow', 'straight'])
      for (let i = 0; i < 10; i++) {
        const svg = renderSvg({
          steps,
          connections,
          connectionMode: 'custom',
          layout: 'grid',
          columns: 4,
          routing,
          duration: 2 + i,
        });
        assert.equal((svg.match(/data-connection=/g) || []).length, 24);
        assert.ok(!svg.includes('NaN'));
      }
    assert.ok(
      performance.now() - start < 8000,
      '30 renders of 12 nodes / 24 connections must finish within 8 seconds',
    );
  },
);
