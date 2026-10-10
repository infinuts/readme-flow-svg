import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderSvg,normalizeConfig,normalizePalette,PRESETS,ICONS,THEMES,TRAVELERS} from '../src/svg.js';
test('untrusted labels are XML-escaped and cannot inject markup',()=>{const svg=renderSvg({steps:['<script>alert(1)</script>','" & >','Download']});assert.ok(!svg.includes('<script>'));assert.ok(svg.includes('&lt;script&gt;'));assert.ok(svg.includes('&quot; &amp; &gt;'));assert.ok(!svg.includes('foreignObject'));});
test('normalization bounds the workflow and animation settings',()=>{assert.equal(normalizeConfig({steps:[]}).steps.length,3);assert.equal(normalizeConfig({steps:Array(30).fill('x'),duration:100,theme:'invalid',preset:'__proto__'}).steps.length,6);assert.equal(normalizeConfig({duration:100}).duration,10);assert.equal(normalizeConfig({duration:-10}).duration,2);assert.equal(normalizeConfig({theme:'invalid'}).theme,'light');assert.equal(normalizeConfig({preset:'__proto__'}).preset,'files');});
test('all presets, themes, and moving elements export self-contained SVG with reduced motion support',()=>{for(const preset of Object.keys(PRESETS))for(const theme of Object.keys(THEMES))for(const traveler of Object.keys(TRAVELERS)){const svg=renderSvg({preset,theme,traveler});assert.ok(svg.startsWith('<svg'));assert.ok(svg.endsWith('</svg>'));assert.ok(svg.includes('prefers-reduced-motion'));assert.ok(svg.includes('@keyframes travel'));assert.ok(!svg.includes('<script'));assert.ok(!svg.includes('href='));assert.ok(svg.includes(PRESETS[preset].steps[0]));assert.ok(svg.includes(`data-element="${traveler}"`));}});
test('six steps fit in the viewBox and paused exports can resume',()=>{const svg=renderSvg({steps:['1','2','3','4','5','6']},true);assert.ok(svg.includes('viewBox="0 0 1024 204"'));assert.equal((svg.match(/class="stage animated"/g)||[]).length,6);assert.ok(svg.includes('animation-play-state:paused'));});
test('custom stage icons render in exports, while invalid icons fall back safely',()=>{
  const config=normalizeConfig({steps:['One','Two','Three','Four','Five'],icons:['deploy','check','file','invalid','__proto__']});
  assert.deepEqual(config.icons,['deploy','check','file','download','file']);
  const svg=renderSvg(config);
  assert.ok(svg.includes(ICONS.deploy));assert.ok(svg.includes(ICONS.check));
  assert.deepEqual(normalizeConfig({preset:'api'}).icons,PRESETS.api.icons);
});
test('custom palettes accept hex colors, expand shorthand, and reject injected styles',()=>{
  const palette=normalizePalette({background:'#123',accent:'#FaC',text:'red;}</style><script>alert(1)</script>',card:'url(https://example.com)',extra:'#000000'});
  assert.equal(palette.background,'#112233');assert.equal(palette.accent,'#ffaacc');assert.equal(palette.text,THEMES.light.text);assert.equal(palette.card,THEMES.light.card);assert.ok(!Object.hasOwn(palette,'extra'));
  const svg=renderSvg({theme:'custom',customTheme:palette,traveler:'rocket'});
  assert.ok(svg.includes('fill="#112233"'));assert.ok(svg.includes('stroke="#ffaacc"'));assert.ok(!svg.includes('<script>'));assert.ok(svg.includes(ICONS.deploy));
  assert.equal(normalizeConfig({traveler:'__proto__'}).traveler,'dot');
});
