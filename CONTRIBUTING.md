# Contributing

## Add your repository to the showcase

Already using a readme-flow-svg image in your README? Add your repository to the community showcase:

1. Fork this repository.
2. Add an entry to [`community/repos.json`](community/repos.json). Use `owner/repository` and a short description (up to 160 characters):

   ```json
   {
     "repo": "your-name/your-project",
     "description": "What your project does and what the workflow shows."
   }
   ```

3. Keep the JSON valid, including commas between entries. Don't add duplicate repositories.
4. Open a pull request and include a link to the README containing your workflow. Submit a repository you own or maintain.

No local setup is needed for a showcase submission. You can edit the file on GitHub; GitHub will guide you through creating a fork and pull request. After the pull request is merged, the website lists your repository on its next deployment and a GitHub Action updates the repository list in this project's README. You only need to edit the JSON file.

The README table is generated between the `community-showcase` markers. Don't edit it by hand. `npm run build` also updates it locally.

The showcase starts with this project's own README. Entries should link to public repositories with a working readme-flow-svg image. Maintainers check the README before merging.

## Add a gallery example

Finished examples live in `src/gallery.js`. Each entry has an ID, name, description, and renderer configuration. The build generates its animated preview under `assets/gallery/`; its “Use this” button loads the same configuration into the editor.

## Change the generator

Presets, palettes, and icons live in `src/svg.js`. Editor behavior lives in `src/app.js`, with layout in `index.html` and styles in `src/style.css`.

Run `npm ci`, `npm run lint`, `npm run type-check`, `npm run format:check`, `npm test`, and `npm run build`. Include regenerated `src/browser.js` and SVG assets in your pull request. Run `npm run build:api` after changing the HTTP handler or MCP tools.

Keep exported SVGs self-contained, escape user text, and preserve reduced-motion support. Don't include scripts, external assets, or `foreignObject` in generated SVGs.

## Review checklist

Keep pull requests focused and explain the behavior they change. Include desktop
and 360px screenshots for visual changes; check light/dark appearance, keyboard
navigation, reduced motion, download, copy, and editor links.

Use `npm run format` for formatting. The renderer and URL codec are intentionally
excluded from automatic formatting to keep compatibility reviews focused. Type
checking is incremental and currently covers the new page-appearance and Markdown
modules; lint and tests cover the existing codebase.

Do not change SVG output or URL parameter formats as incidental cleanup. Keep the
static editor usable without the API, with `index.html` opened directly. Prefer
built-in browser features over new dependencies. Do not commit credentials,
environment files, local test output, or deployment metadata.

Read the [architecture notes](./ARCHITECTURE.md), [Code of Conduct](./CODE_OF_CONDUCT.md),
and [security policy](./SECURITY.md). Security reports should not be public issues.
