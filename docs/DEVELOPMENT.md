# Development and integrations

## Generate with AI

Install the skill into your current project with the [Skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add infinuts/readme-flow-svg --skill readme-flow-svg
```

For Codex and Claude Code across all your projects:

```sh
npx skills add infinuts/readme-flow-svg --skill readme-flow-svg --global --agent codex --agent claude-code
```

The CLI installs the skill from this public GitHub repo; no separate npm package is needed. The skill can generate workflows through the public REST API immediately. To use MCP tools, add the connection described below. Installing a skill does not configure MCP automatically.

The [readme-flow-svg skill](../skills/readme-flow-svg/SKILL.md) teaches an agent how to choose steps and return an SVG or hosted Markdown embed. The repo includes synchronized skill copies for Codex and Claude Code.

Open the checkout in either harness, trust the project or approve its MCP connection when prompted, and ask it to generate a README workflow. Invoke `$readme-flow-svg` in Codex or `/readme-flow-svg` in Claude Code. No API key or service login is required.

To use the skill in another project, copy the skill folder and MCP configuration into that project. For user-wide skills, use `~/.agents/skills/` for Codex or `~/.claude/skills/` for Claude Code. See the official [Codex skill locations](https://developers.openai.com/codex/skills) and [Claude skill locations](https://code.claude.com/docs/en/skills).

Edit `skills/readme-flow-svg/SKILL.md` and run `npm run sync:skills` to update both harness copies. `npm test` checks that they stay in sync.

The hosted MCP endpoint is:

```text
https://readme-flow-svg.vercel.app/mcp
```

It exposes `generate_workflow` and `list_options` through public Streamable HTTP. Any compatible MCP client can connect without OAuth. Both tools generate output or list settings; they do not edit files or publish changes.

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

To change the editor, use Node.js 22 or newer and install dependencies with `npm ci`. The build bundles the font engine into a separate script loaded only for Google Fonts, so the built editor still works when opening `index.html` directly.

```sh
npm ci
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

For the editor, SVG API, and HTTP MCP together, import the repo into Vercel. The included `vercel.json` defines the build, static output, and API routes. The main repo is connected to Vercel, so pushes deploy automatically. Forks can use the public image service or replace `SERVICE_URL` in `src/links.js` with their own production domain and update the MCP configurations and source skill.

The HTTP handler lives in `server/handler.js`, with Vercel adapters in `api/`. `npm run build:api` creates and verifies a standalone API bundle in `.api-build/` without replacing the static build. Vercel builds the adapters directly. No `.openai` files are needed; local deployment metadata and environment files are ignored by Git.
