import{p as i,r as v,a as b,b as n,e as u,n as C,i as p,u as m,q as y,k as h}from"./app-BAKlbPj6.js";/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,r)=>r?r.toUpperCase():a.toLowerCase()),S=e=>{const t=x(e);return t.charAt(0).toUpperCase()+t.slice(1)},q=(...e)=>e.filter((t,a,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=({size:e,strokeWidth:t=2,absoluteStrokeWidth:a,color:r,iconNode:l,name:o,class:d,...g},{slots:c})=>i("svg",{...s,width:e||s.width,height:e||s.height,stroke:r||s.stroke,"stroke-width":a?Number(t)*24/Number(e):t,class:q("lucide",...o?[`lucide-${f(S(o))}-icon`,`lucide-${f(o)}`]:["lucide-icon"]),...g},[...l.map(k=>i(...k)),...c.default?[c.default()]:[]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=(e,t)=>(a,{slots:r})=>i(B,{...a,iconNode:t,name:e},r);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=w("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=w("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),V={class:"relative"},$=["id","value","name","type","autocomplete","required","placeholder"],z=["onKeydown","aria-label"],I={__name:"PasswordInput",props:{id:{type:String,required:!0},modelValue:{type:String,default:""},name:{type:String,required:!0},autocomplete:{type:String,default:"current-password"},required:{type:Boolean,default:!1},placeholder:{type:String,default:"Password"},errorClass:{type:String,default:""},baseClass:{type:String,default:""}},emits:["update:modelValue"],setup(e,{emit:t}){const a=v(!1),r=()=>{a.value=!a.value};return(l,o)=>(n(),b("div",V,[u("input",{id:e.id,value:e.modelValue,name:e.name,type:a.value?"text":"password",autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,class:C([e.baseClass||"mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm",e.errorClass]),onInput:o[0]||(o[0]=d=>l.$emit("update:modelValue",d.target.value))},null,42,$),u("button",{type:"button",class:"password-toggle absolute inset-y-0 right-0 pr-3 flex items-center outline-none focus:outline-none",onClick:r,onKeydown:[y(h(r,["prevent"]),["enter"]),y(h(r,["prevent"]),["space"])],"aria-label":a.value?"Hide password":"Show password",tabindex:"0"},[a.value?(n(),p(m(M),{key:0,size:20,class:"text-gray-400 hover:text-emerald-600 transition-colors duration-200 cursor-pointer"})):(n(),p(m(P),{key:1,size:20,class:"text-gray-400 hover:text-emerald-600 transition-colors duration-200 cursor-pointer"}))],40,z)]))}};export{I as _};
