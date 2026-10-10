import {McpServer} from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import {normalizeConfig,renderSvg,PRESETS,THEMES,TRAVELERS,STEP_ICONS,THEME_FIELDS} from '../src/svg.js';
import {imageUrl,editorUrl,workflowMarkdown} from '../src/links.js';

const color=z.string().regex(/^#[a-f0-9]{3}([a-f0-9]{3})?$/i);
export const workflowSchema=z.object({
  steps:z.array(z.string().trim().min(1).max(32)).min(3).max(6).optional(),
  icons:z.array(z.enum(Object.keys(STEP_ICONS))).max(6).optional(),
  preset:z.enum(Object.keys(PRESETS)).optional(),
  theme:z.enum([...Object.keys(THEMES),'custom']).optional(),
  traveler:z.enum(Object.keys(TRAVELERS)).optional(),
  duration:z.number().min(2).max(10).optional(),
  customTheme:z.object(Object.fromEntries(Object.keys(THEME_FIELDS).map(key=>[key,color.optional()]))).optional()
});
export function generateWorkflow(raw={}) {
  const config=normalizeConfig(workflowSchema.parse(raw));
  return {svg:renderSvg(config),image_url:imageUrl(config),markdown:workflowMarkdown(config),editor_url:editorUrl(config),config};
}
export function options() {
  return {presets:PRESETS,themes:THEMES,travelers:TRAVELERS,stage_icons:STEP_ICONS,custom_theme_fields:THEME_FIELDS,defaults:normalizeConfig()};
}
export function createServer() {
  const server=new McpServer({name:'readme-flow-svg',version:'1.0.0'});
  const annotations={readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false};
  server.registerTool('generate_workflow',{
    title:'Generate an animated README workflow',
    description:'Generate a self-contained animated SVG and a Markdown image embed from 3–6 steps. Returns SVG source, a hosted image URL, Markdown, and an editor link. Supports themes, custom colors, stage icons, and moving elements.',
    inputSchema:workflowSchema,annotations
  },async args=>{const output=generateWorkflow(args);return {content:[{type:'text',text:JSON.stringify(output)}],structuredContent:output};});
  server.registerTool('list_options',{
    title:'List workflow presets, themes, and icons',
    description:'List supported presets, theme palettes, moving elements, stage icons, and custom color fields.',
    inputSchema:z.object({}),annotations
  },async()=>{const output=options();return {content:[{type:'text',text:JSON.stringify(output)}],structuredContent:output};});
  return server;
}
