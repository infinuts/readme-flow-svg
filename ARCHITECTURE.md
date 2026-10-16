# Architecture

The editor is a static page: `index.html`, `src/style.css`, and the generated
`src/browser.js`. It works on Vercel, GitHub Pages, and `file://`.

```text
Editor controls → normalizeConfig → renderSvg → preview / download
                         ↓
                  workflowParams → hosted image / editor URL
                         ↑
HTTP query → parseWorkflowParams → shared renderer → image/svg+xml
```

- `src/options.js` owns presets, icons, and palette definitions. `src/config.js`
  normalizes untrusted input and computes geometry. Manual layouts always have
  complete positions and a canvas that contains every card.
- `src/svg.js` re-exports the shared configuration interface and renders SVGs.
  It caches up to eight sets of connection routes by geometry, routing, and edge
  endpoints. Labels, appearance, and timing changes reuse those routes. The
  output embeds CSS, icons, scoped accessibility IDs, and reduced-motion rules.
- `src/links.js` owns public service URLs and the existing query format. Both the
  editor and HTTP handler use it. Do not introduce a second URL encoder.
- `src/app.js` owns controls, preview interaction, local storage, and export.
  Page-only accessibility attributes are applied after rendering the preview.
- `src/editor-state.js` owns bounded undo history, arrangement, and JSON imports.
  The editor batches preview updates per animation frame and creates the custom
  theme preview only while its dialog is open.
- `src/appearance.js` resolves system/manual page appearance before CSS loads.
  It does not modify workflow settings or SVG palettes.
- `src/markdown.js` handles custom Markdown alt text without touching image URLs.
- `src/gallery.js` supplies both the gallery previews and their editor settings.
- `src/fonts.js` uses fontkit to outline optional fonts. Built-in fonts require
  no network. `src/load-font-engine.js` loads the generated `src/font-engine.js`
  only when requested. Google Fonts requests use the existing `/font` endpoint.
- `server/handler.js` serves the optional stateless image API; `api/` adapts it
  to Vercel. `mcp/server.mjs` exposes the generator through MCP.

The API is an existing optional service, not a requirement for editing or
downloading. No accounts, database, tracking, or analytics are used. Hosted image
settings are public URL parameters. Browser settings stay in local storage.

## Build and checks

`npm run build` bundles the editor, generates gallery and example SVGs, syncs the
community table, and copies the site into `dist/`. Commit generated `src/browser.js`
and SVG assets alongside source changes. `npm run build:api` verifies a separate
server bundle; it never replaces the static editor.

ESLint checks JavaScript across the repo. TypeScript checks `appearance.js`,
`markdown.js`, `config.js`, `links.js`, and `editor-state.js` with strict JavaScript
checking, including normalization, geometry, and URL parsing. The renderer, DOM
editor, and API still rely on regression tests. Playwright covers HTTP and
`file://` editing, history, layout actions, font failures, accessibility IDs, and
SVG/JSON exports. Representative SVG fixtures protect output changes. Prettier excludes the renderer and
URL module, generated assets, and synchronized skill copies.

The `/generate` handler enforces its 16 KB body limit while reading bytes and
cancels oversized input. Declared oversized `Content-Length` values are rejected
before any reads. Bodies with no length or an incorrect small length are still
bounded by the stream reader.

Keep exports self-contained: escaped text, supported icons, hex colors, no scripts,
external assets, or `foreignObject`. URL schema and renderer changes need explicit
compatibility review and round-trip tests.
