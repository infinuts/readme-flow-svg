// Run before styles load to avoid a flash of the wrong saved theme.
(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    preference = localStorage.getItem('readme-flow-appearance') || 'system';
  } catch {
    /* Storage is optional. */
  }
  if (!['system', 'light', 'dark'].includes(preference)) preference = 'system';
  function apply() {
    const dark = preference === 'dark' || (preference === 'system' && system.matches);
    root.dataset.appearance = dark ? 'dark' : 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta instanceof HTMLMetaElement) meta.content = dark ? '#141d19' : '#f6f8f5';
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('appearance');
    if (!(select instanceof HTMLSelectElement)) return;
    select.value = preference;
    select.addEventListener('change', () => {
      preference = select.value;
      try {
        localStorage.setItem('readme-flow-appearance', preference);
      } catch {
        /* Storage is optional. */
      }
      apply();
    });
  });
})();
