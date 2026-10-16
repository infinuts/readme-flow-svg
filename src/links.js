import { normalizeConfig } from './config.js';
import { PRESETS } from './options.js';

export const SERVICE_URL='https://readme-flow-svg.vercel.app';
export const EDITOR_URL=SERVICE_URL+'/';
export const REPO_URL='https://github.com/infinuts/readme-flow-svg';

/** @param {unknown} raw */
export function workflowParams(raw) {
  const config=normalizeConfig(raw),params=new URLSearchParams();
  params.set('steps',JSON.stringify(config.steps));
  if(config.preset!=='files')params.set('preset',config.preset);
  if(config.theme!=='light')params.set('theme',config.theme);
  if(config.traveler!=='dot')params.set('traveler',config.traveler);
  if(config.duration!==6)params.set('duration',String(config.duration));
  if(config.icons.some((name,i)=>name!==(PRESETS[config.preset].icons[i]||'file')))params.set('icons',JSON.stringify(config.icons));
  if(config.theme==='custom')params.set('customTheme',JSON.stringify(config.customTheme));
  const defaults=normalizeConfig({preset:config.preset});
  /** @type {(keyof import('./config.js').WorkflowConfig)[]} */
  const keys=['title','subtitle','layout','columns','connectionMode','routing','lineStyle','lineWidth','arrows','spacing','radius','font','showNumbers','transparent','travelerSize'];
  for(const key of keys)if(config[key]!==defaults[key])params.set(key,String(config[key]));
  if(config.connectionMode==='custom'||JSON.stringify(config.connections)!==JSON.stringify(defaults.connections))params.set('connections',JSON.stringify(config.connections));
  if(config.font==='google'){params.set('googleFont',config.googleFont);params.set('fontWeight',String(config.fontWeight));}
  if(config.positions.length)params.set('positions',JSON.stringify(config.positions));
  if(config.canvasSize)params.set('canvasSize',JSON.stringify(config.canvasSize));
  return params;
}
/** @param {unknown} raw */
export function imageUrl(raw) {return SERVICE_URL+'/svg?'+workflowParams(raw);}
/** @param {unknown} raw */
export function editorUrl(raw) {return EDITOR_URL+'?'+workflowParams(raw);}
/** @param {unknown} raw @param {boolean} local
 * @param {{link?: string, href?: string, adaptive?: boolean, alt?: string}} options
 */
export function workflowMarkdown(raw, local = false, options = {}) {
  const config = normalizeConfig(raw);
  const alt = (options.alt?.trim() || config.title || config.steps.join(' → ')).replace(/[[\]\\\n\r<>]/g, ' ');
  let target = options.link === 'editor' ? editorUrl(config) : options.link === 'repository' || options.link === undefined ? SERVICE_URL + '/r' : '';
  if (options.link === 'custom') {
    try {
      const url = new URL(options.href?.trim() || '');
      if (['http:', 'https:'].includes(url.protocol)) target = url.href;
    } catch { /* An incomplete URL produces a plain image while editing. */ }
  }
  target = target.replace(/[()]/g, char => char === '(' ? '%28' : '%29');
  if (options.adaptive && !local) {
    const escape = (/** @type {string} */ value) => value.replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;'}[char] || char));
    const picture = '<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="' + escape(imageUrl({...config, theme: 'dark'})) + '">\n  <source media="(prefers-color-scheme: light)" srcset="' + escape(imageUrl({...config, theme: 'light'})) + '">\n  <img alt="' + escape(alt) + '" src="' + escape(imageUrl({...config, theme: 'light'})) + '">\n</picture>';
    return target ? '<a href="' + escape(target) + '">\n' + picture + '\n</a>' : picture;
  }
  const image = '![' + alt + '](' + (local ? './workflow.svg' : imageUrl(config)) + ')';
  return target && (!local || options.link !== undefined) ? '[' + image + '](' + target + ')' : image;
}
/** @param {URLSearchParams} params */
export function parseWorkflowParams(params) {
  const array=(/** @type {string} */ key)=>{
    const value=params.get(key);if(value===null)return undefined;
    const parsed=value.trim().startsWith('[')?JSON.parse(value):value.split(';');
    if(!Array.isArray(parsed)||!parsed.every(item=>typeof item==='string'))throw Error(`${key} must be an array of strings or semicolon-separated text.`);
    return parsed;
  };
  /** @type {Record<string, unknown>} */
  const extra={};
  for(const key of ['title','subtitle','layout','connectionMode','routing','lineStyle','font'])if(params.has(key))extra[key]=params.get(key);
  for(const key of ['columns','lineWidth','spacing','radius','travelerSize'])if(params.has(key))extra[key]=Number(params.get(key));
  for(const key of ['arrows','showNumbers','transparent'])if(params.has(key)){if(!['true','false'].includes(params.get(key)||''))throw Error('Invalid boolean');extra[key]=params.get(key)==='true';}
  if(params.has('connections'))extra.connections=JSON.parse(params.get('connections')||'null');
  if(params.has('googleFont'))extra.googleFont=params.get('googleFont');
  if(params.has('fontWeight'))extra.fontWeight=Number(params.get('fontWeight'));
  for(const key of ['positions','canvasSize'])if(params.has(key))extra[key]=JSON.parse(params.get(key)||'null');
  return {...extra,steps:array('steps'),icons:array('icons'),preset:params.get('preset')||undefined,theme:params.get('theme')||undefined,traveler:params.get('traveler')||undefined,duration:params.has('duration')?Number(params.get('duration')):undefined,customTheme:params.has('customTheme')?JSON.parse(params.get('customTheme')||'null'):undefined};
}
