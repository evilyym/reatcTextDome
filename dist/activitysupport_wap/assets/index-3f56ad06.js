import{h as X,R as G,a as h,F as H,aD as L,ae as M,am as c,ap as i,aq as p,as as _,ar as f,Z,z as n,af as s,$ as z,ai as J,aa as K,al as d,ag as q,at as Q,au as W,aE as Y,aF as ee,aG as ae,av as B,aC as F,ab as le,aH as te}from"./index-79d96954.js";import{F as ue,b as oe,U as re,B as ne,a as se}from"./index-fa7c7b88.js";import{_ as de}from"./_plugin-vue_export-helper-e5453f45.js";const D=U=>(Q("data-v-a99926f3"),U=U(),W(),U),ie={class:"eventDetails"},pe={class:"userInfo"},me={class:"activityInfo"},ve=D(()=>c("h4",null,"活动信息",-1)),ce=D(()=>c("h5",null,"具体事项",-1)),_e=D(()=>c("h5",null,"使用信息",-1)),ye=["download","href"],fe=["download","href"],ge={class:"btnBox subBtn"},be=X({__name:"index",setup(U){const y=J(),I=t=>{window.location.href=`tel:${t}`},V=y.currentRoute.value.query.userType||G("$active"),k=h(!1),S=async()=>{let t,e;switch(m.value.status){case 2:case 3:e={...v.value,id:y.currentRoute.value.query.id,status:m.value.status},t=await ee(e);break;case 4:const u=h([]);v.value.report_image&&v.value.report_image.forEach(o=>{u.value.push(o.url)}),e={...v.value,id:y.currentRoute.value.query.id,report_image:u.value,file:r.value.length>0?r.value[0]:null},t=await Y(e);break}k.value=!1,t.code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},$=async()=>{const t={id:y.currentRoute.value.query.id};(await ae(t)).code==200&&setTimeout(()=>{y.go(y.currentRoute.value.query.userType?0:-1)},500)},A=()=>{se({message:"确定要撤销申请?"}).then(()=>{j()}).catch(()=>{})},r=h([]),j=async()=>{const t={id:y.currentRoute.value.query.id};(await te(t)).code==200&&setTimeout(()=>{y.go(-1)},300)},m=h({label:"",status:null,placeholder:"",height:"260px"}),v=h({report_image:[]}),C=t=>{switch(k.value=!0,t){case 1:k.value=!1,A();break;case 2:m.value={label:"同意",status:t,placeholder:"同意理由:",height:"260px"};break;case 3:m.value={label:"驳回",status:t,placeholder:"驳回理由:",height:"260px"};break;case 4:m.value={label:"报备",status:t,placeholder:"",height:"70%"};break}},a=h({activity:{},file:[]}),E=t=>{const e=["pdf","docx","doc","txt","xlsx","xls"];if(t instanceof Array){for(let u=0;u<t.length;u++)if(e.indexOf(t[u].name.split(".").reverse()[0])==-1)return B("只能上传"+e.join()+"文件"),!1}else return e.indexOf(t.name.split(".").reverse()[0])==-1?(B("只能上传"+e.join()+"文件"),!1):!0},T=async t=>{if(t instanceof Array)for(let e=0;e<t.length;e++){let u=t[e].file,o=new FormData;o.append("file",u,u.name),o.append("type","2");const g=await F(o);v.value.report_image[e].url=g.data.url}else{let e=t.file,u=new FormData;u.append("file",e,e.name),u.append("type","2");const o=await F(u);v.value.report_image[v.value.report_image.length-1].url=o.data.url}},N=async t=>{if(t instanceof Array)for(let e=0;e<t.length;e++){let u=t[e].file,o=new FormData;o.append("file",u,u.name),o.append("type","1");const g=await F(o);r.value[r.value.length-1].url=g.data.url,r.value[r.value.length-1].name=u.name,r.value[r.value.length-1].file_tpye=u.type,delete r.value[r.value.length-1].objectUrl,delete r.value[r.value.length-1].content}else{let e=t.file,u=new FormData;u.append("file",e,e.name),u.append("type","1");const o=await F(u);r.value[r.value.length-1].url=o.data.url,r.value[r.value.length-1].name=e.name,r.value[r.value.length-1].file_tpye=e.type,delete r.value[r.value.length-1].objectUrl,delete r.value[r.value.length-1].content}},O=t=>{switch(t){case 1:return"待审核";case 2:return"审核通过";case 3:return"审核驳回"}};return H(async()=>{const t=(await L({id:y.currentRoute.value.query.id})).data;t.file=t.file?[t.file]:[],t.report_file=t.report_file?[t.report_file]:[],a.value=t,a.value.attachment?a.value.attachment.forEach((e,u)=>{a.value.attachment[u]={url:e}}):a.value.attachment=[],a.value.report_image?a.value.report_image.forEach((e,u)=>{e&&(a.value.report_image[u]={url:e})}):a.value.report_image=[]}),(t,e)=>{const u=le,o=oe,g=ue,R=re,b=ne,P=K;return d(),M("div",ie,[c("div",{class:Z(["activityState",{back_blue:a.value.audit_status==1,back_green:a.value.audit_status==2,back_red:a.value.audit_status==3}])},[a.value.audit_status==1?(d(),i(u,{key:0,name:"clock"})):p("",!0),a.value.audit_status==3?(d(),i(u,{key:1,name:"clear"})):p("",!0),a.value.audit_status==2?(d(),i(u,{key:2,name:"checked"})):p("",!0),_(" "+f(O(a.value.audit_status))+f(a.value.report_status==2?"，已确认":"")+" ",1),c("p",null,f(a.value.reason),1)],2),c("div",pe,[c("p",null,[c("span",null,[n(u,{name:"user"}),_(f(a.value.name),1)]),_(),c("span",null,[n(u,{name:"phone"}),_(f(a.value.phone),1)])]),c("p",null,[n(u,{name:"friends"}),_(" "+f(a.value.department),1)])]),c("div",me,[ve,n(g,{"input-align":"right"},{default:s(()=>[n(o,{modelValue:a.value.activity_name,"onUpdate:modelValue":e[0]||(e[0]=l=>a.value.activity_name=l),name:"",label:"服务内容:",readonly:"",placeholder:"服务内容"},null,8,["modelValue"]),n(o,{modelValue:a.value.leader_name,"onUpdate:modelValue":e[1]||(e[1]=l=>a.value.leader_name=l),name:"",label:"负责人:",placeholder:"负责人",readonly:""},null,8,["modelValue"]),n(o,{modelValue:a.value.leader_phone,"onUpdate:modelValue":e[2]||(e[2]=l=>a.value.leader_phone=l),onClickInput:e[3]||(e[3]=l=>I(a.value.leader_phone)),name:"",label:"手机号:",placeholder:"手机号",readonly:""},null,8,["modelValue"])]),_:1}),n(g,{"label-align":"top"},{default:s(()=>[ce,n(o,{readonly:"",modelValue:a.value.basic_matters,"onUpdate:modelValue":e[4]||(e[4]=l=>a.value.basic_matters=l),autosize:"",type:"textarea",maxlength:"200",label:"",placeholder:""},null,8,["modelValue"]),_e,n(o,{readonly:"",modelValue:a.value.usage_location,"onUpdate:modelValue":e[5]||(e[5]=l=>a.value.usage_location=l),name:"",label:"地点:",placeholder:"请输入地点",rules:[{required:!0,message:"请输入地点"}]},null,8,["modelValue"]),n(o,{readonly:"",label:"时间:",placeholder:"请选择使用时间",rules:[{required:!0,message:"请选择使用时间"}]},{input:s(()=>[_(f(a.value.usage_start_time)+" 至 "+f(a.value.usage_end_time),1)]),_:1}),n(o,{readonly:"",autosize:"",type:"textarea",rows:"2",maxlength:"100",modelValue:a.value.usage_reason,"onUpdate:modelValue":e[6]||(e[6]=l=>a.value.usage_reason=l),name:"",label:"原因:",placeholder:"请输入使用原因",rules:[{required:!0,message:"请输入使用原因"}]},null,8,["modelValue"]),n(o,{readonly:"",name:"uploader",label:"上传图片:"},{input:s(()=>[n(R,{readonly:"",deletable:!1,modelValue:a.value.attachment,"onUpdate:modelValue":e[7]||(e[7]=l=>a.value.attachment=l),"after-read":T,multiple:"","max-count":3},null,8,["modelValue"])]),_:1}),n(o,{readonly:"",name:"uploader",label:"上传文件:"},{input:s(()=>{var l,x,w;return[c("a",{download:(l=a.value.file[0])==null?void 0:l.name,href:(x=a.value.file[0])==null?void 0:x.url},f((w=a.value.file[0])==null?void 0:w.name),9,ye)]}),_:1}),n(o,{readonly:"",modelValue:a.value.remark,"onUpdate:modelValue":e[8]||(e[8]=l=>a.value.remark=l),autosize:"",type:"textarea",maxlength:"144",label:"备注:",placeholder:"备注"},null,8,["modelValue"]),a.value.audit_status==2&&a.value.report_reason?(d(),i(o,{key:0,readonly:"",modelValue:a.value.report_reason,"onUpdate:modelValue":e[9]||(e[9]=l=>a.value.report_reason=l),label:"报备理由:",autosize:"",type:"textarea"},null,8,["modelValue"])):p("",!0),a.value.audit_status==2&&a.value.report_reason?(d(),i(o,{key:1,readonly:"",modelValue:a.value.report_amount,"onUpdate:modelValue":e[10]||(e[10]=l=>a.value.report_amount=l),label:"活动金额:"},null,8,["modelValue"])):p("",!0),a.value.audit_status==2&&a.value.report_reason?(d(),i(o,{key:2,readonly:"",name:"uploader",label:"报备图片:"},{input:s(()=>[n(R,{readonly:"",deletable:!1,modelValue:a.value.report_image,"onUpdate:modelValue":e[11]||(e[11]=l=>a.value.report_image=l),"after-read":T,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):p("",!0),a.value.audit_status==2&&a.value.report_reason?(d(),i(o,{key:3,readonly:"",name:"uploader",label:"报备文件:"},{input:s(()=>{var l,x,w;return[c("a",{download:(l=a.value.report_file[0])==null?void 0:l.name,href:(x=a.value.report_file[0])==null?void 0:x.url},f((w=a.value.report_file[0])==null?void 0:w.name),9,fe)]}),_:1})):p("",!0),c("div",ge,[q(V)==2&&a.value.audit_status==1?(d(),i(b,{key:0,type:"primary",onClick:e[12]||(e[12]=l=>C(1)),round:"",block:""},{default:s(()=>[_("撤销")]),_:1})):p("",!0),q(V)==1&&a.value.audit_status==1?(d(),i(b,{key:1,type:"primary",onClick:e[13]||(e[13]=l=>C(2)),round:"",block:""},{default:s(()=>[_("通过")]),_:1})):p("",!0),q(V)==1&&a.value.audit_status==1?(d(),i(b,{key:2,type:"primary",onClick:e[14]||(e[14]=l=>C(3)),round:"",block:""},{default:s(()=>[_("驳回")]),_:1})):p("",!0),q(V)==1&&a.value.audit_status==2&&a.value.reporter_phone&&!a.value.report_reason?(d(),i(b,{key:3,type:"primary",onClick:e[15]||(e[15]=l=>C(4)),round:"",block:""},{default:s(()=>[_("报备")]),_:1})):p("",!0),q(V)==2&&a.value.audit_status==2&&a.value.report_status==1?(d(),i(b,{key:4,type:"primary",onClick:$,round:"",block:""},{default:s(()=>[_("确认")]),_:1})):p("",!0)])]),_:1})]),n(P,{show:k.value,"onUpdate:show":e[21]||(e[21]=l=>k.value=l),round:"",position:"bottom",class:"dialog",closeable:"",style:z({height:m.value.height})},{default:s(()=>[c("h4",null,f(m.value.label),1),n(g,{"label-align":"top",onSubmit:S,style:z({height:m.value.status==4?"500px":"150px"})},{default:s(()=>[m.value.status!=4?(d(),i(o,{key:0,required:"",modelValue:v.value.reason,"onUpdate:modelValue":e[16]||(e[16]=l=>v.value.reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:m.value.placeholder,placeholder:m.value.placeholder,rules:[{required:!0,message:"理由必须输入"}]},null,8,["modelValue","label","placeholder"])):p("",!0),m.value.status==4?(d(),i(o,{key:1,required:"",modelValue:v.value.report_reason,"onUpdate:modelValue":e[17]||(e[17]=l=>v.value.report_reason=l),autosize:"",type:"textarea",rows:"3",maxlength:"144","show-word-limit":"",label:"报备理由:",placeholder:"请输入报备理由",rules:[{required:!0,message:"请输入报备理由"}]},null,8,["modelValue"])):p("",!0),m.value.status==4?(d(),i(o,{key:2,required:"",modelValue:v.value.report_amount,"onUpdate:modelValue":e[18]||(e[18]=l=>v.value.report_amount=l),type:"number","show-word-limit":"",label:"报备金额:",placeholder:"请输入报备金额",rules:[{required:!0,message:"请输入报备金额"}]},null,8,["modelValue"])):p("",!0),m.value.status==4?(d(),i(o,{key:3,name:"uploader",label:"上传图片:",rules:[{message:"必须上传图片"}]},{input:s(()=>[n(R,{modelValue:v.value.report_image,"onUpdate:modelValue":e[19]||(e[19]=l=>v.value.report_image=l),"after-read":T,multiple:"","max-count":3},null,8,["modelValue"])]),_:1})):p("",!0),m.value.status==4?(d(),i(o,{key:4,name:"uploader",label:"报备附件:",rules:[{message:"只能上传PDF,TXT,XLS,DOC文件"}]},{input:s(()=>[n(R,{"max-count":1,modelValue:r.value,"onUpdate:modelValue":e[20]||(e[20]=l=>r.value=l),"after-read":N,"before-read":E,accept:"text/plain, application/vnd.ms-excel, application/vnd.ms-works, application/msword, application/pdf"},{default:s(()=>[n(b,{icon:"plus",style:{width:"100px"},size:"small",type:"primary"},{default:s(()=>[_("报备附件")]),_:1})]),_:1},8,["modelValue"])]),_:1})):p("",!0),n(b,{class:"subBtn",style:{margin:"0 15px"},type:"primary",round:"",block:"","native-type":"submit"},{default:s(()=>[_("确定")]),_:1})]),_:1},8,["style"])]),_:1},8,["show","style"])])}}});const xe=de(be,[["__scopeId","data-v-a99926f3"]]);export{xe as default};
