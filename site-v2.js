'use strict';
// No third-party analytics. Inquiry submission uses a native HTML POST to FormSubmit.
document.addEventListener('click',e=>{for(const d of document.querySelectorAll('.nav details[open]'))if(!d.contains(e.target))d.open=false;});
document.addEventListener('keydown',e=>{if(e.key==='Escape')for(const d of document.querySelectorAll('.nav details[open]')){d.open=false;d.querySelector('summary').focus();}});
const f=document.getElementById('inquiry');
if(f){
 const submit=f.querySelector('button[type=submit]'),status=document.getElementById('form-status'),done=document.getElementById('form-done');
 const params=new URLSearchParams(location.search);const src=/^[a-z0-9-]{1,80}$/.test(params.get('src')||'')?params.get('src'):'direct';
 for(const k of ['product','intent']){const field=f.elements[k],v=k==='intent'&&params.get(k)==='oem'?'licensing':params.get(k);if([...field.options].some(o=>o.value===v))field.value=v;}
 f.elements.src.value=src;
 if(params.get('sent')==='1'){f.hidden=true;done.hidden=false;done.focus();}
 let sending=false;
 const label=k=>f.elements[k].selectedOptions[0].textContent.trim();
 f.addEventListener('submit',e=>{
  if(sending){e.preventDefault();return;}
  const org=f.elements.organization.value.replace(/[\r\n\x00-\x1f\x7f]/g,' ').trim();
  f.elements._subject.value='Website inquiry: '+label('product')+' / '+label('intent')+' | '+org;
  sending=true;submit.disabled=true;submit.textContent='Sending…';status.textContent='Sending…';
  // Allow the browser's default POST. No fetch, mailto or JavaScript dependency.
 });
 window.addEventListener('pageshow',()=>{sending=false;submit.disabled=false;submit.textContent='Send message';status.textContent='';});
}

const rf=document.getElementById('resource-filter');if(rf){const apply=()=>{let n=0;for(const el of document.querySelectorAll('[data-resource]')){el.hidden=['product','kind','status','date'].some(k=>rf.elements[k]&&rf.elements[k].value!=='all'&&rf.elements[k].value!==el.dataset[k]);if(!el.hidden)n++;}document.getElementById('resource-count').textContent=n+' resources visible';};rf.addEventListener('change',apply);apply();}

// Direct-file navigation to portable views; immutable historical HTML remains unchanged.
if(location.protocol==='file:')document.addEventListener('DOMContentLoaded',()=>{for(const a of document.querySelectorAll('a[href]:not([download])')){const u=new URL(a.href,location.href);if(u.protocol==='file:'&&/\/proof-explorer-(?:v1|r(?:4|5|6|7|8|9|10|11))\/(?:index\.html)?$/.test(u.pathname)){u.pathname=u.pathname.replace(/(?:index\.html)?$/,'local-view.html');a.href=u.href;}}});

// Preserve legacy deep links when technical evidence is progressively disclosed.
function revealEvidenceAnchor(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}if(!id)return;const el=document.getElementById(id);if(!el)return;let par=el.parentElement;while(par){if(par.tagName==='DETAILS'&&par.classList.contains('sales-detail'))par.open=true;par=par.parentElement;}if(el.closest('.sales-detail'))requestAnimationFrame(()=>el.scrollIntoView({block:'start'}));}
window.addEventListener('hashchange',revealEvidenceAnchor);document.addEventListener('DOMContentLoaded',revealEvidenceAnchor);

// Fit each expanded desktop menu inside the viewport. Mobile menus participate in layout.
(()=>{const selector='.mast .nav details';const fit=d=>{const m=d.querySelector(':scope > .dropdown');if(!m||!d.open)return;m.style.setProperty('--menu-offset','0px');if(matchMedia('(max-width: 1120px)').matches)return;const r=m.getBoundingClientRect(),edge=16;const offset=r.right>innerWidth-edge?innerWidth-edge-r.right:r.left<edge?edge-r.left:0;m.style.setProperty('--menu-offset',`${offset}px`);};document.addEventListener('toggle',e=>{const d=e.target;if(!(d instanceof HTMLDetailsElement)||!d.matches(selector)||!d.open)return;for(const x of document.querySelectorAll(selector+'[open]'))if(x!==d)x.open=false;fit(d);},true);window.addEventListener('resize',()=>document.querySelectorAll(selector+'[open]').forEach(fit));})();
