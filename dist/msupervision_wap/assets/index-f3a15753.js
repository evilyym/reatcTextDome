import{d as C,r as I,X as U,a1 as N,E as s,G as d,J as g,F as t,h as r,N as _,a3 as v,M as c,L as $,a6 as q,a5 as h,D as n,K as u,O as i,V as D,I as R}from"./index-6bedc73c.js";import{B as S,F as j,_ as w}from"./_plugin-vue_export-helper-524fd211.js";import{F as z,U as E}from"./index-433cb535.js";const L={class:"eventDetails"},M={style:{margin:"15px 15px 10px 15px","font-size":"16px","line-height":"20px"}},T={class:"activityState back_white"},G={style:{"background-color":"aqua"}},J={style:{color:"#666"}},K={class:"activityInfo"},O={key:0,style:{margin:"15px 15px 10px 15px","font-size":"16px","line-height":"20px"}},P={key:1,class:"activityStateInfo"},X={style:{color:"#000"}},A={style:{color:"#000"}},H={class:"btnBox subBtn"},Q=C({__name:"index",setup(W){const y=q(),b=h("$active"),f=h("$aType"),a=I({activity:{},file:[]});return U(async()=>{const o=(await N({id:y.currentRoute.value.query.id})).data;o.file=o.file?[o.file]:[],o.report_file=o.report_file?[o.report_file]:[],o.audit_project.forEach(l=>{l.image_urls=l.image_urls?l.image_urls.map(p=>({url:p})):[]}),a.value=o}),(o,l)=>{const p=E,m=j,V=R,k=z,x=S;return n(),s("div",L,[(n(!0),s(d,null,g(a.value.audit_project,(e,B)=>(n(),s(d,null,[t("p",M,u(B+1)+"、"+u(e.audit_name),1),t("div",T,[t("p",null,u(e.audit_content),1),t("div",G,[r(m,{readonly:"",name:"uploader",label:""},{input:_(()=>[r(p,{readonly:"",deletable:!1,modelValue:e.image_urls,"onUpdate:modelValue":F=>e.image_urls=F,multiple:"","max-count":e.image_urls.length},null,8,["modelValue","onUpdate:modelValue","max-count"])]),_:2},1024)]),t("p",J,[r(V,{name:"location-o"}),i(u(a.value.local_name),1)])])],64))),256)),t("div",K,[r(k,{"input-align":"right"},{default:_(()=>[r(m,{modelValue:a.value.local_name,"onUpdate:modelValue":l[0]||(l[0]=e=>a.value.local_name=e),name:"",label:"区域位置",readonly:"",placeholder:"当前地址"},null,8,["modelValue"]),r(m,{modelValue:a.value.submit_time,"onUpdate:modelValue":l[1]||(l[1]=e=>a.value.submit_time=e),name:"",label:"提交时间",placeholder:"17点06分",readonly:""},null,8,["modelValue"])]),_:1})]),v(f).status==1?(n(),s(d,{key:0},[a.value.audit_result&&a.value.audit_result.length?(n(),s("p",O,"审核内容 ")):c("",!0),a.value.audit_result&&a.value.audit_result.length?(n(),s("div",P,[(n(!0),s(d,null,g(a.value.audit_result,e=>(n(),s("div",null,[t("p",null,u(e.created_at),1),t("p",null,[i("审核结果 "),t("span",{style:D({color:e.audit_record_status_name=="退回"?"red":"#2488FF"})},u(e.audit_record_status_name),5)]),t("p",null,[i("审核人 "),t("span",X,u(e.audit_user),1)]),t("p",null,[i("审核原因 "),t("span",A,u(e.audit_content),1)])]))),256))])):c("",!0)],64)):c("",!0),t("div",H,[r(x,{onClick:l[2]||(l[2]=e=>o.$router.go(-1)),round:"",block:""},{default:_(()=>[i("返回")]),_:1}),v(f).status==1&&a.value.status==3?(n(),$(x,{key:0,type:"primary",onClick:l[3]||(l[3]=()=>{b.value=0,o.$router.push({path:"/maintenancePersonnel",query:{id:v(y).currentRoute.value.query.id}})}),round:"",block:""},{default:_(()=>[i("去修改")]),_:1})):c("",!0)])])}}});const te=w(Q,[["__scopeId","data-v-b000a47d"]]);export{te as default};