if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),a={module:{uri:o},exports:t,require:l};s[o]=Promise.all(r.map((e=>a[e]||l(e)))).then((e=>(n(...e),t)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"memo-clip"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/404.html",revision:"a4e2271d19eb1f6f93a15e1b7a4e74dd"},{url:"/css/app.6ababbab.css",revision:null},{url:"/firebase-messaging-sw.js",revision:"59467798c88e2f6280951bba34a3ddb2"},{url:"/index.html",revision:"6b094e934f2ae32ab75e93d4c8b4aa9f"},{url:"/js/app.55222282.js",revision:null},{url:"/js/chunk-vendors.5739e38a.js",revision:null},{url:"/manifest.json",revision:"69e089bea0e974249018acde4dd2e93a"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
