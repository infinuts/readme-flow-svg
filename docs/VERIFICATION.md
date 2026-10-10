# Verification — 2026-10-10

The website/repository polish was checked locally before publication.

| Check                                     | Result                                                         |
| ----------------------------------------- | -------------------------------------------------------------- |
| Clean install (`npm ci`)                  | Passed; audit reported no vulnerabilities                      |
| ESLint, incremental type checks, Prettier | Passed                                                         |
| Node regression tests                     | 23 passed                                                      |
| Static and API builds                     | Passed                                                         |
| Lighthouse mobile                         | Performance 95, accessibility 100, best practices 100, SEO 100 |
| Lighthouse desktop                        | 100 in all four categories                                     |
| Cumulative layout shift                   | 0 in both Lighthouse runs                                      |
| Axe WCAG A/AA checks                      | No violations in light or dark appearance                      |

Lighthouse used the local production build in Chrome with mobile/desktop presets.
These are lab measurements, not a guarantee about deployed performance or every
device. Production deployment was subsequently performed during the launch step; the
measurements above remain local lab results.

Browser automation exercised all presets, four layouts, seven SVG themes, custom
colors, six gallery examples, Markdown alt text, clipboard copy, SVG download,
hosted URLs, and editor-link round trips. The downloaded SVG matched the live
hosted response byte for byte for the tested configuration. Keyboard card movement,
dialog Escape/focus return, saved/system appearance, and reduced motion passed.
Layouts at 360, 390, 768, and 1440px had no document overflow. Screenshots were
visually reviewed; an interactive browser-control session was unavailable.

The editor loaded and changed presets offline through `file://`. Google Fonts
loaded on demand and produced outlined text over both HTTP and `file://` with an
internet connection. The font engine was absent from initial network requests.
Its failure/retry and concurrent-loading behavior has a regression test.

The existing live GitHub README's hosted and in-repo SVG images decoded
successfully. GitHub's cached hosted SVG retained CSS keyframes and reduced-motion
rules. The new README/demo was also verified after publication: GitHub serves the
`assets/demo.svg` image successfully with valid SVG, animation keyframes, and
reduced-motion rules. Renderer source,
URL codec, and the existing example SVGs were unchanged from the starting commit.

Follow-up checks: physical iOS/Android devices, a screen reader, production
Lighthouse, and social-card behavior on X. Type checking
currently covers the page-appearance and Markdown modules, not all legacy code.

## Launch verification

The launch push passed [CI](https://github.com/infinuts/readme-flow-svg/actions/runs/38090438255),
[GitHub Pages deployment](https://github.com/infinuts/readme-flow-svg/actions/runs/38090438287),
the showcase sync, and the Vercel deployment. Both public site origins returned
HTTP 200, Open Graph/Twitter metadata, and the expected 1200 × 630 social image.
Private vulnerability reporting was verified enabled, and `main` now requires the
GitHub Actions `check` status for non-bypass changes.

The GitHub repository's separate custom social-preview upload remains pending:
computer-use stopped because it could not reliably determine the browser URL.
Launch post drafts are prepared but have not been sent to X or Hacker News.
