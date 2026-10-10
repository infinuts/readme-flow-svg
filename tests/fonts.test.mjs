import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalizeConfig,workflowGeometry,renderSvg} from '../src/svg.js';
import {workflowParams,parseWorkflowParams} from '../src/links.js';
import {outlineSvg} from '../src/fonts.js';
import {googleFontBytes} from '../server/google-fonts.mjs';

test('manual positions and Google Font settings survive URLs and preserve card identity',()=>{
  const c=normalizeConfig({font:'google',googleFont:'Fira Code',fontWeight:500,positions:[{x:90,y:120},{x:260,y:240},null],canvasSize:{width:680,height:420}});
  assert.deepEqual(normalizeConfig(parseWorkflowParams(workflowParams(c))),c);
  const g=workflowGeometry(c);assert.deepEqual(g.nodes[0],{x:90,y:120});assert.deepEqual(g.nodes[1],{x:260,y:240});
  assert.ok(g.width>=g.nodes[2].x+80);assert.ok(renderSvg({...c,positions:[{x:100,y:100},{x:100,y:100}]}).includes('NaN')===false);
  assert.deepEqual(normalizeConfig({positions:[]}).positions,[]);
});
test('outlining keeps accessible labels, colors, centering and self-contained paths',()=>{
  const font={unitsPerEm:1000,copyright:'Example font',layout:value=>({glyphs:Array.from(value,()=>({path:{toSVG:()=> 'M0 0L400 700L800 0Z'}})),positions:Array.from(value,()=>({xAdvance:1000,yAdvance:0,xOffset:0,yOffset:0}))})};
  const output=outlineSvg('<svg><title>Readable title</title><text x="100" y="40" fill="#123456" font-size="10" text-anchor="middle">A &amp; B</text></svg>',font,'Example');
  assert.ok(!output.includes('<text'));assert.ok(output.includes('data-font-text="A &amp; B"'));assert.ok(output.includes('translate(75 40)'));assert.ok(output.includes('fill="#123456"'));assert.ok(output.includes('<title>Readable title</title>'));assert.ok(!output.includes('https:'));
});
test('Google font fetching sends only family and weight, caches bytes and restricts sources',async()=>{
  const original=globalThis.fetch,requests=[];
  globalThis.fetch=async url=>{requests.push(String(url));return String(url).startsWith('https://fonts.googleapis.com/')?new Response("src: url(https://fonts.gstatic.com/test.ttf) format('truetype');"):new Response(new Uint8Array([0,1,2,3]));};
  try{
    const one=await googleFontBytes('Test Family',400),two=await googleFontBytes('Test Family',400);assert.equal(one,two);assert.equal(requests.length,2);
    const query=new URL(requests[0]).searchParams;assert.deepEqual([...query.keys()],['family']);assert.equal(query.get('family'),'Test Family:wght@400');
    await assert.rejects(()=>googleFontBytes('https://evil.example',400));
    globalThis.fetch=async()=>new Response("src: url(https://evil.example/font.ttf) format('truetype');");await assert.rejects(()=>googleFontBytes('Another Family',400));
  }finally{globalThis.fetch=original;}
});
