import { withAltText } from './markdown.js';
import { createHistory, positionedConfig, arrangeCards, importWorkflow } from './editor-state.js';
import {
  ICONS,
  PRESETS,
  STEP_ICONS,
  TRAVELERS,
  THEMES,
  THEME_LABELS,
  THEME_FIELDS,
  normalizeConfig,
  renderSvg,
  workflowGeometry,
} from './svg.js';
import {
  workflowMarkdown,
  EDITOR_URL,
  SERVICE_URL,
  parseWorkflowParams,
  workflowParams,
} from './links.js';
import { loadFontEngine } from './load-font-engine.js';
let fontEngine;
import { GALLERY } from './gallery.js';
import { COMMUNITY_REPOS } from './community.js';
const $ = (id) => document.getElementById(id);
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.file}</svg>`;
document.querySelectorAll('[data-icon]').forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
let config = normalizeConfig(),
  paused = false,
  activeTab = 'markdown',
  toastTimer,
  iconStep = null;
const fontCache = new Map();
let fontTimer,
  drag = null,
  renderFrame;
const fontKey = () => config.googleFont + ':' + config.fontWeight;
function currentSvg(settings = config, isPaused = false, scope = 'workflow') {
  const svg = renderSvg(settings, isPaused, scope),
    entry = fontCache.get(settings.googleFont + ':' + settings.fontWeight);
  return settings.font === 'google' && entry?.font
    ? fontEngine.outlineSvg(svg, entry.font, settings.googleFont)
    : svg;
}
function updateFont() {
  $('google-font-fields').hidden = config.font !== 'google';
  const key = fontKey(),
    entry = fontCache.get(key),
    ready = config.font !== 'google' || !!entry?.font;
  $('download').disabled = !ready;
  $('copy-code').disabled = activeTab === 'svg' && !ready;
  const message =
    config.font !== 'google'
      ? ''
      : entry?.font
        ? 'Font ready. Included in your SVG.'
        : entry?.error
          ? entry.error + ' Retry to download the SVG. Hosted Markdown is available.'
          : 'Loading Google Font… Hosted Markdown is available.';
  if ($('font-status').textContent !== message) $('font-status').textContent = message;
  $('retry-font').hidden = config.font !== 'google' || !entry?.error;
  clearTimeout(fontTimer);
  if (config.font !== 'google' || entry) return;
  fontTimer = setTimeout(async () => {
    fontCache.set(key, { loading: true });
    try {
      const query = new URLSearchParams({
          family: config.googleFont,
          weight: String(config.fontWeight),
        }),
        response = await fetch(SERVICE_URL + '/font?' + query, {
          signal: AbortSignal.timeout(20000),
        });
      if (!response.ok) throw Error((await response.json()).error || 'Could not load this font.');
      fontEngine = await loadFontEngine();
      fontCache.set(key, { font: fontEngine.parseFont(await response.arrayBuffer()) });
    } catch (error) {
      fontCache.set(key, { error: error.message || 'Could not load this font. Try again.' });
    }
    while (fontCache.size > 8) fontCache.delete(fontCache.keys().next().value);
    if (config.font === 'google' && fontKey() === key) render();
  }, 350);
}
try {
  const query = new URLSearchParams(location.search);
  if (query.size) config = normalizeConfig(parseWorkflowParams(query));
  else {
    const saved = localStorage.getItem('readme-flow-config');
    if (saved) config = normalizeConfig(JSON.parse(saved));
  }
} catch {
  toast('Could not load saved settings. Starting with a fresh workflow.');
}
const history = createHistory(config);
function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 3500);
}
function markdown() {
  const output = workflowMarkdown(config, $('embed-mode').value === 'local', {
    link: $('embed-link').value,
    href: $('embed-link-url').value,
    adaptive: $('embed-mode').value === 'adaptive',
    alt: $('alt-text').value,
  });
  return withAltText(output, $('alt-text').value);
}
$('alt-text').addEventListener('input', updateCode);
$('embed-link-url').addEventListener('input', updateCode);
$('embed-link').addEventListener('change', () => {
  $('embed-link-field').hidden = $('embed-link').value !== 'custom';
  updateCode();
});
$('embed-mode').addEventListener('change', () => {
  updateCode();
  $('embed-hint').innerHTML =
    $('embed-mode').value === 'local'
      ? 'Add <code>workflow.svg</code> to your repo, then paste this line in your README.'
      : $('embed-mode').value === 'adaptive'
        ? 'Paste this snippet in your README. It uses the Light and Dark palettes for the reader’s color scheme.'
        : 'Paste this line in your README. The image is generated from your settings.';
});
function updateCode() {
  $('code').textContent = activeTab === 'markdown' ? markdown() : currentSvg();
  $('code-content').setAttribute(
    'aria-labelledby',
    activeTab === 'markdown' ? 'markdown-tab' : 'svg-tab',
  );
}
function render() {
  if (!drag) {
    const input = document.activeElement;
    history.record(config, input?.matches('input, textarea') ? input : null);
  }
  $('undo').disabled = !history.canUndo;
  $('redo').disabled = !history.canRedo;
  if (!renderFrame) renderFrame = requestAnimationFrame(flushRender);
}
function flushRender() {
  cancelAnimationFrame(renderFrame);
  renderFrame = null;
  renderNow();
}
function renderThemePreview() {
  if ($('custom-theme-picker').open)
    $('custom-theme-preview').innerHTML = currentSvg(
      { ...config, theme: 'custom' },
      paused,
      'theme-preview',
    );
}
$('custom-theme-picker').addEventListener('close', () =>
  $('custom-theme-preview').replaceChildren(),
);
function renderNow() {
  $('preview').innerHTML = currentSvg(config, paused, 'preview');
  $('preview').querySelector('svg').setAttribute('role', 'group');
  $('preview').style.setProperty(
    '--svg-width',
    $('preview').querySelector('svg').getAttribute('width') + 'px',
  );
  const palette = config.theme === 'custom' ? config.customTheme : THEMES[config.theme],
    canvas = $('preview-canvas');
  canvas.className = 'preview-canvas';
  canvas.style.backgroundColor = palette.background;
  canvas.style.backgroundImage = `radial-gradient(${palette.line} .8px,transparent .8px)`;
  canvas.style.setProperty('--canvas-meta', palette.muted);
  renderThemePreview();
  $('workflow-name').textContent = config.title || PRESETS[config.preset].name + ' workflow';
  $('preview-meta').textContent = `${config.steps.length} steps · ${config.duration}s loop`;
  $('step-count').textContent = `${config.steps.length} / 12`;
  $('add-step').disabled = config.steps.length >= 12;
  $('columns').disabled = !['snake', 'grid'].includes(config.layout);
  $('preview-canvas').classList.toggle(
    'multi-row',
    config.layout !== 'horizontal' || config.positions.length > 0,
  );
  $('preview-canvas').classList.toggle('vertical-layout', config.layout === 'vertical');
  $('speed-value').textContent = config.duration + 's';
  updateCode();
  updateFont();
  $('reset-positions').disabled = !config.positions.length;
  for (const card of $('preview').querySelectorAll('[data-step]')) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute(
      'aria-label',
      `${config.steps[Number(card.dataset.step)]}. Use arrow keys to move this card.`,
    );
  }
  try {
    localStorage.setItem('readme-flow-config', JSON.stringify(config));
  } catch {
    /* Storage can be disabled; exports still work. */
  }
}
function renderSteps() {
  $('steps').replaceChildren();
  config.steps.forEach((label, i) => {
    const row = document.createElement('div');
    row.className = 'step-row';
    row.innerHTML = `<div class="step-controls"><button class="reorder-button" aria-label="Move step ${i + 1} up" title="Move up" ${i === 0 ? 'disabled' : ''}>⌃</button><button class="reorder-button" aria-label="Move step ${i + 1} down" title="Move down" ${i === config.steps.length - 1 ? 'disabled' : ''}>⌄</button></div><div class="step-input"><button class="step-icon-button" aria-label="Choose icon for step ${i + 1}" title="Choose icon: ${STEP_ICONS[config.icons[i]]}" aria-haspopup="dialog" aria-controls="icon-picker">${icon(config.icons[i])}</button><input maxlength="32" aria-label="Step ${i + 1} label" placeholder="Step ${i + 1}"><button class="icon-button remove-step" aria-label="Remove step ${i + 1}" title="Remove step" ${config.steps.length <= 3 ? 'disabled' : ''}>${icon('close')}</button></div>`;
    const input = row.querySelector('input');
    input.value = label;
    input.addEventListener('input', () => {
      config.steps[i] = input.value;
      render();
    });
    input.addEventListener('blur', () => {
      const previous = input.value;
      config = normalizeConfig(config);
      input.value = config.steps[i];
      renderConnections();
      if (previous !== input.value) render();
    });
    row.querySelector('.step-icon-button').addEventListener('click', () => openIconPicker(i));
    row.querySelector('.remove-step').addEventListener('click', () => {
      config.steps.splice(i, 1);
      config.icons.splice(i, 1);
      if (config.positions.length) config.positions.splice(i, 1);
      config.connections = config.connections
        .filter((e) => e.from !== i && e.to !== i)
        .map((e) => ({
          ...e,
          from: e.from > i ? e.from - 1 : e.from,
          to: e.to > i ? e.to - 1 : e.to,
        }));
      renderSteps();
      renderConnections();
      render();
    });
    const reorder = (direction) => {
      for (const values of [
        config.steps,
        config.icons,
        ...(config.positions.length ? [config.positions] : []),
      ])
        [values[i], values[i + direction]] = [values[i + direction], values[i]];
      const remap = (value) => (value === i ? i + direction : value === i + direction ? i : value);
      config.connections = config.connections.map((e) => ({
        ...e,
        from: remap(e.from),
        to: remap(e.to),
      }));
      renderSteps();
      renderConnections();
      render();
      $('steps').children[i + direction].querySelector('input').focus();
    };
    row.querySelectorAll('.reorder-button')[0].addEventListener('click', () => reorder(-1));
    row.querySelectorAll('.reorder-button')[1].addEventListener('click', () => reorder(1));
    $('steps').append(row);
  });
}
function openIconPicker(index) {
  iconStep = index;
  $('icon-picker-step').textContent =
    `Step ${index + 1}: ${config.steps[index] || 'Untitled step'}`;
  $('icon-options').replaceChildren();
  for (const [name, label] of Object.entries(STEP_ICONS)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-option';
    button.setAttribute('aria-label', label + ' icon');
    button.setAttribute('aria-pressed', name === config.icons[index]);
    button.innerHTML = icon(name) + `<span>${label}</span>`;
    button.addEventListener('click', () => {
      config.icons[index] = name;
      renderSteps();
      render();
      $('icon-picker').close();
    });
    $('icon-options').append(button);
  }
  $('icon-picker').showModal();
  $('icon-options').querySelector('[aria-pressed="true"]').focus();
}
$('close-icon-picker').addEventListener('click', () => $('icon-picker').close());
$('icon-picker').addEventListener('close', () => {
  if (iconStep !== null) $('steps').children[iconStep]?.querySelector('.step-icon-button').focus();
  iconStep = null;
});
function syncControls() {
  $('preset').value = config.preset;
  $('speed').value = config.duration;
  for (const [id, key] of Object.entries(extraControls))
    $(id).type === 'checkbox' ? ($(id).checked = config[key]) : ($(id).value = config[key]);
  renderConnections();
  document.querySelectorAll('[data-theme]').forEach((b) => {
    const selected = b.dataset.theme === config.theme;
    b.classList.toggle('selected', selected);
    b.setAttribute('aria-pressed', selected);
  });
  $('traveler-icon').className = config.traveler === 'dot' ? 'dot-icon' : '';
  $('traveler-icon').innerHTML = TRAVELERS[config.traveler].icon
    ? icon(TRAVELERS[config.traveler].icon)
    : '';
  $('traveler-label').textContent = TRAVELERS[config.traveler].name;
  $('traveler-button').title = 'Moving element: ' + TRAVELERS[config.traveler].name;
  $('preset-icon').innerHTML = icon(PRESETS[config.preset].icons[0]);
  for (const key of Object.keys(THEME_FIELDS)) {
    $('color-' + key).value = config.customTheme[key];
    $('color-value-' + key).textContent = config.customTheme[key];
  }
  renderSteps();
  render();
  $('preview').scrollTop = 0;
  $('preview').scrollLeft = 0;
}
function choosePreset(preset) {
  const p = PRESETS[preset];
  config = normalizeConfig({
    ...config,
    preset,
    steps: p.steps.slice(),
    icons: p.icons.slice(),
    layout: p.layout || 'horizontal',
    columns: p.columns || 3,
    connectionMode: p.connections ? 'custom' : 'sequential',
    connections: p.connections || [],
    positions: [],
    canvasSize: null,
  });
  syncControls();
}
$('preset').addEventListener('change', (e) => choosePreset(e.target.value));
$('add-step').addEventListener('click', () => {
  if (config.steps.length >= 12) return;
  config.steps.push('Step ' + (config.steps.length + 1));
  config.icons.push('file');
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
  const button = document.createElement('button');
  button.className = 'theme-option';
  button.dataset.theme = name;
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `<span class="theme-swatch" style="--swatch-bg:${palette.background};--swatch-border:${palette.border};--swatch-card:${palette.card};--swatch-line:${palette.line}"><i></i><i></i><i></i></span><span>${THEME_LABELS[name]}</span><span class="theme-check" aria-hidden="true">✓</span>`;
  $('themes').append(button);
}
const customButton = document.createElement('button');
customButton.className = 'theme-option custom-option';
customButton.dataset.theme = 'custom';
customButton.setAttribute('aria-pressed', 'false');
customButton.innerHTML =
  icon('palette') +
  '<span>Custom</span><span class="custom-option-hint" aria-hidden="true">Your own colors</span><span class="theme-check" aria-hidden="true">✓</span>';
$('themes').append(customButton);
document.querySelectorAll('[data-theme]').forEach((b) =>
  b.addEventListener('click', () => {
    config.theme = b.dataset.theme;
    syncControls();
    if (config.theme === 'custom') {
      $('custom-theme-picker').showModal();
      renderThemePreview();
    }
  }),
);
for (const [key, label] of Object.entries(THEME_FIELDS)) {
  const field = document.createElement('label');
  field.className = 'color-field';
  field.htmlFor = 'color-' + key;
  field.innerHTML = `<span>${label}</span><div><input type="color" id="color-${key}" aria-label="${label} color"><output id="color-value-${key}"></output></div>`;
  field.querySelector('input').addEventListener('input', (e) => {
    config.customTheme[key] = e.target.value;
    $('color-value-' + key).textContent = e.target.value;
    render();
  });
  $('theme-colors').append(field);
}
$('close-custom-theme').addEventListener('click', () => $('custom-theme-picker').close());
$('apply-theme').addEventListener('click', () => $('custom-theme-picker').close());
$('reset-colors').addEventListener('click', () => {
  config.customTheme = { ...THEMES.light };
  syncControls();
});
function openTravelerPicker() {
  $('traveler-options').replaceChildren();
  for (const [name, element] of Object.entries(TRAVELERS)) {
    const button = document.createElement('button');
    button.className = 'icon-option';
    button.setAttribute('aria-label', element.name + ' moving element');
    button.setAttribute('aria-pressed', name === config.traveler);
    button.innerHTML =
      (element.icon ? icon(element.icon) : '<span class="picker-dot" aria-hidden="true"></span>') +
      `<span>${element.name}</span>`;
    button.addEventListener('click', () => {
      config.traveler = name;
      syncControls();
      $('traveler-picker').close();
    });
    $('traveler-options').append(button);
  }
  $('traveler-picker').showModal();
  $('traveler-options').querySelector('[aria-pressed=true]').focus();
}
$('traveler-button').addEventListener('click', openTravelerPicker);
$('close-traveler-picker').addEventListener('click', () => $('traveler-picker').close());
$('speed').addEventListener('input', (e) => {
  config.duration = Number(e.target.value);
  render();
});
$('reset').addEventListener('click', () => {
  config = normalizeConfig();
  paused = false;
  updatePause();
  syncControls();
  toast('Workflow reset. A fresh start.');
});
function updatePause() {
  $('pause').innerHTML = icon(paused ? 'play' : 'pause');
  $('pause').setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
  $('pause').title = paused ? 'Play animation' : 'Pause animation';
}
$('pause').addEventListener('click', () => {
  paused = !paused;
  updatePause();
  document
    .querySelectorAll('#preview .animated,#custom-theme-preview .animated')
    .forEach((el) => (el.style.animationPlayState = paused ? 'paused' : 'running'));
});
function selectTab(tab) {
  activeTab = tab;
  for (const t of ['markdown', 'svg']) {
    $(t + '-tab').classList.toggle('active', t === tab);
    $(t + '-tab').setAttribute('aria-selected', t === tab);
    $(t + '-tab').tabIndex = t === tab ? 0 : -1;
  }
  updateCode();
  updateFont();
}
for (const tab of ['markdown', 'svg']) {
  $(tab + '-tab').addEventListener('click', () => selectTab(tab));
  $(tab + '-tab').addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const next =
        e.key === 'Home'
          ? 'markdown'
          : e.key === 'End'
            ? 'svg'
            : tab === 'markdown'
              ? 'svg'
              : 'markdown';
      selectTab(next);
      $(next + '-tab').focus();
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
      /* Local files may deny Clipboard API access. Try selection-based copying. */
    }
  }
  if (!copied) {
    const previousFocus = document.activeElement,
      el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.append(el);
    el.select();
    try {
      copied = document.execCommand('copy');
    } catch {
      /* Manual copying remains available. */
    } finally {
      el.remove();
      previousFocus?.focus();
    }
  }
  if (copied) toast(message);
  else {
    $('manual-copy-value').value = text;
    $('manual-copy').showModal();
    $('manual-copy-value').focus();
    $('manual-copy-value').select();
  }
}
$('copy-markdown').addEventListener('click', () =>
  copy(
    markdown(),
    $('embed-mode').value === 'local'
      ? 'Markdown copied. Add workflow.svg to your repo.'
      : 'Markdown copied. Paste it directly into your README.',
  ),
);
$('copy-code').addEventListener('click', () =>
  copy(activeTab === 'markdown' ? markdown() : currentSvg(), 'Code copied to clipboard.'),
);
function downloadFile(content, type, filename) {
  const blob = new Blob([content], { type }),
    url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$('download').addEventListener('click', () => {
  downloadFile(currentSvg(), 'image/svg+xml;charset=utf-8', 'workflow.svg');
  toast('SVG downloaded.');
});
$('export-json').addEventListener('click', () => {
  downloadFile(
    JSON.stringify(normalizeConfig(config), null, 2) + '\n',
    'application/json',
    'workflow.json',
  );
  toast('Workflow JSON downloaded. Import it to edit this workflow later.');
});
$('import-json').addEventListener('click', () => $('workflow-file').click());
$('workflow-file').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  try {
    if (file.size > 16384) throw Error('Workflow JSON must be 16 KB or smaller.');
    config = importWorkflow(await file.text());
    syncControls();
    toast('Workflow imported.');
  } catch (error) {
    toast(error instanceof SyntaxError ? 'Could not read this JSON file.' : error.message);
  }
});
$('share').addEventListener('click', () => {
  const url = new URL(location.protocol === 'file:' ? EDITOR_URL : location.href);
  url.search = workflowParams(config);
  url.hash = '';
  copy(url.href, 'Editor link copied. All your settings included.');
});
for (const [name, preset] of Object.entries(PRESETS)) {
  if (!$('preset').querySelector(`option[value="${name}"]`)) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = preset.name;
    $('preset').append(option);
  }
}
for (const example of GALLERY) {
  const card = document.createElement('article');
  card.className = 'gallery-card';
  card.innerHTML = `<div class="gallery-preview"><img src="./assets/gallery/${example.id}.svg" alt="${example.name} animated workflow" width="730" height="300" loading="lazy" decoding="async"></div><div class="gallery-caption"><div><h3>${example.name}</h3><p>${example.description}</p></div><button type="button" class="button secondary" data-gallery="${example.id}" aria-label="Use this ${example.name} workflow">Use this ${icon('arrow')}</button></div>`;
  card.querySelector('.gallery-preview').style.backgroundColor =
    THEMES[example.config.theme].background;
  card.querySelector('button').addEventListener('click', () => {
    config = normalizeConfig(example.config);
    paused = false;
    updatePause();
    syncControls();
    document.querySelector('.builder').scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
    $('workflow-title').closest('details').open = true;
    $('workflow-title').focus({ preventScroll: true });
    toast(example.name + ' workflow loaded. Make it yours.');
  });
  $('examples').append(card);
}
for (const repository of COMMUNITY_REPOS) {
  const card = document.createElement('a');
  card.className = 'community-card';
  card.href = 'https://github.com/' + repository.repo;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  const name = document.createElement('h3');
  name.textContent = repository.repo;
  const description = document.createElement('p');
  description.textContent = repository.description;
  const action = document.createElement('span');
  action.textContent = 'See the README ↗';
  card.append(name, description, action);
  $('community-repos').append(card);
}
const extraControls = {
  'workflow-title': 'title',
  'workflow-subtitle': 'subtitle',
  layout: 'layout',
  columns: 'columns',
  'connection-mode': 'connectionMode',
  routing: 'routing',
  'line-style': 'lineStyle',
  'line-width': 'lineWidth',
  arrows: 'arrows',
  font: 'font',
  'google-font': 'googleFont',
  'font-weight': 'fontWeight',
  spacing: 'spacing',
  radius: 'radius',
  'traveler-size': 'travelerSize',
  'show-numbers': 'showNumbers',
  transparent: 'transparent',
};
for (const [id, key] of Object.entries(extraControls))
  $(id).addEventListener('input', () => {
    const input = $(id);
    if (
      key === 'connectionMode' &&
      input.value === 'custom' &&
      config.connectionMode !== 'custom' &&
      !config.connections.length
    )
      config.connections = config.steps.slice(1).map((_, i) => ({ from: i, to: i + 1, label: '' }));
    config[key] =
      input.type === 'checkbox'
        ? input.checked
        : ['columns', 'lineWidth', 'spacing', 'radius', 'travelerSize', 'fontWeight'].includes(key)
          ? Number(input.value)
          : input.value;
    if (['layout', 'columns', 'spacing'].includes(key)) {
      config.positions = [];
      config.canvasSize = null;
    }
    config = normalizeConfig(config);
    if (key === 'connectionMode') renderConnections();
    render();
  });
function renderConnections() {
  $('connection-editor').hidden = config.connectionMode !== 'custom';
  $('connections').replaceChildren();
  config.connections.forEach((edge, index) => {
    const row = document.createElement('div');
    row.className = 'connection-row';
    for (const key of ['from', 'to']) {
      const select = document.createElement('select');
      select.setAttribute('aria-label', `Connection ${index + 1} ${key}`);
      config.steps.forEach((label, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i + 1}. ${label}`;
        option.selected = edge[key] === i;
        option.disabled = key === 'from' ? i === edge.to : i === edge.from;
        select.append(option);
      });
      select.addEventListener('change', () => {
        const next = { ...edge, [key]: Number(select.value) };
        if (
          config.connections.some((e, j) => j !== index && e.from === next.from && e.to === next.to)
        ) {
          toast('That connection already exists.');
          renderConnections();
          return;
        }
        config.connections[index] = next;
        renderConnections();
        render();
      });
      row.append(select);
    }
    const label = document.createElement('input');
    label.maxLength = 24;
    label.placeholder = 'Line label (optional)';
    label.value = edge.label;
    label.setAttribute('aria-label', `Connection ${index + 1} label`);
    label.addEventListener('input', () => {
      config.connections[index].label = label.value;
      render();
    });
    row.append(label);
    const actions = document.createElement('div');
    actions.className = 'connection-actions';
    for (const direction of [-1, 1]) {
      const move = document.createElement('button');
      move.className = 'icon-button';
      move.textContent = direction < 0 ? '↑' : '↓';
      move.setAttribute(
        'aria-label',
        `Move connection ${index + 1} ${direction < 0 ? 'up' : 'down'}`,
      );
      move.disabled = index + direction < 0 || index + direction >= config.connections.length;
      move.addEventListener('click', () => {
        [config.connections[index], config.connections[index + direction]] = [
          config.connections[index + direction],
          config.connections[index],
        ];
        renderConnections();
        render();
      });
      actions.append(move);
    }
    const remove = document.createElement('button');
    remove.className = 'icon-button';
    remove.setAttribute('aria-label', `Remove connection ${index + 1}`);
    remove.innerHTML = icon('close');
    remove.addEventListener('click', () => {
      config.connections.splice(index, 1);
      renderConnections();
      render();
    });
    actions.append(remove);
    row.append(actions);
    $('connections').append(row);
  });
  $('add-connection').disabled = config.connections.length >= 24;
}
$('add-connection').addEventListener('click', () => {
  if (config.connections.length >= 24) return;
  for (let from = 0; from < config.steps.length; from++)
    for (let to = 0; to < config.steps.length; to++)
      if (from !== to && !config.connections.some((e) => e.from === from && e.to === to)) {
        config.connections.push({ from, to, label: '' });
        renderConnections();
        render();
        return;
      }
  toast('All steps are already connected.');
});
$('retry-font').addEventListener('click', () => {
  fontCache.delete(fontKey());
  render();
});
function capturePositions() {
  if (config.positions.length) {
    config = positionedConfig(config);
    return;
  }
  const svg = $('preview').querySelector('svg');
  config = normalizeConfig({
    ...config,
    positions: [...svg.querySelectorAll('[data-step]')].map((card) => {
      const b = card.querySelector('.stage').getBBox();
      return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    }),
    canvasSize: {
      width: svg.viewBox.baseVal.width,
      height: Math.max(420, svg.viewBox.baseVal.height),
    },
  });
}
function moveCard(index, x, y) {
  const geometry = workflowGeometry(config);
  config.positions[index] = {
    x: Math.round(Math.max(70, Math.min(geometry.width - 80, x))),
    y: Math.round(Math.max(geometry.header + 60, Math.min(geometry.height - 70, y))),
  };
}
$('preview').addEventListener('pointerdown', (event) => {
  const card = event.target.closest('[data-step]');
  if (!card || event.button !== 0) return;
  event.preventDefault();
  const svg = card.ownerSVGElement,
    b = card.querySelector('.stage').getBBox(),
    point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      svg.getScreenCTM().inverse(),
    );
  capturePositions();
  drag = {
    index: Number(card.dataset.step),
    pointer: event.pointerId,
    dx: point.x - (b.x + b.width / 2),
    dy: point.y - (b.y + b.height / 2),
  };
  $('preview').setPointerCapture(event.pointerId);
  $('preview').classList.add('dragging');
  render();
});
$('preview').addEventListener('pointermove', (event) => {
  if (!drag || event.pointerId !== drag.pointer) return;
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
    $('preview').querySelector('svg').getScreenCTM().inverse(),
  );
  moveCard(drag.index, point.x - drag.dx, point.y - drag.dy);
  render();
});
function finishDrag(event) {
  if (!drag || event.pointerId !== drag.pointer) return;
  drag = null;
  $('preview').classList.remove('dragging');
  render();
}
for (const name of ['pointerup', 'pointercancel', 'lostpointercapture'])
  $('preview').addEventListener(name, finishDrag);
