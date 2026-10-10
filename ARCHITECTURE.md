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

- `src/svg.js` owns presets, icons, palettes, normalization, geometry, escaping,
  and SVG rendering. The output embeds CSS, icons, and reduced-motion rules.
- `src/links.js` owns public service URLs and the existing query format. Both the
  editor and HTTP handler use it. Do not introduce a second URL encoder.
- `src/app.js` owns controls, preview interaction, local storage, and export.
  Page-only accessibility attributes are applied after rendering the preview.
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

ESLint checks JavaScript across the repo. TypeScript checks `appearance.js` and
`markdown.js` with strict JavaScript checking; legacy renderer/API modules are
covered by regression tests, not a claimed full type migration. Expand this scope
as modules acquire explicit types. Prettier excludes the protected renderer and
URL module, generated assets, and synchronized skill copies.

Keep exports self-contained: escaped text, supported icons, hex colors, no scripts,
external assets, or `foreignObject`. URL schema and renderer changes need explicit
compatibility review and round-trip tests.
