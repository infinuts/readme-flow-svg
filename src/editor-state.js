import { normalizeConfig, workflowGeometry } from './config.js';

/** Bounded, detached snapshots. Consecutive edits in one field form one undo step.
 * @param {unknown} initial
 */
export function createHistory(initial) {
  const snapshots = [JSON.stringify(initial)];
  let cursor = 0,
    lastTime = 0;
  /** @type {unknown} */
  let lastGroup = null;
  return {
    get canUndo() {
      return cursor > 0;
    },
    get canRedo() {
      return cursor < snapshots.length - 1;
    },
    /** @param {unknown} value @param {unknown} group */
    record(value, group = null) {
      const next = JSON.stringify(value),
        now = Date.now();
      if (next === snapshots[cursor]) return;
      snapshots.splice(cursor + 1);
      if (group && group === lastGroup && now - lastTime < 750 && cursor > 0)
        snapshots[cursor] = next;
      else {
        snapshots.push(next);
        if (snapshots.length > 100) snapshots.shift();
        cursor = snapshots.length - 1;
      }
      lastGroup = group;
      lastTime = now;
    },
    undo() {
      lastGroup = null;
      if (cursor > 0) return normalizeConfig(JSON.parse(snapshots[--cursor]));
      return null;
    },
    redo() {
      lastGroup = null;
      if (cursor < snapshots.length - 1) return normalizeConfig(JSON.parse(snapshots[++cursor]));
      return null;
    },
  };
}

/** Capture complete positions without depending on a rendered DOM.
 * @param {unknown} raw
 */
export function positionedConfig(raw) {
  const config = normalizeConfig(raw);
  if (config.positions.length) return config;
  const geometry = workflowGeometry(config);
  return normalizeConfig({
    ...config,
    positions: geometry.nodes,
    canvasSize: {
      width: Math.min(2600, geometry.width),
      height: Math.min(2200, Math.max(420, geometry.height)),
    },
  });
}

/** Arrange all cards in the chosen direction, preserving step and edge identities.
 * @param {unknown} raw @param {string} action
 */
export function arrangeCards(raw, action) {
  const config = positionedConfig(raw),
    positions = config.positions;
  const axis = action.endsWith('x') ? 'x' : 'y',
    other = axis === 'x' ? 'y' : 'x';
  /** @param {'x' | 'y'} direction @param {boolean} align */
  function spread(direction, align) {
    const sorted = [...positions].sort((a, b) => a[direction] - b[direction]);
    const min = direction === 'x' ? 70 : workflowGeometry(config).header + 60;
    const max = direction === 'x' ? 2500 : 2100,
      gap = direction === 'x' ? 150 : 128;
    if (align) {
      sorted.forEach((p, i) => {
        p[direction] = Math.max(p[direction], i ? sorted[i - 1][direction] + gap : min);
      });
    } else {
      const start = sorted[0][direction],
        distance = Math.max(
          gap,
          (sorted[sorted.length - 1][direction] - start) / (positions.length - 1),
        );
      sorted.forEach((p, i) => {
        p[direction] = Math.round(start + i * distance);
      });
    }
    if (sorted[sorted.length - 1][direction] > max) {
      const distance = Math.max(
        gap,
        Math.min(
          (max - min) / (positions.length - 1),
          (sorted[sorted.length - 1][direction] - sorted[0][direction]) / (positions.length - 1),
        ),
      );
      const start = Math.max(min, max - distance * (positions.length - 1));
      sorted.forEach((p, i) => {
        p[direction] = Math.round(start + i * distance);
      });
    }
  }
  if (action.startsWith('align')) {
    // Keep cards separated along the other axis when aligning a whole workflow.
    const center = Math.round(positions.reduce((sum, p) => sum + p[axis], 0) / positions.length);
    positions.forEach((p) => {
      p[axis] = center;
    });
    spread(other, true);
  } else if (action.startsWith('distribute')) {
    spread(axis, false);
  } else if (action === 'fit') {
    const left = Math.min(...positions.map((p) => p.x)) - 80;
    const top = Math.min(...positions.map((p) => p.y)) - workflowGeometry(config).header - 70;
    positions.forEach((p) => {
      p.x -= left;
      p.y -= top;
    });
    config.canvasSize = {
      width: Math.max(220, ...positions.map((p) => p.x + 80)),
      height: Math.max(204, ...positions.map((p) => p.y + 70)),
    };
  }
  return normalizeConfig(config);
}

/** Keep imports bounded and require an actual editable workflow.
 * @param {string} text
 */
export function importWorkflow(text) {
  if (new TextEncoder().encode(text).byteLength > 16384)
    throw Error('Workflow JSON must be 16 KB or smaller.');
  const value = JSON.parse(text);
  if (
    !value ||
    typeof value !== 'object' ||
    !Array.isArray(value.steps) ||
    value.steps.length < 3 ||
    value.steps.length > 12 ||
    !value.steps.every(
      (/** @type {unknown} */ step) => typeof step === 'string' && step.trim() && step.length <= 32,
    )
  )
    throw Error(
      'Choose a workflow JSON file with 3–12 nonempty step labels (up to 32 characters).',
    );
  return normalizeConfig(value);
}