$('preview').addEventListener('keydown', (event) => {
  const card = event.target.closest('[data-step]');
  if (!card || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  capturePositions();
  const index = Number(card.dataset.step),
    p = config.positions[index],
    amount = event.shiftKey ? 20 : 5;
  moveCard(
    index,
    p.x + (event.key === 'ArrowLeft' ? -amount : event.key === 'ArrowRight' ? amount : 0),
    p.y + (event.key === 'ArrowUp' ? -amount : event.key === 'ArrowDown' ? amount : 0),
  );
  render();
  flushRender();
  $('preview').querySelector(`[data-step="${index}"]`).focus();
});
$('reset-positions').addEventListener('click', () => {
  config.positions = [];
  config.canvasSize = null;
  render();
  toast('Cards returned to the selected layout.');
});
for (const button of document.querySelectorAll('[data-arrange]'))
  button.addEventListener('click', () => {
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
$('undo').addEventListener('click', () => restoreHistory('undo'));
$('redo').addEventListener('click', () => restoreHistory('redo'));
document.addEventListener('keydown', (event) => {
  if (
    !(event.ctrlKey || event.metaKey) ||
    event.altKey ||
    event.target.closest('input, textarea, select, [contenteditable="true"]')
  )
    return;
  if (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'y') {
    event.preventDefault();
    restoreHistory(event.shiftKey || event.key.toLowerCase() === 'y' ? 'redo' : 'undo');
  }
});
selectTab('markdown');
syncControls();
