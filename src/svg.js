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
  ai: {name:'AI inference',description:'From a prompt to an answer.',steps:['Input','Tokenize','Infer','Output'],icons:['message','process','sparkles','response']},
  release:{name:'Release pipeline',description:'Build, verify, and roll out a release.',steps:['Commit','Lint','Test','Build','Package','Stage','Approve','Deploy','Monitor'],icons:['code','check','test','build','file','database','shield','deploy','response'],layout:'snake',columns:3},
  review:{name:'Review loop',description:'Review changes and send feedback.',steps:['Draft','Review','Revise','Approve','Publish','Measure'],icons:['file','shield','code','check','upload','response'],layout:'snake',columns:3,connections:[{from:0,to:1},{from:1,to:2,label:'Changes'},{from:2,to:1,label:'Retry'},{from:1,to:3,label:'Approved'},{from:3,to:4},{from:4,to:5}]},
  parallel:{name:'Parallel checks',description:'Split the work, then merge the results.',steps:['Commit','Unit tests','Lint','Build','Deploy','Monitor'],icons:['code','test','check','build','deploy','response'],layout:'grid',columns:3,connections:[{from:0,to:1},{from:0,to:2},{from:1,to:3},{from:2,to:3},{from:3,to:4},{from:4,to:5}]}
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
export const LAYOUTS={horizontal:'Horizontal',vertical:'Vertical',snake:'Snake / multiple rows',grid:'Grid'};
export const FONTS={sans:'Sans serif',mono:'Monospace',serif:'Serif',google:'Google Fonts'};
export const validFontFamily=value=>typeof value==='string'&&/^[\p{L}\p{N}][\p{L}\p{N} .-]{0,79}$/u.test(value.trim());
const bounded=(value,min,max,fallback)=>Number.isFinite(Number(value))?Math.max(min,Math.min(max,Number(value))):fallback;
export function normalizeConfig(raw={}) {
  const preset=Object.hasOwn(PRESETS,raw.preset)?raw.preset:'files';
  const steps=Array.isArray(raw.steps)?raw.steps.slice(0,12).map(s=>String(s).trim().slice(0,32)):PRESETS[preset].steps.slice();
  while(steps.length<3) steps.push('Step '+(steps.length+1));
  const icons=steps.map((_,i)=>{
    const selected=Array.isArray(raw.icons)?raw.icons[i]:undefined;
    return Object.hasOwn(STEP_ICONS,selected)?selected:PRESETS[preset].icons[i]||'file';
  });
  const edges=[],seen=new Set();
  for(const edge of (Array.isArray(raw.connections)?raw.connections:PRESETS[preset].connections||[]).slice(0,24)) {
    if(!edge||!Number.isInteger(edge.from)||!Number.isInteger(edge.to)||edge.from<0||edge.to<0||edge.from>=steps.length||edge.to>=steps.length||edge.from===edge.to)continue;
    const key=edge.from+':'+edge.to;if(seen.has(key))continue;seen.add(key);
    edges.push({from:edge.from,to:edge.to,label:String(edge.label||'').slice(0,24)});
  }
  return {preset,steps:steps.map((s,i)=>s||'Step '+(i+1)),icons,theme:raw.theme==='custom'||Object.hasOwn(THEMES,raw.theme)?raw.theme:'light',customTheme:normalizePalette(raw.customTheme),traveler:Object.hasOwn(TRAVELERS,raw.traveler)?raw.traveler:'dot',duration:Math.max(2,Math.min(30,Number(raw.duration)||6)),
    title:String(raw.title||'').slice(0,80),subtitle:String(raw.subtitle||'').slice(0,140),layout:Object.hasOwn(LAYOUTS,raw.layout)?raw.layout:PRESETS[preset].layout||'horizontal',columns:Math.round(bounded(raw.columns??PRESETS[preset].columns??3,2,6,3)),
    connectionMode:(raw.connectionMode??(PRESETS[preset].connections?'custom':'sequential'))==='custom'?'custom':'sequential',connections:edges,routing:['curved','elbow','straight'].includes(raw.routing)?raw.routing:'curved',lineStyle:['solid','dashed','dotted'].includes(raw.lineStyle)?raw.lineStyle:'solid',lineWidth:bounded(raw.lineWidth??1.5,1,4,1.5),arrows:raw.arrows!==false,
    spacing:bounded(raw.spacing??54,32,120,54),radius:bounded(raw.radius??12,0,24,12),font:Object.hasOwn(FONTS,raw.font)?raw.font:'sans',googleFont:validFontFamily(raw.googleFont)?raw.googleFont.trim():'Roboto',fontWeight:Math.round(bounded(raw.fontWeight??400,100,900,400)),positions:Array.isArray(raw.positions)&&raw.positions.some(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y))?steps.map((_,i)=>{const p=raw.positions[i];return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?{x:Math.round(bounded(p.x,70,2500,70)),y:Math.round(bounded(p.y,60,2100,60))}:null;}):[],canvasSize:raw.canvasSize&&Number.isFinite(raw.canvasSize.width)&&Number.isFinite(raw.canvasSize.height)?{width:Math.round(bounded(raw.canvasSize.width,220,2600,680)),height:Math.round(bounded(raw.canvasSize.height,204,2200,420))}:null,showNumbers:raw.showNumbers!==false,transparent:raw.transparent===true,travelerSize:bounded(raw.travelerSize??1,.6,1.8,1)};
}
function renderClassicSvg(raw={},paused=false) {
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
    return `<style>@keyframes stage${i}{${keys}}</style><g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${x-59}" y="43" width="118" height="95" rx="12" fill="${t.card}" stroke="${t.border}"/><text x="${x-45}" y="62" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text><g transform="translate(${x-12} 65)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon}</g><text x="${x}" y="116" fill="${t.text}" text-anchor="middle" font-size="12" font-weight="500"${label.length>15?' textLength="102" lengthAdjust="spacingAndGlyphs"':''}>${escapeXml(label)}</text><circle cx="${x}" cy="${y}" r="3" fill="${t.line}"/></g>`;
  }).join('');
  const connectors=Array.from({length:n-1},(_,i)=>{const x=x0+i*gap;return `<path d="M${x+64} 91h43m-5-4 5 4-5 4" stroke="${t.line}" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;}).join('');
  const traveler=c.traveler==='dot'?`<circle class="dot-halo animated" cx="${x0}" cy="${y}" r="9" fill="${t.accent}" opacity=".13"/><circle cx="${x0}" cy="${y}" r="4.5" fill="${t.accent}"/>`:`<g transform="translate(${x0-12} ${y-12})"><rect x="-2" y="-2" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(3 3) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="204" viewBox="0 0 ${width} 204" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.steps.join(' → '))}</title><desc id="desc">An animated ${escapeXml(PRESETS[c.preset].name.toLowerCase())} workflow with ${n} steps.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.traveler{animation-name:travel;animation-timing-function:cubic-bezier(.45,0,.2,1)}.dot-halo{animation-name:dotPulse;animation-duration:1.6s;animation-timing-function:ease-out}@keyframes travel{${motion}}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}@media(prefers-reduced-motion:reduce){.animated{animation:none}}</style><rect width="${width}" height="204" rx="16" fill="${t.background}"/><path d="M${x0} ${y}H${x0+(n-1)*gap}" stroke="${t.line}" stroke-width="1.5"/>${connectors}${nodes}<g class="traveler animated" data-element="${c.traveler}">${traveler}</g></svg>`;
}

export function workflowGeometry(raw={}) {
  const c=normalizeConfig(raw),n=c.steps.length,cols=c.layout==='vertical'?1:c.layout==='horizontal'?n:Math.min(c.columns,n),rows=Math.ceil(n/cols);
  const header=(c.title?38:0)+(c.subtitle?48:0),width=Math.max(c.title||c.subtitle?400:220,cols*118+(cols-1)*c.spacing+96),height=rows*96+(rows-1)*c.spacing+96+header;
  const left=(width-(cols*118+(cols-1)*c.spacing))/2;
  const nodes=c.steps.map((_,i)=>{const row=Math.floor(i/cols),col=c.layout==='snake'&&row%2?cols-1-i%cols:i%cols;return {x:left+59+col*(118+c.spacing),y:header+96+row*(96+c.spacing)};});
  const edges=c.connectionMode==='custom'?c.connections:Array.from({length:n-1},(_,i)=>({from:i,to:i+1,label:''}));
  for(let i=0;i<n;i++)if(c.positions[i])nodes[i]={x:c.positions[i].x,y:Math.max(header+60,c.positions[i].y)};
  return {width:c.positions.length?Math.max(c.canvasSize?.width||width,...nodes.map(p=>p.x+80)):width,height:c.positions.length?Math.max(c.canvasSize?.height||height,...nodes.map(p=>p.y+70)):height,header,nodes,edges};
}
function curveBetween(a,b,c,g) {
  const horizontal=a.y===b.y,sign=(horizontal?Math.sign(b.x-a.x):Math.sign(b.y-a.y))||1;
  const start=horizontal?{x:a.x+sign*60,y:a.y}:{x:a.x,y:a.y+sign*49};
  const end=horizontal?{x:b.x-sign*60,y:b.y}:{x:b.x,y:b.y-sign*49};
  if(g.edges.some(e=>g.nodes[e.from]===b&&g.nodes[e.to]===a)){if(horizontal){start.y-=sign*12;end.y-=sign*12;}else{start.x+=sign*12;end.x+=sign*12;}}
  let points=[start,end];
  if(c.routing!=='straight'){
    const outerStart=horizontal?{x:start.x+sign*10,y:start.y}:{x:start.x,y:start.y+sign*10};
    const outerEnd=horizontal?{x:end.x-sign*10,y:end.y}:{x:end.x,y:end.y-sign*10};
    const xs=[...new Set([20,g.width-20,outerStart.x,outerEnd.x,...g.nodes.flatMap(p=>[p.x-70,p.x,p.x+70])])].sort((a,b)=>a-b);
    const ys=[...new Set([g.header+18,g.height-18,outerStart.y,outerEnd.y,...g.nodes.flatMap(p=>[p.y-60,p.y,p.y+60])])].sort((a,b)=>a-b);
    const clear=(p,q)=>!g.nodes.some(node=>Math.max(p.x,q.x)>node.x-65&&Math.min(p.x,q.x)<node.x+65&&Math.max(p.y,q.y)>node.y-54&&Math.min(p.y,q.y)<node.y+54);
    const first=ys.indexOf(outerStart.y)*xs.length+xs.indexOf(outerStart.x),last=ys.indexOf(outerEnd.y)*xs.length+xs.indexOf(outerEnd.x);
    const point=id=>({x:xs[id%xs.length],y:ys[Math.floor(id/xs.length)]});
    const cost=new Map([[first,0]]),previous=new Map(),open=[first],closed=new Set();
    while(open.length){
      open.sort((a,b)=>{const pa=point(a),pb=point(b);return cost.get(a)+Math.abs(pa.x-outerEnd.x)+Math.abs(pa.y-outerEnd.y)-cost.get(b)-Math.abs(pb.x-outerEnd.x)-Math.abs(pb.y-outerEnd.y);});
      const current=open.shift();if(current===last)break;if(closed.has(current))continue;closed.add(current);
      const x=current%xs.length,y=Math.floor(current/xs.length),p=point(current);
      for(const [nx,ny]of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){
        if(nx<0||ny<0||nx>=xs.length||ny>=ys.length)continue;
        const next=ny*xs.length+nx,q=point(next);if(!clear(p,q))continue;
        const candidate=cost.get(current)+Math.abs(q.x-p.x)+Math.abs(q.y-p.y);
        if(candidate<(cost.get(next)??Infinity)){cost.set(next,candidate);previous.set(next,current);open.push(next);}
      }
    }
    if(previous.has(last)||first===last){const route=[point(last)];let id=last;while(id!==first){id=previous.get(id);route.push(point(id));}points=[start,...route.reverse(),end];}
  }
  points=points.filter((p,i)=>i===0||p.x!==points[i-1].x||p.y!==points[i-1].y);
  points=points.filter((p,i)=>!i||i===points.length-1||!((points[i-1].x===p.x&&p.x===points[i+1].x)||(points[i-1].y===p.y&&p.y===points[i+1].y)));
  let path=`M${start.x} ${start.y}`,samples=[start];
  const lerp=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}),distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  for(let i=1;i<points.length;i++){
    const p=points[i];
    if(c.routing==='curved'&&i<points.length-1){
      const previous=points[i-1],next=points[i+1],r=Math.min(12,distance(previous,p)/2,distance(p,next)/2),entry=lerp(p,previous,r/distance(p,previous)),exit=lerp(p,next,r/distance(p,next));
      path+=`L${entry.x} ${entry.y}Q${p.x} ${p.y} ${exit.x} ${exit.y}`;samples.push(entry);
      for(let j=1;j<=8;j++){const t=j/8;samples.push(lerp(lerp(entry,p,t),lerp(p,exit,t),t));}
    }else {path+=`L${p.x} ${p.y}`;samples.push(p);}
  }
  const lengths=[0];for(let i=1;i<samples.length;i++)lengths.push(lengths[i-1]+distance(samples[i-1],samples[i]));
  const at=t=>{const d=t*lengths.at(-1);for(let i=1;i<samples.length;i++)if(d<=lengths[i])return lerp(samples[i-1],samples[i],(d-lengths[i-1])/(lengths[i]-lengths[i-1]||1));return end;};
  const before=points.at(-2);
  return {path,at,end,angle:Math.atan2(end.y-before.y,end.x-before.x)*180/Math.PI};
}
function renderWorkflowSvg(raw={},paused=false) {
  const c=normalizeConfig(raw);
  if(!c.positions.length&&c.steps.length<=6&&!c.title&&!c.subtitle&&c.layout==='horizontal'&&c.connectionMode==='sequential'&&c.routing==='curved'&&c.lineStyle==='solid'&&c.lineWidth===1.5&&c.arrows&&c.spacing===54&&c.radius===12&&c.font==='sans'&&c.showNumbers&&!c.transparent&&c.travelerSize===1)return renderClassicSvg(c,paused);
  const t=c.theme==='custom'?c.customTheme:THEMES[c.theme],g=workflowGeometry(c),m=g.edges.length;
  const font=c.font==='mono'||(c.font==='sans'&&c.theme==='terminal')?'monospace':c.font==='serif'?'Georgia, serif':'-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
  const fit=(text,width,size)=>text.length*size*.6>width?` textLength="${width}" lengthAdjust="spacingAndGlyphs"`:'';
  const text=(value,x,y,size,weight=400)=>`<text x="${x}" y="${y}" fill="${t.text}" font-size="${size}" font-weight="${weight}"${fit(value,g.width-80,size)}>${escapeXml(value)}</text>`;
  const heading=(c.title?text(c.title,40,43,22,600):'')+(c.subtitle?text(c.subtitle.slice(0,70),40,c.title?70:40,12)+(c.subtitle.length>70?text(c.subtitle.slice(70),40,c.title?88:58,12):''):'');
  let styles='';
  const nodes=g.nodes.map((p,i)=>{
    const events=[];g.edges.forEach((e,k)=>{if(e.from===i)events.push([k/m*100,(k+.24)/m*100]);if(e.to===i)events.push([(k+.7)/m*100,(k+.99)/m*100]);});
    const active=`fill:${t.tint};stroke:${t.accent}`,inactive=`fill:${t.card};stroke:${t.border}`;
    const keys=new Map([[0,inactive],[100,inactive]]);for(const [start,end]of events){if(start>0)keys.set(Math.max(0,start-.01),inactive);keys.set(start,active);keys.set(end,active);keys.set(Math.min(100,end+.01),inactive);}
    styles+=`@keyframes stage${i}{${[...keys].sort((a,b)=>a[0]-b[0]).map(([time,value])=>`${time.toFixed(3)}%{${value}}`).join('')}}`;
    return `<g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${p.x-59}" y="${p.y-48}" width="118" height="96" rx="${c.radius}" fill="${t.card}" stroke="${t.border}"/>${c.showNumbers?`<text x="${p.x-45}" y="${p.y-29}" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text>`:''}<g transform="translate(${p.x-12} ${p.y-26})" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[c.icons[i]]}</g><text x="${p.x}" y="${p.y+25}" text-anchor="middle" fill="${t.text}" font-size="12" font-weight="500"${fit(c.steps[i],102,12)}>${escapeXml(c.steps[i])}</text></g>`;
  }).join('');
  const dash=c.lineStyle==='dashed'?' stroke-dasharray="7 5"':c.lineStyle==='dotted'?' stroke-dasharray="1 5"':'';
  let travelers='';
  const connectors=g.edges.map((edge,i)=>{
    const curve=curveBetween(g.nodes[edge.from],g.nodes[edge.to],c,g),mid=curve.at(.5),start=i/m*100,end=(i+.95)/m*100;
    const samples=Array.from({length:33},(_,j)=>{const p=curve.at(j/32);return `${(start+(end-start)*j/32).toFixed(4)}%{transform:translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px);opacity:${j===0||j===32?0:1}}`;}).join('');
    styles+=`@keyframes travel${i}{0%,100%{opacity:0}${samples}}`;
    const element=c.traveler==='dot'?`<circle class="dot-halo animated" r="9" fill="${t.accent}" opacity=".13"/><circle r="4.5" fill="${t.accent}"/>`:`<rect x="-14" y="-14" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(-9 -9) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g>`;
    travelers+=`<g class="traveler animated" data-element="${c.traveler}" style="animation-name:travel${i};opacity:0"><g transform="scale(${c.travelerSize})">${element}</g></g>`;
    return `<g data-connection="${edge.from}-${edge.to}"><path d="${curve.path}" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round"${dash}/>${c.arrows?`<path d="M-7-4 0 0-7 4" transform="translate(${curve.end.x} ${curve.end.y}) rotate(${curve.angle})" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round" stroke-linejoin="round"/>`:''}${edge.label?`<text x="${mid.x}" y="${mid.y-9}" text-anchor="middle" fill="${t.muted}" stroke="${c.transparent?t.card:t.background}" stroke-width="4" paint-order="stroke" font-size="10">${escapeXml(edge.label)}</text>`:''}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${g.width}" height="${g.height}" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.title||c.steps.join(' → '))}</title><desc id="desc">${escapeXml(c.subtitle||'Animated workflow: '+c.steps.join(', '))}. ${g.edges.map(e=>escapeXml(c.steps[e.from]+' to '+c.steps[e.to]+(e.label?' ('+e.label+')':''))).join('; ')}.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.dot-halo{animation-name:dotPulse;animation-duration:1.6s}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}${styles}@media(prefers-reduced-motion:reduce){.animated{animation:none}.traveler{display:none}}</style>${c.transparent?'':`<rect width="${g.width}" height="${g.height}" rx="16" fill="${t.background}"/>`}${heading}${connectors}${nodes}${travelers}</svg>`;
}
export function renderSvg(raw={},paused=false) {
  const c=normalizeConfig(raw);let hash=2166136261;
  for(const char of JSON.stringify(c))hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
  const suffix='_'+hash.toString(36),names=/\b(stage\d+|travel\d*|dotPulse)\b/g;
  return renderWorkflowSvg(c,paused).replace(/<style>([\s\S]*?)<\/style>/g,(_,css)=>'<style>'+css.replace(names,name=>name+suffix)+'</style>').replace(/style="animation-name:(stage\d+|travel\d*)/g,(_,name)=>'style="animation-name:'+name+suffix);
}
