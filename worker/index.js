import {createMcpHandler} from '@modelcontextprotocol/server';
import {createServer,generateWorkflow,options} from '../mcp/server.mjs';
import {parseWorkflowParams,EDITOR_URL,REPO_URL} from '../src/links.js';

const mcp=createMcpHandler(createServer,{maxRequestBodySize:16384});
const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, HEAD, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Accept, MCP-Protocol-Version, MCP-Session-Id','Access-Control-Expose-Headers':'MCP-Session-Id, MCP-Protocol-Version','X-Content-Type-Options':'nosniff'};
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{...cors,'Content-Type':'application/json; charset=utf-8'}});
export default {
  async fetch(request) {
    const url=new URL(request.url);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
    if(url.pathname==='/mcp'){
      const response=await mcp.fetch(request);const headers=new Headers(response.headers);for(const [key,value]of Object.entries(cors))headers.set(key,value);
      return new Response(response.body,{status:response.status,headers});
    }
    if(url.pathname==='/r'&&['GET','HEAD'].includes(request.method))return new Response(null,{status:302,headers:{...cors,Location:REPO_URL,'Cache-Control':'public, max-age=3600'}});
    if(url.pathname==='/svg'&&['GET','HEAD'].includes(request.method)){
      if(url.search.length>8192)return json({error:'Workflow URL is too long.'},414);
      try{
        const output=generateWorkflow(parseWorkflowParams(url.searchParams));
        const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(output.svg));
        const etag='"'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')+'"';
        const headers={...cors,'Content-Type':'image/svg+xml; charset=utf-8','Cache-Control':'public, max-age=3600, s-maxage=86400',ETag:etag,'Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'"};
        if(request.headers.get('If-None-Match')===etag)return new Response(null,{status:304,headers});
        return new Response(request.method==='HEAD'?null:output.svg,{headers});
      }catch{return json({error:'Invalid workflow settings. Use 3–6 nonempty steps, supported options, and valid hex colors.'},400);}
    }
    if(url.pathname==='/generate'&&request.method==='POST'){
      const body=await request.text();if(new TextEncoder().encode(body).length>16384)return json({error:'Request is too large.'},413);
      try{return json(generateWorkflow(JSON.parse(body)));}catch{return json({error:'Invalid workflow configuration.'},400);}
    }
    if(url.pathname==='/options'&&request.method==='GET')return json(options());
    if(url.pathname==='/'&&['GET','HEAD'].includes(request.method))return json({name:'readme-flow-svg image service',generator:EDITOR_URL,image:'/svg?steps=Upload;Validate;Compress;Download',generate:'/generate',mcp:'/mcp',repository:REPO_URL});
    return json({error:'Not found.'},404);
  }
};
