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
device. No production deployment was performed.

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
rules. The new README/demo still needs its post-publish check. Renderer source,
URL codec, and the existing example SVGs were unchanged from the starting commit.

Follow-up checks: physical iOS/Android devices, a screen reader, production
Lighthouse/social cards, and the newly published README image. Type checking
currently covers the page-appearance and Markdown modules, not all legacy code.
