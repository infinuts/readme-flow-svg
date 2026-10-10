import {McpServer} from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import {normalizeConfig,renderSvg,PRESETS,THEMES,TRAVELERS,STEP_ICONS,THEME_FIELDS,LAYOUTS,FONTS,validFontFamily} from '../src/svg.js';
import {googleFontSvg} from '../server/google-fonts.mjs';
import {imageUrl,editorUrl,workflowMarkdown} from '../src/links.js';

const color=z.string().regex(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i);
export const workflowSchema=z.object({
  steps:z.array(z.string().trim().min(1).max(32)).min(3).max(12).optional(),
  icons:z.array(z.enum(Object.keys(STEP_ICONS))).max(12).optional(),
  preset:z.enum(Object.keys(PRESETS)).optional(),
  theme:z.enum([...Object.keys(THEMES),'custom']).optional(),
  traveler:z.enum(Object.keys(TRAVELERS)).optional(),
  duration:z.number().min(2).max(30).optional(),
  title:z.string().max(80).optional(),subtitle:z.string().max(140).optional(),
  layout:z.enum(Object.keys(LAYOUTS)).optional(),columns:z.number().int().min(2).max(6).optional(),
  connectionMode:z.enum(['sequential','custom']).optional(),
  routing:z.enum(['curved','elbow','straight']).optional(),
  connections:z.array(z.object({from:z.number().int().min(0).max(11),to:z.number().int().min(0).max(11),label:z.string().max(24).optional()})).max(24).optional(),
  lineStyle:z.enum(['solid','dashed','dotted']).optional(),lineWidth:z.number().min(1).max(4).optional(),arrows:z.boolean().optional(),
  spacing:z.number().min(32).max(120).optional(),radius:z.number().min(0).max(24).optional(),font:z.enum(Object.keys(FONTS)).optional(),showNumbers:z.boolean().optional(),transparent:z.boolean().optional(),travelerSize:z.number().min(.6).max(1.8).optional(),
  googleFont:z.string().refine(validFontFamily,'Use a Google Font family name.').optional(),fontWeight:z.number().int().min(100).max(900).optional(),
  positions:z.array(z.object({x:z.number().min(70).max(2500),y:z.number().min(60).max(2100)}).nullable()).max(12).optional(),canvasSize:z.object({width:z.number().min(220).max(2600),height:z.number().min(204).max(2200)}).nullable().optional(),
  customTheme:z.object(Object.fromEntries(Object.keys(THEME_FIELDS).map(key=>[key,color.optional()]))).optional()
}).superRefine((value,ctx)=>{
  const count=value.steps?.length||PRESETS[value.preset||'files'].steps.length,seen=new Set();
  for(const [i,edge]of (value.connections||[]).entries()){
    const key=edge.from+':'+edge.to;
    if(edge.from>=count||edge.to>=count||edge.from===edge.to||seen.has(key))ctx.addIssue({code:'custom',path:['connections',i],message:'Connections must join two different existing steps without duplicates.'});
    seen.add(key);
  }
});
export function generateWorkflow(raw={}) {
  const config=normalizeConfig(workflowSchema.parse(raw));
  return {svg:renderSvg(config),image_url:imageUrl(config),markdown:workflowMarkdown(config),editor_url:editorUrl(config),config};
}
export async function generateWorkflowAsync(raw={}) {
  const output=generateWorkflow(raw);output.svg=await googleFontSvg(output.svg,output.config);return output;
}
export function options() {
  return {presets:PRESETS,themes:THEMES,travelers:TRAVELERS,stage_icons:STEP_ICONS,layouts:LAYOUTS,fonts:FONTS,limits:{steps:[3,12],connections:24,duration:[2,30],title:80,subtitle:140,connection_label:24},custom_theme_fields:THEME_FIELDS,defaults:normalizeConfig()};
}
export function createServer() {
  const server=new McpServer({name:'readme-flow-svg',version:'1.1.0'});
  const annotations={readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false};
  server.registerTool('generate_workflow',{
    title:'Generate an animated README workflow',
    description:'Generate an animated SVG and Markdown embed from 3–12 steps. Supports titles, subtitles, horizontal/vertical/snake/grid layouts, labeled custom connections (zero-based from/to step indices), branches, loops, line styles, spacing, fonts, transparent backgrounds, themes and icons. Returns SVG source, image URL, Markdown, and editor link. Custom connections animate in array order; set connectionMode to custom to use them.',
    inputSchema:workflowSchema,annotations:{...annotations,openWorldHint:true}
  },async args=>{const output=await generateWorkflowAsync(args);return {content:[{type:'text',text:JSON.stringify(output)}],structuredContent:output};});
  server.registerTool('list_options',{
    title:'List workflow presets, themes, and icons',
    description:'List supported presets, theme palettes, moving elements, stage icons, and custom color fields.',
    inputSchema:z.object({}),annotations
  },async()=>{const output=options();return {content:[{type:'text',text:JSON.stringify(output)}],structuredContent:output};});
  return server;
}
