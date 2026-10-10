# Launch checklist

- [x] Set the repository description to “Animated SVG workflows for GitHub READMEs. Free browser editor, self-contained exports, and hosted image links.”
- [x] Set the repository website to https://readme-flow-svg.vercel.app/.
- [x] Add `animation`, `diagram`, and `open-source` topics, preserving existing SVG, README, workflow, JavaScript, developer-tool, and MCP topics.
- [x] Enable GitHub private vulnerability reporting and link it from `SECURITY.md`.
- [x] Prepare X and Show HN copy in [LAUNCH-POSTS.md](./LAUNCH-POSTS.md).
- [ ] Upload `assets/social-preview.png` (1200 × 630) under [repository settings](https://github.com/infinuts/readme-flow-svg/settings). The website already references this asset. Browser automation stopped because it could not reliably determine the current URL.
- [ ] Choose a monitored private contact for Code of Conduct concerns. Public harmful content can be reported through GitHub's Report content action.
- [x] Require the GitHub Actions `check` status on `main`, with an up-to-date branch. Force pushes and branch deletion are disabled; administrators retain their normal bypass.
- [x] Verify production social metadata on Vercel and GitHub Pages, the 1200 × 630 image response, and the new README demo through GitHub.
- [ ] Publish the X draft from the intended account. No X post has been sent.
- [ ] Submit the Show HN draft when ready. No Hacker News submission has been sent.

Repository metadata and private vulnerability reporting were applied through the
GitHub CLI. Publishing the code triggers the existing deployment workflows.

CI, GitHub Pages, the showcase sync, and Vercel succeeded for the launch push.
