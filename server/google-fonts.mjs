import {validFontFamily} from '../src/svg.js';
import {parseFont,outlineSvg} from '../src/fonts.js';
const cache=new Map();
export async function googleFontBytes(family,weight) {
  if(!validFontFamily(family)||!Number.isInteger(weight)||weight<100||weight>900)throw Error('Invalid Google Font settings.');
  const key=JSON.stringify([family,weight]);
  if(cache.has(key))return cache.get(key);
  const promise=(async()=>{
    const query=new URLSearchParams({family:family+':wght@'+weight});
    const css=await fetch('https://fonts.googleapis.com/css2?'+query,{headers:{'User-Agent':'readme-flow-svg'},signal:AbortSignal.timeout(8000),redirect:'error'});
    if(!css.ok)throw Error('Google Font or weight not found. Check the family name and try Regular (400).');
    const source=await css.text(),link=source.match(/src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)\s*format\(['"]truetype['"]\)/)?.[1];
    if(!link)throw Error('Google did not provide a supported outline font.');
    const url=new URL(link);if(url.hostname!=='fonts.gstatic.com'||url.protocol!=='https:'||url.username||url.password)throw Error('Invalid font source.');
    const response=await fetch(url,{signal:AbortSignal.timeout(8000),redirect:'error'});
    if(!response.ok)throw Error('Could not load the Google Font.');
    const bytes=await response.arrayBuffer();if(bytes.byteLength>4000000)throw Error('Font file is too large.');
    return bytes;
  })();
  cache.set(key,promise);while(cache.size>12)cache.delete(cache.keys().next().value);
  try{return await promise;}catch(error){cache.delete(key);throw error;}
}
export async function googleFontSvg(svg,config) {
  if(config.font!=='google')return svg;
  return outlineSvg(svg,parseFont(await googleFontBytes(config.googleFont,config.fontWeight)),config.googleFont);
}
