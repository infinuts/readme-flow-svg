// Generated from src/app.js by scripts/bundle.mjs (npm run build).
// Edit the source modules; module paths below identify their contents.
"use strict";
(() => {
  // src/markdown.js
  function withAltText(markdown2, description) {
    const alt = description.trim().replace(/[[\]\\\n\r<>]/g, " ");
    return alt ? markdown2.replace(/!\[[^\]]*\]/, () => `![${alt}]`) : markdown2;
  }

  // src/options.js
  var ICONS = {
    upload: '<path d="M12 16V4m-4 4 4-4 4 4M4 16v4h16v-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    compress: '<path d="M4 8h16M4 16h16m-8-9V3m-3 1 3 3 3-3m-3 13v4m-3-1 3-3 3 3"/>',
    download: '<path d="M12 4v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
    request: '<path d="m7 7-4 5 4 5m10-10 4 5-4 5m-4-14-2 18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-5"/>',
    process: '<path d="M4 7h16M4 12h16M4 17h16M8 5v4m8 1v4M9 15v4"/>',
    response: '<path d="M5 5h14v14H5zM8 9h8m-8 4h5"/>',
    code: '<path d="m7 7-4 5 4 5m10-10 4 5-4 5m-4-14-2 18"/>',
    test: '<path d="m9 3 0 6-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M7 15h10"/>',
    build: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
    deploy: '<path d="M12 3c5 3 7 8 7 13l-4-2-3 3-3-3-4 2c0-5 2-10 7-13ZM9 19l3 3 3-3"/><circle cx="12" cy="9" r="2"/>',
    file: '<path d="M14 3H6v18h12V7l-4-4Zm0 0v5h4M9 12h6m-6 4h4"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    key: '<circle cx="8" cy="8" r="4"/><path d="m11 11 10 10m-5-5 3-3m-6 0 3-3"/>',
    message: '<path d="M4 4h16v12H9l-5 4V4Zm4 4h8m-8 4h5"/>',
    sparkles: '<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3ZM20 2v4m-2-2h4"/>',
    heart: '<path d="M12 20 4.5 12.5a5 5 0 1 1 7.5-6 5 5 0 1 1 7.5 6L12 20Z"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18h1a2 2 0 0 0 1-4c-1-1 0-3 2-3h2a3 3 0 0 0 3-3 9 9 0 0 0-9-8Z"/><circle cx="7.5" cy="10" r=".7"/><circle cx="10" cy="6.5" r=".7"/><circle cx="15" cy="7" r=".7"/>',
    link: '<path d="m10 14 4-4m-5 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0-1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    play: '<path d="m7 4 14 8-14 8V4Z"/>',
    reset: '<path d="M4 10a8 8 0 1 1 2 8M4 4v6h6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    grip: '<circle cx="9" cy="5" r=".7"/><circle cx="15" cy="5" r=".7"/><circle cx="9" cy="12" r=".7"/><circle cx="15" cy="12" r=".7"/><circle cx="9" cy="19" r=".7"/><circle cx="15" cy="19" r=".7"/>'
  };
  var PRESETS = {
    files: {
      name: "File processing",
      description: "A file\u2019s journey, made visible.",
      steps: ["Upload", "Validate", "Compress", "Download"],
      icons: ["upload", "shield", "compress", "download"]
    },
    api: {
      name: "API request",
      description: "From request to response.",
      steps: ["Request", "Authenticate", "Process", "Response"],
      icons: ["request", "shield", "process", "response"]
    },
    deploy: {
      name: "Deployment",
      description: "From your machine to the world.",
      steps: ["Commit", "Test", "Build", "Deploy"],
      icons: ["code", "test", "build", "deploy"]
    },
    data: {
      name: "Data pipeline",
      description: "Turn raw data into something useful.",
      steps: ["Collect", "Validate", "Transform", "Store"],
      icons: ["download", "shield", "process", "database"]
    },
    auth: {
      name: "Authentication",
      description: "Follow a secure sign-in.",
      steps: ["Sign in", "Verify", "Authorize", "Session"],
      icons: ["key", "check", "shield", "lock"]
    },
    ai: {
      name: "AI inference",
      description: "From a prompt to an answer.",
      steps: ["Input", "Tokenize", "Infer", "Output"],
      icons: ["message", "process", "sparkles", "response"]
    },
    release: {
      name: "Release pipeline",
      description: "Build, verify, and roll out a release.",
      steps: ["Commit", "Lint", "Test", "Build", "Package", "Stage", "Approve", "Deploy", "Monitor"],
      icons: ["code", "check", "test", "build", "file", "database", "shield", "deploy", "response"],
      layout: "snake",
      columns: 3
    },
    review: {
      name: "Review loop",
      description: "Review changes and send feedback.",
      steps: ["Draft", "Review", "Revise", "Approve", "Publish", "Measure"],
      icons: ["file", "shield", "code", "check", "upload", "response"],
      layout: "snake",
      columns: 3,
      connections: [
        { from: 0, to: 1 },
        { from: 1, to: 2, label: "Changes" },
        { from: 2, to: 1, label: "Retry" },
        { from: 1, to: 3, label: "Approved" },
        { from: 3, to: 4 },
        { from: 4, to: 5 }
      ]
    },
    parallel: {
      name: "Parallel checks",
      description: "Split the work, then merge the results.",
      steps: ["Commit", "Unit tests", "Lint", "Build", "Deploy", "Monitor"],
      icons: ["code", "test", "check", "build", "deploy", "response"],
      layout: "grid",
      columns: 3,
      connections: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 }
      ]
    }
  };
  var STEP_ICONS = {
    file: "File",
    upload: "Upload",
    shield: "Shield",
    check: "Check",
    compress: "Compress",
    download: "Download",
    request: "Request",
    process: "Process",
    response: "Response",
    code: "Code",
    test: "Test",
    build: "Build",
    deploy: "Deploy",
    database: "Database",
    lock: "Lock",
    key: "Key",
    message: "Message",
    sparkles: "Sparkles",
    heart: "Heart",
    bolt: "Lightning"
  };
  var TRAVELERS = {
    dot: { name: "Dot", icon: null },
    file: { name: "File", icon: "file" },
    rocket: { name: "Rocket", icon: "deploy" },
    package: { name: "Package", icon: "build" },
    code: { name: "Code", icon: "code" },
    spark: { name: "Spark", icon: "sparkles" },
    heart: { name: "Heart", icon: "heart" },
    bolt: { name: "Lightning", icon: "bolt" }
  };
  var THEMES = {
    light: {
      background: "#ffffff",
      card: "#ffffff",
      border: "#dce3df",
      text: "#293c34",
      muted: "#8b9891",
      accent: "#21845a",
      tint: "#eef8f1",
      line: "#d5dfd8"
    },
    dark: {
      background: "#151c20",
      card: "#1e292f",
      border: "#34464e",
      text: "#e1ebe6",
      muted: "#8caaa0",
      accent: "#62d39b",
      tint: "#223e32",
      line: "#34464e"
    },
    terminal: {
      background: "#101a14",
      card: "#14231a",
      border: "#2a4534",
      text: "#bce8cb",
      muted: "#70997b",
      accent: "#8aeb9f",
      tint: "#253c2c",
      line: "#32533b"
    },
    github: {
      background: "#f6f8fa",
      card: "#ffffff",
      border: "#d1d9e0",
      text: "#1f2328",
      muted: "#656d76",
      accent: "#0969da",
      tint: "#ddf4ff",
      line: "#afb8c1"
    },
    ocean: {
      background: "#082c38",
      card: "#103d4c",
      border: "#2b5866",
      text: "#ddf5f7",
      muted: "#87b1bb",
      accent: "#58d6db",
      tint: "#175361",
      line: "#386674"
    },
    sunset: {
      background: "#fffbf7",
      card: "#fffdfa",
      border: "#ead8c8",
      text: "#593b30",
      muted: "#aa8a75",
      accent: "#c96735",
      tint: "#ffefdf",
      line: "#e4c9b2"
    }
  };
  var THEME_LABELS = {
    light: "Light",
    dark: "Dark",
    terminal: "Terminal",
    github: "GitHub",
    ocean: "Ocean",
    sunset: "Sunset"
  };
  var THEME_FIELDS = {
    background: "Background",
    card: "Cards",
    text: "Labels",
    accent: "Accent",
    border: "Borders",
    tint: "Active stage",
    muted: "Step numbers",
    line: "Connections"
  };

  // src/config.js
  var LAYOUTS = {
    horizontal: "Horizontal",
    vertical: "Vertical",
    snake: "Snake / multiple rows",
    grid: "Grid"
  };
  var FONTS = {
    sans: "Sans serif",
    mono: "Monospace",
    serif: "Serif",
    google: "Google Fonts"
  };
  var validFontFamily = (value) => typeof value === "string" && /^[\p{L}\p{N}][\p{L}\p{N} .-]{0,79}$/u.test(value.trim());
  var object = (value) => value !== null && typeof value === "object" && !Array.isArray(value) ? (
    /** @type {Record<string, unknown>} */
    value
  ) : {};
  var option = (options, key, fallback) => typeof key === "string" && Object.hasOwn(options, key) ? key : fallback;
  var bounded = (value, min, max, fallback) => {
    const number = typeof value === "number" || typeof value === "string" ? Number(value) : NaN;
    return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
  };
  function normalizePalette(raw = {}) {
    const colors = object(raw);
    return (
      /** @type {Palette} */
      Object.fromEntries(
        Object.entries(THEMES.light).map(([key, fallback]) => {
          let color = typeof colors[key] === "string" ? colors[key] : "";
          if (!/^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(color)) color = fallback;
          if (color.length === 4) color = "#" + Array.from(color.slice(1), (c) => c + c).join("");
          return [key, color.toLowerCase()];
        })
      )
    );
  }
  function automaticGeometry(c) {
    const n = c.steps.length, cols = c.layout === "vertical" ? 1 : c.layout === "horizontal" ? n : Math.min(c.columns, n), rows = Math.ceil(n / cols), header = (c.title ? 38 : 0) + (c.subtitle ? 48 : 0), width = Math.max(c.title || c.subtitle ? 400 : 220, cols * 118 + (cols - 1) * c.spacing + 96), height = rows * 96 + (rows - 1) * c.spacing + 96 + header, left = (width - (cols * 118 + (cols - 1) * c.spacing)) / 2;
    const nodes = c.steps.map((_, i) => {
      const row = Math.floor(i / cols), col = c.layout === "snake" && row % 2 ? cols - 1 - i % cols : i % cols;
      return { x: left + 59 + col * (118 + c.spacing), y: header + 96 + row * (96 + c.spacing) };
    });
    return { width, height, header, nodes };
  }
  function normalizeConfig(raw = {}) {
    const input = object(raw), preset = option(PRESETS, input.preset, "files"), defaults = PRESETS[preset];
    const steps = Array.isArray(input.steps) ? input.steps.slice(0, 12).map((s) => String(s).trim().slice(0, 32)) : defaults.steps.slice();
    while (steps.length < 3) steps.push("Step " + (steps.length + 1));
    const icons = steps.map(
      (_, i) => option(
        STEP_ICONS,
        Array.isArray(input.icons) ? input.icons[i] : void 0,
        defaults.icons[i] || "file"
      )
    );
    const edges = [];
    const seen = /* @__PURE__ */ new Set();
    for (const value of (Array.isArray(input.connections) ? input.connections : defaults.connections || []).slice(0, 24)) {
      const edge = object(value), from = edge.from, to = edge.to;
      if (typeof from !== "number" || typeof to !== "number" || !Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= steps.length || to >= steps.length || from === to)
        continue;
      const key = from + ":" + to;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from, to, label: String(edge.label || "").slice(0, 24) });
    }
    const canvas = object(input.canvasSize);
    const config2 = {
      preset,
      steps: steps.map((s, i) => s || "Step " + (i + 1)),
      icons,
      theme: input.theme === "custom" ? "custom" : option(THEMES, input.theme, "light"),
      customTheme: normalizePalette(input.customTheme),
      traveler: option(TRAVELERS, input.traveler, "dot"),
      duration: bounded(input.duration || 6, 2, 30, 6),
      title: String(input.title || "").slice(0, 80),
      subtitle: String(input.subtitle || "").slice(0, 140),
      layout: option(LAYOUTS, input.layout, defaults.layout || "horizontal"),
      columns: Math.round(bounded(input.columns ?? defaults.columns ?? 3, 2, 6, 3)),
      connectionMode: (input.connectionMode ?? (defaults.connections ? "custom" : "sequential")) === "custom" ? "custom" : "sequential",
      connections: edges,
      routing: option({ curved: 1, elbow: 1, straight: 1 }, input.routing, "curved"),
      lineStyle: option({ solid: 1, dashed: 1, dotted: 1 }, input.lineStyle, "solid"),
      lineWidth: bounded(input.lineWidth ?? 1.5, 1, 4, 1.5),
      arrows: input.arrows !== false,
      spacing: bounded(input.spacing ?? 54, 32, 120, 54),
      radius: bounded(input.radius ?? 12, 0, 24, 12),
      font: option(FONTS, input.font, "sans"),
      googleFont: validFontFamily(input.googleFont) ? input.googleFont.trim() : "Roboto",
      fontWeight: Math.round(bounded(input.fontWeight ?? 400, 100, 900, 400)),
      positions: [],
      canvasSize: typeof canvas.width === "number" && Number.isFinite(canvas.width) && typeof canvas.height === "number" && Number.isFinite(canvas.height) ? {
        width: Math.round(bounded(canvas.width, 220, 2600, 680)),
        height: Math.round(bounded(canvas.height, 204, 2200, 420))
      } : null,
      showNumbers: input.showNumbers !== false,
      transparent: input.transparent === true,
      travelerSize: bounded(input.travelerSize ?? 1, 0.6, 1.8, 1)
    };
    const positions = Array.isArray(input.positions) ? input.positions.slice(0, steps.length) : [];
    const isPoint = (value) => {
      const p = object(value);
      return typeof p.x === "number" && Number.isFinite(p.x) && typeof p.y === "number" && Number.isFinite(p.y);
    };
    if (positions.some(isPoint)) {
      const geometry = automaticGeometry(config2);
      config2.positions = geometry.nodes.map((fallback, i) => {
        const p = isPoint(positions[i]) ? object(positions[i]) : fallback;
        return {
          x: Math.round(bounded(p.x, 70, 2500, fallback.x)),
          y: Math.round(bounded(p.y, geometry.header + 60, 2100, fallback.y))
        };
      });
      config2.canvasSize = {
        width: Math.max(
          config2.canvasSize?.width || Math.min(2600, geometry.width),
          ...config2.positions.map((p) => p.x + 80)
        ),
        height: Math.max(
          config2.canvasSize?.height || Math.min(2200, geometry.height),
          ...config2.positions.map((p) => p.y + 70)
        )
      };
    }
    return config2;
  }
  function workflowGeometry(raw = {}) {
    const c = normalizeConfig(raw), geometry = automaticGeometry(c);
    return {
      ...geometry,
      width: c.positions.length ? c.canvasSize?.width || geometry.width : geometry.width,
      height: c.positions.length ? c.canvasSize?.height || geometry.height : geometry.height,
      nodes: c.positions.length ? c.positions : geometry.nodes,
      edges: c.connectionMode === "custom" ? c.connections : c.steps.slice(1).map((_, i) => ({ from: i, to: i + 1, label: "" }))
    };
  }

  // src/editor-state.js
  function createHistory(initial) {
    const snapshots = [JSON.stringify(initial)];
    let cursor = 0, lastTime = 0;
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
        const next = JSON.stringify(value), now = Date.now();
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
      }
    };
  }
  function positionedConfig(raw) {
    const config2 = normalizeConfig(raw);
    if (config2.positions.length) return config2;
    const geometry = workflowGeometry(config2);
    return normalizeConfig({
      ...config2,
      positions: geometry.nodes,
      canvasSize: {
        width: Math.min(2600, geometry.width),
        height: Math.min(2200, Math.max(420, geometry.height))
      }
    });
  }
  function arrangeCards(raw, action) {
    const config2 = positionedConfig(raw), positions = config2.positions;
    const axis = action.endsWith("x") ? "x" : "y", other = axis === "x" ? "y" : "x";
    function spread(direction, align) {
      const sorted = [...positions].sort((a, b) => a[direction] - b[direction]);
      const min = direction === "x" ? 70 : workflowGeometry(config2).header + 60;
      const max = direction === "x" ? 2500 : 2100, gap = direction === "x" ? 150 : 128;
      if (align) {
        sorted.forEach((p, i) => {
          p[direction] = Math.max(p[direction], i ? sorted[i - 1][direction] + gap : min);
        });
      } else {
        const start = sorted[0][direction], distance = Math.max(
          gap,
          (sorted[sorted.length - 1][direction] - start) / (positions.length - 1)
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
            (sorted[sorted.length - 1][direction] - sorted[0][direction]) / (positions.length - 1)
          )
        );
        const start = Math.max(min, max - distance * (positions.length - 1));
        sorted.forEach((p, i) => {
          p[direction] = Math.round(start + i * distance);
        });
      }
    }
    if (action.startsWith("align")) {
      const center = Math.round(positions.reduce((sum, p) => sum + p[axis], 0) / positions.length);
      positions.forEach((p) => {
        p[axis] = center;
      });
      spread(other, true);
    } else if (action.startsWith("distribute")) {
      spread(axis, false);
    } else if (action === "fit") {
      const left = Math.min(...positions.map((p) => p.x)) - 80;
      const top = Math.min(...positions.map((p) => p.y)) - workflowGeometry(config2).header - 70;
      positions.forEach((p) => {
        p.x -= left;
        p.y -= top;
      });
      config2.canvasSize = {
        width: Math.max(220, ...positions.map((p) => p.x + 80)),
        height: Math.max(204, ...positions.map((p) => p.y + 70))
      };
    }
    return normalizeConfig(config2);
  }
  function importWorkflow(text) {
    if (new TextEncoder().encode(text).byteLength > 16384)
      throw Error("Workflow JSON must be 16 KB or smaller.");
    const value = JSON.parse(text);
    if (!value || typeof value !== "object" || !Array.isArray(value.steps) || value.steps.length < 3 || value.steps.length > 12 || !value.steps.every(
      (step) => typeof step === "string" && step.trim() && step.length <= 32
    ))
      throw Error(
        "Choose a workflow JSON file with 3\u201312 nonempty step labels (up to 32 characters)."
      );
    return normalizeConfig(value);
  }

  // src/svg.js
  function escapeXml(value) {
    return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);
  }
  function cardLabel(value, x, y, color) {
    const chars = Array.from(value);
    if (chars.length <= 14) return `<text x="${x}" y="${y}" fill="${color}" text-anchor="middle" font-size="12" font-weight="500">${escapeXml(value)}</text>`;
    const middle = Math.ceil(chars.length / 2), breaks = chars.map((char, i) => char === " " && i > 0 && i < chars.length - 1 ? i : -1).filter((i) => i > 0);
    const split = breaks.sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle))[0];
    const at = split !== void 0 && Math.max(split, chars.length - split - 1) <= 18 ? split : middle;
    const lines = [chars.slice(0, at).join("").trim(), chars.slice(at).join("").trim()], size = Math.min(12, 102 / (Math.max(...lines.map((line) => Array.from(line).length)) * 0.6));
    return lines.map((line, i) => `<text x="${x}" y="${y - 7 + i * 15}" fill="${color}" text-anchor="middle" font-size="${size.toFixed(2)}" font-weight="500">${escapeXml(line)}</text>`).join("");
  }
  function renderClassicSvg(raw = {}, paused2 = false) {
    const c = normalizeConfig(raw), t = c.theme === "custom" ? c.customTheme : THEMES[c.theme], n = c.steps.length, gap = 172, width = gap * (n - 1) + 164, x0 = 82, y = 156;
    const font = c.theme === "terminal" ? "monospace" : "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    const motion = Array.from({ length: n }, (_, i) => {
      const start = i / n * 100, end = (i + 0.28) / n * 100, x = i * gap;
      return `${start.toFixed(3)}%,${end.toFixed(3)}%{transform:translateX(${x}px)}`;
    }).join("") + `0%{opacity:0}2%,94%{opacity:1}100%{transform:translateX(${(n - 1) * gap}px);opacity:0}`;
    const nodes = c.steps.map((label, i) => {
      const x = x0 + i * gap, start = i / n * 100, end = (i + 1) / n * 100;
      const inactive = `fill:${t.card};stroke:${t.border}`, active = `fill:${t.tint};stroke:${t.accent}`;
      const keys = i === 0 ? `0%,${(end - 0.01).toFixed(3)}%{${active}}${end.toFixed(3)}%,100%{${inactive}}` : `0%,${(start - 0.01).toFixed(3)}%,${end.toFixed(3)}%,100%{${inactive}}${start.toFixed(3)}%,${(end - 0.01).toFixed(3)}%{${active}}`;
      const icon2 = ICONS[c.icons[i]];
      return `<style>@keyframes stage${i}{${keys}}</style><g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${x - 59}" y="43" width="118" height="95" rx="12" fill="${t.card}" stroke="${t.border}"/><text x="${x - 45}" y="62" fill="${t.muted}" font-size="9">${String(i + 1).padStart(2, "0")}</text><g transform="translate(${x - 12} 65)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon2}</g>${cardLabel(label, x, 116, t.text)}<circle cx="${x}" cy="${y}" r="3" fill="${t.line}"/></g>`;
    }).join("");
    const connectors = Array.from({ length: n - 1 }, (_, i) => {
      const x = x0 + i * gap;
      return `<path d="M${x + 64} 91h43m-5-4 5 4-5 4" stroke="${t.line}" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    }).join("");
    const traveler = c.traveler === "dot" ? `<circle class="dot-halo animated" cx="${x0}" cy="${y}" r="9" fill="${t.accent}" opacity=".13"/><circle cx="${x0}" cy="${y}" r="4.5" fill="${t.accent}"/>` : `<g transform="translate(${x0 - 12} ${y - 12})"><rect x="-2" y="-2" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(3 3) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g></g>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="204" viewBox="0 0 ${width} 204" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.steps.join(" \u2192 "))}</title><desc id="desc">An animated ${escapeXml(PRESETS[c.preset].name.toLowerCase())} workflow with ${n} steps.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused2 ? "paused" : "running"}}.traveler{animation-name:travel;animation-timing-function:cubic-bezier(.45,0,.2,1)}.dot-halo{animation-name:dotPulse;animation-duration:1.6s;animation-timing-function:ease-out}@keyframes travel{${motion}}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}@media(prefers-reduced-motion:reduce){.animated{animation:none}}</style><rect width="${width}" height="204" rx="16" fill="${t.background}"/><path d="M${x0} ${y}H${x0 + (n - 1) * gap}" stroke="${t.line}" stroke-width="1.5"/>${connectors}${nodes}<g class="traveler animated" data-element="${c.traveler}">${traveler}</g></svg>`;
  }
  function curveBetween(a, b, c, g) {
    const horizontal = a.y === b.y, sign = (horizontal ? Math.sign(b.x - a.x) : Math.sign(b.y - a.y)) || 1;
    const start = horizontal ? { x: a.x + sign * 60, y: a.y } : { x: a.x, y: a.y + sign * 49 };
    const end = horizontal ? { x: b.x - sign * 60, y: b.y } : { x: b.x, y: b.y - sign * 49 };
    if (g.edges.some((e) => g.nodes[e.from] === b && g.nodes[e.to] === a)) {
      if (horizontal) {
        start.y -= sign * 12;
        end.y -= sign * 12;
      } else {
        start.x += sign * 12;
        end.x += sign * 12;
      }
    }
    let points = [start, end];
    if (c.routing !== "straight") {
      const outerStart = horizontal ? { x: start.x + sign * 10, y: start.y } : { x: start.x, y: start.y + sign * 10 };
      const outerEnd = horizontal ? { x: end.x - sign * 10, y: end.y } : { x: end.x, y: end.y - sign * 10 };
      const xs = [.../* @__PURE__ */ new Set([20, g.width - 20, outerStart.x, outerEnd.x, ...g.nodes.flatMap((p) => [p.x - 70, p.x, p.x + 70])])].sort((a2, b2) => a2 - b2);
      const ys = [.../* @__PURE__ */ new Set([g.header + 18, g.height - 18, outerStart.y, outerEnd.y, ...g.nodes.flatMap((p) => [p.y - 60, p.y, p.y + 60])])].sort((a2, b2) => a2 - b2);
      const clear = (p, q) => !g.nodes.some((node) => Math.max(p.x, q.x) > node.x - 65 && Math.min(p.x, q.x) < node.x + 65 && Math.max(p.y, q.y) > node.y - 54 && Math.min(p.y, q.y) < node.y + 54);
      const first = ys.indexOf(outerStart.y) * xs.length + xs.indexOf(outerStart.x), last = ys.indexOf(outerEnd.y) * xs.length + xs.indexOf(outerEnd.x);
      const point = (id) => ({ x: xs[id % xs.length], y: ys[Math.floor(id / xs.length)] });
      const cost = /* @__PURE__ */ new Map([[first, 0]]), previous = /* @__PURE__ */ new Map(), open = [first], closed = /* @__PURE__ */ new Set();
      while (open.length) {
        open.sort((a2, b2) => {
          const pa = point(a2), pb = point(b2);
          return cost.get(a2) + Math.abs(pa.x - outerEnd.x) + Math.abs(pa.y - outerEnd.y) - cost.get(b2) - Math.abs(pb.x - outerEnd.x) - Math.abs(pb.y - outerEnd.y);
        });
        const current = open.shift();
        if (current === last) break;
        if (closed.has(current)) continue;
        closed.add(current);
        const x = current % xs.length, y = Math.floor(current / xs.length), p = point(current);
        for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
          if (nx < 0 || ny < 0 || nx >= xs.length || ny >= ys.length) continue;
          const next = ny * xs.length + nx, q = point(next);
          if (!clear(p, q)) continue;
          const candidate = cost.get(current) + Math.abs(q.x - p.x) + Math.abs(q.y - p.y);
          if (candidate < (cost.get(next) ?? Infinity)) {
            cost.set(next, candidate);
            previous.set(next, current);
            open.push(next);
          }
        }
      }
      if (previous.has(last) || first === last) {
        const route = [point(last)];
        let id = last;
        while (id !== first) {
          id = previous.get(id);
          route.push(point(id));
        }
        points = [start, ...route.reverse(), end];
      }
    }
    points = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x || p.y !== points[i - 1].y);
    points = points.filter((p, i) => !i || i === points.length - 1 || !(points[i - 1].x === p.x && p.x === points[i + 1].x || points[i - 1].y === p.y && p.y === points[i + 1].y));
    let path = `M${start.x} ${start.y}`, samples = [start];
    const lerp = (a2, b2, t) => ({ x: a2.x + (b2.x - a2.x) * t, y: a2.y + (b2.y - a2.y) * t }), distance = (a2, b2) => Math.hypot(a2.x - b2.x, a2.y - b2.y);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (c.routing === "curved" && i < points.length - 1) {
        const previous = points[i - 1], next = points[i + 1], r = Math.min(12, distance(previous, p) / 2, distance(p, next) / 2), entry = lerp(p, previous, r / distance(p, previous)), exit = lerp(p, next, r / distance(p, next));
        path += `L${entry.x} ${entry.y}Q${p.x} ${p.y} ${exit.x} ${exit.y}`;
        samples.push(entry);
        for (let j = 1; j <= 8; j++) {
          const t = j / 8;
          samples.push(lerp(lerp(entry, p, t), lerp(p, exit, t), t));
        }
      } else {
        path += `L${p.x} ${p.y}`;
        samples.push(p);
      }
    }
    const lengths = [0];
    for (let i = 1; i < samples.length; i++) lengths.push(lengths[i - 1] + distance(samples[i - 1], samples[i]));
    const at = (t) => {
      const d = t * lengths.at(-1);
      for (let i = 1; i < samples.length; i++) if (d <= lengths[i]) return lerp(samples[i - 1], samples[i], (d - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1));
      return end;
    };
    const before = points.at(-2);
    return { path, at, end, angle: Math.atan2(end.y - before.y, end.x - before.x) * 180 / Math.PI };
  }
  var routeCache = /* @__PURE__ */ new Map();
  function connectionRoutes(c, g) {
    const key = JSON.stringify([c.routing, g.width, g.height, g.header, g.nodes, g.edges.map((e) => [e.from, e.to])]);
    let routes = routeCache.get(key);
    if (routes) routeCache.delete(key);
    else routes = g.edges.map((edge) => curveBetween(g.nodes[edge.from], g.nodes[edge.to], c, g));
    routeCache.set(key, routes);
    if (routeCache.size > 8) routeCache.delete(routeCache.keys().next().value);
    return routes;
  }
  function renderWorkflowSvg(raw = {}, paused2 = false) {
    const c = normalizeConfig(raw);
    if (!c.positions.length && c.steps.length <= 6 && !c.title && !c.subtitle && c.layout === "horizontal" && c.connectionMode === "sequential" && c.routing === "curved" && c.lineStyle === "solid" && c.lineWidth === 1.5 && c.arrows && c.spacing === 54 && c.radius === 12 && c.font === "sans" && c.showNumbers && !c.transparent && c.travelerSize === 1) return renderClassicSvg(c, paused2);
    const t = c.theme === "custom" ? c.customTheme : THEMES[c.theme], g = workflowGeometry(c), m = g.edges.length, routes = connectionRoutes(c, g);
    const font = c.font === "mono" || c.font === "sans" && c.theme === "terminal" ? "monospace" : c.font === "serif" ? "Georgia, serif" : "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    const fit = (text2, width, size) => text2.length * size * 0.6 > width ? ` textLength="${width}" lengthAdjust="spacingAndGlyphs"` : "";
    const text = (value, x, y, size, weight = 400) => `<text x="${x}" y="${y}" fill="${t.text}" font-size="${size}" font-weight="${weight}"${fit(value, g.width - 80, size)}>${escapeXml(value)}</text>`;
    const heading = (c.title ? text(c.title, 40, 43, 22, 600) : "") + (c.subtitle ? text(c.subtitle.slice(0, 70), 40, c.title ? 70 : 40, 12) + (c.subtitle.length > 70 ? text(c.subtitle.slice(70), 40, c.title ? 88 : 58, 12) : "") : "");
    let styles = "";
    const nodes = g.nodes.map((p, i) => {
      const events = [];
      g.edges.forEach((e, k) => {
        if (e.from === i) events.push([k / m * 100, (k + 0.24) / m * 100]);
        if (e.to === i) events.push([(k + 0.7) / m * 100, (k + 0.99) / m * 100]);
      });
      const active = `fill:${t.tint};stroke:${t.accent}`, inactive = `fill:${t.card};stroke:${t.border}`;
      const keys = /* @__PURE__ */ new Map([[0, inactive], [100, inactive]]);
      for (const [start, end] of events) {
        if (start > 0) keys.set(Math.max(0, start - 0.01), inactive);
        keys.set(start, active);
        keys.set(end, active);
        keys.set(Math.min(100, end + 0.01), inactive);
      }
      styles += `@keyframes stage${i}{${[...keys].sort((a, b) => a[0] - b[0]).map(([time, value]) => `${time.toFixed(3)}%{${value}}`).join("")}}`;
      return `<g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${p.x - 59}" y="${p.y - 48}" width="118" height="96" rx="${c.radius}" fill="${t.card}" stroke="${t.border}"/>${c.showNumbers ? `<text x="${p.x - 45}" y="${p.y - 29}" fill="${t.muted}" font-size="9">${String(i + 1).padStart(2, "0")}</text>` : ""}<g transform="translate(${p.x - 12} ${p.y - 26})" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[c.icons[i]]}</g>${cardLabel(c.steps[i], p.x, p.y + 25, t.text)}</g>`;
    }).join("");
    const dash = c.lineStyle === "dashed" ? ' stroke-dasharray="7 5"' : c.lineStyle === "dotted" ? ' stroke-dasharray="1 5"' : "";
    let travelers = "";
    const connectors = g.edges.map((edge, i) => {
      const curve = routes[i], mid = curve.at(0.5), start = i / m * 100, end = (i + 0.95) / m * 100;
      const samples = Array.from({ length: 33 }, (_, j) => {
        const p = curve.at(j / 32);
        return `${(start + (end - start) * j / 32).toFixed(4)}%{transform:translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px);opacity:${j === 0 || j === 32 ? 0 : 1}}`;
      }).join("");
      styles += `@keyframes travel${i}{0%,100%{opacity:0}${samples}}`;
      const element = c.traveler === "dot" ? `<circle class="dot-halo animated" r="9" fill="${t.accent}" opacity=".13"/><circle r="4.5" fill="${t.accent}"/>` : `<rect x="-14" y="-14" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(-9 -9) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g>`;
      travelers += `<g class="traveler animated" data-element="${c.traveler}" style="animation-name:travel${i};opacity:0"><g transform="scale(${c.travelerSize})">${element}</g></g>`;
      return `<g data-connection="${edge.from}-${edge.to}"><path d="${curve.path}" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round"${dash}/>${c.arrows ? `<path d="M-7-4 0 0-7 4" transform="translate(${curve.end.x} ${curve.end.y}) rotate(${curve.angle})" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round" stroke-linejoin="round"/>` : ""}${edge.label ? `<text x="${mid.x}" y="${mid.y - 9}" text-anchor="middle" fill="${t.muted}" stroke="${c.transparent ? t.card : t.background}" stroke-width="4" paint-order="stroke" font-size="10">${escapeXml(edge.label)}</text>` : ""}</g>`;
    }).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${g.width}" height="${g.height}" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.title || c.steps.join(" \u2192 "))}</title><desc id="desc">${escapeXml(c.subtitle || "Animated workflow: " + c.steps.join(", "))}. ${g.edges.map((e) => escapeXml(c.steps[e.from] + " to " + c.steps[e.to] + (e.label ? " (" + e.label + ")" : ""))).join("; ")}.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused2 ? "paused" : "running"}}.dot-halo{animation-name:dotPulse;animation-duration:1.6s}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}${styles}@media(prefers-reduced-motion:reduce){.animated{animation:none}.traveler{display:none}}</style>${c.transparent ? "" : `<rect width="${g.width}" height="${g.height}" rx="16" fill="${t.background}"/>`}${heading}${connectors}${nodes}${travelers}</svg>`;
  }
  function renderSvg(raw = {}, paused2 = false, idPrefix = "workflow") {
    const c = normalizeConfig(raw);
    let hash = 2166136261;
    for (const char of JSON.stringify(c)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
    const suffix = "_" + hash.toString(36), names = /\b(stage\d+|travel\d*|dotPulse)\b/g;
    const scope = String(idPrefix).replace(/[^a-zA-Z0-9_-]/g, "") || "workflow", title = scope + suffix + "-title", desc = scope + suffix + "-desc";
    return renderWorkflowSvg(c, paused2).replace('aria-labelledby="title desc"', `aria-labelledby="${title} ${desc}"`).replace('id="title"', `id="${title}"`).replace('id="desc"', `id="${desc}"`).replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => "<style>" + css.replace(names, (name) => name + suffix) + "</style>").replace(/style="animation-name:(stage\d+|travel\d*)/g, (_, name) => 'style="animation-name:' + name + suffix);
  }

  // src/links.js
  var SERVICE_URL = "https://readme-flow-svg.vercel.app";
  var EDITOR_URL = SERVICE_URL + "/";
  function workflowParams(raw) {
    const config2 = normalizeConfig(raw), params = new URLSearchParams();
    params.set("steps", JSON.stringify(config2.steps));
    if (config2.preset !== "files") params.set("preset", config2.preset);
    if (config2.theme !== "light") params.set("theme", config2.theme);
    if (config2.traveler !== "dot") params.set("traveler", config2.traveler);
    if (config2.duration !== 6) params.set("duration", String(config2.duration));
    if (config2.icons.some((name, i) => name !== (PRESETS[config2.preset].icons[i] || "file"))) params.set("icons", JSON.stringify(config2.icons));
    if (config2.theme === "custom") params.set("customTheme", JSON.stringify(config2.customTheme));
    const defaults = normalizeConfig({ preset: config2.preset });
    const keys = ["title", "subtitle", "layout", "columns", "connectionMode", "routing", "lineStyle", "lineWidth", "arrows", "spacing", "radius", "font", "showNumbers", "transparent", "travelerSize"];
    for (const key of keys) if (config2[key] !== defaults[key]) params.set(key, String(config2[key]));
    if (config2.connectionMode === "custom" || JSON.stringify(config2.connections) !== JSON.stringify(defaults.connections)) params.set("connections", JSON.stringify(config2.connections));
    if (config2.font === "google") {
      params.set("googleFont", config2.googleFont);
      params.set("fontWeight", String(config2.fontWeight));
    }
    if (config2.positions.length) params.set("positions", JSON.stringify(config2.positions));
    if (config2.canvasSize) params.set("canvasSize", JSON.stringify(config2.canvasSize));
    return params;
  }
  function imageUrl(raw) {
    return SERVICE_URL + "/svg?" + workflowParams(raw);
  }
  function editorUrl(raw) {
    return EDITOR_URL + "?" + workflowParams(raw);
  }
  function workflowMarkdown(raw, local = false, options = {}) {
    const config2 = normalizeConfig(raw);
    const alt = (options.alt?.trim() || config2.title || config2.steps.join(" \u2192 ")).replace(/[[\]\\\n\r<>]/g, " ");
    let target = options.link === "editor" ? editorUrl(config2) : options.link === "repository" || options.link === void 0 ? SERVICE_URL + "/r" : "";
    if (options.link === "custom") {
      try {
        const url = new URL(options.href?.trim() || "");
        if (["http:", "https:"].includes(url.protocol)) target = url.href;
      } catch {
      }
    }
    target = target.replace(/[()]/g, (char) => char === "(" ? "%28" : "%29");
    if (options.adaptive && !local) {
      const escape = (value) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char] || char);
      const picture = '<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="' + escape(imageUrl({ ...config2, theme: "dark" })) + '">\n  <source media="(prefers-color-scheme: light)" srcset="' + escape(imageUrl({ ...config2, theme: "light" })) + '">\n  <img alt="' + escape(alt) + '" src="' + escape(imageUrl({ ...config2, theme: "light" })) + '">\n</picture>';
      return target ? '<a href="' + escape(target) + '">\n' + picture + "\n</a>" : picture;
    }
    const image = "![" + alt + "](" + (local ? "./workflow.svg" : imageUrl(config2)) + ")";
    return target && (!local || options.link !== void 0) ? "[" + image + "](" + target + ")" : image;
  }
  function parseWorkflowParams(params) {
    const array = (key) => {
      const value = params.get(key);
      if (value === null) return void 0;
      const parsed = value.trim().startsWith("[") ? JSON.parse(value) : value.split(";");
      if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) throw Error(`${key} must be an array of strings or semicolon-separated text.`);
      return parsed;
    };
    const extra = {};
    for (const key of ["title", "subtitle", "layout", "connectionMode", "routing", "lineStyle", "font"]) if (params.has(key)) extra[key] = params.get(key);
    for (const key of ["columns", "lineWidth", "spacing", "radius", "travelerSize"]) if (params.has(key)) extra[key] = Number(params.get(key));
    for (const key of ["arrows", "showNumbers", "transparent"]) if (params.has(key)) {
      if (!["true", "false"].includes(params.get(key) || "")) throw Error("Invalid boolean");
      extra[key] = params.get(key) === "true";
    }
    if (params.has("connections")) extra.connections = JSON.parse(params.get("connections") || "null");
    if (params.has("googleFont")) extra.googleFont = params.get("googleFont");
    if (params.has("fontWeight")) extra.fontWeight = Number(params.get("fontWeight"));
    for (const key of ["positions", "canvasSize"]) if (params.has(key)) extra[key] = JSON.parse(params.get(key) || "null");
    return { ...extra, steps: array("steps"), icons: array("icons"), preset: params.get("preset") || void 0, theme: params.get("theme") || void 0, traveler: params.get("traveler") || void 0, duration: params.has("duration") ? Number(params.get("duration")) : void 0, customTheme: params.has("customTheme") ? JSON.parse(params.get("customTheme") || "null") : void 0 };
  }

  // src/load-font-engine.js
  var pending;
  function loadFontEngine() {
    if (window.ReadmeFlowFonts) return Promise.resolve(window.ReadmeFlowFonts);
    if (pending) return pending;
    pending = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL("./src/font-engine.js", document.baseURI).href;
      script.onload = () => resolve(window.ReadmeFlowFonts);
      script.onerror = () => {
        pending = void 0;
        script.remove();
        reject(new Error("Could not load the font engine. Check your connection and retry."));
      };
      document.head.append(script);
    });
    return pending;
  }

  // src/gallery.js
  var GALLERY = [
    {
      id: "cicd",
      name: "CI/CD",
      description: "Run checks in parallel, then build and deploy.",
      config: {
        preset: "parallel",
        title: "Ship with confidence",
        theme: "github",
        traveler: "rocket",
        duration: 12,
        layout: "grid",
        columns: 3,
        routing: "elbow"
      }
    },
    {
      id: "etl",
      name: "ETL pipeline",
      description: "Extract raw data and turn it into a usable dataset.",
      config: {
        preset: "data",
        title: "From source to warehouse",
        steps: ["Extract", "Validate", "Clean", "Transform", "Load", "Report"],
        icons: ["download", "shield", "check", "process", "database", "response"],
        layout: "snake",
        columns: 3,
        theme: "ocean",
        traveler: "package",
        duration: 12
      }
    },
    {
      id: "auth",
      name: "Auth flow",
      description: "Follow a sign-in from credentials to a secure session.",
      config: {
        preset: "auth",
        title: "A secure sign-in",
        theme: "dark",
        traveler: "dot",
        duration: 8,
        lineStyle: "dashed"
      }
    },
    {
      id: "git",
      name: "Git flow",
      description: "Take a change from a branch to a tagged release.",
      config: {
        preset: "deploy",
        title: "From branch to release",
        steps: ["Branch", "Commit", "Review", "Merge", "Tag", "Release"],
        icons: ["code", "file", "shield", "check", "build", "deploy"],
        layout: "snake",
        columns: 3,
        theme: "sunset",
        traveler: "code",
        duration: 12
      }
    },
    {
      id: "microservice",
      name: "Microservice request",
      description: "Follow a request through the gateway, service, and cache.",
      config: {
        preset: "api",
        title: "A request across services",
        steps: ["Client", "Gateway", "Service", "Cache", "Response"],
        icons: ["request", "shield", "process", "database", "response"],
        theme: "light",
        traveler: "bolt",
        duration: 10
      }
    },
    {
      id: "ml",
      name: "ML training",
      description: "Prepare data, train a model, and evaluate the result.",
      config: {
        preset: "data",
        title: "From data to a model",
        steps: ["Collect", "Clean", "Split", "Train", "Evaluate", "Register"],
        icons: ["database", "process", "code", "sparkles", "test", "build"],
        layout: "snake",
        columns: 3,
        theme: "terminal",
        traveler: "spark",
        font: "mono",
        duration: 12
      }
    }
  ];

  // community/repos.json
  var repos_default = [
    {
      repo: "infinuts/readme-flow-svg",
      description: "The workflow generator uses its own animated SVG in its README."
    }
  ];

  // src/community.js
  function validateRepositories(entries) {
    if (!Array.isArray(entries)) throw new Error("Community repositories must be an array.");
    const seen = /* @__PURE__ */ new Set();
    for (const entry of entries) {
      if (!entry || typeof entry.repo !== "string" || !/^[a-z\d](?:[a-z\d-]{0,38})\/[a-z\d_.-]{1,100}$/i.test(entry.repo))
        throw new Error("Use an owner/repository name in community/repos.json.");
      if (typeof entry.description !== "string" || !entry.description.trim() || entry.description.length > 160)
        throw new Error("Each repository needs a description of 1\u2013160 characters.");
      const key = entry.repo.toLowerCase();
      if (seen.has(key)) throw new Error(`Duplicate community repository: ${entry.repo}`);
      seen.add(key);
    }
    return entries;
  }
  var COMMUNITY_REPOS = validateRepositories(repos_default);

  // src/app.js
  var fontEngine;
  var $ = (id) => document.getElementById(id);
  var icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.file}</svg>`;
  document.querySelectorAll("[data-icon]").forEach((el) => el.innerHTML = icon(el.dataset.icon));
  var config = normalizeConfig();
  var paused = false;
  var activeTab = "markdown";
  var toastTimer;
  var iconStep = null;
  var fontCache = /* @__PURE__ */ new Map();
  var fontTimer;
  var drag = null;
  var renderFrame;
  var fontKey = () => config.googleFont + ":" + config.fontWeight;
  function currentSvg(settings = config, isPaused = false, scope = "workflow") {
    const svg = renderSvg(settings, isPaused, scope), entry = fontCache.get(settings.googleFont + ":" + settings.fontWeight);
    return settings.font === "google" && entry?.font ? fontEngine.outlineSvg(svg, entry.font, settings.googleFont) : svg;
  }
  function updateFont() {
    $("google-font-fields").hidden = config.font !== "google";
    const key = fontKey(), entry = fontCache.get(key), ready = config.font !== "google" || !!entry?.font;
    $("download").disabled = !ready;
    $("copy-code").disabled = activeTab === "svg" && !ready;
    const message = config.font !== "google" ? "" : entry?.font ? "Font ready. Included in your SVG." : entry?.error ? entry.error + " Retry to download the SVG. Hosted Markdown is available." : "Loading Google Font\u2026 Hosted Markdown is available.";
    if ($("font-status").textContent !== message) $("font-status").textContent = message;
    $("retry-font").hidden = config.font !== "google" || !entry?.error;
    clearTimeout(fontTimer);
    if (config.font !== "google" || entry) return;
    fontTimer = setTimeout(async () => {
      fontCache.set(key, { loading: true });
      try {
        const query = new URLSearchParams({
          family: config.googleFont,
          weight: String(config.fontWeight)
        }), response = await fetch(SERVICE_URL + "/font?" + query, {
          signal: AbortSignal.timeout(2e4)
        });
        if (!response.ok) throw Error((await response.json()).error || "Could not load this font.");
        fontEngine = await loadFontEngine();
        fontCache.set(key, { font: fontEngine.parseFont(await response.arrayBuffer()) });
      } catch (error) {
        fontCache.set(key, { error: error.message || "Could not load this font. Try again." });
      }
      while (fontCache.size > 8) fontCache.delete(fontCache.keys().next().value);
      if (config.font === "google" && fontKey() === key) render();
    }, 350);
  }
  try {
    const query = new URLSearchParams(location.search);
    if (query.size) config = normalizeConfig(parseWorkflowParams(query));
    else {
      const saved = localStorage.getItem("readme-flow-config");
      if (saved) config = normalizeConfig(JSON.parse(saved));
    }
  } catch {
    toast("Could not load saved settings. Starting with a fresh workflow.");
  }
  var history = createHistory(config);
  function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 3500);
  }
  function markdown() {
    const output = workflowMarkdown(config, $("embed-mode").value === "local", {
      link: $("embed-link").value,
      href: $("embed-link-url").value,
      adaptive: $("embed-mode").value === "adaptive",
      alt: $("alt-text").value
    });
    return withAltText(output, $("alt-text").value);
  }
  $("alt-text").addEventListener("input", updateCode);
  $("embed-link-url").addEventListener("input", updateCode);
  $("embed-link").addEventListener("change", () => {
    $("embed-link-field").hidden = $("embed-link").value !== "custom";
    updateCode();
  });
  $("embed-mode").addEventListener("change", () => {
    updateCode();
    $("embed-hint").innerHTML = $("embed-mode").value === "local" ? "Add <code>workflow.svg</code> to your repo, then paste this line in your README." : $("embed-mode").value === "adaptive" ? "Paste this snippet in your README. It uses the Light and Dark palettes for the reader\u2019s color scheme." : "Paste this line in your README. The image is generated from your settings.";
  });
  function updateCode() {
    $("code").textContent = activeTab === "markdown" ? markdown() : currentSvg();
    $("code-content").setAttribute(
      "aria-labelledby",
      activeTab === "markdown" ? "markdown-tab" : "svg-tab"
    );
  }
  function render() {
    if (!drag) {
      const input = document.activeElement;
      history.record(config, input?.matches("input, textarea") ? input : null);
    }
    $("undo").disabled = !history.canUndo;
    $("redo").disabled = !history.canRedo;
    if (!renderFrame) renderFrame = requestAnimationFrame(flushRender);
  }
  function flushRender() {
    cancelAnimationFrame(renderFrame);
    renderFrame = null;
    renderNow();
  }
  function renderThemePreview() {
    if ($("custom-theme-picker").open)
      $("custom-theme-preview").innerHTML = currentSvg(
        { ...config, theme: "custom" },
        paused,
        "theme-preview"
      );
  }
  $("custom-theme-picker").addEventListener(
    "close",
    () => $("custom-theme-preview").replaceChildren()
  );
  function renderNow() {
    $("preview").innerHTML = currentSvg(config, paused, "preview");
    $("preview").querySelector("svg").setAttribute("role", "group");
    $("preview").style.setProperty(
      "--svg-width",
      $("preview").querySelector("svg").getAttribute("width") + "px"
    );
    const palette = config.theme === "custom" ? config.customTheme : THEMES[config.theme], canvas = $("preview-canvas");
    canvas.className = "preview-canvas";
    canvas.style.backgroundColor = palette.background;
    canvas.style.backgroundImage = `radial-gradient(${palette.line} .8px,transparent .8px)`;
    canvas.style.setProperty("--canvas-meta", palette.muted);
    renderThemePreview();
    $("workflow-name").textContent = config.title || PRESETS[config.preset].name + " workflow";
    $("preview-meta").textContent = `${config.steps.length} steps \xB7 ${config.duration}s loop`;
    $("step-count").textContent = `${config.steps.length} / 12`;
    $("add-step").disabled = config.steps.length >= 12;
    $("columns").disabled = !["snake", "grid"].includes(config.layout);
    $("preview-canvas").classList.toggle(
      "multi-row",
      config.layout !== "horizontal" || config.positions.length > 0
    );
    $("preview-canvas").classList.toggle("vertical-layout", config.layout === "vertical");
    $("speed-value").textContent = config.duration + "s";
    updateCode();
    updateFont();
    $("reset-positions").disabled = !config.positions.length;
    for (const card of $("preview").querySelectorAll("[data-step]")) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute(
        "aria-label",
        `${config.steps[Number(card.dataset.step)]}. Use arrow keys to move this card.`
      );
    }
    try {
      localStorage.setItem("readme-flow-config", JSON.stringify(config));
    } catch {
    }
  }
  function renderSteps() {
    $("steps").replaceChildren();
    config.steps.forEach((label, i) => {
      const row = document.createElement("div");
      row.className = "step-row";
      row.innerHTML = `<div class="step-controls"><button class="reorder-button" aria-label="Move step ${i + 1} up" title="Move up" ${i === 0 ? "disabled" : ""}>\u2303</button><button class="reorder-button" aria-label="Move step ${i + 1} down" title="Move down" ${i === config.steps.length - 1 ? "disabled" : ""}>\u2304</button></div><div class="step-input"><button class="step-icon-button" aria-label="Choose icon for step ${i + 1}" title="Choose icon: ${STEP_ICONS[config.icons[i]]}" aria-haspopup="dialog" aria-controls="icon-picker">${icon(config.icons[i])}</button><input maxlength="32" aria-label="Step ${i + 1} label" placeholder="Step ${i + 1}"><button class="icon-button remove-step" aria-label="Remove step ${i + 1}" title="Remove step" ${config.steps.length <= 3 ? "disabled" : ""}>${icon("close")}</button></div>`;
      const input = row.querySelector("input");
      input.value = label;
      input.addEventListener("input", () => {
        config.steps[i] = input.value;
        render();
      });
      input.addEventListener("blur", () => {
        const previous = input.value;
        config = normalizeConfig(config);
        input.value = config.steps[i];
        renderConnections();
        if (previous !== input.value) render();
      });
      row.querySelector(".step-icon-button").addEventListener("click", () => openIconPicker(i));
      row.querySelector(".remove-step").addEventListener("click", () => {
        config.steps.splice(i, 1);
        config.icons.splice(i, 1);
        if (config.positions.length) config.positions.splice(i, 1);
        config.connections = config.connections.filter((e) => e.from !== i && e.to !== i).map((e) => ({
          ...e,
          from: e.from > i ? e.from - 1 : e.from,
          to: e.to > i ? e.to - 1 : e.to
        }));
        renderSteps();
        renderConnections();
        render();
      });
      const reorder = (direction) => {
        for (const values of [
          config.steps,
          config.icons,
          ...config.positions.length ? [config.positions] : []
        ])
          [values[i], values[i + direction]] = [values[i + direction], values[i]];
        const remap = (value) => value === i ? i + direction : value === i + direction ? i : value;
        config.connections = config.connections.map((e) => ({
          ...e,
          from: remap(e.from),
          to: remap(e.to)
        }));
        renderSteps();
        renderConnections();
        render();
        $("steps").children[i + direction].querySelector("input").focus();
      };
      row.querySelectorAll(".reorder-button")[0].addEventListener("click", () => reorder(-1));
      row.querySelectorAll(".reorder-button")[1].addEventListener("click", () => reorder(1));
      $("steps").append(row);
    });
  }
  function openIconPicker(index) {
    iconStep = index;
    $("icon-picker-step").textContent = `Step ${index + 1}: ${config.steps[index] || "Untitled step"}`;
    $("icon-options").replaceChildren();
    for (const [name, label] of Object.entries(STEP_ICONS)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "icon-option";
      button.setAttribute("aria-label", label + " icon");
      button.setAttribute("aria-pressed", name === config.icons[index]);
      button.innerHTML = icon(name) + `<span>${label}</span>`;
      button.addEventListener("click", () => {
        config.icons[index] = name;
        renderSteps();
        render();
        $("icon-picker").close();
      });
      $("icon-options").append(button);
    }
    $("icon-picker").showModal();
    $("icon-options").querySelector('[aria-pressed="true"]').focus();
  }
  $("close-icon-picker").addEventListener("click", () => $("icon-picker").close());
  $("icon-picker").addEventListener("close", () => {
    if (iconStep !== null) $("steps").children[iconStep]?.querySelector(".step-icon-button").focus();
    iconStep = null;
  });
  function syncControls() {
    $("preset").value = config.preset;
    $("speed").value = config.duration;
    for (const [id, key] of Object.entries(extraControls))
      $(id).type === "checkbox" ? $(id).checked = config[key] : $(id).value = config[key];
    renderConnections();
    document.querySelectorAll("[data-theme]").forEach((b) => {
      const selected = b.dataset.theme === config.theme;
      b.classList.toggle("selected", selected);
      b.setAttribute("aria-pressed", selected);
    });
    $("traveler-icon").className = config.traveler === "dot" ? "dot-icon" : "";
    $("traveler-icon").innerHTML = TRAVELERS[config.traveler].icon ? icon(TRAVELERS[config.traveler].icon) : "";
    $("traveler-label").textContent = TRAVELERS[config.traveler].name;
    $("traveler-button").title = "Moving element: " + TRAVELERS[config.traveler].name;
    $("preset-icon").innerHTML = icon(PRESETS[config.preset].icons[0]);
    for (const key of Object.keys(THEME_FIELDS)) {
      $("color-" + key).value = config.customTheme[key];
      $("color-value-" + key).textContent = config.customTheme[key];
    }
    renderSteps();
    render();
    $("preview").scrollTop = 0;
    $("preview").scrollLeft = 0;
  }
  function choosePreset(preset) {
    const p = PRESETS[preset];
    config = normalizeConfig({
      ...config,
      preset,
      steps: p.steps.slice(),
      icons: p.icons.slice(),
      layout: p.layout || "horizontal",
      columns: p.columns || 3,
      connectionMode: p.connections ? "custom" : "sequential",
      connections: p.connections || [],
      positions: [],
      canvasSize: null
    });
    syncControls();
  }
  $("preset").addEventListener("change", (e) => choosePreset(e.target.value));
  $("add-step").addEventListener("click", () => {
    if (config.steps.length >= 12) return;
    config.steps.push("Step " + (config.steps.length + 1));
    config.icons.push("file");
    if (config.positions.length) {
      const p = config.positions.at(-1) || { x: 100, y: 100 };
      config.positions.push({ x: p.x, y: Math.min(2100, p.y + 150) });
      config = normalizeConfig(config);
    }
    renderSteps();
    renderConnections();
    render();
    openIconPicker(config.steps.length - 1);
  });
  for (const [name, palette] of Object.entries(THEMES)) {
    const button = document.createElement("button");
    button.className = "theme-option";
    button.dataset.theme = name;
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span class="theme-swatch" style="--swatch-bg:${palette.background};--swatch-border:${palette.border};--swatch-card:${palette.card};--swatch-line:${palette.line}"><i></i><i></i><i></i></span><span>${THEME_LABELS[name]}</span><span class="theme-check" aria-hidden="true">\u2713</span>`;
    $("themes").append(button);
  }
  var customButton = document.createElement("button");
  customButton.className = "theme-option custom-option";
  customButton.dataset.theme = "custom";
  customButton.setAttribute("aria-pressed", "false");
  customButton.innerHTML = icon("palette") + '<span>Custom</span><span class="custom-option-hint" aria-hidden="true">Your own colors</span><span class="theme-check" aria-hidden="true">\u2713</span>';
  $("themes").append(customButton);
  document.querySelectorAll("[data-theme]").forEach(
    (b) => b.addEventListener("click", () => {
      config.theme = b.dataset.theme;
      syncControls();
      if (config.theme === "custom") {
        $("custom-theme-picker").showModal();
        renderThemePreview();
      }
    })
  );
  for (const [key, label] of Object.entries(THEME_FIELDS)) {
    const field = document.createElement("label");
    field.className = "color-field";
    field.htmlFor = "color-" + key;
    field.innerHTML = `<span>${label}</span><div><input type="color" id="color-${key}" aria-label="${label} color"><output id="color-value-${key}"></output></div>`;
    field.querySelector("input").addEventListener("input", (e) => {
      config.customTheme[key] = e.target.value;
      $("color-value-" + key).textContent = e.target.value;
      render();
    });
    $("theme-colors").append(field);
  }
  $("close-custom-theme").addEventListener("click", () => $("custom-theme-picker").close());
  $("apply-theme").addEventListener("click", () => $("custom-theme-picker").close());
  $("reset-colors").addEventListener("click", () => {
    config.customTheme = { ...THEMES.light };
    syncControls();
  });
  function openTravelerPicker() {
    $("traveler-options").replaceChildren();
    for (const [name, element] of Object.entries(TRAVELERS)) {
      const button = document.createElement("button");
      button.className = "icon-option";
      button.setAttribute("aria-label", element.name + " moving element");
      button.setAttribute("aria-pressed", name === config.traveler);
      button.innerHTML = (element.icon ? icon(element.icon) : '<span class="picker-dot" aria-hidden="true"></span>') + `<span>${element.name}</span>`;
      button.addEventListener("click", () => {
        config.traveler = name;
        syncControls();
        $("traveler-picker").close();
      });
      $("traveler-options").append(button);
    }
    $("traveler-picker").showModal();
    $("traveler-options").querySelector("[aria-pressed=true]").focus();
  }
  $("traveler-button").addEventListener("click", openTravelerPicker);
  $("close-traveler-picker").addEventListener("click", () => $("traveler-picker").close());
  $("speed").addEventListener("input", (e) => {
    config.duration = Number(e.target.value);
    render();
  });
  $("reset").addEventListener("click", () => {
    config = normalizeConfig();
    paused = false;
    updatePause();
    syncControls();
    toast("Workflow reset. A fresh start.");
  });
  function updatePause() {
    $("pause").innerHTML = icon(paused ? "play" : "pause");
    $("pause").setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
    $("pause").title = paused ? "Play animation" : "Pause animation";
  }
  $("pause").addEventListener("click", () => {
    paused = !paused;
    updatePause();
    document.querySelectorAll("#preview .animated,#custom-theme-preview .animated").forEach((el) => el.style.animationPlayState = paused ? "paused" : "running");
  });
  function selectTab(tab) {
    activeTab = tab;
    for (const t of ["markdown", "svg"]) {
      $(t + "-tab").classList.toggle("active", t === tab);
      $(t + "-tab").setAttribute("aria-selected", t === tab);
      $(t + "-tab").tabIndex = t === tab ? 0 : -1;
    }
    updateCode();
    updateFont();
  }
  for (const tab of ["markdown", "svg"]) {
    $(tab + "-tab").addEventListener("click", () => selectTab(tab));
    $(tab + "-tab").addEventListener("keydown", (e) => {
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        const next = e.key === "Home" ? "markdown" : e.key === "End" ? "svg" : tab === "markdown" ? "svg" : "markdown";
        selectTab(next);
        $(next + "-tab").focus();
      }
    });
  }
  async function copy(text, message) {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
      }
    }
    if (!copied) {
      const previousFocus = document.activeElement, el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.append(el);
      el.select();
      try {
        copied = document.execCommand("copy");
      } catch {
      } finally {
        el.remove();
        previousFocus?.focus();
      }
    }
    if (copied) toast(message);
    else {
      $("manual-copy-value").value = text;
      $("manual-copy").showModal();
      $("manual-copy-value").focus();
      $("manual-copy-value").select();
    }
  }
  $("copy-markdown").addEventListener(
    "click",
    () => copy(
      markdown(),
      $("embed-mode").value === "local" ? "Markdown copied. Add workflow.svg to your repo." : "Markdown copied. Paste it directly into your README."
    )
  );
  $("copy-code").addEventListener(
    "click",
    () => copy(activeTab === "markdown" ? markdown() : currentSvg(), "Code copied to clipboard.")
  );
  function downloadFile(content, type, filename) {
    const blob = new Blob([content], { type }), url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }
  $("download").addEventListener("click", () => {
    downloadFile(currentSvg(), "image/svg+xml;charset=utf-8", "workflow.svg");
    toast("SVG downloaded.");
  });
  $("export-json").addEventListener("click", () => {
    downloadFile(
      JSON.stringify(normalizeConfig(config), null, 2) + "\n",
      "application/json",
      "workflow.json"
    );
    toast("Workflow JSON downloaded. Import it to edit this workflow later.");
  });
  $("import-json").addEventListener("click", () => $("workflow-file").click());
  $("workflow-file").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    try {
      if (file.size > 16384) throw Error("Workflow JSON must be 16 KB or smaller.");
      config = importWorkflow(await file.text());
      syncControls();
      toast("Workflow imported.");
    } catch (error) {
      toast(error instanceof SyntaxError ? "Could not read this JSON file." : error.message);
    }
  });
  $("share").addEventListener("click", () => {
    const url = new URL(location.protocol === "file:" ? EDITOR_URL : location.href);
    url.search = workflowParams(config);
    url.hash = "";
    copy(url.href, "Editor link copied. All your settings included.");
  });
  for (const [name, preset] of Object.entries(PRESETS)) {
    if (!$("preset").querySelector(`option[value="${name}"]`)) {
      const option2 = document.createElement("option");
      option2.value = name;
      option2.textContent = preset.name;
      $("preset").append(option2);
    }
  }
  for (const example of GALLERY) {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.innerHTML = `<div class="gallery-preview"><img src="./assets/gallery/${example.id}.svg" alt="${example.name} animated workflow" width="730" height="300" loading="lazy" decoding="async"></div><div class="gallery-caption"><div><h3>${example.name}</h3><p>${example.description}</p></div><button type="button" class="button secondary" data-gallery="${example.id}" aria-label="Use this ${example.name} workflow">Use this ${icon("arrow")}</button></div>`;
    card.querySelector(".gallery-preview").style.backgroundColor = THEMES[example.config.theme].background;
    card.querySelector("button").addEventListener("click", () => {
      config = normalizeConfig(example.config);
      paused = false;
      updatePause();
      syncControls();
      document.querySelector(".builder").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start"
      });
      $("workflow-title").closest("details").open = true;
      $("workflow-title").focus({ preventScroll: true });
      toast(example.name + " workflow loaded. Make it yours.");
    });
    $("examples").append(card);
  }
  for (const repository of COMMUNITY_REPOS) {
    const card = document.createElement("a");
    card.className = "community-card";
    card.href = "https://github.com/" + repository.repo;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    const name = document.createElement("h3");
    name.textContent = repository.repo;
    const description = document.createElement("p");
    description.textContent = repository.description;
    const action = document.createElement("span");
    action.textContent = "See the README \u2197";
    card.append(name, description, action);
    $("community-repos").append(card);
  }
  var extraControls = {
    "workflow-title": "title",
    "workflow-subtitle": "subtitle",
    layout: "layout",
    columns: "columns",
    "connection-mode": "connectionMode",
    routing: "routing",
    "line-style": "lineStyle",
    "line-width": "lineWidth",
    arrows: "arrows",
    font: "font",
    "google-font": "googleFont",
    "font-weight": "fontWeight",
    spacing: "spacing",
    radius: "radius",
    "traveler-size": "travelerSize",
    "show-numbers": "showNumbers",
    transparent: "transparent"
  };
  for (const [id, key] of Object.entries(extraControls))
    $(id).addEventListener("input", () => {
      const input = $(id);
      if (key === "connectionMode" && input.value === "custom" && config.connectionMode !== "custom" && !config.connections.length)
        config.connections = config.steps.slice(1).map((_, i) => ({ from: i, to: i + 1, label: "" }));
      config[key] = input.type === "checkbox" ? input.checked : ["columns", "lineWidth", "spacing", "radius", "travelerSize", "fontWeight"].includes(key) ? Number(input.value) : input.value;
      if (["layout", "columns", "spacing"].includes(key)) {
        config.positions = [];
        config.canvasSize = null;
      }
      config = normalizeConfig(config);
      if (key === "connectionMode") renderConnections();
      render();
    });
  function renderConnections() {
    $("connection-editor").hidden = config.connectionMode !== "custom";
    $("connections").replaceChildren();
    config.connections.forEach((edge, index) => {
      const row = document.createElement("div");
      row.className = "connection-row";
      for (const key of ["from", "to"]) {
        const select = document.createElement("select");
        select.setAttribute("aria-label", `Connection ${index + 1} ${key}`);
        config.steps.forEach((label2, i) => {
          const option2 = document.createElement("option");
          option2.value = i;
          option2.textContent = `${i + 1}. ${label2}`;
          option2.selected = edge[key] === i;
          option2.disabled = key === "from" ? i === edge.to : i === edge.from;
          select.append(option2);
        });
        select.addEventListener("change", () => {
          const next = { ...edge, [key]: Number(select.value) };
          if (config.connections.some((e, j) => j !== index && e.from === next.from && e.to === next.to)) {
            toast("That connection already exists.");
            renderConnections();
            return;
          }
          config.connections[index] = next;
          renderConnections();
          render();
        });
        row.append(select);
      }
      const label = document.createElement("input");
      label.maxLength = 24;
      label.placeholder = "Line label (optional)";
      label.value = edge.label;
      label.setAttribute("aria-label", `Connection ${index + 1} label`);
      label.addEventListener("input", () => {
        config.connections[index].label = label.value;
        render();
      });
      row.append(label);
      const actions = document.createElement("div");
      actions.className = "connection-actions";
      for (const direction of [-1, 1]) {
        const move = document.createElement("button");
        move.className = "icon-button";
        move.textContent = direction < 0 ? "\u2191" : "\u2193";
        move.setAttribute(
          "aria-label",
          `Move connection ${index + 1} ${direction < 0 ? "up" : "down"}`
        );
        move.disabled = index + direction < 0 || index + direction >= config.connections.length;
        move.addEventListener("click", () => {
          [config.connections[index], config.connections[index + direction]] = [
            config.connections[index + direction],
            config.connections[index]
          ];
          renderConnections();
          render();
        });
        actions.append(move);
      }
      const remove = document.createElement("button");
      remove.className = "icon-button";
      remove.setAttribute("aria-label", `Remove connection ${index + 1}`);
      remove.innerHTML = icon("close");
      remove.addEventListener("click", () => {
        config.connections.splice(index, 1);
        renderConnections();
        render();
      });
      actions.append(remove);
      row.append(actions);
      $("connections").append(row);
    });
    $("add-connection").disabled = config.connections.length >= 24;
  }
  $("add-connection").addEventListener("click", () => {
    if (config.connections.length >= 24) return;
    for (let from = 0; from < config.steps.length; from++)
      for (let to = 0; to < config.steps.length; to++)
        if (from !== to && !config.connections.some((e) => e.from === from && e.to === to)) {
          config.connections.push({ from, to, label: "" });
          renderConnections();
          render();
          return;
        }
    toast("All steps are already connected.");
  });
  $("retry-font").addEventListener("click", () => {
    fontCache.delete(fontKey());
    render();
  });
  function capturePositions() {
    if (config.positions.length) {
      config = positionedConfig(config);
      return;
    }
    const svg = $("preview").querySelector("svg");
    config = normalizeConfig({
      ...config,
      positions: [...svg.querySelectorAll("[data-step]")].map((card) => {
        const b = card.querySelector(".stage").getBBox();
        return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
      }),
      canvasSize: {
        width: svg.viewBox.baseVal.width,
        height: Math.max(420, svg.viewBox.baseVal.height)
      }
    });
  }
  function moveCard(index, x, y) {
    const geometry = workflowGeometry(config);
    config.positions[index] = {
      x: Math.round(Math.max(70, Math.min(geometry.width - 80, x))),
      y: Math.round(Math.max(geometry.header + 60, Math.min(geometry.height - 70, y)))
    };
  }
  $("preview").addEventListener("pointerdown", (event) => {
    const card = event.target.closest("[data-step]");
    if (!card || event.button !== 0) return;
    event.preventDefault();
    const svg = card.ownerSVGElement, b = card.querySelector(".stage").getBBox(), point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      svg.getScreenCTM().inverse()
    );
    capturePositions();
    drag = {
      index: Number(card.dataset.step),
      pointer: event.pointerId,
      dx: point.x - (b.x + b.width / 2),
      dy: point.y - (b.y + b.height / 2)
    };
    $("preview").setPointerCapture(event.pointerId);
    $("preview").classList.add("dragging");
    render();
  });
  $("preview").addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointer) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      $("preview").querySelector("svg").getScreenCTM().inverse()
    );
    moveCard(drag.index, point.x - drag.dx, point.y - drag.dy);
    render();
  });
  function finishDrag(event) {
    if (!drag || event.pointerId !== drag.pointer) return;
    drag = null;
    $("preview").classList.remove("dragging");
    render();
  }
  for (const name of ["pointerup", "pointercancel", "lostpointercapture"])
    $("preview").addEventListener(name, finishDrag);
  $("preview").addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-step]");
    if (!card || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    capturePositions();
    const index = Number(card.dataset.step), p = config.positions[index], amount = event.shiftKey ? 20 : 5;
    moveCard(
      index,
      p.x + (event.key === "ArrowLeft" ? -amount : event.key === "ArrowRight" ? amount : 0),
      p.y + (event.key === "ArrowUp" ? -amount : event.key === "ArrowDown" ? amount : 0)
    );
    render();
    flushRender();
    $("preview").querySelector(`[data-step="${index}"]`).focus();
  });
  $("reset-positions").addEventListener("click", () => {
    config.positions = [];
    config.canvasSize = null;
    render();
    toast("Cards returned to the selected layout.");
  });
  for (const button of document.querySelectorAll("[data-arrange]"))
    button.addEventListener("click", () => {
      config = arrangeCards(config, button.dataset.arrange);
      render();
    });
  function restoreHistory(direction) {
    if (drag) return;
    const restored = history[direction]();
    if (!restored) return;
    config = restored;
    syncControls();
  }
  $("undo").addEventListener("click", () => restoreHistory("undo"));
  $("redo").addEventListener("click", () => restoreHistory("redo"));
  document.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey) || event.altKey || event.target.closest('input, textarea, select, [contenteditable="true"]'))
      return;
    if (event.key.toLowerCase() === "z" || event.key.toLowerCase() === "y") {
      event.preventDefault();
      restoreHistory(event.shiftKey || event.key.toLowerCase() === "y" ? "redo" : "undo");
    }
  });
  selectTab("markdown");
  syncControls();
})();
