import{a3 as ee,f as W,h as X,a as Q,j as te,aB as ge,H as we,k as b,G as ae,w as z,x as me,y as be,b7 as ye,F as ne,I as xe,J as Se,b as Ce,d as Pe,p as ke,z as w,K as B,A as E,C as V,W as O,q as Z,t as ie,ay as $e,aC as Y,D as N,U as Te,B as _e,T as q,m as Ie,M as H,aa as p}from"./index-125c7456.js";const Ae={to:[String,Object],url:String,replace:Boolean};function De({to:e,url:i,replace:v,$router:s}){e&&s?s[v?"replace":"push"](e):i&&(v?location.replace(i):location.href=i)}function ze(){const e=ee().proxy;return()=>De(e)}let Be=0;function Xe(){const e=ee(),{name:i="unknown"}=(e==null?void 0:e.type)||{};return`${i}-${++Be}`}const[le,L]=W("swipe"),Ee={loop:B,width:E,height:E,vertical:Boolean,autoplay:V(0),duration:V(500),touchable:B,lazyRender:Boolean,initialSwipe:V(0),indicatorColor:String,showIndicators:B,stopPropagation:B},oe=Symbol(le);var Me=X({name:le,props:Ee,emits:["change","dragStart","dragEnd"],setup(e,{emit:i,slots:v}){const s=Q(),f=Q(),t=te({rect:null,width:0,height:0,offset:0,active:0,swiping:!1});let S=!1;const d=ge(),{children:l,linkChildren:o}=we(oe),n=b(()=>l.length),u=b(()=>t[e.vertical?"height":"width"]),h=b(()=>e.vertical?d.deltaY.value:d.deltaX.value),y=b(()=>t.rect?(e.vertical?t.rect.height:t.rect.width)-u.value*n.value:0),T=b(()=>u.value?Math.ceil(Math.abs(y.value)/u.value):n.value),P=b(()=>n.value*u.value),x=b(()=>(t.active+n.value)%n.value),_=b(()=>{const a=e.vertical?"vertical":"horizontal";return d.direction.value===a}),ce=b(()=>{const a={transitionDuration:`${t.swiping?0:e.duration}ms`,transform:`translate${e.vertical?"Y":"X"}(${+t.offset.toFixed(2)}px)`};if(u.value){const r=e.vertical?"height":"width",c=e.vertical?"width":"height";a[r]=`${P.value}px`,a[c]=e[c]?`${e[c]}px`:""}return a}),se=a=>{const{active:r}=t;return a?e.loop?Y(r+a,-1,n.value):Y(r+a,0,T.value):r},j=(a,r=0)=>{let c=a*u.value;e.loop||(c=Math.min(c,-y.value));let m=r-c;return e.loop||(m=Y(m,y.value,0)),m},C=({pace:a=0,offset:r=0,emitChange:c})=>{if(n.value<=1)return;const{active:m}=t,g=se(a),D=j(g,r);if(e.loop){if(l[0]&&D!==y.value){const R=D<y.value;l[0].setOffset(R?P.value:0)}if(l[n.value-1]&&D!==0){const R=D>0;l[n.value-1].setOffset(R?-P.value:0)}}t.active=g,t.offset=D,c&&g!==m&&i("change",x.value)},M=()=>{t.swiping=!0,t.active<=-1?C({pace:n.value}):t.active>=n.value&&C({pace:-n.value})},re=()=>{M(),d.reset(),O(()=>{t.swiping=!1,C({pace:-1,emitChange:!0})})},F=()=>{M(),d.reset(),O(()=>{t.swiping=!1,C({pace:1,emitChange:!0})})};let K;const I=()=>clearTimeout(K),A=()=>{I(),+e.autoplay>0&&n.value>1&&(K=setTimeout(()=>{F(),A()},+e.autoplay))},k=(a=+e.initialSwipe)=>{if(!s.value)return;const r=()=>{var c,m;if(!Z(s)){const g={width:s.value.offsetWidth,height:s.value.offsetHeight};t.rect=g,t.width=+((c=e.width)!=null?c:g.width),t.height=+((m=e.height)!=null?m:g.height)}n.value&&(a=Math.min(n.value-1,a),a===-1&&(a=n.value-1)),t.active=a,t.swiping=!0,t.offset=j(a),l.forEach(g=>{g.setOffset(0)}),A()};Z(s)?ie().then(r):r()},U=()=>k(t.active);let G;const ue=a=>{!e.touchable||a.touches.length>1||(d.start(a),S=!1,G=Date.now(),I(),M())},ve=a=>{e.touchable&&t.swiping&&(d.move(a),_.value&&(!e.loop&&(t.active===0&&h.value>0||t.active===n.value-1&&h.value<0)||($e(a,e.stopPropagation),C({offset:h.value}),S||(i("dragStart",{index:x.value}),S=!0))))},J=()=>{if(!e.touchable||!t.swiping)return;const a=Date.now()-G,r=h.value/a;if((Math.abs(r)>.25||Math.abs(h.value)>u.value/2)&&_.value){const m=e.vertical?d.offsetY.value:d.offsetX.value;let g=0;e.loop?g=m>0?h.value>0?-1:1:0:g=-Math[h.value>0?"ceil":"floor"](h.value/u.value),C({pace:g,emitChange:!0})}else h.value&&C({pace:0});S=!1,t.swiping=!1,i("dragEnd",{index:x.value}),A()},fe=(a,r={})=>{M(),d.reset(),O(()=>{let c;e.loop&&a===n.value?c=t.active===0?0:a:c=a%n.value,r.immediate?O(()=>{t.swiping=!1}):t.swiping=!1,C({pace:c-t.active,emitChange:!0})})},de=(a,r)=>{const c=r===x.value,m=c?{backgroundColor:e.indicatorColor}:void 0;return w("i",{style:m,class:L("indicator",{active:c})},null)},he=()=>{if(v.indicator)return v.indicator({active:x.value,total:n.value});if(e.showIndicators&&n.value>1)return w("div",{class:L("indicators",{vertical:e.vertical})},[Array(n.value).fill("").map(de)])};return ae({prev:re,next:F,state:t,resize:U,swipeTo:fe}),o({size:u,props:e,count:n,activeIndicator:x}),z(()=>e.initialSwipe,a=>k(+a)),z(n,()=>k(t.active)),z(()=>e.autoplay,A),z([me,be,()=>e.width,()=>e.height],U),z(ye(),a=>{a==="visible"?A():I()}),ne(k),xe(()=>k(t.active)),Se(()=>k(t.active)),Ce(I),Pe(I),ke("touchmove",ve,{target:f}),()=>{var a;return w("div",{ref:s,class:L()},[w("div",{ref:f,style:ce.value,class:L("track",{vertical:e.vertical}),onTouchstartPassive:ue,onTouchend:J,onTouchcancel:J},[(a=v.default)==null?void 0:a.call(v)]),he()])}}});const Ne=N(Me),[Oe,Le]=W("swipe-item");var Re=X({name:Oe,setup(e,{slots:i}){let v;const s=te({offset:0,inited:!1,mounted:!1}),{parent:f,index:t}=Te(oe);if(!f)return;const S=b(()=>{const o={},{vertical:n}=f.props;return f.size.value&&(o[n?"height":"width"]=`${f.size.value}px`),s.offset&&(o.transform=`translate${n?"Y":"X"}(${s.offset}px)`),o}),d=b(()=>{const{loop:o,lazyRender:n}=f.props;if(!n||v)return!0;if(!s.mounted)return!1;const u=f.activeIndicator.value,h=f.count.value-1,y=u===0&&o?h:u-1,T=u===h&&o?0:u+1;return v=t.value===u||t.value===y||t.value===T,v}),l=o=>{s.offset=o};return ne(()=>{ie(()=>{s.mounted=!0})}),ae({setOffset:l}),()=>{var o;return w("div",{class:Le(),style:S.value},[d.value?(o=i.default)==null?void 0:o.call(i):null])}}});const je=N(Re),[Ve,$]=W("cell"),Ye={tag:_e("div"),icon:String,size:String,title:E,value:E,label:E,center:Boolean,isLink:Boolean,border:B,iconPrefix:String,valueClass:q,labelClass:q,titleClass:q,titleStyle:null,arrowDirection:String,required:{type:[Boolean,String],default:null},clickable:{type:Boolean,default:null}},qe=Ie({},Ye,Ae);var He=X({name:Ve,props:qe,setup(e,{slots:i}){const v=ze(),s=()=>{if(i.label||H(e.label))return w("div",{class:[$("label"),e.labelClass]},[i.label?i.label():e.label])},f=()=>{var l;if(i.title||H(e.title)){const o=(l=i.title)==null?void 0:l.call(i);return Array.isArray(o)&&o.length===0?void 0:w("div",{class:[$("title"),e.titleClass],style:e.titleStyle},[o||w("span",null,[e.title]),s()])}},t=()=>{const l=i.value||i.default;if(l||H(e.value))return w("div",{class:[$("value"),e.valueClass]},[l?l():w("span",null,[e.value])])},S=()=>{if(i.icon)return i.icon();if(e.icon)return w(p,{name:e.icon,class:$("left-icon"),classPrefix:e.iconPrefix},null)},d=()=>{if(i["right-icon"])return i["right-icon"]();if(e.isLink){const l=e.arrowDirection&&e.arrowDirection!=="right"?`arrow-${e.arrowDirection}`:"arrow";return w(p,{name:l,class:$("right-icon")},null)}};return()=>{var l;const{tag:o,size:n,center:u,border:h,isLink:y,required:T}=e,P=(l=e.clickable)!=null?l:y,x={center:u,required:!!T,clickable:P,borderless:!h};return n&&(x[n]=!!n),w(o,{class:$(x),role:P?"button":void 0,tabindex:P?0:void 0,onClick:v},{default:()=>{var _;return[S(),f(),t(),d(),(_=i.extra)==null?void 0:_.call(i)]}})}}});const Fe=N(He);const Ke=(e,i)=>{const v=e.__vccOpts||e;for(const[s,f]of i)v[s]=f;return v};export{Fe as C,Ne as S,Ke as _,Ae as a,je as b,ze as c,Ye as d,De as r,Xe as u};
