import{a as j,v as E,n as W,b as D,T as re,y as ve,t as F,w as fe,l as de,a1 as he,z as ge,h as we,L as I,j as K,U as me,V as R,p as q,K as ye}from"./index-69508855.js";import{d as G,r as U,c as J,e as d,w as $,g as Q,h as be,a as xe,b as Te,f as z,n as Z}from"./index-e4050e4c.js";const[ee,M]=j("swipe"),Se={loop:E,width:W,height:W,vertical:Boolean,autoplay:D(0),duration:D(500),touchable:E,lazyRender:Boolean,initialSwipe:D(0),indicatorColor:String,showIndicators:E,stopPropagation:E},te=Symbol(ee);var pe=G({name:ee,props:Se,emits:["change","dragStart","dragEnd"],setup(a,{emit:b,slots:g}){const u=U(),h=U(),t=J({rect:null,width:0,height:0,offset:0,active:0,swiping:!1});let x=!1;const r=re(),{children:w,linkChildren:s}=ve(te),i=d(()=>w.length),o=d(()=>t[a.vertical?"height":"width"]),v=d(()=>a.vertical?r.deltaY.value:r.deltaX.value),y=d(()=>t.rect?(a.vertical?t.rect.height:t.rect.width)-o.value*i.value:0),k=d(()=>o.value?Math.ceil(Math.abs(y.value)/o.value):i.value),O=d(()=>i.value*o.value),T=d(()=>(t.active+i.value)%i.value),B=d(()=>{const e=a.vertical?"vertical":"horizontal";return r.direction.value===e}),ae=d(()=>{const e={transitionDuration:`${t.swiping?0:a.duration}ms`,transform:`translate${a.vertical?"Y":"X"}(${+t.offset.toFixed(2)}px)`};if(o.value){const l=a.vertical?"height":"width",n=a.vertical?"width":"height";e[l]=`${O.value}px`,e[n]=a[n]?`${a[n]}px`:""}return e}),ie=e=>{const{active:l}=t;return e?a.loop?R(l+e,-1,i.value):R(l+e,0,k.value):l},Y=(e,l=0)=>{let n=e*o.value;a.loop||(n=Math.min(n,-y.value));let f=l-n;return a.loop||(f=R(f,y.value,0)),f},m=({pace:e=0,offset:l=0,emitChange:n})=>{if(i.value<=1)return;const{active:f}=t,c=ie(e),C=Y(c,l);if(a.loop){if(w[0]&&C!==y.value){const _=C<y.value;w[0].setOffset(_?O.value:0)}if(w[i.value-1]&&C!==0){const _=C>0;w[i.value-1].setOffset(_?-O.value:0)}}t.active=c,t.offset=C,n&&c!==f&&b("change",T.value)},A=()=>{t.swiping=!0,t.active<=-1?m({pace:i.value}):t.active>=i.value&&m({pace:-i.value})},ne=()=>{A(),r.reset(),I(()=>{t.swiping=!1,m({pace:-1,emitChange:!0})})},X=()=>{A(),r.reset(),I(()=>{t.swiping=!1,m({pace:1,emitChange:!0})})};let H;const p=()=>clearTimeout(H),P=()=>{p(),+a.autoplay>0&&i.value>1&&(H=setTimeout(()=>{X(),P()},+a.autoplay))},S=(e=+a.initialSwipe)=>{if(!u.value)return;const l=()=>{var n,f;if(!K(u)){const c={width:u.value.offsetWidth,height:u.value.offsetHeight};t.rect=c,t.width=+((n=a.width)!=null?n:c.width),t.height=+((f=a.height)!=null?f:c.height)}i.value&&(e=Math.min(i.value-1,e),e===-1&&(e=i.value-1)),t.active=e,t.swiping=!0,t.offset=Y(e),w.forEach(c=>{c.setOffset(0)}),P()};K(u)?Z().then(l):l()},L=()=>S(t.active);let N;const le=e=>{!a.touchable||e.touches.length>1||(r.start(e),x=!1,N=Date.now(),p(),A())},oe=e=>{a.touchable&&t.swiping&&(r.move(e),B.value&&(!a.loop&&(t.active===0&&v.value>0||t.active===i.value-1&&v.value<0)||(me(e,a.stopPropagation),m({offset:v.value}),x||(b("dragStart",{index:T.value}),x=!0))))},V=()=>{if(!a.touchable||!t.swiping)return;const e=Date.now()-N,l=v.value/e;if((Math.abs(l)>.25||Math.abs(v.value)>o.value/2)&&B.value){const f=a.vertical?r.offsetY.value:r.offsetX.value;let c=0;a.loop?c=f>0?v.value>0?-1:1:0:c=-Math[v.value>0?"ceil":"floor"](v.value/o.value),m({pace:c,emitChange:!0})}else v.value&&m({pace:0});x=!1,t.swiping=!1,b("dragEnd",{index:T.value}),P()},se=(e,l={})=>{A(),r.reset(),I(()=>{let n;a.loop&&e===i.value?n=t.active===0?0:e:n=e%i.value,l.immediate?I(()=>{t.swiping=!1}):t.swiping=!1,m({pace:n-t.active,emitChange:!0})})},ce=(e,l)=>{const n=l===T.value,f=n?{backgroundColor:a.indicatorColor}:void 0;return z("i",{style:f,class:M("indicator",{active:n})},null)},ue=()=>{if(g.indicator)return g.indicator({active:T.value,total:i.value});if(a.showIndicators&&i.value>1)return z("div",{class:M("indicators",{vertical:a.vertical})},[Array(i.value).fill("").map(ce)])};return F({prev:ne,next:X,state:t,resize:L,swipeTo:se}),s({size:o,props:a,count:i,activeIndicator:T}),$(()=>a.initialSwipe,e=>S(+e)),$(i,()=>S(t.active)),$(()=>a.autoplay,P),$([fe,de,()=>a.width,()=>a.height],L),$(he(),e=>{e==="visible"?P():p()}),Q(S),be(()=>S(t.active)),ge(()=>S(t.active)),xe(p),Te(p),we("touchmove",oe,{target:h}),()=>{var e;return z("div",{ref:u,class:M()},[z("div",{ref:h,style:ae.value,class:M("track",{vertical:a.vertical}),onTouchstartPassive:le,onTouchend:V,onTouchcancel:V},[(e=g.default)==null?void 0:e.call(g)]),ue()])}}});const Ee=q(pe),[Pe,Ce]=j("swipe-item");var $e=G({name:Pe,setup(a,{slots:b}){let g;const u=J({offset:0,inited:!1,mounted:!1}),{parent:h,index:t}=ye(te);if(!h)return;const x=d(()=>{const s={},{vertical:i}=h.props;return h.size.value&&(s[i?"height":"width"]=`${h.size.value}px`),u.offset&&(s.transform=`translate${i?"Y":"X"}(${u.offset}px)`),s}),r=d(()=>{const{loop:s,lazyRender:i}=h.props;if(!i||g)return!0;if(!u.mounted)return!1;const o=h.activeIndicator.value,v=h.count.value-1,y=o===0&&s?v:o-1,k=o===v&&s?0:o+1;return g=t.value===o||t.value===y||t.value===k,g}),w=s=>{u.offset=s};return Q(()=>{Z(()=>{u.mounted=!0})}),F({setOffset:w}),()=>{var s;return z("div",{class:Ce(),style:x.value},[r.value?(s=b.default)==null?void 0:s.call(b):null])}}});const Ie=q($e);export{Ee as S,Ie as a};
