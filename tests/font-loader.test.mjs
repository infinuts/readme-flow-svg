import test from 'node:test';
import assert from 'node:assert/strict';
import { loadFontEngine } from '../src/load-font-engine.js';

test('font loading is deferred, shared between callers, and retryable after failure', async (t) => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  t.after(() => {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
  });
  const scripts = [];
  globalThis.window = {};
  globalThis.document = {
    baseURI: 'file:///project/index.html',
    createElement: () => ({
      remove() {
        this.removed = true;
      },
    }),
    head: { append: (script) => scripts.push(script) },
  };
  assert.equal(scripts.length, 0);
  const first = loadFontEngine();
  assert.equal(loadFontEngine(), first);
  assert.equal(scripts[0].src, 'file:///project/src/font-engine.js');
  scripts[0].onerror();
  await assert.rejects(first, /Could not load the font engine/);
  assert.equal(scripts[0].removed, true);
  const retry = loadFontEngine();
  const engine = { parseFont() {}, outlineSvg() {} };
  window.ReadmeFlowFonts = engine;
  scripts[1].onload();
  assert.equal(await retry, engine);
  assert.equal(await loadFontEngine(), engine);
  assert.equal(scripts.length, 2);
});
