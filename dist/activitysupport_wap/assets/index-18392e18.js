import{h as $,ad as N,R as E,a as h,F as A,aM as M,ae as C,al as p,ao as d,ap as i,ar as _,aq as c,Z as P,z as r,af as m,$ as j,a9 as K,ak as n,am as L,an as O,ag as k,as as Q,at as Z,aN as G,aO as H,aP as J,aK as B,aa as W,aQ as X}from"./index-78d9f942.js";import{F as Y,b as ee,U as ae,B as le,a as te}from"./index-bb411ca7.js";import{_ as ue}from"./_plugin-vue_export-helper-40490499.js";const R=w=>(Q("data-v-e9d4f665"),w=w(),Z(),w),oe={class:"eventDetails"},re={class:"userInfo"},ne={class:"activityInfo"},se=R(()=>p("h4",null,"活动信息",-1)),de=R(()=>p("h5",null,"申请材料",-1)),ie={class:"materialsBox"},me=R(()=>p("h5",null,"使用信息",-1)),pe={style:{margin:"16px"},class:"btnBox"},ve=$({__name:"index",setup(w){const y=N(),f=y.currentRoute.value.query.userType||E("$active"),b=h(!1),I=async()=>{let u,a;switch(v.value.status){case 2:case 3:a={...s.value,id:y.currentRoute.value.query.id,status:v.value.status},u=await H(a);break;case 4:const o=h([]);s.value.report_image&&s.value.report_image.forEach(t=>{o.value.push(t.url)}),a={...s.value,id:y.currentRoute.value.query.id,report_image:o.value},u=await G(a);break}b.value=!1,u.code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},T=async()=>{const u={id:y.currentRoute.value.query.id};(await J(u)).code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},z=()=>{te({message:"确定要撤销申请?"}).then(()=>{F()}).catch(()=>{})},F=async()=>{const u={id:y.currentRoute.value.query.id};(await X(u)).code==200&&setTimeout(()=>{y.go(-1)},300)},v=h({label:"",status:null,placeholder:"",height:"40%"}),s=h({report_image:[]}),x=u=>{switch(b.value=!0,u){case 1:b.value=!1,z();break;case 2:v.value={label:"同意",status:u,placeholder:"同意理由:",height:"40%"};break;case 3:v.value={label:"驳回",status:u,placeholder:"驳回理由:",height:"40%"};break;case 4:v.value={label:"报备",status:u,placeholder:"",height:"70%"};break}},e=h({activity:{}}),q=async u=>{if(u instanceof Array)for(let a=0;a<u.length;a++){let o=u[a].file,t=new FormData;t.append("file",o,o.name),t.append("type","2");const V=await B(t);s.value.report_image[a].url=V.data.url}else{let a=u.file,o=new FormData;o.append("file",a,a.name),o.append("type","2");const t=await B(o);s.value.report_image[s.value.report_image.length-1].url=t.data.url}},S=u=>{switch(u){case 1:return"待审核";case 2:return"审核通过";case 3:return"审核驳回"}};return A(async()=>{const u=(await M({id:y.currentRoute.value.query.id})).data;e.value=u,e.value.attachment?e.value.attachment.forEach((a,o)=>{e.value.attachment[o]={url:a}}):e.value.attachment=[],e.value.report_image?e.value.report_image.forEach((a,o)=>{a&&(e.value.report_image[o]={url:a})}):e.value.report_image=[]}),(u,a)=>{const o=W,t=ee,V=Y,U=ae,g=le,D=K;return n(),C("div",oe,[p("div",{class:P(["activityState",{back_blue:e.value.audit_status==1,back_green:e.value.audit_status==2,back_red:e.value.audit_status==3}])},[e.value.audit_status==1?(n(),d(o,{key:0,name:"clock"})):i("",!0),e.value.audit_status==3?(n(),d(o,{key:1,name:"clear"})):i("",!0),e.value.audit_status==2?(n(),d(o,{key:2,name:"checked"})):i("",!0),_(" "+c(S(e.value.audit_status))+c(e.value.report_status==2?"，已确认":"")+" ",1),p("p",null,c(e.value.reason),1)],2),p("div",re,[p("p",null,[p("span",null,[r(o,{name:"user"}),_(c(e.value.name),1)]),_(),p("span",null,[r(o,{name:"phone"}),_(c(e.value.phone),1)])]),p("p",null,[r(o,{name:"friends"}),_(" "+c(e.value.department),1)])]),p("div",ne,[se,r(V,{"input-align":"right"},{default:m(()=>[r(t,{modelValue:e.value.activity_name,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value.activity_name=l),name:"",label:"服务内容:",readonly:"",placeholder:"服务内容"},null,8,["modelValue"]),r(t,{modelValue:e.value.leader_name,"onUpdate:modelValue":a[1]||(a[1]=l=>e.value.leader_name=l),name:"",label:"负责人:",placeholder:"负责人",readonly:""},null,8,["modelValue"]),r(t,{modelValue:e.value.leader_phone,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.leader_phone=l),name:"",label:"手机号:",placeholder:"手机号",readonly:""},null,8,["modelValue"])]),_:1}),r(V,{"label-align":"top"},{default:m(()=>[de,r(t,{readonly:""},{input:m(()=>[p("div",ie,[(n(!0),C(L,null,O(e.value.materials,l=>(n(),C("div",null,c(l.name)+" "+c(l.number)+" "+c(l.unit),1))),256))])]),_:1}),me,r(t,{readonly:"",modelValue:e.value.usage_location,"onUpdate:modelValue":a[3]||(a[3]=l=>e.value.usage_location=l),name:"",label:"地点:",placeholder:"请输入地点",rules:[{required:!0,message:"请输入地点"}]},null,8,["modelValue"]),r(t,{readonly:"",label:"时间:",placeholder:"请选择使用时间",rules:[{required:!0,message:"请选择使用时间"}]},{input:m(()=>[_(c(e.value.usage_start_time)+" 至 "+c(e.value.usage_end_time),1)]),_:1}),r(t,{readonly:"",autosize:"",type:"textarea",rows:"2",maxlength:"100",modelValue:e.value.usage_reason,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.usage_reason=l),name:"",label:"原因:",placeholder:"请输入使用原因",rules:[{required:!0,message:"请输入使用原因"}]},null,8,["modelValue"]),r(t,{readonly:"",name:"uploader",label:"上传图片:"},{input:m(()=>[r(U,{readonly:"",deletable:!1,modelValue:e.value.attachment,"onUpdate:modelValue":a[5]||(a[5]=l=>e.value.attachment=l),"after-read":q,multiple:"","max-count":3},null,8,["modelValue"])]),_:1}),r(t,{readonly:"",modelValue:e.value.remark,"onUpdate:modelValue":a[6]||(a[6]=l=>e.value.remark=l),autosize:"",type:"textarea",maxlength:"144",label:"备注:",placeholder:"备注"},null,8,["modelValue"]),e.value.audit_status==2&&e.value.report_reason?(n(),d(t,{key:0,readonly:"",modelValue:e.value.report_reason,"onUpdate:modelValue":a[7]||(a[7]=l=>e.value.report_reason=l),label:"报备理由:",autosize:"",type:"textarea"},null,8,["modelValue"])):i("",!0),e.value.audit_status==2&&e.value.report_reason?(n(),d(t,{key:1,readonly:"",modelValue:e.value.report_amount,"onUpdate:modelValue":a[8]||(a[8]=l=>e.value.report_amount=l),label:"活动金额:"},null,8,["modelValue"])):i("",!0),e.value.audit_status==2&&e.value.report_reason?(n(),d(t,{key:2,readonly:"",name:"uploader",label:"报备图片:"},{input:m(()=>[r(U,{readonly:"",deletable:!1,modelValue:e.value.report_image,"onUpdate:modelValue":a[9]||(a[9]=l=>e.value.report_image=l),"after-read":q,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):i("",!0),p("div",pe,[k(f)==2&&e.value.audit_status==1?(n(),d(g,{key:0,type:"primary",onClick:a[10]||(a[10]=l=>x(1)),round:"",block:""},{default:m(()=>[_("撤销")]),_:1})):i("",!0),k(f)==1&&e.value.audit_status==1?(n(),d(g,{key:1,type:"primary",onClick:a[11]||(a[11]=l=>x(2)),round:"",block:""},{default:m(()=>[_("通过")]),_:1})):i("",!0),k(f)==1&&e.value.audit_status==1?(n(),d(g,{key:2,type:"primary",onClick:a[12]||(a[12]=l=>x(3)),round:"",block:""},{default:m(()=>[_("驳回")]),_:1})):i("",!0),k(f)==1&&e.value.audit_status==2&&e.value.reporter_phone&&!e.value.report_reason?(n(),d(g,{key:3,type:"primary",onClick:a[13]||(a[13]=l=>x(4)),round:"",block:""},{default:m(()=>[_("报备")]),_:1})):i("",!0),k(f)==2&&e.value.audit_status==2&&e.value.report_status==1&&e.value.report_reason?(n(),d(g,{key:4,type:"primary",onClick:T,round:"",block:""},{default:m(()=>[_("确认")]),_:1})):i("",!0)])]),_:1})]),r(D,{show:b.value,"onUpdate:show":a[18]||(a[18]=l=>b.value=l),round:"",position:"bottom",class:"dialog",closeable:"",style:j({height:v.value.height})},{default:m(()=>[p("h4",null,c(v.value.label),1),r(V,{"label-align":"top",onSubmit:I},{default:m(()=>[v.value.status!=4?(n(),d(t,{key:0,required:"",modelValue:s.value.reason,"onUpdate:modelValue":a[14]||(a[14]=l=>s.value.reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:v.value.placeholder,placeholder:v.value.placeholder,rules:[{required:!0,message:"理由必须输入"}]},null,8,["modelValue","label","placeholder"])):i("",!0),v.value.status==4?(n(),d(t,{key:1,required:"",modelValue:s.value.report_reason,"onUpdate:modelValue":a[15]||(a[15]=l=>s.value.report_reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:"报备理由:",placeholder:"请输入报备理由",rules:[{required:!0,message:"请输入报备理由"}]},null,8,["modelValue"])):i("",!0),v.value.status==4?(n(),d(t,{key:2,required:"",modelValue:s.value.report_amount,"onUpdate:modelValue":a[16]||(a[16]=l=>s.value.report_amount=l),type:"number","show-word-limit":"",label:"报备金额:",placeholder:"请输入报备金额",rules:[{required:!0,message:"请输入报备金额"}]},null,8,["modelValue"])):i("",!0),v.value.status==4?(n(),d(t,{key:3,required:"",name:"uploader",label:"上传图片:",rules:[{required:!0,message:"必须上传图片"}]},{input:m(()=>[r(U,{modelValue:s.value.report_image,"onUpdate:modelValue":a[17]||(a[17]=l=>s.value.report_image=l),"after-read":q,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):i("",!0),r(g,{type:"primary",round:"",block:"","native-type":"submit"},{default:m(()=>[_("确定")]),_:1})]),_:1})]),_:1},8,["show","style"])])}}});const ge=ue(ve,[["__scopeId","data-v-e9d4f665"]]);export{ge as default};
