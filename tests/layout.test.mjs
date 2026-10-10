import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeConfig,renderSvg,workflowGeometry,LAYOUTS} from '../src/svg.js';
import {workflowParams,parseWorkflowParams} from '../src/links.js';
import {generateWorkflow,workflowSchema} from '../mcp/server.mjs';

test('layouts keep twelve cards inside their canvas and snake rows reverse direction',()=>{
  for(const layout of Object.keys(LAYOUTS))for(const columns of [2,3,4,6])for(const spacing of [32,120]){
    const g=workflowGeometry({steps:Array.from({length:12},(_,i)=>'Step '+i),layout,columns,spacing,title:'A title',subtitle:'Some context'});
    assert.equal(g.nodes.length,12);
    for(const p of g.nodes){assert.ok(p.x-59>=0&&p.x+59<=g.width);assert.ok(p.y-48>=g.header&&p.y+48<=g.height);}
    if(layout==='snake'){assert.ok(g.nodes[0].x<g.nodes[1].x);assert.ok(g.nodes[columns].x>g.nodes[columns+1].x);}
  }
});
test('all customization survives URL round trips and the API uses the same renderer',()=>{
  const c=normalizeConfig({preset:'release',title:'Build & ship <safely>',subtitle:'Tests, reviews, and releases',layout:'snake',columns:3,connectionMode:'custom',connections:[{from:0,to:1,label:'Success'},{from:1,to:0,label:'Retry'},{from:0,to:4,label:'Skip'}],routing:'elbow',lineStyle:'dotted',lineWidth:3,arrows:false,spacing:90,radius:4,font:'mono',transparent:true,showNumbers:false,travelerSize:1.5,duration:24});
  const decoded=normalizeConfig(parseWorkflowParams(workflowParams(c)));assert.deepEqual(decoded,c);
  const output=generateWorkflow(decoded);assert.equal(output.svg,renderSvg(c));assert.ok(output.markdown.includes('Build &amp;')===false);assert.ok(output.svg.includes('Build &amp; ship &lt;safely&gt;'));assert.ok(output.svg.includes('stroke-dasharray="1 5"'));assert.ok(!output.svg.includes(`<rect width=`));
  const sequential={...c,connectionMode:'sequential'};assert.deepEqual(normalizeConfig(parseWorkflowParams(workflowParams(sequential))),sequential);
});
test('connections reject missing nodes, self links, duplicates and injected settings',()=>{
  for(const connections of [[{from:0,to:9}],[{from:1,to:1}],[{from:0,to:1},{from:0,to:1}]])assert.equal(workflowSchema.safeParse({steps:['One','Two','Three'],connections}).success,false);
  const c=normalizeConfig({connections:[{from:0,to:99},null,{from:0,to:1,label:'<script>alert(1)</script>'}],connectionMode:'custom',title:'</text><script>',routing:'__proto__',font:'</style><script>'});
  assert.equal(c.connections.length,1);const svg=renderSvg(c);assert.ok(!svg.includes('<script>'));assert.ok(!svg.includes('NaN'));assert.ok(svg.includes('&lt;script&gt;'));
});
test('empty connections, paused workflows and reduced motion remain valid',()=>{
  const svg=renderSvg({title:'Independent tasks',connectionMode:'custom',connections:[]},true);
  assert.ok(!svg.includes('data-connection='));assert.ok(!svg.includes('NaN'));assert.ok(svg.includes('animation-play-state:paused'));assert.ok(svg.includes('prefers-reduced-motion'));
});
