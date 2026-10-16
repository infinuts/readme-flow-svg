import { PRESETS, STEP_ICONS, TRAVELERS, THEMES } from './options.js';

/** @typedef {{x: number, y: number}} Point */
/** @typedef {{width: number, height: number}} CanvasSize */
/** @typedef {{from: number, to: number, label: string}} Connection */
/** @typedef {Record<keyof typeof import('./options.js').THEME_FIELDS, string>} Palette */
/**
 * @typedef {object} WorkflowConfig
 * @property {string} preset
 * @property {string[]} steps
 * @property {string[]} icons
 * @property {string} theme
 * @property {Palette} customTheme
 * @property {string} traveler
 * @property {number} duration
 * @property {string} title
 * @property {string} subtitle
 * @property {string} layout
 * @property {number} columns
 * @property {string} connectionMode
 * @property {Connection[]} connections
 * @property {string} routing
 * @property {string} lineStyle
 * @property {number} lineWidth
 * @property {boolean} arrows
 * @property {number} spacing
 * @property {number} radius
 * @property {string} font
 * @property {string} googleFont
 * @property {number} fontWeight
 * @property {Point[]} positions
 * @property {CanvasSize | null} canvasSize
 * @property {boolean} showNumbers
 * @property {boolean} transparent
 * @property {number} travelerSize
 */

export const LAYOUTS = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
  snake: 'Snake / multiple rows',
  grid: 'Grid',
};
export const FONTS = {
  sans: 'Sans serif',
  mono: 'Monospace',
  serif: 'Serif',
  google: 'Google Fonts',
};

/** @param {unknown} value @returns {value is string} */
export const validFontFamily = (value) =>
  typeof value === 'string' && /^[\p{L}\p{N}][\p{L}\p{N} .-]{0,79}$/u.test(value.trim());

/** @param {unknown} value @returns {Record<string, unknown>} */
const object = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, unknown>} */ (value)
    : {};

/** @param {object} options @param {unknown} key @param {string} fallback */
const option = (options, key, fallback) =>
  typeof key === 'string' && Object.hasOwn(options, key) ? key : fallback;

/** @param {unknown} value @param {number} min @param {number} max @param {number} fallback */
const bounded = (value, min, max, fallback) => {
  const number = typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
};

/** @param {unknown} raw @returns {Palette} */
export function normalizePalette(raw = {}) {
  const colors = object(raw);
  return /** @type {Palette} */ (
    Object.fromEntries(
      Object.entries(THEMES.light).map(([key, fallback]) => {
        let color = typeof colors[key] === 'string' ? colors[key] : '';
        if (!/^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(color)) color = fallback;
        if (color.length === 4) color = '#' + Array.from(color.slice(1), (c) => c + c).join('');
        return [key, color.toLowerCase()];
      }),
    )
  );
}

/** Automatic positions, before any manual overrides. @param {WorkflowConfig} c */
function automaticGeometry(c) {
  const n = c.steps.length,
    cols = c.layout === 'vertical' ? 1 : c.layout === 'horizontal' ? n : Math.min(c.columns, n),
    rows = Math.ceil(n / cols),
    header = (c.title ? 38 : 0) + (c.subtitle ? 48 : 0),
    width = Math.max(c.title || c.subtitle ? 400 : 220, cols * 118 + (cols - 1) * c.spacing + 96),
    height = rows * 96 + (rows - 1) * c.spacing + 96 + header,
    left = (width - (cols * 118 + (cols - 1) * c.spacing)) / 2;
  const nodes = c.steps.map((_, i) => {
    const row = Math.floor(i / cols),
      col = c.layout === 'snake' && row % 2 ? cols - 1 - (i % cols) : i % cols;
    return { x: left + 59 + col * (118 + c.spacing), y: header + 96 + row * (96 + c.spacing) };
  });
  return { width, height, header, nodes };
}

/** Normalize untrusted saved settings, including partial manual layouts. @param {unknown} raw
 * @returns {WorkflowConfig}
 */
