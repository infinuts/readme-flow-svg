import { ICONS, PRESETS, TRAVELERS, THEMES } from './options.js';
import { normalizeConfig, workflowGeometry } from './config.js';
export * from './options.js';
export { normalizeConfig, normalizePalette, workflowGeometry, LAYOUTS, FONTS, validFontFamily } from './config.js';

export function escapeXml(value) {
  return String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g,'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
}
function cardLabel(value,x,y,color) {
  const chars=Array.from(value);
  if(chars.length<=14)return `<text x="${x}" y="${y}" fill="${color}" text-anchor="middle" font-size="12" font-weight="500">${escapeXml(value)}</text>`;
  const middle=Math.ceil(chars.length/2),breaks=chars.map((char,i)=>char===' '&&i>0&&i<chars.length-1?i:-1).filter(i=>i>0);
  const split=breaks.sort((a,b)=>Math.abs(a-middle)-Math.abs(b-middle))[0];
  const at=split!==undefined&&Math.max(split,chars.length-split-1)<=18?split:middle;
  const lines=[chars.slice(0,at).join('').trim(),chars.slice(at).join('').trim()],size=Math.min(12,102/(Math.max(...lines.map(line=>Array.from(line).length))*.6));
  return lines.map((line,i)=>`<text x="${x}" y="${y-7+i*15}" fill="${color}" text-anchor="middle" font-size="${size.toFixed(2)}" font-weight="500">${escapeXml(line)}</text>`).join('');
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
    return `<style>@keyframes stage${i}{${keys}}</style><g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${x-59}" y="43" width="118" height="95" rx="12" fill="${t.card}" stroke="${t.border}"/><text x="${x-45}" y="62" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text><g transform="translate(${x-12} 65)" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon}</g>${cardLabel(label,x,116,t.text)}<circle cx="${x}" cy="${y}" r="3" fill="${t.line}"/></g>`;
  }).join('');
  const connectors=Array.from({length:n-1},(_,i)=>{const x=x0+i*gap;return `<path d="M${x+64} 91h43m-5-4 5 4-5 4" stroke="${t.line}" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`;}).join('');
  const traveler=c.traveler==='dot'?`<circle class="dot-halo animated" cx="${x0}" cy="${y}" r="9" fill="${t.accent}" opacity=".13"/><circle cx="${x0}" cy="${y}" r="4.5" fill="${t.accent}"/>`:`<g transform="translate(${x0-12} ${y-12})"><rect x="-2" y="-2" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(3 3) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="204" viewBox="0 0 ${width} 204" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.steps.join(' → '))}</title><desc id="desc">An animated ${escapeXml(PRESETS[c.preset].name.toLowerCase())} workflow with ${n} steps.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.traveler{animation-name:travel;animation-timing-function:cubic-bezier(.45,0,.2,1)}.dot-halo{animation-name:dotPulse;animation-duration:1.6s;animation-timing-function:ease-out}@keyframes travel{${motion}}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}@media(prefers-reduced-motion:reduce){.animated{animation:none}}</style><rect width="${width}" height="204" rx="16" fill="${t.background}"/><path d="M${x0} ${y}H${x0+(n-1)*gap}" stroke="${t.line}" stroke-width="1.5"/>${connectors}${nodes}<g class="traveler animated" data-element="${c.traveler}">${traveler}</g></svg>`;
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
// Geometry and routing are independent of labels, colors, fonts and animation timing.
// Keep a small cache so appearance edits do not repeat the grid search.
const routeCache = new Map();
function connectionRoutes(c,g) {
  const key=JSON.stringify([c.routing,g.width,g.height,g.header,g.nodes,g.edges.map(e=>[e.from,e.to])]);
  let routes=routeCache.get(key);
  if(routes)routeCache.delete(key);
  else routes=g.edges.map(edge=>curveBetween(g.nodes[edge.from],g.nodes[edge.to],c,g));
  routeCache.set(key,routes);
  if(routeCache.size>8)routeCache.delete(routeCache.keys().next().value);
  return routes;
}
function renderWorkflowSvg(raw={},paused=false) {
  const c=normalizeConfig(raw);
  if(!c.positions.length&&c.steps.length<=6&&!c.title&&!c.subtitle&&c.layout==='horizontal'&&c.connectionMode==='sequential'&&c.routing==='curved'&&c.lineStyle==='solid'&&c.lineWidth===1.5&&c.arrows&&c.spacing===54&&c.radius===12&&c.font==='sans'&&c.showNumbers&&!c.transparent&&c.travelerSize===1)return renderClassicSvg(c,paused);
  const t=c.theme==='custom'?c.customTheme:THEMES[c.theme],g=workflowGeometry(c),m=g.edges.length,routes=connectionRoutes(c,g);
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
    return `<g data-step="${i}"><rect class="stage animated" style="animation-name:stage${i}" x="${p.x-59}" y="${p.y-48}" width="118" height="96" rx="${c.radius}" fill="${t.card}" stroke="${t.border}"/>${c.showNumbers?`<text x="${p.x-45}" y="${p.y-29}" fill="${t.muted}" font-size="9">${String(i+1).padStart(2,'0')}</text>`:''}<g transform="translate(${p.x-12} ${p.y-26})" fill="none" stroke="${t.accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[c.icons[i]]}</g>${cardLabel(c.steps[i],p.x,p.y+25,t.text)}</g>`;
  }).join('');
  const dash=c.lineStyle==='dashed'?' stroke-dasharray="7 5"':c.lineStyle==='dotted'?' stroke-dasharray="1 5"':'';
  let travelers='';
  const connectors=g.edges.map((edge,i)=>{
    const curve=routes[i],mid=curve.at(.5),start=i/m*100,end=(i+.95)/m*100;
    const samples=Array.from({length:33},(_,j)=>{const p=curve.at(j/32);return `${(start+(end-start)*j/32).toFixed(4)}%{transform:translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px);opacity:${j===0||j===32?0:1}}`;}).join('');
    styles+=`@keyframes travel${i}{0%,100%{opacity:0}${samples}}`;
    const element=c.traveler==='dot'?`<circle class="dot-halo animated" r="9" fill="${t.accent}" opacity=".13"/><circle r="4.5" fill="${t.accent}"/>`:`<rect x="-14" y="-14" width="28" height="28" rx="7" fill="${t.tint}"/><g transform="translate(-9 -9) scale(.75)" fill="none" stroke="${t.accent}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[TRAVELERS[c.traveler].icon]}</g>`;
    travelers+=`<g class="traveler animated" data-element="${c.traveler}" style="animation-name:travel${i};opacity:0"><g transform="scale(${c.travelerSize})">${element}</g></g>`;
    return `<g data-connection="${edge.from}-${edge.to}"><path d="${curve.path}" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round"${dash}/>${c.arrows?`<path d="M-7-4 0 0-7 4" transform="translate(${curve.end.x} ${curve.end.y}) rotate(${curve.angle})" fill="none" stroke="${t.line}" stroke-width="${c.lineWidth}" stroke-linecap="round" stroke-linejoin="round"/>`:''}${edge.label?`<text x="${mid.x}" y="${mid.y-9}" text-anchor="middle" fill="${t.muted}" stroke="${c.transparent?t.card:t.background}" stroke-width="4" paint-order="stroke" font-size="10">${escapeXml(edge.label)}</text>`:''}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${g.width}" height="${g.height}" viewBox="0 0 ${g.width} ${g.height}" role="img" aria-labelledby="title desc"><title id="title">${escapeXml(c.title||c.steps.join(' → '))}</title><desc id="desc">${escapeXml(c.subtitle||'Animated workflow: '+c.steps.join(', '))}. ${g.edges.map(e=>escapeXml(c.steps[e.from]+' to '+c.steps[e.to]+(e.label?' ('+e.label+')':''))).join('; ')}.</desc><style>text{font-family:${font}}.animated{animation-duration:${c.duration}s;animation-timing-function:linear;animation-iteration-count:infinite;animation-play-state:${paused?'paused':'running'}}.dot-halo{animation-name:dotPulse;animation-duration:1.6s}@keyframes dotPulse{0%{r:7;opacity:.22}100%{r:13;opacity:0}}${styles}@media(prefers-reduced-motion:reduce){.animated{animation:none}.traveler{display:none}}</style>${c.transparent?'':`<rect width="${g.width}" height="${g.height}" rx="16" fill="${t.background}"/>`}${heading}${connectors}${nodes}${travelers}</svg>`;
}
export function renderSvg(raw={},paused=false,idPrefix='workflow') {
  const c=normalizeConfig(raw);let hash=2166136261;
  for(const char of JSON.stringify(c))hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
  const suffix='_'+hash.toString(36),names=/\b(stage\d+|travel\d*|dotPulse)\b/g;
  const scope=String(idPrefix).replace(/[^a-zA-Z0-9_-]/g,'')||'workflow',title=scope+suffix+'-title',desc=scope+suffix+'-desc';
  return renderWorkflowSvg(c,paused).replace('aria-labelledby="title desc"',`aria-labelledby="${title} ${desc}"`).replace('id="title"',`id="${title}"`).replace('id="desc"',`id="${desc}"`).replace(/<style>([\s\S]*?)<\/style>/g,(_,css)=>'<style>'+css.replace(names,name=>name+suffix)+'</style>').replace(/style="animation-name:(stage\d+|travel\d*)/g,(_,name)=>'style="animation-name:'+name+suffix);
}
