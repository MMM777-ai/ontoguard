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
async function fetchJSON(url){const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}
function clear(node){while(node.firstChild)node.removeChild(node.firstChild);}
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
async function load(){
  state.fallback=await fetchJSON('./proof-explorer-data.json');
  state.cases=[state.fallback.single_event,...state.fallback.batch.cases,...(state.fallback.demonstrations||[])];
  render();
}
function render(){renderScenarios();selectCase(state.cases[0].id,false);renderBatch();renderDemonstrations();}
function renderScenarios(){
  const wrap=$('scenario-controls');clear(wrap);
  state.cases.forEach((c,i)=>{
    const b=node('button',undefined,'pe-scenario-button');
    b.type='button';b.dataset.caseId=c.id;
    b.setAttribute('aria-pressed',i===0?'true':'false');
    b.append(node('span',c.source_classification||'Public-safe'));
    b.append(node('strong',c.short_name));
    b.append(node('em',icon(c.decision)+' '+c.decision,cls(c.decision)));
    wrap.append(b);
  });
}
function selectCase(id,announce=true){
  const c=state.cases.find(x=>x.id===id)||state.cases[0];
  if(!c)return;
  state.selected=c;
  document.querySelectorAll('.pe-scenario-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.caseId===c.id)));
  $('case-source').textContent=value(c.source_classification);
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
  $('protected-effect-formed').textContent=yn(c.protected_effect_formed);
  $('downstream-commit').textContent=String(c.commit_count==null?(c.protected_effect_formed?1:0):c.commit_count);
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
  tr.append(node('td',c.protected_effect_formed?'YES':'NO'));
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
  const btn=$('verify-button');btn.disabled=true;btn.textContent='Verifying…';
  $('verifier-result').textContent='Running';setProgress(8);
  const listed=['index.html','proof-explorer-data.json','proof-explorer.css','proof-explorer.js','public-receipt.json','public-manifest.json'];
  let checked=0,verified=0,mismatch=0,missing=0;
  try{
    const raw=await (await fetch('./CHECKSUMS.sha256?ts='+Date.now(),{cache:'no-store'})).text();
    setRow(0,'PASS','PASS');
    const expect={};
    for(const line of raw.split(/\n/)){const m=line.trim().match(/^([0-9a-f]{64})\s+(\S+)$/i);if(m)expect[m[2]]=m[1].toLowerCase();}
    for(let i=0;i<listed.length;i++){
      const name=listed[i];checked++;
      try{
        const r=await fetch('./'+name+'?ts='+Date.now(),{cache:'no-store'});
        if(!r.ok){missing++;continue;}
        const actual=await sha256(await r.arrayBuffer());
        if(expect[name]&&actual===expect[name])verified++;else mismatch++;
      }catch(_){missing++;}
      setProgress(15+Math.round((i+1)/listed.length*70));
      $('verification-counts').textContent=checked+' files checked · '+verified+' verified';
    }
    const rec=await fetchJSON('./public-receipt.json');
    const ev=state.fallback.single_event;
    const parity=!!ev&&rec.decision===ev.decision&&rec.release_authorized===ev.release_authorized;
    setRow(2,parity?'PASS':'MISMATCH',parity?'PASS':'FAIL');
    const result=mismatch?'MISMATCH':missing?'PARTIAL':'PASS';
    setRow(1,result,result==='PASS'?(verified+'/'+checked+' PASS'):result);
    $('verifier-result').textContent=result;
  }catch(_){$('verifier-result').textContent='UNAVAILABLE';setRow(0,'UNAVAILABLE','FAIL');}
  btn.disabled=false;btn.textContent='Run public packet verification';setProgress(100);
}
document.addEventListener('click',e=>{
  const sc=e.target.closest('.pe-scenario-button');if(sc){selectCase(sc.dataset.caseId);return;}
  const fl=e.target.closest('#batch-filters button[data-filter]');if(fl){applyFilter(fl.dataset.filter);return;}
  const row=e.target.closest('.pe-case-select');if(row){selectCase(row.dataset.caseId);$('decision-explorer').scrollIntoView({behavior:'smooth'});return;}
});
$('verify-button')&&$('verify-button').addEventListener('click',verifyPacket);
document.addEventListener('DOMContentLoaded',()=>{load().catch(()=>{const n=$('public-data-notice');n.hidden=false;n.textContent='The Proof Explorer could not load its public cases.';});});
})();
