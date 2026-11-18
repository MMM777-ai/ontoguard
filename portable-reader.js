/* Portable read-only evidence transport. HTTP uses actual served resources; file mode uses exact packaged snapshot bytes. */
(()=>{'use strict';
 const root=new URL('.',document.currentScript.src), local=location.protocol==='file:';
 if(local)document.documentElement.classList.add('portable-file');
 const nativeFetch=globalThis.fetch.bind(globalThis);let pending;
 const resolve=path=>new URL(path.startsWith('/')&&!path.startsWith('//')?path.slice(1):path,path.startsWith('/')&&!path.startsWith('//')?root:location.href);
 function key(path){const u=resolve(path);if(u.protocol!==root.protocol||u.host!==root.host||!u.pathname.startsWith(root.pathname))throw Error('Evidence path outside site');return decodeURIComponent(u.pathname.slice(root.pathname.length));}
 function load(){if(!pending)pending=new Promise((yes,no)=>{const s=document.createElement('script');s.src=new URL('portable-evidence.js',root).href;s.onload=()=>globalThis.OGPortableEvidence?yes(globalThis.OGPortableEvidence):no(Error('Portable evidence bundle missing'));s.onerror=()=>no(Error('Portable evidence bundle unavailable'));document.head.append(s);});return pending;}
 async function read(path,options){if(!local)return nativeFetch(resolve(path),options);const files=await load(),k=key(path);if(!Object.hasOwn(files,k))return new Response(null,{status:404});const b=Uint8Array.from(atob(files[k]),c=>c.charCodeAt(0));return new Response(b,{status:200});}
 globalThis.OGRead=Object.freeze({local,fetch:read,url:path=>resolve(path).href});
})();
