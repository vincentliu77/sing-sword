import{r as m,R as f,k as d,j as n,b as g,e as b,J as P,K as R,y as L,L as N,u as w,C as z,S as C,N as W,O,h as j,P as k,i as I,c as E}from"./index-c48ccd7d.js";import{a as $,F}from"./index.esm-4327f738.js";import{r as M,s as A,f as B}from"./logs-9bbb50ca.js";import{d as D}from"./debounce-c1ba2006.js";import{u as H}from"./useRemainingViewPortHeight-0159a498.js";import{F as K,p as q}from"./Fab-171b3862.js";import{P as J,a as V}from"./play-bed6efb1.js";function v(){return v=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},v.apply(this,arguments)}function Y(e,r){if(e==null)return{};var t=G(e,r),o,a;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)o=s[a],!(r.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(t[o]=e[o])}return t}function G(e,r){if(e==null)return{};var t={},o=Object.keys(e),a,s;for(s=0;s<o.length;s++)a=o[s],!(r.indexOf(a)>=0)&&(t[a]=e[a]);return t}var x=m.forwardRef(function(e,r){var t=e.color,o=t===void 0?"currentColor":t,a=e.size,s=a===void 0?24:a,l=Y(e,["color","size"]);return f.createElement("svg",v({ref:r,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:o,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),f.createElement("circle",{cx:"11",cy:"11",r:"8"}),f.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}))});x.propTypes={color:d.string,size:d.oneOfType([d.string,d.number])};x.displayName="Search";const Q=x,U="_RuleSearch_1oz2t_1",X="_RuleSearchContainer_1oz2t_5",Z="_inputWrapper_1oz2t_10",ee="_input_1oz2t_10",te="_iconWrapper_1oz2t_35",p={RuleSearch:U,RuleSearchContainer:X,inputWrapper:Z,input:ee,iconWrapper:te};function oe({dispatch:e,searchText:r,updateSearchText:t}){const[o,a]=m.useState(r),s=m.useCallback(i=>{e(t(i))},[e,t]),l=m.useMemo(()=>D(s,300),[s]),h=i=>{a(i.target.value),l(i.target.value)};return n("div",{className:p.RuleSearch,children:g("div",{className:p.RuleSearchContainer,children:[n("div",{className:p.inputWrapper,children:n("input",{type:"text",value:o,onChange:h,className:p.input})}),n("div",{className:p.iconWrapper,children:n(Q,{size:20})})]})})}const re=e=>({searchText:P(e),updateSearchText:R}),ae=b(re)(oe),ne="_logMeta_7a1x3_1",se="_logType_7a1x3_8",ce="_logTime_7a1x3_18",ie="_logText_7a1x3_24",le="_logsWrapper_7a1x3_37",pe="_logPlaceholder_7a1x3_51",ge="_logPlaceholderIcon_7a1x3_64",he="_search_7a1x3_68",c={logMeta:ne,logType:se,logTime:ce,logText:ie,logsWrapper:le,logPlaceholder:pe,logPlaceholderIcon:ge,search:he},{useCallback:S,memo:ue,useEffect:de}=I,_=30,me={debug:"#28792c",info:"var(--bg-log-info-tag)",warning:"#b99105",error:"#c11c1c"};function fe({time:e,even:r,payload:t,type:o}){const a=E({even:r},"log");return n("div",{className:a,children:g("div",{className:c.logMeta,children:[n("div",{className:c.logTime,children:e}),n("div",{className:c.logType,style:{backgroundColor:me[o]},children:o}),n("div",{className:c.logText,children:t})]})})}function _e(e,r){return r[e].id}const ve=ue(({index:e,style:r,data:t})=>{const o=t[e];return n("div",{style:r,children:n(fe,{...o})})},$);function xe({dispatch:e,logLevel:r,apiConfig:t,logs:o,logStreamingPaused:a}){const s=L(),l=S(()=>{a?M({...t,logLevel:r}):A(),s.app.updateAppConfig("logStreamingPaused",!a)},[t,r,a,s.app]),h=S(T=>e(N(T)),[e]);de(()=>{B({...t,logLevel:r},h)},[t,r,h]);const[i,y]=H(),{t:u}=w();return g("div",{children:[n(z,{title:u("Logs")}),n("div",{className:c.search,children:n(ae,{})}),n("div",{ref:i,style:{paddingBottom:_},children:o.length===0?g("div",{className:c.logPlaceholder,style:{height:y-_},children:[n("div",{className:c.logPlaceholderIcon,children:n(C,{width:200,height:200})}),n("div",{children:u("no_logs")})]}):g("div",{className:c.logsWrapper,children:[n(F,{height:y-_,width:"100%",itemCount:o.length,itemSize:80,itemData:o,itemKey:_e,children:ve}),n(K,{icon:a?n(J,{size:16}):n(V,{size:16}),mainButtonStyles:a?{background:"#e74c3c"}:{},style:q,text:u(a?"Resume Refresh":"Pause Refresh"),onClick:l})]})})]})}const ye=e=>({logs:W(e),logLevel:O(e),apiConfig:j(e),logStreamingPaused:k(e)}),we=b(ye)(xe);export{we as default};
