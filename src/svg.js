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
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  key: '<circle cx="8" cy="8" r="4"/><path d="m11 11 10 10m-5-5 3-3m-6 0 3-3"/>',
  message: '<path d="M4 4h16v12H9l-5 4V4Zm4 4h8m-8 4h5"/>',
  sparkles: '<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3ZM20 2v4m-2-2h4"/>',
  heart: '<path d="M12 20 4.5 12.5a5 5 0 1 1 7.5-6 5 5 0 1 1 7.5 6L12 20Z"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18h1a2 2 0 0 0 1-4c-1-1 0-3 2-3h2a3 3 0 0 0 3-3 9 9 0 0 0-9-8Z"/><circle cx="7.5" cy="10" r=".7"/><circle cx="10" cy="6.5" r=".7"/><circle cx="15" cy="7" r=".7"/>',
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
  files: {name:'File processing',description:'A file’s journey, made visible.',steps:['Upload','Validate','Compress','Download'],icons:['upload','shield','compress','download']},
  api: {name:'API request',description:'From request to response.',steps:['Request','Authenticate','Process','Response'],icons:['request','shield','process','response']},
  deploy: {name:'Deployment',description:'From your machine to the world.',steps:['Commit','Test','Build','Deploy'],icons:['code','test','build','deploy']},
  data: {name:'Data pipeline',description:'Turn raw data into something useful.',steps:['Collect','Validate','Transform','Store'],icons:['download','shield','process','database']},
  auth: {name:'Authentication',description:'Follow a secure sign-in.',steps:['Sign in','Verify','Authorize','Session'],icons:['key','check','shield','lock']},
  ai: {name:'AI inference',description:'From a prompt to an answer.',steps:['Input','Tokenize','Infer','Output'],icons:['message','process','sparkles','response']}
};
export const STEP_ICONS = {
  file:'File',upload:'Upload',shield:'Shield',check:'Check',compress:'Compress',
  download:'Download',request:'Request',process:'Process',response:'Response',
  code:'Code',test:'Test',build:'Build',deploy:'Deploy',database:'Database',lock:'Lock',
  key:'Key',message:'Message',sparkles:'Sparkles',heart:'Heart',bolt:'Lightning'
};
export const TRAVELERS = {
  dot:{name:'Dot',icon:null},file:{name:'File',icon:'file'},rocket:{name:'Rocket',icon:'deploy'},
  package:{name:'Package',icon:'build'},code:{name:'Code',icon:'code'},spark:{name:'Spark',icon:'sparkles'},
  heart:{name:'Heart',icon:'heart'},bolt:{name:'Lightning',icon:'bolt'}
};
export const THEMES = {
  light:{background:'#ffffff',card:'#ffffff',border:'#dce3df',text:'#293c34',muted:'#8b9891',accent:'#21845a',tint:'#eef8f1',line:'#d5dfd8'},
  dark:{background:'#151c20',card:'#1e292f',border:'#34464e',text:'#e1ebe6',muted:'#8caaa0',accent:'#62d39b',tint:'#223e32',line:'#34464e'},
  terminal:{background:'#101a14',card:'#14231a',border:'#2a4534',text:'#bce8cb',muted:'#70997b',accent:'#8aeb9f',tint:'#253c2c',line:'#32533b'},
  github:{background:'#f6f8fa',card:'#ffffff',border:'#d1d9e0',text:'#1f2328',muted:'#656d76',accent:'#0969da',tint:'#ddf4ff',line:'#afb8c1'},
  ocean:{background:'#082c38',card:'#103d4c',border:'#2b5866',text:'#ddf5f7',muted:'#87b1bb',accent:'#58d6db',tint:'#175361',line:'#386674'},
  sunset:{background:'#fffbf7',card:'#fffdfa',border:'#ead8c8',text:'#593b30',muted:'#aa8a75',accent:'#c96735',tint:'#ffefdf',line:'#e4c9b2'}
};
export const THEME_LABELS = {light:'Light',dark:'Dark',terminal:'Terminal',github:'GitHub',ocean:'Ocean',sunset:'Sunset'};
export const THEME_FIELDS = {background:'Background',card:'Cards',text:'Labels',accent:'Accent',border:'Borders',tint:'Active stage',muted:'Step numbers',line:'Connections'};
export function normalizePalette(raw={}) {
  return Object.fromEntries(Object.keys(THEME_FIELDS).map(key=>{
    let color=typeof raw?.[key]==='string'?raw[key]:'';
    if(!/^#[a-f0-9]{3}([a-f0-9]{3})?$/i.test(color))color=THEMES.light[key];
    if(color.length===4)color='#'+Array.from(color.slice(1),c=>c+c).join('');
    return [key,color.toLowerCase()];
  }));
}
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
  return {preset,steps:steps.map((s,i)=>s||'Step '+(i+1)),icons,theme:raw.theme==='custom'||Object.hasOwn(THEMES,raw.theme)?raw.theme:'light',customTheme:normalizePalette(raw.customTheme),traveler:Object.hasOwn(TRAVELERS,raw.traveler)?raw.traveler:'dot',duration:Math.max(2,Math.min(10,Number(raw.duration)||6))};
}
export function renderSvg(raw={},paused=false) {
  const c=normalizeConfig(raw), t=c.theme==='custom'?c.customTheme:THEMES[c.theme], n=c.steps.length, gap=172, width=gap*(n-1)+164, x0=82, y=156;
  const font=c.theme==='terminal'?'monospace':'-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
  const motion=Array.from({length:n},(_,i)=>{
    const start=i/n*100,end=(i+.28)/n*100,x=i*gap;
    return `${start.toFixed(3)}%,${end.toFixed(3)}%{transform:translateX(${x}px)}`;
  }).join('')+`0%{opacity:0}2%,94%{opacity:1}100%{transform:translateX(${(n-1)*gap}px);opacity:0}`;
  const nodes=c.steps.map((label,i)=>{
    const x=x0+i*gap, start=i/n*100, end=(i+1)/n*100;
    const inactive=`fill:${t.card};stroke:${t.border}`,active=`fill:${t.tint};stroke:${t.accent}`;
    const keys=i===0?`0%,${(end-.01).toFixed(3)}%{${active}}${end.toFixed(3)}%,100%{${inactive}}`:`0%,${(start-.01).toFixed(3)}%,${end.toFixed(3)}%,100%{${inactive}}${start.toFixed(3)}%,${(end-.01).toFixed(3)}%{${active}}`;
    const icon=ICONS[c.icons[i]];
    return `<style>@keyframes stage${i}{${keys}}</style><g><rect class="stage animated" style="animation-name:stage${i}" x="${x-59}" y="43" width="118" height="95" rx="12" fill="${t.card}" stroke="${t.border}"/><text x="${x-45}" y="62" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text><g transform="translate(${x-12} 65)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon}</g><text x="${x}" y="116" fill="${t.text}" text-anchor="middle" font-size="12" font-weight="500"${label.length>15?' textLength="102" lengthAdjust="spacingAndGlyphs"':''}>${escapeXml(label)}</text><circle cx="${x}" cy="${y}" r="3" fill="${t.line}"/></g>`;
  }).join('');
  const connectors=Array.from({length:n-1},(_,i)=>{const x=x0+i*gap;return `<path d="M${x+64} 91h43m-5-4 5 4-5 4" stroke="${t.line}" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;}).join('');
  const traveler=c.traveler==='dot'?`<circle class="dot-halo animated" cx="${x0}" cy="${y}" r="9" fill="${t.accent}" opacity=".13"/><circle cx="${x0}" cy="${y}" r="4.5" fill="${t.accent}"/>`:`<g transform="translate(${x0-12} ${y-12})"><rect x="-2" y="-2" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(3 3) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="204" viewBox="0 0 ${width} 204" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.steps.join(' → '))}</title><desc id="desc">An animated ${escapeXml(PRESETS[c.preset].name.toLowerCase())} workflow with ${n} steps.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.traveler{animation-name:travel;animation-timing-function:cubic-bezier(.45,0,.2,1)}.dot-halo{animation-name:dotPulse;animation-duration:1.6s;animation-timing-function:ease-out}@keyframes travel{${motion}}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}@media(prefers-reduced-motion:reduce){.animated{animation:none}}</style><rect width="${width}" height="204" rx="16" fill="${t.background}"/><path d="M${x0} ${y}H${x0+(n-1)*gap}" stroke="${t.line}" stroke-width="1.5"/>${connectors}${nodes}<g class="traveler animated" data-element="${c.traveler}">${traveler}</g></svg>`;
}