export function normalizeConfig(raw = {}) {
  const input = object(raw),
    preset = option(PRESETS, input.preset, 'files'),
    defaults = PRESETS[preset];
  const steps = Array.isArray(input.steps)
    ? input.steps.slice(0, 12).map((s) => String(s).trim().slice(0, 32))
    : defaults.steps.slice();
  while (steps.length < 3) steps.push('Step ' + (steps.length + 1));
  const icons = steps.map((_, i) =>
    option(
      STEP_ICONS,
      Array.isArray(input.icons) ? input.icons[i] : undefined,
      defaults.icons[i] || 'file',
    ),
  );
  /** @type {Connection[]} */
  const edges = [];
  const seen = new Set();
  for (const value of (Array.isArray(input.connections)
    ? input.connections
    : defaults.connections || []
  ).slice(0, 24)) {
    const edge = object(value),
      from = edge.from,
      to = edge.to;
    if (
      typeof from !== 'number' ||
      typeof to !== 'number' ||
      !Number.isInteger(from) ||
      !Number.isInteger(to) ||
      from < 0 ||
      to < 0 ||
      from >= steps.length ||
      to >= steps.length ||
      from === to
    )
      continue;
    const key = from + ':' + to;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ from, to, label: String(edge.label || '').slice(0, 24) });
  }
  const canvas = object(input.canvasSize);
  /** @type {WorkflowConfig} */
  const config = {
    preset,
    steps: steps.map((s, i) => s || 'Step ' + (i + 1)),
    icons,
    theme: input.theme === 'custom' ? 'custom' : option(THEMES, input.theme, 'light'),
    customTheme: normalizePalette(input.customTheme),
    traveler: option(TRAVELERS, input.traveler, 'dot'),
    duration: bounded(input.duration || 6, 2, 30, 6),
    title: String(input.title || '').slice(0, 80),
    subtitle: String(input.subtitle || '').slice(0, 140),
    layout: option(LAYOUTS, input.layout, defaults.layout || 'horizontal'),
    columns: Math.round(bounded(input.columns ?? defaults.columns ?? 3, 2, 6, 3)),
    connectionMode:
      (input.connectionMode ?? (defaults.connections ? 'custom' : 'sequential')) === 'custom'
        ? 'custom'
        : 'sequential',
    connections: edges,
    routing: option({ curved: 1, elbow: 1, straight: 1 }, input.routing, 'curved'),
    lineStyle: option({ solid: 1, dashed: 1, dotted: 1 }, input.lineStyle, 'solid'),
    lineWidth: bounded(input.lineWidth ?? 1.5, 1, 4, 1.5),
    arrows: input.arrows !== false,
    spacing: bounded(input.spacing ?? 54, 32, 120, 54),
    radius: bounded(input.radius ?? 12, 0, 24, 12),
    font: option(FONTS, input.font, 'sans'),
    googleFont: validFontFamily(input.googleFont) ? input.googleFont.trim() : 'Roboto',
    fontWeight: Math.round(bounded(input.fontWeight ?? 400, 100, 900, 400)),
    positions: [],
    canvasSize:
      typeof canvas.width === 'number' &&
      Number.isFinite(canvas.width) &&
      typeof canvas.height === 'number' &&
      Number.isFinite(canvas.height)
        ? {
            width: Math.round(bounded(canvas.width, 220, 2600, 680)),
            height: Math.round(bounded(canvas.height, 204, 2200, 420)),
          }
        : null,
    showNumbers: input.showNumbers !== false,
    transparent: input.transparent === true,
    travelerSize: bounded(input.travelerSize ?? 1, 0.6, 1.8, 1),
  };
  const positions = Array.isArray(input.positions) ? input.positions.slice(0, steps.length) : [];
  const isPoint = (/** @type {unknown} */ value) => {
    const p = object(value);
    return (
      typeof p.x === 'number' &&
      Number.isFinite(p.x) &&
      typeof p.y === 'number' &&
      Number.isFinite(p.y)
    );
  };
  if (positions.some(isPoint)) {
    const geometry = automaticGeometry(config);
    config.positions = geometry.nodes.map((fallback, i) => {
      const p = isPoint(positions[i]) ? object(positions[i]) : fallback;
      return {
        x: Math.round(bounded(p.x, 70, 2500, fallback.x)),
        y: Math.round(bounded(p.y, geometry.header + 60, 2100, fallback.y)),
      };
    });
    config.canvasSize = {
      width: Math.max(
        config.canvasSize?.width || Math.min(2600, geometry.width),
        ...config.positions.map((p) => p.x + 80),
      ),
      height: Math.max(
        config.canvasSize?.height || Math.min(2200, geometry.height),
        ...config.positions.map((p) => p.y + 70),
      ),
    };
  }
  return config;
}

/** @param {unknown} raw */
export function workflowGeometry(raw = {}) {
  const c = normalizeConfig(raw),
    geometry = automaticGeometry(c);
  return {
    ...geometry,
    width: c.positions.length ? c.canvasSize?.width || geometry.width : geometry.width,
    height: c.positions.length ? c.canvasSize?.height || geometry.height : geometry.height,
    nodes: c.positions.length ? c.positions : geometry.nodes,
    edges:
      c.connectionMode === 'custom'
        ? c.connections
        : c.steps.slice(1).map((_, i) => ({ from: i, to: i + 1, label: '' })),
  };
}
