import { performance } from 'node:perf_hooks';
import { normalizeConfig, renderSvg, workflowGeometry } from '../src/svg.js';

const steps = Array.from({ length: 12 }, (_, i) => `Step ${i + 1}`);
const connections = steps.flatMap((_, from) =>
  [1, 3].map((offset) => ({ from, to: (from + offset) % 12 })),
);
const config = normalizeConfig({
  steps,
  connections,
  connectionMode: 'custom',
  layout: 'grid',
  columns: 4,
});
const geometry = workflowGeometry(config);
for (const routing of ['curved', 'elbow', 'straight']) {
  const timings = {};
  for (const mode of ['changed positions', 'appearance only']) {
    const samples = [];
    for (let i = 0; i < 31; i++) {
      const input =
        mode === 'changed positions'
          ? {
              ...config,
              routing,
              positions: geometry.nodes.map((p) => ({ x: p.x + i, y: p.y + i })),
            }
          : { ...config, routing, theme: i % 2 ? 'dark' : 'light', duration: 2 + (i % 28) };
      const start = performance.now();
      renderSvg(input);
      if (i) samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    timings[mode] = { medianMs: +samples[15].toFixed(2), p95Ms: +samples[28].toFixed(2) };
  }
  console.log(JSON.stringify({ routing, steps: 12, connections: 24, ...timings }));
}
