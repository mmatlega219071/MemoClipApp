if(!self.define){let e,i={};const s=(s,o)=>(s=new URL(s+".js",o).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(o,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let l={};const c=e=>s(e,n),t={module:{uri:n},exports:l,require:c};i[n]=Promise.all(o.map((e=>t[e]||c(e)))).then((e=>(r(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"memo-clip"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/MemoClipApp/css/app.94bf5c8c.css",revision:null},{url:"/MemoClipApp/index.html",revision:"60c28ad02b01cc1b90a05b9d692d9a19"},{url:"/MemoClipApp/js/app.4f51ed07.js",revision:null},{url:"/MemoClipApp/js/chunk-vendors.21e886cd.js",revision:null},{url:"/MemoClipApp/manifest.json",revision:"600c26422d66ecad9b997ae5419fb0c7"},{url:"/MemoClipApp/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
