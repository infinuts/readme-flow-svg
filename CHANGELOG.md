# Changelog

Changes are recorded here without implying a package release.

## Unreleased

### Added

- Editable workflow JSON import/export, bounded undo/redo, and card arrangement controls.
- Plain, editor, documentation, and repository image links, plus light/dark picture snippets.
- Browser regression tests, representative SVG snapshots, and a maximum-size render benchmark.
- Strict type checking for normalization, geometry, URL parsing, and editor state.
- System, light, and dark page appearance with a saved manual preference.
- A generated hero/README demo, social card, favicon set, and sharing metadata.
- Markdown alt text, expanded FAQ, and clear privacy details.
- ML training, Git flow, and microservice gallery examples.
- Contributor policies, issue/PR templates, architecture notes, and PR checks.
- ESLint, Prettier, EditorConfig, and incremental JavaScript type checking.

### Changed

- Manual positions fill missing cards and derive a canvas before editing.
- API generation rejects oversized bodies while streaming and cancels further reads.
- Preview accessibility IDs are scoped, and hidden theme previews are not rendered.
- Hosted Markdown remains available when a Google Font is loading or fails; SVG operations wait for the font.
- Connection routes are cached across appearance edits; previews update once per animation frame.
- Animated travelers no longer intercept card dragging in the editor.
- Long card labels use two text lines rather than horizontal compression.
- Roomier collapsible controls, desktop sticky preview, and mobile sizing.
- System fonts replace the page's external font stylesheet.
- Optional font outlining loads on demand; production CSS is minified.
- README now leads with usage; advanced integration docs live under `docs/`.
- Preview accessibility separates interactive cards from exported image semantics.

### Preserved

- Existing URL parameters, HTTP/MCP interfaces, and classic layout dimensions.
- Free use, MIT license, offline editor, and local SVG downloads.
