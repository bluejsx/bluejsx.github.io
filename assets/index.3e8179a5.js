var e,t,s,r=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)},i=(e,t,s)=>(r(e,t,"read from private field"),s?s.call(e):t.get(e)),n=(e,t,s,i)=>(r(e,t,"write to private field"),i?i.call(e,s):t.set(e,s),s);import{V as a,u as l}from"./vendor.d7091eae.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(s){const r=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((s,n)=>{const a=new URL(e,r);if(self[t].moduleMap[a])return s(self[t].moduleMap[a]);const l=new Blob([`import * as m from '${a}';`,`${t}.moduleMap['${a}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){n(new Error(`Failed to import: ${e}`)),i(o)},onload(){s(self[t].moduleMap[a]),i(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("assets/");const o=[["View the Source Code of This Page","https://github.com/vanillajsx/vanillajsx.github.io"],["Document","https://github.com/vanillajsx/VanillaJSX/tree/master/doc"],["GitHub Repository","https://github.com/vanillajsx/VanillaJSX"],["Join Discussions","https://github.com/vanillajsx/VanillaJSX/discussions"]],c=()=>{const e=a.r("div",{id:"h-menu-button"},a.r("span",null),a.r("span",null)),t=a.r("div",{id:"backfield"}),s=a.r("div",{class:"menu_list_container hidden"},e,a.r("div",{class:"menu-list"},o.map((e=>{const t=a.r("p",null,e[0]);return t.onclick=()=>window.open(e[1]),t}))),t);return l(s,"open",!1),s.watch("open",(e=>{e?s.classList.remove("hidden"):s.classList.add("hidden")})),t.onclick=()=>s.open=!1,e.onclick=()=>s.open=!s.open,s};const d=()=>a.r("header",null,a.r("div",{class:"_title_69m70_12"},"Vanilla.JSX"),a.r(c,null));let u;const h={};const p="_main_8b2wh_1";class m extends HTMLElement{constructor(...r){super(...r),e.set(this,1),t.set(this,null),s.set(this,void 0),n(this,s,a.r("div",{part:"bar"}));this.attachShadow({mode:"closed"}).appendChild(i(this,s))}static get observedAttributes(){return["max","value"]}connectedCallback(){this.render()}attributeChangedCallback(s,r,a){switch(s){case"max":n(this,e,+a),this.render();break;case"value":n(this,t,Math.min(i(this,e),a)),this.render()}}render(){if(i(this,t)){this.classList.remove("indeterminate"),i(this,t)===i(this,e)&&this.classList.add("complete");const r=i(this,t)/i(this,e)*100;i(this,s).style.width=r+"%"}else i(this,s).style.width="",this.classList.remove("complete"),this.classList.add("indeterminate")}get value(){return i(this,t)}get max(){return i(this,e)}set value(e){this.setAttribute("value",e)}set max(e){this.setAttribute("max",e)}}e=new WeakMap,t=new WeakMap,s=new WeakMap,customElements.define("custom-progress",m);const v=({progValue:e=0,children:t=null})=>{const s=a.r(m,{max:"100",value:e}),r=a.r("button",null,"click"),i=a.r("div",{class:"t3"},r,s,((e,t)=>t.watch("progValue",(t=>e(t))))," %",t);return l(i,"progValue",e),i.watch("progValue",(e=>s.value=e)),r.onclick=()=>{i.progValue<100?i.progValue+=10:i.progValue=0},i},f=()=>a.r("div",{class:`container ${p}`},(async(e,t)=>{await function(e,t){if(!t)return e();if(void 0===u){const e=document.createElement("link").relList;u=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in h)return;h[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":u,t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e()))}((()=>__import__("./article.d2068f48.js")),void 0).then((e=>e.default.split("<hr>").forEach((e=>t.appendChild(a.r("section",{innerHTML:e,class:"markdown-body"})))))),t.querySelector("#example-result-space").appendChild(a.r(v,null))}));document.querySelector("#app").appendChild(a.r("div",null,a.r(d,null),a.r(f,null)));
