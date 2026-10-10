import {ICONS,PRESETS,STEP_ICONS,normalizeConfig,renderSvg} from './svg.js';
const $=id=>document.getElementById(id);
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.file}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
let config=normalizeConfig(), paused=false, activeTab='markdown',toastTimer,iconStep=null;
try {
  const query=new URLSearchParams(location.search);
  if(query.has('steps')) config=normalizeConfig({steps:JSON.parse(query.get('steps')),icons:query.has('icons')?JSON.parse(query.get('icons')):undefined,theme:query.get('theme'),traveler:query.get('traveler'),duration:query.get('duration'),preset:query.get('preset')});
  else {const saved=localStorage.getItem('readme-flow-config');if(saved) config=normalizeConfig(JSON.parse(saved));}
} catch { toast('Could not load saved settings. Starting with a fresh workflow.'); }
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function markdown(){return `![${config.steps.join(' → ').replace(/[\[\]\\\n\r]/g,' ')}](./workflow.svg)`;}
function updateCode(){$('code').textContent=activeTab==='markdown'?markdown():renderSvg(config);$('code-content').setAttribute('aria-labelledby',activeTab==='markdown'?'markdown-tab':'svg-tab');}
function render(){
  $('preview').innerHTML=renderSvg(config,paused);
  $('preview-canvas').className='preview-canvas '+(config.theme==='light'?'':config.theme+'-preview');
  $('workflow-name').textContent=PRESETS[config.preset].name+' workflow';
  $('preview-meta').textContent=`${config.steps.length} steps · ${config.duration}s loop`;
  $('step-count').textContent=`${config.steps.length} / 6`;
  $('add-step').disabled=config.steps.length>=6;
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
    input.addEventListener('blur',()=>{config=normalizeConfig(config);input.value=config.steps[i];render();});
    row.querySelector('.step-icon-button').addEventListener('click',()=>openIconPicker(i));
    row.querySelector('.remove-step').addEventListener('click',()=>{config.steps.splice(i,1);config.icons.splice(i,1);renderSteps();render();});
    const reorder=(direction)=>{for(const values of [config.steps,config.icons])[values[i],values[i+direction]]=[values[i+direction],values[i]];renderSteps();render();$('steps').children[i+direction].querySelector('input').focus();};
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
  document.querySelectorAll('[data-theme]').forEach(b=>{const selected=b.dataset.theme===config.theme;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
  document.querySelectorAll('[data-traveler]').forEach(b=>{const selected=b.dataset.traveler===config.traveler;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected);});
  $('preset-icon').innerHTML=icon(config.preset==='api'?'request':config.preset==='deploy'?'deploy':'file');
  renderSteps();render();
}
function choosePreset(preset){config=normalizeConfig({...config,preset,steps:PRESETS[preset].steps.slice(),icons:PRESETS[preset].icons.slice()});syncControls();}
$('preset').addEventListener('change',e=>choosePreset(e.target.value));
$('add-step').addEventListener('click',()=>{if(config.steps.length>=6)return;config.steps.push('Step '+(config.steps.length+1));config.icons.push('file');renderSteps();render();openIconPicker(config.steps.length-1);});
document.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>{config.theme=b.dataset.theme;syncControls();}));
document.querySelectorAll('[data-traveler]').forEach(b=>b.addEventListener('click',()=>{config.traveler=b.dataset.traveler;syncControls();}));
$('speed').addEventListener('input',e=>{config.duration=Number(e.target.value);render();});
$('reset').addEventListener('click',()=>{config=normalizeConfig();paused=false;updatePause();syncControls();toast('Workflow reset. A fresh start.');});
function updatePause(){$('pause').innerHTML=icon(paused?'play':'pause');$('pause').setAttribute('aria-label',paused?'Play animation':'Pause animation');$('pause').title=paused?'Play animation':'Pause animation';}
$('pause').addEventListener('click',()=>{paused=!paused;updatePause();$('preview').querySelectorAll('.stage,.traveler').forEach(el=>el.style.animationPlayState=paused?'paused':'running');});
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
$('copy-markdown').addEventListener('click',()=>copy(markdown(),'Markdown copied. Add workflow.svg to your repo.'));
$('copy-code').addEventListener('click',()=>copy(activeTab==='markdown'?markdown():renderSvg(config),'Code copied to clipboard.'));
$('download').addEventListener('click',()=>{const blob=new Blob([renderSvg(config)],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='workflow.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('SVG downloaded. Your README is ready for some flow.');});
$('share').addEventListener('click',()=>{const url=new URL(location.protocol==='file:'?'https://infinuts.github.io/readme-flow-svg/':location.href);url.search='';url.hash='';for(const [k,v]of Object.entries(config))url.searchParams.set(k,Array.isArray(v)?JSON.stringify(v):v);copy(url.href,'Editor link copied. All your settings included.');});
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{choosePreset(b.dataset.preset);document.querySelector('.builder').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});toast(PRESETS[b.dataset.preset].name+' preset loaded.');}));
selectTab('markdown');syncControls();
