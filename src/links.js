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
  return params;
}
export function imageUrl(raw) {return SERVICE_URL+'/svg?'+workflowParams(raw);}
export function editorUrl(raw) {return EDITOR_URL+'?'+workflowParams(raw);}
export function workflowMarkdown(raw,local=false) {
  const config=normalizeConfig(raw),alt=config.steps.join(' → ').replace(/[\[\]\\\n\r]/g,' ');
  return local?`![${alt}](./workflow.svg)`:`[![${alt}](${imageUrl(config)})](${SERVICE_URL}/r)`;
}
export function parseWorkflowParams(params) {
  const array=key=>{
    const value=params.get(key);if(value===null)return undefined;
    const parsed=value.trim().startsWith('[')?JSON.parse(value):value.split(';');
    if(!Array.isArray(parsed)||!parsed.every(item=>typeof item==='string'))throw Error(`${key} must be an array of strings or semicolon-separated text.`);
    return parsed;
  };
  return {steps:array('steps'),icons:array('icons'),preset:params.get('preset')||undefined,theme:params.get('theme')||undefined,traveler:params.get('traveler')||undefined,duration:params.has('duration')?Number(params.get('duration')):undefined,customTheme:params.has('customTheme')?JSON.parse(params.get('customTheme')):undefined};
}
