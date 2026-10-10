# <img src="./assets/logo.svg" width="42" height="42" alt=""> readme-flow-svg

Create an animated workflow for your GitHub README.

[Open the generator](https://infinuts.github.io/readme-flow-svg/)

[![Upload → Validate → Compress → Download](https://readme-flow-svg.artfulchime2.chatgpt.site/svg?steps=Upload;Validate;Compress;Download&theme=github&traveler=file)](https://readme-flow-svg.artfulchime2.chatgpt.site/r)

Enter three to six steps and watch a dot, file, or another icon move through them. The preview updates as you edit. You can change the labels and stage icons, reorder steps, and adjust the loop duration.

Choose Light, Dark, Terminal, GitHub, Ocean, or Sunset, or make a custom theme with your own colors. The moving element picker includes a rocket, package, code, spark, heart, and lightning bolt. The dot has a subtle pulse, and movement eases between stages.

The generator runs in your browser. You don't need an account or your own deployment.

## Add a workflow to your README

1. Open the generator and choose a preset: File processing, API request, Deployment, Data pipeline, Authentication, or AI inference.
2. Edit the steps and choose how the animation looks.
3. Click Copy Markdown and paste the result into your README. The image URL generates your SVG directly, so you don't need to upload a file.

For a file that lives in your own repo, choose “File in your repo”, download `workflow.svg`, and put it beside the README. That mode copies `![Your workflow](./workflow.svg)`.

Adding a step opens an icon picker. Click the icon beside any existing step to change it. Each icon stays with its step when you reorder the workflow.

Choose Custom in the theme picker to edit the background, cards, labels, accent, borders, active stages, step numbers, and connections. Your palette and moving element are included in downloaded SVGs and shared editor links.

The SVG contains its own animation and icons. It doesn't need scripts, remote fonts, or an image service.

Use the link button above the preview to share your settings. Opening that URL recreates the workflow in the editor. Your most recent settings are also saved in your browser.

The editor is hosted on GitHub Pages. A separate image service generates SVGs from URL parameters. Shared editor links reopen the controls; image links return `image/svg+xml`.

## Image URLs

```markdown
[![Workflow](https://readme-flow-svg.artfulchime2.chatgpt.site/svg?steps=Upload;Validate;Compress;Download&theme=github&traveler=file)](https://readme-flow-svg.artfulchime2.chatgpt.site/r)
```

`steps` accepts semicolon-separated labels or a JSON array. The other options are `preset`, `theme`, `traveler`, `duration` (2 to 10 seconds), `icons` (a JSON array), and `customTheme` (a JSON object of hex colors). The generator encodes these for you, including labels containing semicolons.

The `/r` route redirects to this repository. Git.io stopped accepting new short links in 2022, so a new git.io alias isn't available. [GitHub's announcement](https://github.blog/changelog/2022-01-11-git-io-no-longer-accepts-new-urls/).

## Generate with AI

The [readme-flow-svg skill](./skills/readme-flow-svg/SKILL.md) teaches an agent how to choose steps and return an SVG or hosted Markdown embed. Copy its folder into your client's skill directory.

The hosted MCP endpoint is:

```text
https://readme-flow-svg.artfulchime2.chatgpt.site/mcp
```

It exposes `generate_workflow` and `list_options`. The managed endpoint uses OAuth; install the readme-flow-svg integration in ChatGPT, or connect through an MCP client that supports Streamable HTTP and OAuth. The SVG and REST generation endpoints remain public.

For a local stdio server that doesn't require a service login, clone the repository and run:

```sh
npm ci
npm run mcp
```

Example stdio client configuration (replace the path with your checkout):

```json
{
  "mcpServers": {
    "readme-flow-svg": {
      "command": "node",
      "args": ["/absolute/path/readme-flow-svg/mcp/stdio.mjs"]
    }
  }
}
```

Without MCP, POST a JSON configuration to `/generate` on the image service. It returns `svg`, `image_url`, `markdown`, `editor_url`, and the normalized `config`. GET `/options` lists supported presets, palettes, and icons. The service is stateless; workflow settings are visible in shared URLs.

## Run locally

Download or clone this repository and open `index.html` in your browser. The editor works without a server.

To change the editor, use Node.js 22 or newer. Its static build doesn't need installed dependencies. Tests, the image service, and MCP use the packages installed by `npm ci`.

```sh
npm run build
npm run dev
```

Open http://127.0.0.1:4173. After editing the source, rebuild and refresh. The build also updates `src/browser.js`, which lets `index.html` work when opened directly.

```sh
npm ci
npm test
```

## Deploy a fork

The public generator is available at the link above. If you want to host your own copy:

1. Push this project to your GitHub repository’s `main` branch.
2. In Settings → Pages → Build and deployment, select GitHub Actions.
3. The included `.github/workflows/pages.yml` tests, builds, and deploys the site on each push to `main`. You can also run it manually from the Actions tab.

All asset paths are relative, so both `username.github.io` and `username.github.io/readme-flow-svg/` work. You can also host the contents of `dist/` on any static host.

The image service is a Cloudflare Worker in `worker/index.js`. Run `npm run build:api` to build it into `dist/server/index.js`; that replaces the static build output. `.openai/hosting.json` configures its Sites deployment. Run `npm run build` again to restore the GitHub Pages artifact. Forks can use the public image service or replace `SERVICE_URL` in `src/links.js` with their own deployment.

## Contribute

Presets, palettes, and icons live in `src/svg.js`. Add moving elements to `TRAVELERS`. The editor is in `src/app.js`, with its layout and styles in `index.html` and `src/style.css`.

To add a theme, define its colors in `THEMES` and its name in `THEME_LABELS`. The theme picker updates automatically. Run `npm run build` to regenerate the browser script and example SVGs. The preview and downloads use the same renderer.

Keep exported SVGs self-contained. Preserve XML escaping and reduced-motion support, and avoid scripts, foreign objects, or external assets.

Inspired by [Readme Typing SVG](https://github.com/DenverCoder1/readme-typing-svg) and [archgram](https://github.com/byAbas/archgram). Outline icons are adapted from [Tabler Icons](https://tabler.io/icons) under the MIT license.

## License

MIT. See [LICENSE](./LICENSE).
