import { mkdir, copyFile, cp, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { renderSvg, THEMES } from '../src/svg.js';
import { bundle } from './bundle.mjs';
import { build as buildAssets } from 'esbuild';
import { GALLERY } from '../src/gallery.js';
import { COMMUNITY_REPOS } from '../src/community.js';
import './sync-showcase.mjs';
await mkdir('assets/gallery', { recursive: true });
for (const example of GALLERY)
  await writeFile(`assets/gallery/${example.id}.svg`, renderSvg(example.config));
console.log(
  `Generated ${GALLERY.length} gallery previews and validated ${COMMUNITY_REPOS.length} community repositories.`,
);
await bundle();
const dist = resolve('dist');
if (dirname(dist) !== process.cwd())
  throw new Error('Build output must be inside the project directory.');
await rm(dist, { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await buildAssets({ entryPoints: ['src/style.css'], outfile: 'dist/src/style.css', minify: true });
await cp('assets', 'dist/assets', { recursive: true });
await copyFile('THIRD_PARTY_LICENSES.md', 'dist/THIRD_PARTY_LICENSES.md');
await writeFile('dist/.nojekyll', '');
await mkdir('examples', { recursive: true });
for (const theme of Object.keys(THEMES))
  await writeFile(`examples/${theme}.svg`, renderSvg({ theme }));
for (const preset of ['release', 'review', 'parallel'])
  await writeFile(
    `examples/${preset}.svg`,
    renderSvg({
      preset,
      title:
        preset === 'release'
          ? 'Release pipeline'
          : preset === 'review'
            ? 'Review loop'
            : 'Parallel checks',
      theme: 'github',
      duration: 12,
    }),
  );
console.log('Built static site in dist/. Ready for GitHub Pages.');
