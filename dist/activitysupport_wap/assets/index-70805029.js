import{h as $,ad as D,R as N,a as V,F as E,aM as A,ae as C,al as p,ao as s,ap as d,ar as c,aq as _,Z as M,z as u,af as i,$ as P,a9 as j,ak as r,am as K,an as L,ag as h,as as O,at as Q,aN as Z,aO as G,aP as H,aK as J,aa as W,aQ as X}from"./index-bb6f85e8.js";import{F as Y,b as ee,U as ae,B as le,a as te}from"./index-b57bc970.js";import{_ as ue}from"./_plugin-vue_export-helper-0db94bc6.js";const R=k=>(O("data-v-41f0da1b"),k=k(),Q(),k),oe={class:"eventDetails"},re={class:"userInfo"},ne={class:"activityInfo"},se=R(()=>p("h4",null,"活动信息",-1)),de=R(()=>p("h5",null,"申请材料",-1)),ie={class:"materialsBox"},me=R(()=>p("h5",null,"使用信息",-1)),pe={style:{margin:"16px"},class:"btnBox"},ve=$({__name:"index",setup(k){const y=D(),g=y.currentRoute.value.query.userType||N("$active"),f=V(!1),B=async()=>{let o,a;switch(v.value.status){case 2:case 3:a={...m.value,id:y.currentRoute.value.query.id,status:v.value.status},o=await G(a);break;case 4:const n=V([]);m.value.report_image&&m.value.report_image.forEach(t=>{n.value.push(t.url)}),a={...m.value,id:y.currentRoute.value.query.id,report_image:n.value},o=await Z(a);break}f.value=!1,o.code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},I=async()=>{const o={id:y.currentRoute.value.query.id};(await H(o)).code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},T=()=>{te({message:"确定要撤销申请?"}).then(()=>{z()}).catch(()=>{})},z=async()=>{const o={id:y.currentRoute.value.query.id};(await X(o)).code==200&&setTimeout(()=>{y.go(-1)},300)},v=V({label:"",status:null,placeholder:"",height:"40%"}),m=V({report_image:[]}),w=o=>{switch(f.value=!0,o){case 1:f.value=!1,T();break;case 2:v.value={label:"同意",status:o,placeholder:"同意理由",height:"40%"};break;case 3:v.value={label:"驳回",status:o,placeholder:"驳回理由",height:"40%"};break;case 4:v.value={label:"报备",status:o,placeholder:"",height:"70%"};break}},e=V({activity:{}}),x=async o=>{let a=o.file,n=new FormData;n.append("file",a,a.name),n.append("type","2");const t=await J(n);m.value.report_image[m.value.report_image.length-1].url=t.data.url},S=o=>{switch(o){case 1:return"待审核";case 2:return"审核通过";case 3:return"审核驳回"}};return E(async()=>{const o=(await A({id:y.currentRoute.value.query.id})).data;e.value=o,e.value.attachment?e.value.attachment.forEach((a,n)=>{e.value.attachment[n]={url:a}}):e.value.attachment=[],e.value.report_image?e.value.report_image.forEach((a,n)=>{a&&(e.value.report_image[n]={url:a})}):e.value.report_image=[]}),(o,a)=>{const n=W,t=ee,q=Y,U=ae,b=le,F=j;return r(),C("div",oe,[p("div",{class:M(["activityState",{back_blue:e.value.audit_status==1,back_green:e.value.audit_status==2,back_red:e.value.audit_status==3}])},[e.value.audit_status==1?(r(),s(n,{key:0,name:"clock"})):d("",!0),e.value.audit_status==3?(r(),s(n,{key:1,name:"clear"})):d("",!0),e.value.audit_status==2?(r(),s(n,{key:2,name:"checked"})):d("",!0),c(" "+_(S(e.value.audit_status))+_(e.value.report_status==2?"，已确认":"")+" ",1),p("p",null,_(e.value.reason),1)],2),p("div",re,[p("p",null,[p("span",null,[u(n,{name:"user"}),c(_(e.value.name),1)]),c(),p("span",null,[u(n,{name:"phone"}),c(_(e.value.phone),1)])]),p("p",null,[u(n,{name:"friends"}),c(" "+_(e.value.department),1)])]),p("div",ne,[se,u(q,{"input-align":"right"},{default:i(()=>[u(t,{modelValue:e.value.activity.name,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value.activity.name=l),name:"",label:"活动名称",readonly:"",placeholder:"活动名称"},null,8,["modelValue"]),u(t,{modelValue:e.value.activity.leader_name,"onUpdate:modelValue":a[1]||(a[1]=l=>e.value.activity.leader_name=l),name:"",label:"负责人",placeholder:"负责人",readonly:""},null,8,["modelValue"]),u(t,{modelValue:e.value.activity.leader_phone,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.activity.leader_phone=l),name:"",label:"手机号",placeholder:"手机号",readonly:""},null,8,["modelValue"])]),_:1}),u(q,{"label-align":"top"},{default:i(()=>[de,u(t,{readonly:""},{input:i(()=>[p("div",ie,[(r(!0),C(K,null,L(e.value.materials,l=>(r(),C("div",null,_(l.name)+" "+_(l.number)+" "+_(l.unit),1))),256))])]),_:1}),me,u(t,{readonly:"",modelValue:e.value.usage_location,"onUpdate:modelValue":a[3]||(a[3]=l=>e.value.usage_location=l),name:"",label:"使用地点",placeholder:"请输入地址",rules:[{required:!0,message:"请输入地址"}]},null,8,["modelValue"]),u(t,{readonly:"",label:"使用时间",placeholder:"请选择使用时间",rules:[{required:!0,message:"请选择使用时间"}]},{input:i(()=>[c(_(e.value.usage_start_time)+" 至 "+_(e.value.usage_end_time),1)]),_:1}),u(t,{readonly:"",autosize:"",type:"textarea",rows:"2",maxlength:"100",modelValue:e.value.usage_reason,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.usage_reason=l),name:"",label:"使用原因",placeholder:"请输入使用原因",rules:[{required:!0,message:"请输入使用原因"}]},null,8,["modelValue"]),u(t,{readonly:"",name:"uploader",label:"上传图片"},{input:i(()=>[u(U,{readonly:"",deletable:!1,modelValue:e.value.attachment,"onUpdate:modelValue":a[5]||(a[5]=l=>e.value.attachment=l),"after-read":x,multiple:"","max-count":3},null,8,["modelValue"])]),_:1}),u(t,{readonly:"",modelValue:e.value.remark,"onUpdate:modelValue":a[6]||(a[6]=l=>e.value.remark=l),autosize:"",type:"textarea",rows:"2",maxlength:"144",label:"备注",placeholder:"备注"},null,8,["modelValue"]),e.value.audit_status==2&&e.value.report_reason?(r(),s(t,{key:0,readonly:"",modelValue:e.value.report_reason,"onUpdate:modelValue":a[7]||(a[7]=l=>e.value.report_reason=l),label:"报备理由"},null,8,["modelValue"])):d("",!0),e.value.audit_status==2&&e.value.report_reason?(r(),s(t,{key:1,readonly:"",modelValue:e.value.report_amount,"onUpdate:modelValue":a[8]||(a[8]=l=>e.value.report_amount=l),label:"活动金额"},null,8,["modelValue"])):d("",!0),e.value.audit_status==2&&e.value.report_reason?(r(),s(t,{key:2,readonly:"",name:"uploader",label:"报备图片"},{input:i(()=>[u(U,{readonly:"",deletable:!1,modelValue:e.value.report_image,"onUpdate:modelValue":a[9]||(a[9]=l=>e.value.report_image=l),"after-read":x,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):d("",!0),p("div",pe,[h(g)==2&&e.value.audit_status==1?(r(),s(b,{key:0,type:"primary",onClick:a[10]||(a[10]=l=>w(1)),round:"",block:""},{default:i(()=>[c("撤销")]),_:1})):d("",!0),h(g)==1&&e.value.audit_status==1?(r(),s(b,{key:1,type:"primary",onClick:a[11]||(a[11]=l=>w(2)),round:"",block:""},{default:i(()=>[c("通过")]),_:1})):d("",!0),h(g)==1&&e.value.audit_status==1?(r(),s(b,{key:2,type:"primary",onClick:a[12]||(a[12]=l=>w(3)),round:"",block:""},{default:i(()=>[c("驳回")]),_:1})):d("",!0),h(g)==1&&e.value.audit_status==2&&e.value.activity.reporter_phone&&!e.value.report_reason?(r(),s(b,{key:3,type:"primary",onClick:a[13]||(a[13]=l=>w(4)),round:"",block:""},{default:i(()=>[c("报备")]),_:1})):d("",!0),h(g)==2&&e.value.audit_status==2&&e.value.report_status==1&&e.value.report_reason?(r(),s(b,{key:4,type:"primary",onClick:I,round:"",block:""},{default:i(()=>[c("确认")]),_:1})):d("",!0)])]),_:1})]),u(F,{show:f.value,"onUpdate:show":a[18]||(a[18]=l=>f.value=l),round:"",position:"bottom",class:"dialog",closeable:"",style:P({height:v.value.height})},{default:i(()=>[p("h4",null,_(v.value.label),1),u(q,{"label-align":"top",onSubmit:B},{default:i(()=>[v.value.status!=4?(r(),s(t,{key:0,required:"",modelValue:m.value.reason,"onUpdate:modelValue":a[14]||(a[14]=l=>m.value.reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:v.value.placeholder,placeholder:v.value.placeholder,rules:[{required:!0,message:"理由必须输入"}]},null,8,["modelValue","label","placeholder"])):d("",!0),v.value.status==4?(r(),s(t,{key:1,required:"",modelValue:m.value.report_reason,"onUpdate:modelValue":a[15]||(a[15]=l=>m.value.report_reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:"报备理由",placeholder:"请输入报备理由",rules:[{required:!0,message:"请输入报备理由"}]},null,8,["modelValue"])):d("",!0),v.value.status==4?(r(),s(t,{key:2,required:"",modelValue:m.value.report_amount,"onUpdate:modelValue":a[16]||(a[16]=l=>m.value.report_amount=l),type:"number","show-word-limit":"",label:"报备金额",placeholder:"请输入报备金额",rules:[{required:!0,message:"请输入报备金额"}]},null,8,["modelValue"])):d("",!0),v.value.status==4?(r(),s(t,{key:3,required:"",name:"uploader",label:"上传图片",rules:[{required:!0,message:"必须上传图片"}]},{input:i(()=>[u(U,{modelValue:m.value.report_image,"onUpdate:modelValue":a[17]||(a[17]=l=>m.value.report_image=l),"after-read":x,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):d("",!0),u(b,{type:"primary",round:"",block:"","native-type":"submit"},{default:i(()=>[c("确定")]),_:1})]),_:1})]),_:1},8,["show","style"])])}}});const be=ue(ve,[["__scopeId","data-v-41f0da1b"]]);export{be as default};
