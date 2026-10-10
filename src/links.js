import {normalizeConfig,PRESETS} from './svg.js';

export const SERVICE_URL='https://readme-flow-svg.vercel.app';
export const EDITOR_URL=SERVICE_URL+'/';
export const REPO_URL='https://github.com/infinuts/readme-flow-svg';

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
  for(const key of ['title','subtitle','layout','columns','connectionMode','routing','lineStyle','lineWidth','arrows','spacing','radius','font','showNumbers','transparent','travelerSize'])if(config[key]!==defaults[key])params.set(key,String(config[key]));
  if(config.connectionMode==='custom'||JSON.stringify(config.connections)!==JSON.stringify(defaults.connections))params.set('connections',JSON.stringify(config.connections));
  if(config.font==='google'){params.set('googleFont',config.googleFont);params.set('fontWeight',String(config.fontWeight));}
  if(config.positions.length)params.set('positions',JSON.stringify(config.positions));
  if(config.canvasSize)params.set('canvasSize',JSON.stringify(config.canvasSize));
  return params;
}
export function imageUrl(raw) {return SERVICE_URL+'/svg?'+workflowParams(raw);}
export function editorUrl(raw) {return EDITOR_URL+'?'+workflowParams(raw);}
export function workflowMarkdown(raw,local=false) {
  const config=normalizeConfig(raw),alt=(config.title||config.steps.join(' → ')).replace(/[\[\]\\\n\r]/g,' ');
  return local?`![${alt}](./workflow.svg)`:`[![${alt}](${imageUrl(config)})](${SERVICE_URL}/r)`;
}
export function parseWorkflowParams(params) {
  const array=key=>{
    const value=params.get(key);if(value===null)return undefined;
    const parsed=value.trim().startsWith('[')?JSON.parse(value):value.split(';');
    if(!Array.isArray(parsed)||!parsed.every(item=>typeof item==='string'))throw Error(`${key} must be an array of strings or semicolon-separated text.`);
    return parsed;
  };
  const extra={};
  for(const key of ['title','subtitle','layout','connectionMode','routing','lineStyle','font'])if(params.has(key))extra[key]=params.get(key);
  for(const key of ['columns','lineWidth','spacing','radius','travelerSize'])if(params.has(key))extra[key]=Number(params.get(key));
  for(const key of ['arrows','showNumbers','transparent'])if(params.has(key)){if(!['true','false'].includes(params.get(key)))throw Error('Invalid boolean');extra[key]=params.get(key)==='true';}
  if(params.has('connections'))extra.connections=JSON.parse(params.get('connections'));
  if(params.has('googleFont'))extra.googleFont=params.get('googleFont');
  if(params.has('fontWeight'))extra.fontWeight=Number(params.get('fontWeight'));
  for(const key of ['positions','canvasSize'])if(params.has(key))extra[key]=JSON.parse(params.get(key));
  return {...extra,steps:array('steps'),icons:array('icons'),preset:params.get('preset')||undefined,theme:params.get('theme')||undefined,traveler:params.get('traveler')||undefined,duration:params.has('duration')?Number(params.get('duration')):undefined,customTheme:params.has('customTheme')?JSON.parse(params.get('customTheme')):undefined};
}
