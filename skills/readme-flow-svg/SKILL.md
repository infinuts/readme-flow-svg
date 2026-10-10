---
name: readme-flow-svg
description: Generate animated workflow SVGs and hosted Markdown image embeds for GitHub READMEs from project steps, with themes and icon choices. Use for README workflow visuals; not for general architecture diagrams.
---

Generate a small workflow that describes what the user's project actually does. Use three to six concise steps. Preserve steps or styling the user provides; infer a simple sequence from project documentation when needed.

## Generate

Use the connected `generate_workflow` MCP tool. Call `list_options` when you need to discover available presets, themes, stage icons, or moving elements. The tool returns SVG source, a hosted image URL, an editor URL, and ready-to-paste Markdown.

If MCP is unavailable, POST the configuration as JSON to:

`https://readme-flow-svg.artfulchime2.chatgpt.site/generate`

For example:

```json
{
  "steps": ["Upload", "Validate", "Compress", "Download"],
  "theme": "github",
  "traveler": "file",
  "duration": 6
}
```

Discover supported values with GET `/options` on the same origin. Labels may contain at most 32 characters. `duration` is the complete loop in seconds, between 2 and 10. `icons` is an optional array of stage icon names aligned with the steps. `theme: "custom"` accepts a `customTheme` object with hex colors for `background`, `card`, `text`, `accent`, `border`, `tint`, `muted`, and `line`.

## Deliver

Use the returned `markdown` for a hosted embed that works without uploading a file. Give the editor link when the user may want to adjust the result. If the user requests an SVG file, save the returned `svg` to the requested location; the hosted URL is an image response, not the editor.

For README edits, put the workflow where it helps explain the project and keep the surrounding documentation intact. Publishing or pushing a README requires the user's authorization for that action. Generating an SVG does not imply permission to publish other changes.

The service is stateless and public. Configuration is included in image and editor URLs, so use project steps rather than credentials or private identifiers. SVGs are self-contained and respect reduced-motion preferences.
