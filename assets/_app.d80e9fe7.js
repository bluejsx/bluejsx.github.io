var d=Object.defineProperty,m=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var r=(n,e,s)=>e in n?d(n,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[e]=s,a=(n,e)=>{for(var s in e||(e={}))p.call(e,s)&&r(n,s,e[s]);if(l)for(var s of l(e))h.call(e,s)&&r(n,s,e[s]);return n},c=(n,e)=>m(n,b(e));import{w as t,M as v}from"./vendor.ee5cca48.js";const f=[["View the Source Code of This Page","https://github.com/bluejsx/bluejsx.github.io"],["Document","https://github.com/bluejsx/docs/blob/main/README.md"],["GitHub Repository","https://github.com/bluejsx/BlueJSX"],["Join Discussions","https://github.com/bluejsx/BlueJSX/discussions"]],g=()=>{const n={},e=t.r("div",{class:"menu_list_container hidden"},t.r("div",{ref:[n,"toggleButton"],id:"h-menu-button"},t.r("span",null),t.r("span",null)),t.r("div",{class:"menu-list"},f.map(o=>{const i=t.r("p",null,o[0]);return i.onclick=()=>window.open(o[1]),i})),t.r("div",{ref:[n,"backField"],id:"backfield"})),{toggleButton:s,backField:u}=n;return v(e,"open",!1),e.watch("open",o=>{o?e.classList.remove("hidden"):e.classList.add("hidden")}),u.onclick=()=>e.open=!1,s.onclick=()=>e.open=!e.open,e},_="_title_jpaf6_14";const k=()=>t.r("header",null,t.r("div",{class:_},"BlueJSX"),t.r(g,null));var w=k;const x="_main_8b2wh_1";var J=({Component:n,pageProps:e})=>t.r("div",null,t.r(w,null),t.r(n,c(a({},e),{class:`container markdown-body ${x}`})));export{J as default};