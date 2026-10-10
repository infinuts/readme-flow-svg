let pending;

// A classic script keeps optional font loading compatible with file:// pages.
export function loadFontEngine() {
  if (window.ReadmeFlowFonts) return Promise.resolve(window.ReadmeFlowFonts);
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL('./src/font-engine.js', document.baseURI).href;
    script.onload = () => resolve(window.ReadmeFlowFonts);
    script.onerror = () => {
      pending = undefined;
      script.remove();
      reject(new Error('Could not load the font engine. Check your connection and retry.'));
    };
    document.head.append(script);
  });
  return pending;
}
