import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const errors = new WeakMap();
const legacy = {
  steps: ['Build', 'Test', 'Ship'],
  positions: [
    { x: 100, y: 100 },
    { x: 280, y: 250 },
    { x: 460, y: 400 },
  ],
};
const saved = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('readme-flow-config')));
async function load(page, config = {}, fromStorage = false) {
  if (fromStorage) {
    await page.addInitScript(
      (value) => localStorage.setItem('readme-flow-config', JSON.stringify(value)),
      config,
    );
    await page.goto('/');
  } else {
    const params = new URLSearchParams(
      Object.entries(config).map(([key, value]) => [
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value),
      ]),
    );
    await page.goto('/?' + params);
  }
  await expect(page.locator('#preview [data-step]')).toHaveCount(config.steps?.length || 4);
}

test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  page.on('pageerror', (error) => errors.get(page).push(error.message));
  // These tests are offline: external font and image services are not needed to edit.
  await page.route('https://**', (route) => route.abort());
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

for (const fromStorage of [false, true])
  test(`positioned steps without a canvas support adding, keyboard movement and history (${fromStorage ? 'storage' : 'URL'})`, async ({
    page,
  }) => {
    await load(page, legacy, fromStorage);
    await page.getByRole('button', { name: 'Add a step' }).click();
    await expect(page.locator('#preview [data-step]')).toHaveCount(4);
    await page.locator('#close-icon-picker').click();
    const card = page.locator('#preview [data-step="3"]');
    await card.focus();
    const before = (await saved(page)).positions[3];
    await card.press('ArrowUp');
    await expect.poll(async () => (await saved(page)).positions[3].y).toBe(before.y - 5);
    await expect(card).toBeFocused();
    await page.keyboard.press('Control+z');
    await expect.poll(async () => (await saved(page)).positions[3].y).toBe(before.y);
    await page.locator('#redo').click();
    await expect.poll(async () => (await saved(page)).positions[3].y).toBe(before.y - 5);
  });

test('removing and reordering preserve step identity through undo/redo', async ({ page }) => {
  await load(page, { steps: ['Build', 'Test', 'Ship', 'Monitor'] });
  await page.getByRole('button', { name: 'Move step 1 down', exact: true }).click();
  await expect.poll(async () => (await saved(page)).steps[0]).toBe('Test');
  await page.locator('#undo').click();
  await expect.poll(async () => (await saved(page)).steps[0]).toBe('Build');
  await page.locator('#redo').click();
  await page.getByRole('button', { name: 'Remove step 2', exact: true }).click();
  await expect(page.locator('#preview [data-step]')).toHaveCount(3);
  await page.locator('#undo').click();
  await expect(page.locator('#preview [data-step]')).toHaveCount(4);
  await expect.poll(async () => (await saved(page)).steps[1]).toBe('Build');
});

test('dragging, arranging, fitting and resetting positions remain editable', async ({ page }) => {
  await load(page, legacy);
  await page.locator('#preview [data-step="0"]').scrollIntoViewIfNeeded();
  await expect(page.locator('#preview .traveler').first()).toHaveCSS('pointer-events', 'none');
  const rect = await page.locator('#preview [data-step="0"] .stage').boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width / 2 + 40, rect.y + rect.height / 2 + 30, { steps: 5 });
  await page.mouse.up();
  await expect.poll(async () => (await saved(page)).positions[0].x).toBeGreaterThan(100);
  await page.locator('#undo').click();
  await expect.poll(async () => (await saved(page)).positions[0].x).toBe(100);
  await page.getByText('Arrange cards', { exact: true }).click();
  await page.getByRole('button', { name: 'Align vertically', exact: true }).click();
  await expect
    .poll(async () => new Set((await saved(page)).positions.map((p) => p.x)).size)
    .toBe(1);
  await page.getByRole('button', { name: 'Fit canvas to cards' }).click();
  await expect
    .poll(async () => Math.min(...(await saved(page)).positions.map((p) => p.x)))
    .toBe(80);
  await page.locator('#reset-positions').click();
  await expect.poll(async () => (await saved(page)).positions.length).toBe(0);
  await expect(page.locator('#reset-positions')).toBeDisabled();
});

test('the custom theme preview renders on demand and all accessible IDs stay unique', async ({
  page,
}) => {
  await load(page);
  await expect(page.locator('#custom-theme-preview svg')).toHaveCount(0);
  await page.getByText('Theme & animation', { exact: true }).click();
  await page.locator('[data-theme="custom"]').click();
  await expect(page.locator('#custom-theme-preview svg')).toHaveCount(1);
  const accessibility = await page.evaluate(() => {
    const svgs = [...document.querySelectorAll('#preview > svg, #custom-theme-preview > svg')];
    return svgs.map((svg) =>
      svg
        .getAttribute('aria-labelledby')
        .split(' ')
        .map((id) => ({
          id,
          local: !!svg.querySelector(`[id="${id}"]`),
          count: document.querySelectorAll(`[id="${id}"]`).length,
        })),
    );
  });
  for (const references of accessibility)
    for (const ref of references) {
      expect(ref.local).toBe(true);
      expect(ref.count).toBe(1);
    }
  await page.locator('#close-custom-theme').click();
  await expect(page.locator('#custom-theme-preview svg')).toHaveCount(0);
});

