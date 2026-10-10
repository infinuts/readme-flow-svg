# Working on readme-flow-svg

This repo contains a browser editor, a shared SVG renderer, and an SVG/MCP API hosted on Vercel. The editor also deploys to GitHub Pages and works when opening `index.html` directly.

## Source files

- `src/svg.js`: presets, palettes, icons, normalization, and SVG rendering.
- `src/app.js`, `index.html`, `src/style.css`: editor behavior and appearance.
- `src/links.js`: public service URLs and query encoding.
- `server/handler.js`: shared HTTP API. `api/` contains the Vercel adapters.
- `mcp/server.mjs`: MCP tools. `mcp/stdio.mjs` runs the local transport.
- `skills/readme-flow-svg/SKILL.md`: source skill. Run `npm run sync:skills` after editing it; the copies in `.agents/skills` and `.claude/skills` are generated.

## Checks

Run `npm ci` when dependencies are needed, then `npm test` and `npm run build`. The build regenerates `src/browser.js` and the example SVGs. Include those generated changes when committing source edits. Run `npm run build:api` after changing the HTTP handler or MCP tools.

Keep the static editor independent of backend packages. Generated SVGs must be self-contained: escape labels, accept only supported icons and hex colors, preserve reduced-motion support, and avoid scripts, external assets, and `foreignObject`.

For README workflow generation, use the `readme-flow-svg` skill and the `generate_workflow` MCP tool. Use `list_options` to look up supported settings. Keep documentation direct and factual. Do not commit credentials, local harness state, deployment metadata, or environment files.
