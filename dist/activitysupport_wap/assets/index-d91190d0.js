import{h as E,ad as P,R as j,a as b,F as L,aM as M,ae as z,al as p,ao as d,ap as i,ar as c,aq as _,Z as O,z as o,af as n,$ as X,a9 as K,ak as s,am as Q,an as Z,ag as T,as as G,at as H,aN as J,aO as W,aP as Y,aK as B,aa as ee,aQ as ae}from"./index-bf162a56.js";import{F as le,b as te,U as ue,B as oe,a as re}from"./index-ce5e8eb7.js";import{_ as ne}from"./_plugin-vue_export-helper-d006fb37.js";const F=x=>(G("data-v-0ba88e81"),x=x(),H(),x),se={class:"eventDetails"},de={class:"userInfo"},ie={class:"activityInfo"},pe=F(()=>p("h4",null,"活动信息",-1)),me=F(()=>p("h5",null,"申请材料",-1)),ve={class:"materialsBox"},_e=F(()=>p("h5",null,"使用信息",-1)),ce=["download","href"],ye=["download","href"],fe={style:{margin:"16px"},class:"btnBox"},ge=E({__name:"index",setup(x){const f=P(),q=f.currentRoute.value.query.userType||j("$active"),h=b(!1),I=async()=>{let u,a;switch(v.value.status){case 2:case 3:a={...m.value,id:f.currentRoute.value.query.id,status:v.value.status},u=await W(a);break;case 4:const r=b([]);m.value.report_image&&m.value.report_image.forEach(t=>{r.value.push(t.url)}),a={...m.value,id:f.currentRoute.value.query.id,report_image:r.value,file:y.value.length>0?y.value[0]:null},u=await J(a);break}h.value=!1,u.code==200&&setTimeout(()=>{f.go(f.currentRoute.value.query.userType?0:-1)},500)},D=async()=>{const u={id:f.currentRoute.value.query.id};(await Y(u)).code==200&&setTimeout(()=>{f.go(f.currentRoute.value.query.userType?0:-1)},500)},S=()=>{re({message:"确定要撤销申请?"}).then(()=>{N()}).catch(()=>{})},y=b([]),N=async()=>{const u={id:f.currentRoute.value.query.id};(await ae(u)).code==200&&setTimeout(()=>{f.go(-1)},300)},v=b({label:"",status:null,placeholder:"",height:"40%"}),m=b({report_image:[]}),U=u=>{switch(h.value=!0,u){case 1:h.value=!1,S();break;case 2:v.value={label:"同意",status:u,placeholder:"同意理由:",height:"40%"};break;case 3:v.value={label:"驳回",status:u,placeholder:"驳回理由:",height:"40%"};break;case 4:v.value={label:"报备",status:u,placeholder:"",height:"70%"};break}},e=b({activity:{},file:[]}),C=async u=>{if(u instanceof Array)for(let a=0;a<u.length;a++){let r=u[a].file,t=new FormData;t.append("file",r,r.name),t.append("type","2");const V=await B(t);m.value.report_image[a].url=V.data.url}else{let a=u.file,r=new FormData;if(r.append("file",a,a.name),/image/.test(a.type)){r.append("type","2");const t=await B(r);m.value.report_image[m.value.report_image.length-1].url=t.data.url}else{r.append("type","1");const t=await B(r);y.value[y.value.length-1].url=t.data.url,y.value[y.value.length-1].name=a.name,y.value[y.value.length-1].file_tpye=a.type,delete y.value[y.value.length-1].objectUrl}}},$=u=>{switch(u){case 1:return"待审核";case 2:return"审核通过";case 3:return"审核驳回"}};return L(async()=>{const u=(await M({id:f.currentRoute.value.query.id})).data;u.file=u.file?[u.file]:[],u.report_file=u.report_file?[u.report_file]:[],e.value=u,e.value.attachment?e.value.attachment.forEach((a,r)=>{e.value.attachment[r]={url:a}}):e.value.attachment=[],e.value.report_image?e.value.report_image.forEach((a,r)=>{a&&(e.value.report_image[r]={url:a})}):e.value.report_image=[]}),(u,a)=>{const r=ee,t=te,V=le,R=ue,g=oe,A=K;return s(),z("div",se,[p("div",{class:O(["activityState",{back_blue:e.value.audit_status==1,back_green:e.value.audit_status==2,back_red:e.value.audit_status==3}])},[e.value.audit_status==1?(s(),d(r,{key:0,name:"clock"})):i("",!0),e.value.audit_status==3?(s(),d(r,{key:1,name:"clear"})):i("",!0),e.value.audit_status==2?(s(),d(r,{key:2,name:"checked"})):i("",!0),c(" "+_($(e.value.audit_status))+_(e.value.report_status==2?"，已确认":"")+" ",1),p("p",null,_(e.value.reason),1)],2),p("div",de,[p("p",null,[p("span",null,[o(r,{name:"user"}),c(_(e.value.name),1)]),c(),p("span",null,[o(r,{name:"phone"}),c(_(e.value.phone),1)])]),p("p",null,[o(r,{name:"friends"}),c(" "+_(e.value.department),1)])]),p("div",ie,[pe,o(V,{"input-align":"right"},{default:n(()=>[o(t,{modelValue:e.value.activity_name,"onUpdate:modelValue":a[0]||(a[0]=l=>e.value.activity_name=l),name:"",label:"服务内容:",readonly:"",placeholder:"服务内容"},null,8,["modelValue"]),o(t,{modelValue:e.value.leader_name,"onUpdate:modelValue":a[1]||(a[1]=l=>e.value.leader_name=l),name:"",label:"负责人:",placeholder:"负责人",readonly:""},null,8,["modelValue"]),o(t,{modelValue:e.value.leader_phone,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value.leader_phone=l),name:"",label:"手机号:",placeholder:"手机号",readonly:""},null,8,["modelValue"])]),_:1}),o(V,{"label-align":"top"},{default:n(()=>[me,o(t,{readonly:""},{input:n(()=>[p("div",ve,[(s(!0),z(Q,null,Z(e.value.materials,l=>(s(),z("div",null,_(l.name)+" "+_(l.number)+" "+_(l.unit),1))),256))])]),_:1}),_e,o(t,{readonly:"",modelValue:e.value.usage_location,"onUpdate:modelValue":a[3]||(a[3]=l=>e.value.usage_location=l),name:"",label:"地点:",placeholder:"请输入地点",rules:[{required:!0,message:"请输入地点"}]},null,8,["modelValue"]),o(t,{readonly:"",label:"时间:",placeholder:"请选择使用时间",rules:[{required:!0,message:"请选择使用时间"}]},{input:n(()=>[c(_(e.value.usage_start_time)+" 至 "+_(e.value.usage_end_time),1)]),_:1}),o(t,{readonly:"",autosize:"",type:"textarea",rows:"2",maxlength:"100",modelValue:e.value.usage_reason,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value.usage_reason=l),name:"",label:"原因:",placeholder:"请输入使用原因",rules:[{required:!0,message:"请输入使用原因"}]},null,8,["modelValue"]),o(t,{readonly:"",name:"uploader",label:"上传图片:"},{input:n(()=>[o(R,{readonly:"",deletable:!1,modelValue:e.value.attachment,"onUpdate:modelValue":a[5]||(a[5]=l=>e.value.attachment=l),"after-read":C,multiple:"","max-count":3},null,8,["modelValue"])]),_:1}),o(t,{readonly:"",name:"uploader",label:"上传文件:"},{input:n(()=>{var l,k,w;return[p("a",{download:(l=e.value.file[0])==null?void 0:l.name,href:(k=e.value.file[0])==null?void 0:k.url},_((w=e.value.file[0])==null?void 0:w.name),9,ce)]}),_:1}),o(t,{readonly:"",modelValue:e.value.remark,"onUpdate:modelValue":a[6]||(a[6]=l=>e.value.remark=l),autosize:"",type:"textarea",maxlength:"144",label:"备注:",placeholder:"备注"},null,8,["modelValue"]),e.value.audit_status==2&&e.value.report_reason?(s(),d(t,{key:0,readonly:"",modelValue:e.value.report_reason,"onUpdate:modelValue":a[7]||(a[7]=l=>e.value.report_reason=l),label:"报备理由:",autosize:"",type:"textarea"},null,8,["modelValue"])):i("",!0),e.value.audit_status==2&&e.value.report_reason?(s(),d(t,{key:1,readonly:"",modelValue:e.value.report_amount,"onUpdate:modelValue":a[8]||(a[8]=l=>e.value.report_amount=l),label:"活动金额:"},null,8,["modelValue"])):i("",!0),e.value.audit_status==2&&e.value.report_reason?(s(),d(t,{key:2,readonly:"",name:"uploader",label:"报备图片:"},{input:n(()=>[o(R,{readonly:"",deletable:!1,modelValue:e.value.report_image,"onUpdate:modelValue":a[9]||(a[9]=l=>e.value.report_image=l),"after-read":C,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):i("",!0),e.value.audit_status==2&&e.value.report_reason?(s(),d(t,{key:3,readonly:"",name:"uploader",label:"报备文件:"},{input:n(()=>{var l,k,w;return[p("a",{download:(l=e.value.report_file[0])==null?void 0:l.name,href:(k=e.value.report_file[0])==null?void 0:k.url},_((w=e.value.report_file[0])==null?void 0:w.name),9,ye)]}),_:1})):i("",!0),p("div",fe,[T(q)==2&&e.value.audit_status==1?(s(),d(g,{key:0,type:"primary",onClick:a[10]||(a[10]=l=>U(1)),round:"",block:""},{default:n(()=>[c("撤销")]),_:1})):i("",!0),T(q)==1&&e.value.audit_status==1?(s(),d(g,{key:1,type:"primary",onClick:a[11]||(a[11]=l=>U(2)),round:"",block:""},{default:n(()=>[c("通过")]),_:1})):i("",!0),T(q)==1&&e.value.audit_status==1?(s(),d(g,{key:2,type:"primary",onClick:a[12]||(a[12]=l=>U(3)),round:"",block:""},{default:n(()=>[c("驳回")]),_:1})):i("",!0),(s(),d(g,{key:3,type:"primary",onClick:a[13]||(a[13]=l=>U(4)),round:"",block:""},{default:n(()=>[c("报备")]),_:1})),T(q)==2&&e.value.audit_status==2&&e.value.report_status==1&&e.value.report_reason?(s(),d(g,{key:4,type:"primary",onClick:D,round:"",block:""},{default:n(()=>[c("确认")]),_:1})):i("",!0)])]),_:1})]),o(A,{show:h.value,"onUpdate:show":a[19]||(a[19]=l=>h.value=l),round:"",position:"bottom",class:"dialog",closeable:"",style:X({height:v.value.height})},{default:n(()=>[p("h4",null,_(v.value.label),1),o(V,{"label-align":"top",onSubmit:I},{default:n(()=>[v.value.status!=4?(s(),d(t,{key:0,required:"",modelValue:m.value.reason,"onUpdate:modelValue":a[14]||(a[14]=l=>m.value.reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:v.value.placeholder,placeholder:v.value.placeholder,rules:[{required:!0,message:"理由必须输入"}]},null,8,["modelValue","label","placeholder"])):i("",!0),v.value.status==4?(s(),d(t,{key:1,required:"",modelValue:m.value.report_reason,"onUpdate:modelValue":a[15]||(a[15]=l=>m.value.report_reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:"报备理由:",placeholder:"请输入报备理由",rules:[{required:!0,message:"请输入报备理由"}]},null,8,["modelValue"])):i("",!0),v.value.status==4?(s(),d(t,{key:2,required:"",modelValue:m.value.report_amount,"onUpdate:modelValue":a[16]||(a[16]=l=>m.value.report_amount=l),type:"number","show-word-limit":"",label:"报备金额:",placeholder:"请输入报备金额",rules:[{required:!0,message:"请输入报备金额"}]},null,8,["modelValue"])):i("",!0),v.value.status==4?(s(),d(t,{key:3,name:"uploader",label:"上传图片:",rules:[{message:"必须上传图片"}]},{input:n(()=>[o(R,{modelValue:m.value.report_image,"onUpdate:modelValue":a[17]||(a[17]=l=>m.value.report_image=l),"after-read":C,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):i("",!0),v.value.status==4?(s(),d(t,{key:4,name:"uploader",label:"报备附件:",rules:[{message:"只能上传PDF,TXT,XLS,DOC文件"}]},{input:n(()=>[o(R,{"max-count":1,modelValue:y.value,"onUpdate:modelValue":a[18]||(a[18]=l=>y.value=l),"after-read":C,accept:"text/plain, application/vnd.ms-excel, application/vnd.ms-works, application/msword, application/pdf"},{default:n(()=>[o(g,{icon:"plus",style:{width:"100px"},size:"small",type:"primary"},{default:n(()=>[c("报备附件")]),_:1})]),_:1},8,["modelValue"])]),_:1})):i("",!0),o(g,{type:"primary",round:"",block:"","native-type":"submit"},{default:n(()=>[c("确定")]),_:1})]),_:1})]),_:1},8,["show","style"])])}}});const ke=ne(ge,[["__scopeId","data-v-0ba88e81"]]);export{ke as default};