test('failed Google Fonts still allow hosted Markdown and retry while SVG export waits', async ({
  page,
}) => {
  let requests = 0;
  await page.route('**/font?**', async (route) => {
    requests++;
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: '{"error":"Font temporarily unavailable."}',
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  });
  await load(page);
  await page.getByText('Appearance & spacing', { exact: true }).click();
  await page.locator('#font').selectOption('google');
  await expect(page.locator('#download')).toBeDisabled();
  await expect(page.locator('#copy-markdown')).toBeEnabled();
  await expect(page.locator('#copy-code')).toBeEnabled();
  await expect(page.locator('#retry-font')).toBeVisible();
  await expect(page.locator('#font-status')).toContainText('Hosted Markdown is available');
  await page.locator('#svg-tab').click();
  await expect(page.locator('#copy-code')).toBeDisabled();
  await page.locator('#markdown-tab').click();
  await expect(page.locator('#copy-code')).toBeEnabled();
  await page.locator('#retry-font').click();
  await expect.poll(() => requests).toBe(2);
  await page.locator('#font').selectOption('sans');
  await expect(page.locator('#download')).toBeEnabled();
});

test('JSON export/import restores the entire workflow and invalid imports preserve it', async ({
  page,
}) => {
  await load(page, {
    ...legacy,
    title: 'Release & monitor',
    connectionMode: 'custom',
    connections: [{ from: 0, to: 2, label: 'Ready' }],
  });
  const before = await saved(page);
  const downloadEvent = page.waitForEvent('download');
  await page.locator('#export-json').click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('workflow.json');
  const json = await readFile(await download.path(), 'utf8');
  expect(JSON.parse(json)).toEqual(before);
  await page.locator('#workflow-title').fill('Changed');
  await page.locator('#workflow-file').setInputFiles({
    name: 'workflow.json',
    mimeType: 'application/json',
    buffer: Buffer.from(json),
  });
  await expect(page.locator('#workflow-title')).toHaveValue('Release & monitor');
  await expect.poll(() => saved(page)).toEqual(before);
  await page.locator('#workflow-file').setInputFiles({
    name: 'invalid.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{}'),
  });
  await expect(page.locator('#toast')).toContainText('3–12');
  expect(await saved(page)).toEqual(before);
});

test('SVG download keeps animation, accessible descriptions and self-contained content', async ({
  page,
}) => {
  await load(page, { steps: ['Review pull request changes', 'Test', 'Ship'] });
  const downloadEvent = page.waitForEvent('download');
  await page.locator('#download').click();
  const download = await downloadEvent;
  const svg = await readFile(await download.path(), 'utf8');
  expect(download.suggestedFilename()).toBe('workflow.svg');
  expect(svg).toContain('prefers-reduced-motion');
  expect(svg).toContain('Review pull');
  expect(svg).toContain('request changes');
  expect(svg).not.toMatch(/<script|foreignObject|href=/);
  expect(svg).toContain('aria-labelledby="workflow_');
});

test('Markdown choices include plain, custom, editor and adaptive embeds', async ({ page }) => {
  await load(page);
  await expect(page.locator('#code')).toContainText('![');
  expect(await page.locator('#code').textContent()).toMatch(/^!\[/);
  await page.locator('#embed-link').selectOption('custom');
  await page.locator('#embed-link-url').fill('https://example.com/docs');
  await expect(page.locator('#code')).toContainText('](https://example.com/docs)');
  await page.locator('#embed-link').selectOption('editor');
  await expect(page.locator('#code')).toContainText('](https://readme-flow-svg.vercel.app/?');
  await page.locator('#embed-mode').selectOption('adaptive');
  await page.locator('#alt-text').fill('Build "A" & ship');
  await expect(page.locator('#code')).toContainText('<picture>');
  await expect(page.locator('#code')).toContainText('prefers-color-scheme: dark');
  await expect(page.locator('#code')).toContainText('alt="Build &quot;A&quot; &amp; ship"');
});

test('the editor works from file:// with no server and exports on a narrow viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(pathToFileURL(resolve('index.html')).href);
  await expect(page.locator('#preview [data-step]')).toHaveCount(4);
  await page.locator('#workflow-title').fill('Offline workflow');
  await expect(page.locator('#workflow-name')).toHaveText('Offline workflow');
  await page.locator('#embed-mode').selectOption('local');
  await expect(page.locator('#code')).toHaveText('![Offline workflow](./workflow.svg)');
  await page.locator('#export-json').scrollIntoViewIfNeeded();
  await expect(page.locator('#export-json')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
