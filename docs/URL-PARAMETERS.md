# URL parameter reference

## Image and editor links

```markdown
[![Workflow](https://readme-flow-svg.vercel.app/svg?steps=Upload;Validate;Compress;Download&theme=github&traveler=file)](https://readme-flow-svg.vercel.app/r)
```

`steps` accepts semicolon-separated labels or a JSON array. The generator encodes all options for you, including labels containing semicolons.

| Options                                               | Values                                                                                              |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `title`, `subtitle`                                   | Up to 80 and 140 characters                                                                         |
| `layout`, `columns`                                   | `horizontal`, `vertical`, `snake`, or `grid`; 2–6 columns                                           |
| `connectionMode`, `connections`                       | `sequential` or `custom`; up to 24 `{from, to, label}` objects                                      |
| `routing`, `lineStyle`                                | `curved`, `elbow`, or `straight`; `solid`, `dashed`, or `dotted`                                    |
| `lineWidth`, `arrows`                                 | 1–4; `true` or `false`                                                                              |
| `spacing`, `radius`                                   | 32–120 pixels; 0–24 pixels                                                                          |
| `font`, `showNumbers`, `transparent`                  | `sans`, `mono`, `serif`, or `google`; boolean flags                                                 |
| `googleFont`, `fontWeight`                            | Google Font family name; supported weight from 100–900                                              |
| `positions`, `canvasSize`                             | Array of `{x, y}` card centers (or `null` for automatic positions); `{width, height}` in SVG pixels |
| `duration`, `travelerSize`                            | 2–30 seconds; 0.6–1.8 scale                                                                         |
| `preset`, `theme`, `traveler`, `icons`, `customTheme` | Supported names from `/options`, an icon array, and a palette object                                |

For example: `/svg?preset=release&title=Release%20pipeline&layout=snake&columns=3&theme=github`. Existing links keep their original straight-line appearance when no new options are set.

The `/r` route redirects to this repository. Git.io stopped accepting new short links in 2022, so a new git.io alias isn't available. [GitHub's announcement](https://github.blog/changelog/2022-01-11-git-io-no-longer-accepts-new-urls/).
