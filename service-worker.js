if(!self.define){let e,i={};const s=(s,o)=>(s=new URL(s+".js",o).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(o,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let l={};const t=e=>s(e,n),c={module:{uri:n},exports:l,require:t};i[n]=Promise.all(o.map((e=>c[e]||t(e)))).then((e=>(r(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"memo-clip"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/MemoClipApp/css/app.6ababbab.css",revision:null},{url:"/MemoClipApp/index.html",revision:"cccdbfb7b6dc73aa32b1c85c929e6862"},{url:"/MemoClipApp/js/app.9e13e69a.js",revision:null},{url:"/MemoClipApp/js/chunk-vendors.a6ba2800.js",revision:null},{url:"/MemoClipApp/manifest.json",revision:"69e089bea0e974249018acde4dd2e93a"},{url:"/MemoClipApp/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
