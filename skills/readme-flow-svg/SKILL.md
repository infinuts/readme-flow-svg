---
name: readme-flow-svg
description: Generate animated workflow SVGs and hosted Markdown image embeds for GitHub READMEs from project steps, with themes and icon choices. Use for README workflow visuals; not for general architecture diagrams.
---

Generate a workflow that describes what the user's project actually does. Use three to twelve concise steps. Preserve steps or styling the user provides; infer a sequence from project documentation when needed. Use a snake or grid layout for longer workflows.

## Generate

Use the connected `generate_workflow` MCP tool. Call `list_options` when you need to discover available presets, themes, stage icons, or moving elements. The tool returns SVG source, a hosted image URL, an editor URL, and ready-to-paste Markdown.

If MCP is unavailable, POST the configuration as JSON to:

`https://readme-flow-svg.vercel.app/generate`

For example:

```json
{
  "steps": ["Upload", "Validate", "Compress", "Download"],
  "theme": "github",
  "traveler": "file",
  "duration": 6
}
```

Discover supported values with GET `/options` on the same origin. Labels may contain at most 32 characters. `duration` is the complete loop in seconds, between 2 and 30. `icons` is an optional array of stage icon names aligned with the steps. `theme: "custom"` accepts a `customTheme` object with hex colors for `background`, `card`, `text`, `accent`, `border`, `tint`, `muted`, and `line`.

## Layout and connections

Use `title` (up to 80 characters) and `subtitle` (up to 140) for context. `layout` accepts `horizontal`, `vertical`, `snake`, or `grid`; `columns` accepts 2–6 for snake and grid layouts.

For branches, merges, and loops, set `connectionMode: "custom"` and provide up to 24 `connections`, each with zero-based `from` and `to` step indices and an optional `label` up to 24 characters. For example, `[{"from":0,"to":1},{"from":0,"to":2},{"from":1,"to":3},{"from":2,"to":3}]` splits from step 1 and merges at step 4. Self-links and duplicate directed connections are invalid. Empty connections leave the cards disconnected. Animation follows array order; it does not simulate concurrent tasks.

Use `routing: "curved"` or `"elbow"` to avoid cards, or `"straight"` for direct lines. `lineStyle` accepts `solid`, `dashed`, or `dotted`; `lineWidth` is 1–4, and `arrows` is boolean. Other options: `spacing` (32–120), `radius` (0–24), `font` (`sans`, `mono`, `serif`), `showNumbers` and `transparent` (booleans), and `travelerSize` (0.6–1.8). Keep the smallest set of options that explains the project clearly.

## Deliver

Use the returned `markdown` for a hosted embed that works without uploading a file. Give the editor link when the user may want to adjust the result. If the user requests an SVG file, save the returned `svg` to the requested location; the hosted URL is an image response, not the editor.

For README edits, put the workflow where it helps explain the project and keep the surrounding documentation intact. Publishing or pushing a README requires the user's authorization for that action. Generating an SVG does not imply permission to publish other changes.

The service is stateless and public. Configuration is included in image and editor URLs, so use project steps rather than credentials or private identifiers. SVGs are self-contained and respect reduced-motion preferences.
