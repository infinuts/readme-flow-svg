import { build } from 'esbuild';

// Classic scripts work on file:// as well as static hosts. Keep the renderer
// as an ES module for tests, and generate the browser copy from the same source.
export async function bundle() {
  await build({
    entryPoints: ['src/fonts.js'],
    outfile: 'src/font-engine.js',
    globalName: 'ReadmeFlowFonts',
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'es2022',
    minify: false,
    banner: {
      js: '// Generated from src/fonts.js by scripts/bundle.mjs (npm run build).\n// Includes fontkit and its dependencies; see THIRD_PARTY_LICENSES.md. Loaded only for Google Fonts.',
    },
  });
  await build({
    entryPoints: ['src/app.js'],
    outfile: 'src/browser.js',
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'es2022',
    minify: false,
    banner: {
      js: '// Generated from src/app.js by scripts/bundle.mjs (npm run build).\n// Edit the source modules; module paths below identify their contents.',
    },
  });
}
