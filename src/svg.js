// Outline icons adapted from Tabler Icons (MIT). https://tabler.io/icons
export const ICONS = {
  upload: '<path d="M12 16V4m-4 4 4-4 4 4M4 16v4h16v-4"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  compress: '<path d="M4 8h16M4 16h16m-8-9V3m-3 1 3 3 3-3m-3 13v4m-3-1 3-3 3 3"/>',
  download: '<path d="M12 4v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  request: '<path d="m7 7-4 5 4 5m10-10 4 5-4 5m-4-14-2 18"/>',
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-5"/>',
  process: '<path d="M4 7h16M4 12h16M4 17h16M8 5v4m8 1v4M9 15v4"/>',
  response: '<path d="M5 5h14v14H5zM8 9h8m-8 4h5"/>',
  code: '<path d="m7 7-4 5 4 5m10-10 4 5-4 5m-4-14-2 18"/>',
  test: '<path d="m9 3 0 6-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M7 15h10"/>',
  build: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
  deploy: '<path d="M12 3c5 3 7 8 7 13l-4-2-3 3-3-3-4 2c0-5 2-10 7-13ZM9 19l3 3 3-3"/><circle cx="12" cy="9" r="2"/>',
  file: '<path d="M14 3H6v18h12V7l-4-4Zm0 0v5h4M9 12h6m-6 4h4"/>',
  link: '<path d="m10 14 4-4m-5 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0-1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="m7 4 14 8-14 8V4Z"/>',
  reset: '<path d="M4 10a8 8 0 1 1 2 8M4 4v6h6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  grip: '<circle cx="9" cy="5" r=".7"/><circle cx="15" cy="5" r=".7"/><circle cx="9" cy="12" r=".7"/><circle cx="15" cy="12" r=".7"/><circle cx="9" cy="19" r=".7"/><circle cx="15" cy="19" r=".7"/>'
};
export const PRESETS = {
  files: {name:'File processing', steps:['Upload','Validate','Compress','Download'], icons:['upload','shield','compress','download']},
  api: {name:'API request', steps:['Request','Authenticate','Process','Response'], icons:['request','shield','process','response']},
  deploy: {name:'Deployment', steps:['Commit','Test','Build','Deploy'], icons:['code','test','build','deploy']}
};
export const STEP_ICONS = {
  file:'File',upload:'Upload',shield:'Shield',check:'Check',compress:'Compress',
  download:'Download',request:'Request',process:'Process',response:'Response',
  code:'Code',test:'Test',build:'Build',deploy:'Deploy'
};
export const THEMES = {
  light:{background:'#ffffff',card:'#ffffff',border:'#dce3df',text:'#293c34',muted:'#8b9891',accent:'#21845a',tint:'#eef8f1',line:'#d5dfd8'},
  dark:{background:'#151c20',card:'#1e292f',border:'#34464e',text:'#e1ebe6',muted:'#8caaa0',accent:'#62d39b',tint:'#223e32',line:'#34464e'},
  terminal:{background:'#101a14',card:'#14231a',border:'#2a4534',text:'#bce8cb',muted:'#70997b',accent:'#8aeb9f',tint:'#253c2c',line:'#32533b'}
};
export function escapeXml(value) {
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
}
export function normalizeConfig(raw={}) {
  const preset=Object.hasOwn(PRESETS,raw.preset)?raw.preset:'files';
  const steps=Array.isArray(raw.steps)?raw.steps.slice(0,6).map(s=>String(s).trim().slice(0,32)):PRESETS[preset].steps.slice();
  while(steps.length<3) steps.push('Step '+(steps.length+1));
  const icons=steps.map((_,i)=>{
    const selected=Array.isArray(raw.icons)?raw.icons[i]:undefined;
    return Object.hasOwn(STEP_ICONS,selected)?selected:PRESETS[preset].icons[i]||'file';
  });
  return {preset,steps:steps.map((s,i)=>s||'Step '+(i+1)),icons,theme:Object.hasOwn(THEMES,raw.theme)?raw.theme:'light',traveler:raw.traveler==='file'?'file':'dot',duration:Math.max(2,Math.min(10,Number(raw.duration)||6))};
}
export function renderSvg(raw={},paused=false) {
  const c=normalizeConfig(raw), t=THEMES[c.theme], n=c.steps.length, gap=172, width=gap*(n-1)+164, x0=82, y=156;
  const font=c.theme==='terminal'?'monospace':'-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
  const motion=Array.from({length:n},(_,i)=>{
    const start=i/n*100,end=(i+.38)/n*100,x=i*gap;
    return `${start.toFixed(3)}%,${end.toFixed(3)}%{transform:translateX(${x}px)}`;
  }).join('')+`100%{transform:translateX(${(n-1)*gap}px)}`;
  const nodes=c.steps.map((label,i)=>{
    const x=x0+i*gap, start=i/n*100, end=(i+1)/n*100;
    const inactive=`fill:${t.card};stroke:${t.border}`,active=`fill:${t.tint};stroke:${t.accent}`;
    const keys=i===0?`0%,${(end-.01).toFixed(3)}%{${active}}${end.toFixed(3)}%,100%{${inactive}}`:`0%,${(start-.01).toFixed(3)}%,${end.toFixed(3)}%,100%{${inactive}}${start.toFixed(3)}%,${(end-.01).toFixed(3)}%{${active}}`;
    const icon=ICONS[c.icons[i]];
    return `<style>@keyframes stage${i}{${keys}}</style><g><rect class="stage" style="animation-name:stage${i}" x="${x-59}" y="43" width="118" height="95" rx="12" fill="${t.card}" stroke="${t.border}"/><text x="${x-45}" y="62" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text><g transform="translate(${x-12} 65)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon}</g><text x="${x}" y="116" fill="${t.text}" text-anchor="middle" font-size="12" font-weight="500"${label.length>15?' textLength="102" lengthAdjust="spacingAndGlyphs"':''}>${escapeXml(label)}</text><circle cx="${x}" cy="${y}" r="3" fill="${t.line}"/></g>`;
  }).join('');
  const connectors=Array.from({length:n-1},(_,i)=>{const x=x0+i*gap;return `<path d="M${x+64} 91h43m-5-4 5 4-5 4" stroke="${t.line}" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;}).join('');
  const traveler=c.traveler==='file'?`<g transform="translate(${x0-9} ${y-12})"><rect x="-4" y="-3" width="26" height="29" rx="6" fill="${t.tint}"/><g fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" transform="scale(.75)">${ICONS.file}</g></g>`:`<circle cx="${x0}" cy="${y}" r="9" fill="${t.accent}" opacity=".13"/><circle cx="${x0}" cy="${y}" r="4.5" fill="${t.accent}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="204" viewBox="0 0 ${width} 204" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.steps.join(' → '))}</title><desc id="desc">An animated ${escapeXml(PRESETS[c.preset].name.toLowerCase())} workflow with ${n} steps.</desc><style>text{font-family:${font}}.stage,.traveler{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.traveler{animation-name:travel}@keyframes travel{${motion}}@media(prefers-reduced-motion:reduce){.stage,.traveler{animation:none}}</style><rect width="${width}" height="204" rx="16" fill="${t.background}"/><path d="M${x0} ${y}H${x0+(n-1)*gap}" stroke="${t.line}" stroke-width="1.5"/>${connectors}${nodes}<g class="traveler">${traveler}</g></svg>`;
}
