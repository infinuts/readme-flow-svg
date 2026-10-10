import {ICONS,PRESETS,STEP_ICONS,TRAVELERS,THEMES,THEME_LABELS,THEME_FIELDS,normalizeConfig,renderSvg} from './svg.js';
import {workflowMarkdown,EDITOR_URL,parseWorkflowParams,workflowParams} from './links.js';
const $=id=>document.getElementById(id);
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.file}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
let config=normalizeConfig(), paused=false, activeTab='markdown',toastTimer,iconStep=null;
try {
  const query=new URLSearchParams(location.search);
  if(query.size) config=normalizeConfig(parseWorkflowParams(query));
  else {const saved=localStorage.getItem('readme-flow-config');if(saved) config=normalizeConfig(JSON.parse(saved));}
} catch { toast('Could not load saved settings. Starting with a fresh workflow.'); }
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function markdown(){return workflowMarkdown(config,$('embed-mode').value==='local');}
$('embed-mode').addEventListener('change',()=>{updateCode();$('embed-hint').innerHTML=$('embed-mode').value==='local'?'Add <code>workflow.svg</code> to your repo, then paste this line in your README.':'Paste this line in your README. The image is generated from your settings.';});
function updateCode(){$('code').textContent=activeTab==='markdown'?markdown():renderSvg(config);$('code-content').setAttribute('aria-labelledby',activeTab==='markdown'?'markdown-tab':'svg-tab');}
function render(){
  $('preview').innerHTML=renderSvg(config,paused);
  $('preview').style.setProperty('--svg-width',$('preview').querySelector('svg').getAttribute('width')+'px');
  const palette=config.theme==='custom'?config.customTheme:THEMES[config.theme],canvas=$('preview-canvas');
  canvas.className='preview-canvas';
  canvas.style.backgroundColor=palette.background;
  canvas.style.backgroundImage=`radial-gradient(${palette.line} .8px,transparent .8px)`;
  canvas.style.setProperty('--canvas-meta',palette.muted);
  $('custom-theme-preview').innerHTML=renderSvg({...config,theme:'custom'},paused);
  $('workflow-name').textContent=config.title||PRESETS[config.preset].name+' workflow';
  $('preview-meta').textContent=`${config.steps.length} steps · ${config.duration}s loop`;
  $('step-count').textContent=`${config.steps.length} / 12`;
  $('add-step').disabled=config.steps.length>=12;
  $('columns').disabled=!['snake','grid'].includes(config.layout);
  $('preview-canvas').classList.toggle('multi-row',config.layout!=='horizontal');
  $('preview-canvas').classList.toggle('vertical-layout',config.layout==='vertical');
  $('speed-value').textContent=config.duration+'s';
  updateCode();
  try{localStorage.setItem('readme-flow-config',JSON.stringify(config));}catch{/* Storage can be disabled; exports still work. */}
}
function renderSteps(){
  $('steps').replaceChildren();
  config.steps.forEach((label,i)=>{
    const row=document.createElement('div');row.className='step-row';
    row.innerHTML=`<div class="step-controls"><button class="reorder-button" aria-label="Move step ${i+1} up" title="Move up" ${i===0?'disabled':''}>⌃</button><button class="reorder-button" aria-label="Move step ${i+1} down" title="Move down" ${i===config.steps.length-1?'disabled':''}>⌄</button></div><div class="step-input"><button class="step-icon-button" aria-label="Choose icon for step ${i+1}" title="Choose icon: ${STEP_ICONS[config.icons[i]]}" aria-haspopup="dialog" aria-controls="icon-picker">${icon(config.icons[i])}</button><input maxlength="32" aria-label="Step ${i+1} label" placeholder="Step ${i+1}"><button class="icon-button remove-step" aria-label="Remove step ${i+1}" title="Remove step" ${config.steps.length<=3?'disabled':''}>${icon('close')}</button></div>`;
    const input=row.querySelector('input');input.value=label;
    input.addEventListener('input',()=>{config.steps[i]=input.value;render();});
    input.addEventListener('blur',()=>{config=normalizeConfig(config);input.value=config.steps[i];renderConnections();render();});
    row.querySelector('.step-icon-button').addEventListener('click',()=>openIconPicker(i));
    row.querySelector('.remove-step').addEventListener('click',()=>{config.steps.splice(i,1);config.icons.splice(i,1);config.connections=config.connections.filter(e=>e.from!==i&&e.to!==i).map(e=>({...e,from:e.from>i?e.from-1:e.from,to:e.to>i?e.to-1:e.to}));renderSteps();renderConnections();render();});
    const reorder=(direction)=>{for(const values of [config.steps,config.icons])[values[i],values[i+direction]]=[values[i+direction],values[i]];const remap=value=>value===i?i+direction:value===i+direction?i:value;config.connections=config.connections.map(e=>({...e,from:remap(e.from),to:remap(e.to)}));renderSteps();renderConnections();render();$('steps').children[i+direction].querySelector('input').focus();};
    row.querySelectorAll('.reorder-button')[0].addEventListener('click',()=>reorder(-1));
    row.querySelectorAll('.reorder-button')[1].addEventListener('click',()=>reorder(1));
    $('steps').append(row);
  });
}
function openIconPicker(index){
  iconStep=index;
  $('icon-picker-step').textContent=`Step ${index+1}: ${config.steps[index]||'Untitled step'}`;
  $('icon-options').replaceChildren();
  for(const [name,label] of Object.entries(STEP_ICONS)){
    const button=document.createElement('button');button.type='button';button.className='icon-option';
    button.setAttribute('aria-label',label+' icon');button.setAttribute('aria-pressed',name===config.icons[index]);
    button.innerHTML=icon(name)+`<span>${label}</span>`;
    button.addEventListener('click',()=>{config.icons[index]=name;renderSteps();render();$('icon-picker').close();});
    $('icon-options').append(button);
  }
  $('icon-picker').showModal();
  $('icon-options').querySelector('[aria-pressed="true"]').focus();
}
$('close-icon-picker').addEventListener('click',()=>$('icon-picker').close());
$('icon-picker').addEventListener('close',()=>{if(iconStep!==null)$('steps').children[iconStep]?.querySelector('.step-icon-button').focus();iconStep=null;});
function syncControls(){
  $('preset').value=config.preset;$('speed').value=config.duration;
  for(const [id,key]of Object.entries(extraControls))$(id).type==='checkbox'?$(id).checked=config[key]:$(id).value=config[key];
  renderConnections();
  document.querySelectorAll('[data-theme]').forEach(b=>{const selected=b.dataset.theme===config.theme;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
  $('traveler-icon').className=config.traveler==='dot'?'dot-icon':'';
  $('traveler-icon').innerHTML=TRAVELERS[config.traveler].icon?icon(TRAVELERS[config.traveler].icon):'';
  $('traveler-label').textContent=TRAVELERS[config.traveler].name;
  $('traveler-button').title='Moving element: '+TRAVELERS[config.traveler].name;
  $('preset-icon').innerHTML=icon(PRESETS[config.preset].icons[0]);
  for(const key of Object.keys(THEME_FIELDS)){$('color-'+key).value=config.customTheme[key];$('color-value-'+key).textContent=config.customTheme[key];}
  renderSteps();render();$('preview').scrollTop=0;$('preview').scrollLeft=0;
}
function choosePreset(preset){const p=PRESETS[preset];config=normalizeConfig({...config,preset,steps:p.steps.slice(),icons:p.icons.slice(),layout:p.layout||'horizontal',columns:p.columns||3,connectionMode:p.connections?'custom':'sequential',connections:p.connections||[]});syncControls();}
$('preset').addEventListener('change',e=>choosePreset(e.target.value));
$('add-step').addEventListener('click',()=>{if(config.steps.length>=12)return;config.steps.push('Step '+(config.steps.length+1));config.icons.push('file');renderSteps();renderConnections();render();openIconPicker(config.steps.length-1);});
for(const [name,palette]of Object.entries(THEMES)){
  const button=document.createElement('button');button.className='theme-option';button.dataset.theme=name;button.setAttribute('aria-pressed','false');
  button.innerHTML=`<span class="theme-swatch" style="--swatch-bg:${palette.background};--swatch-border:${palette.border};--swatch-card:${palette.card};--swatch-line:${palette.line}"><i></i><i></i><i></i></span><span>${THEME_LABELS[name]}</span><span class="theme-check" aria-hidden="true">✓</span>`;
  $('themes').append(button);
}
const customButton=document.createElement('button');customButton.className='theme-option custom-option';customButton.dataset.theme='custom';customButton.setAttribute('aria-pressed','false');customButton.innerHTML=icon('palette')+'<span>Custom</span><span class="custom-option-hint" aria-hidden="true">Your own colors</span><span class="theme-check" aria-hidden="true">✓</span>';$('themes').append(customButton);
document.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>{config.theme=b.dataset.theme;syncControls();if(config.theme==='custom')$('custom-theme-picker').showModal();}));
for(const [key,label]of Object.entries(THEME_FIELDS)){
  const field=document.createElement('label');field.className='color-field';field.htmlFor='color-'+key;
  field.innerHTML=`<span>${label}</span><div><input type="color" id="color-${key}" aria-label="${label} color"><output id="color-value-${key}"></output></div>`;
  field.querySelector('input').addEventListener('input',e=>{config.customTheme[key]=e.target.value;$('color-value-'+key).textContent=e.target.value;render();});
  $('theme-colors').append(field);
}
$('close-custom-theme').addEventListener('click',()=>$('custom-theme-picker').close());
$('apply-theme').addEventListener('click',()=>$('custom-theme-picker').close());
$('reset-colors').addEventListener('click',()=>{config.customTheme={...THEMES.light};syncControls();});
function openTravelerPicker(){
  $('traveler-options').replaceChildren();
  for(const [name,element]of Object.entries(TRAVELERS)){
    const button=document.createElement('button');button.className='icon-option';button.setAttribute('aria-label',element.name+' moving element');button.setAttribute('aria-pressed',name===config.traveler);
    button.innerHTML=(element.icon?icon(element.icon):'<span class="picker-dot" aria-hidden="true"></span>')+`<span>${element.name}</span>`;
    button.addEventListener('click',()=>{config.traveler=name;syncControls();$('traveler-picker').close();});
    $('traveler-options').append(button);
  }
  $('traveler-picker').showModal();$('traveler-options').querySelector('[aria-pressed=true]').focus();
}
$('traveler-button').addEventListener('click',openTravelerPicker);
$('close-traveler-picker').addEventListener('click',()=>$('traveler-picker').close());
$('speed').addEventListener('input',e=>{config.duration=Number(e.target.value);render();});
$('reset').addEventListener('click',()=>{config=normalizeConfig();paused=false;updatePause();syncControls();toast('Workflow reset. A fresh start.');});
function updatePause(){$('pause').innerHTML=icon(paused?'play':'pause');$('pause').setAttribute('aria-label',paused?'Play animation':'Pause animation');$('pause').title=paused?'Play animation':'Pause animation';}
$('pause').addEventListener('click',()=>{paused=!paused;updatePause();document.querySelectorAll('#preview .animated,#custom-theme-preview .animated').forEach(el=>el.style.animationPlayState=paused?'paused':'running');});
function selectTab(tab){activeTab=tab;for(const t of ['markdown','svg']){$(t+'-tab').classList.toggle('active',t===tab);$(t+'-tab').setAttribute('aria-selected',t===tab);$(t+'-tab').tabIndex=t===tab?0:-1;}updateCode();}
for(const tab of ['markdown','svg']){$(tab+'-tab').addEventListener('click',()=>selectTab(tab));$(tab+'-tab').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'markdown':e.key==='End'?'svg':tab==='markdown'?'svg':'markdown';selectTab(next);$(next+'-tab').focus();}});}
async function copy(text,message){
  let copied=false;
  if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(text);copied=true;}catch{/* Local files may deny Clipboard API access. Try selection-based copying. */}}
  if(!copied){
    const previousFocus=document.activeElement,el=document.createElement('textarea');
    el.value=text;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();
    try{copied=document.execCommand('copy');}catch{/* Manual copying remains available. */}finally{el.remove();previousFocus?.focus();}
  }
  if(copied)toast(message);
  else{$('manual-copy-value').value=text;$('manual-copy').showModal();$('manual-copy-value').focus();$('manual-copy-value').select();}
}
$('copy-markdown').addEventListener('click',()=>copy(markdown(),$('embed-mode').value==='local'?'Markdown copied. Add workflow.svg to your repo.':'Markdown copied. Paste it directly into your README.'));
$('copy-code').addEventListener('click',()=>copy(activeTab==='markdown'?markdown():renderSvg(config),'Code copied to clipboard.'));
$('download').addEventListener('click',()=>{const blob=new Blob([renderSvg(config)],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='workflow.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('SVG downloaded. Your README is ready for some flow.');});
$('share').addEventListener('click',()=>{const url=new URL(location.protocol==='file:'?EDITOR_URL:location.href);url.search=workflowParams(config);url.hash='';copy(url.href,'Editor link copied. All your settings included.');});
for(const [name,preset]of Object.entries(PRESETS)){
  if(!$('preset').querySelector(`option[value="${name}"]`)){const option=document.createElement('option');option.value=name;option.textContent=preset.name;$('preset').append(option);}
  const button=document.createElement('button');button.className='example';button.dataset.preset=name;
  button.innerHTML=`<div class="example-top"><span class="example-icon">${icon(preset.icons[0])}</span><span class="example-link">${icon('arrow')}</span></div><h3>${preset.name}</h3><p>${preset.description}</p><div class="example-steps">${preset.steps.map(step=>`<span>${step}</span>`).join('<i>→</i>')}</div>`;
  $('examples').append(button);
}
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{choosePreset(b.dataset.preset);document.querySelector('.builder').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});toast(PRESETS[b.dataset.preset].name+' preset loaded.');}));
const extraControls={'workflow-title':'title','workflow-subtitle':'subtitle',layout:'layout',columns:'columns','connection-mode':'connectionMode',routing:'routing','line-style':'lineStyle','line-width':'lineWidth',arrows:'arrows',font:'font',spacing:'spacing',radius:'radius','traveler-size':'travelerSize','show-numbers':'showNumbers',transparent:'transparent'};
for(const [id,key]of Object.entries(extraControls))$(id).addEventListener('input',()=>{
  const input=$(id);
  if(key==='connectionMode'&&input.value==='custom'&&config.connectionMode!=='custom'&&!config.connections.length)config.connections=config.steps.slice(1).map((_,i)=>({from:i,to:i+1,label:''}));
  config[key]=input.type==='checkbox'?input.checked:['columns','lineWidth','spacing','radius','travelerSize'].includes(key)?Number(input.value):input.value;
  config=normalizeConfig(config);if(key==='connectionMode')renderConnections();render();
});
function renderConnections(){
  $('connection-editor').hidden=config.connectionMode!=='custom';$('connections').replaceChildren();
  config.connections.forEach((edge,index)=>{
    const row=document.createElement('div');row.className='connection-row';
    for(const key of ['from','to']){
      const select=document.createElement('select');select.setAttribute('aria-label',`Connection ${index+1} ${key}`);
      config.steps.forEach((label,i)=>{const option=document.createElement('option');option.value=i;option.textContent=`${i+1}. ${label}`;option.selected=edge[key]===i;option.disabled=key==='from'?i===edge.to:i===edge.from;select.append(option);});
      select.addEventListener('change',()=>{const next={...edge,[key]:Number(select.value)};if(config.connections.some((e,j)=>j!==index&&e.from===next.from&&e.to===next.to)){toast('That connection already exists.');renderConnections();return;}config.connections[index]=next;renderConnections();render();});row.append(select);
    }
    const label=document.createElement('input');label.maxLength=24;label.placeholder='Line label (optional)';label.value=edge.label;label.setAttribute('aria-label',`Connection ${index+1} label`);label.addEventListener('input',()=>{config.connections[index].label=label.value;render();});row.append(label);
    const actions=document.createElement('div');actions.className='connection-actions';
    for(const direction of [-1,1]){const move=document.createElement('button');move.className='icon-button';move.textContent=direction<0?'↑':'↓';move.setAttribute('aria-label',`Move connection ${index+1} ${direction<0?'up':'down'}`);move.disabled=index+direction<0||index+direction>=config.connections.length;move.addEventListener('click',()=>{[config.connections[index],config.connections[index+direction]]=[config.connections[index+direction],config.connections[index]];renderConnections();render();});actions.append(move);}
    const remove=document.createElement('button');remove.className='icon-button';remove.setAttribute('aria-label',`Remove connection ${index+1}`);remove.innerHTML=icon('close');remove.addEventListener('click',()=>{config.connections.splice(index,1);renderConnections();render();});actions.append(remove);row.append(actions);$('connections').append(row);
  });
  $('add-connection').disabled=config.connections.length>=24;
}
$('add-connection').addEventListener('click',()=>{
  if(config.connections.length>=24)return;
  for(let from=0;from<config.steps.length;from++)for(let to=0;to<config.steps.length;to++)if(from!==to&&!config.connections.some(e=>e.from===from&&e.to===to)){config.connections.push({from,to,label:''});renderConnections();render();return;}
  toast('All steps are already connected.');
});
selectTab('markdown');syncControls();
