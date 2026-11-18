(() => {
'use strict';
const state={fallback:null,cases:[],selected:null,activeFilter:'ALL'};
const $=id=>document.getElementById(id);
const value=(v,f='—')=>v===undefined||v===null||v===''?f:String(v);
const pretty=v=>value(v).replaceAll('_',' ');
const yn=v=>v===true?'YES':v===false?'NO':value(v);
const cls=v=>String(v||'').toLowerCase();
const icon=d=>d==='ALLOW'?'✓':d==='BLOCK'?'■':'↗';
function track(name,props={}){try{if(typeof window.plausible==='function')window.plausible(name,{props});}catch(_){}}
async function fetchJSON(url){const r=await OGRead.fetch(url,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}
function clear(node){while(node.firstChild)node.removeChild(node.firstChild);}
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
async function load(){
  state.fallback=await fetchJSON('./proof-explorer-data.json');
  state.cases=[...new Map([state.fallback.single_event,...state.fallback.batch.cases,...(state.fallback.demonstrations||[])].map(c=>[c.id,c])).values()];
  render();
}
function render(){renderScenarios();selectCase(state.cases[0].id,false);renderBatch();renderDemonstrations();}
function renderScenarios(){
  const wrap=$('scenario-controls');clear(wrap);
  state.cases.forEach((c,i)=>{
    const b=node('button',undefined,'pe-scenario-button');
    b.type='button';b.dataset.caseId=c.id;
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.append(node('span',(c.source_classification||'Public-safe').replace('Current accepted','Historical accepted')));
    b.append(node('strong',c.short_name));
    b.append(node('em',icon(c.decision)+' '+c.decision,cls(c.decision)));
    wrap.append(b);
  });
}
let verifyGeneration=0;
function resetVerification(){verifyGeneration++;const b=$('verify-button');b.disabled=false;b.textContent='Run public packet verification';$('verifier-result').textContent='Not run';$('verification-counts').textContent='Historical receipt applies only to financial recommendation; selected case not independently verified';setProgress(0);for(let i=0;i<3;i++)setRow(i,'NOT RUN','Not run');}
function selectCase(id,announce=true){
  const c=state.cases.find(x=>x.id===id)||state.cases[0];
  if(!c)return;
  state.selected=c;
  resetVerification();
  document.querySelectorAll('.pe-scenario-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseId===c.id)));
  $('case-source').textContent=value(c.source_classification).replace('Current accepted','Historical accepted');
  $('case-sector').textContent=value(c.sector);
  $('case-title').textContent=value(c.short_name);
  $('attempted-movement').textContent=value(c.attempted_movement);
  $('protected-effect-value').textContent=value(c.protected_effect);
  const card=$('decision-card');card.className='pe-decision-card '+cls(c.decision);
  $('decision-icon').textContent=icon(c.decision);
  $('decision-value').textContent=value(c.decision);
  $('release-authorized').textContent=yn(c.release_authorized);
  $('release-status').textContent=pretty(c.release_status);
  $('human-review-required').textContent=yn(c.human_review_required);
  const illustration=(state.fallback.demonstrations||[]).some(x=>x.id===c.id);$('protected-effect-formed').textContent=illustration?'UNKNOWN observed · illustrative expectation '+yn(c.protected_effect_formed):yn(c.protected_effect_formed);
  $('downstream-commit').textContent=illustration?'UNKNOWN observed · simulated '+String(c.commit_count??'UNKNOWN'):String(c.commit_count??'UNKNOWN');$('selected-artifact').textContent=c.id==='financial-recommendation'?'Historical financial recommendation receipt available; current freshness NOT RUN.':'Selected case receipt NOT AVAILABLE; website verification is global only.';
  $('proof-scope').textContent=pretty(c.proof_scope||'CONTROLLED_PUBLIC_PROOF');
  renderLifecycle(c.lifecycle||[]);
  if(announce)$('case-announcement').textContent='Selected '+c.short_name+'. Decision '+c.decision+'.';
}
const stageNames=['Proposed action','Decision Authorization','Release control','Execution / review','Consequence evidence'];
function renderLifecycle(stages){
  const ol=$('lifecycle');if(!ol)return;clear(ol);
  const src=stages.length?stages.slice(0,5):stageNames.map((label,i)=>({label,buyer_value:label,status:''}));
  src.forEach((s,i)=>{
    const li=node('li');
    li.append(node('span',String(i+1),'pe-stage-number'));
    li.append(node('h3',s.label||stageNames[i]||'Stage'));
    li.append(node('p',value(s.buyer_value,s.label||'')));
    ol.append(li);
  });
}
function batchSummary(cases){
  const counts={ALLOW:0,ESCALATE:0,BLOCK:0};
  for(const c of cases)if(counts[c.decision]!=null)counts[c.decision]++;
  const aggregate=counts.BLOCK?'BLOCK':counts.ESCALATE?'ESCALATE':cases.length&&counts.ALLOW===cases.length?'ALLOW':'UNKNOWN';
  return {counts,aggregate,authorized:cases.length>0&&cases.every(c=>c.release_authorized===true),review:cases.filter(c=>c.human_review_required||c.decision==='BLOCK').length,total:cases.length};
}
function renderBatch(){
  const cases=state.fallback.batch.cases;
  const s=batchSummary(cases);
  $('batch-total').textContent=String(s.total);
  $('all-count').textContent=String(s.total);
  $('allow-count').textContent=String(s.counts.ALLOW);
  $('escalate-count').textContent=String(s.counts.ESCALATE);
  $('block-count').textContent=String(s.counts.BLOCK);
  $('aggregate-decision').textContent=s.aggregate;
  $('aggregate-release').textContent=s.authorized?'AUTHORIZED':'WITHHELD';
  $('review-count').textContent=s.review+' of '+s.total;
  const total=Math.max(1,s.total),a=s.counts.ALLOW/total*100,e=s.counts.ESCALATE/total*100,b=s.counts.BLOCK/total*100;
  const donut=$('decision-donut');
  donut.style.background=`conic-gradient(var(--pe-allow) 0 ${a}%, var(--pe-escalate) ${a}% ${a+e}%, var(--pe-block) ${a+e}% 100%)`;
  renderTable(cases);
}
function addRow(body,c,extra){
  const tr=node('tr');tr.dataset.decision=c.decision;tr.dataset.caseId=c.id;
  const td1=node('td'),button=node('button',c.short_name,'pe-case-select');
  button.type='button';button.dataset.caseId=c.id;
  td1.append(button);td1.append(node('br'));td1.append(node('small',c.sector+(extra||'')));
  tr.append(td1);tr.append(node('td',c.attempted_movement));
  const td3=node('td');td3.append(node('span',icon(c.decision)+' '+c.decision,'pe-decision-label '+cls(c.decision)));
  tr.append(td3);tr.append(node('td',pretty(c.release_status)));
  tr.append(node('td',extra?'UNKNOWN observed · expected '+yn(c.protected_effect_formed):yn(c.protected_effect_formed)));
  body.append(tr);
}
function renderTable(cases){const body=$('case-table-body');clear(body);cases.forEach(c=>addRow(body,c));applyFilter(state.activeFilter,false);}
function renderDemonstrations(){const body=$('demo-table-body');if(!body)return;clear(body);(state.fallback.demonstrations||[]).forEach(c=>addRow(body,c,' · illustrative'));}
function applyFilter(filter,announce=true){
  state.activeFilter=filter;let visible=0;
  document.querySelectorAll('#case-table-body tr').forEach(tr=>{const show=filter==='ALL'||tr.dataset.decision===filter;tr.hidden=!show;if(show)visible++;});
  document.querySelectorAll('#batch-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  if(announce)$('filter-status').textContent='Showing '+visible+' case'+(visible===1?'':'s')+'.';
}
function setProgress(n){const v=Math.max(0,Math.min(100,n));const bar=$('verification-progress');bar.setAttribute('aria-valuenow',String(v));bar.firstElementChild.style.width=v+'%';}
function setRow(i,stateName,label){const row=$('verification-list').children[i];if(!row)return;row.className=(stateName||'').toLowerCase();row.querySelector('strong').textContent=label;}
async function sha256(buffer){const digest=await crypto.subtle.digest('SHA-256',buffer);return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');}
async function verifyPacket(){
 resetVerification();const generation=verifyGeneration;const live=()=>generation===verifyGeneration;const btn=$('verify-button');btn.disabled=true;btn.textContent='Verifying…';$('verifier-result').textContent='Running';setProgress(0);
 let checked=0,verified=0,missing=0,mismatch=0;
 try{
  if(!globalThis.crypto?.subtle)throw Error('Web Crypto unavailable');
  if(!state.fallback)throw Error('Case data unavailable');
  const manifest=await fetchJSON('./website-manifest-v4.json');
  if(!live())return;const listed=['index.html','proof-explorer-data.json','proof-explorer.css','proof-explorer.js','public-receipt.json','reference-v4.js','extended.js'];
  if(manifest.schema!=='ontoguard.website.explorer@4'||manifest.release_id!=='ontoguard-website-20261118-r4'||manifest.version!=='4'||!Array.isArray(manifest.files)||manifest.files.length!==listed.length||new Set(manifest.files.map(f=>f.name)).size!==listed.length||!listed.every(n=>manifest.files.some(f=>f.name===n&&/^[0-9a-f]{64}$/.test(f.sha256)&&Number.isSafeInteger(f.length)&&f.length>0)))throw Error('Invalid website manifest');
  setRow(0,'PASS','PASS');
  const bytes={};for(const name of listed){checked++;const f=manifest.files.find(x=>x.name===name);try{const r=await OGRead.fetch('./'+name,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('HTTP '+r.status);const raw=await r.arrayBuffer();bytes[name]=raw;const digest=await sha256(raw);if(!live())return;if(digest===f.sha256&&raw.byteLength===f.length)verified++;else mismatch++;}catch(e){missing++;}if(!live())return;setProgress(Math.round(checked/listed.length*90));$('verification-counts').textContent=checked+' checked · '+verified+' matched · '+mismatch+' mismatches · '+missing+' unavailable';}
  let parity=null;if(bytes['public-receipt.json']&&bytes['proof-explorer-data.json']){const decode=b=>JSON.parse(new TextDecoder().decode(b)),rec=decode(bytes['public-receipt.json']),d=decode(bytes['proof-explorer-data.json']),ev=d.single_event;parity=JSON.stringify(d)===JSON.stringify(state.fallback)&&ev.id==='financial-recommendation'&&rec.scenario===ev.short_name&&rec.decision===ev.decision&&rec.release_authorized===ev.release_authorized&&rec.release_status===ev.release_status&&rec.protected_effect_formed===ev.protected_effect_formed&&rec.commit_status===(ev.commit_count===0?'NOT_COMMITTED':'COMMITTED')&&rec.human_review_status===(ev.human_review_required?'REQUIRED':'NOT_REQUIRED')&&rec.proof_scope===ev.proof_scope;}
  setRow(2,parity===true?'PASS':parity===false?'FAIL':'UNAVAILABLE',parity===true?'PASS · financial recommendation only':parity===false?'FAIL':'UNAVAILABLE');
  const result=mismatch||parity===false?'FAIL':missing||parity!==true?'UNAVAILABLE':'PASS';setRow(1,result,verified+'/'+checked+' matched');$('verifier-result').textContent=result==='PASS'?'PASS · website bytes / historical receipt only':result;
 }catch(e){if(!live())return;$('verifier-result').textContent=(mismatch?'FAIL · ':'UNAVAILABLE · ')+e.message;setRow(0,'UNAVAILABLE','UNAVAILABLE');setRow(1,'UNAVAILABLE','UNAVAILABLE');setRow(2,'UNAVAILABLE','UNAVAILABLE');}
 finally{if(live()){btn.disabled=false;btn.textContent='Run public packet verification';setProgress(100);}}
}
document.addEventListener('click',e=>{
  const sc=e.target.closest('.pe-scenario-button');if(sc){selectCase(sc.dataset.caseId);return;}
  const fl=e.target.closest('#batch-filters button[data-filter]');if(fl){applyFilter(fl.dataset.filter);return;}
  const row=e.target.closest('.pe-case-select');if(row){selectCase(row.dataset.caseId);$('decision-explorer').scrollIntoView({behavior:'smooth'});return;}
});
$('verify-button')&&$('verify-button').addEventListener('click',verifyPacket);
document.addEventListener('DOMContentLoaded',()=>{load().catch(()=>{const n=$('public-data-notice');n.hidden=false;n.textContent='The Proof Explorer could not load its public cases.';});});
})();
