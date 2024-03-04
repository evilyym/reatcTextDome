import Vconsole from 'vconsole'

let hostname = location.hostname;
let configURL = { baseURL: "", saasURL: "" };
if (
  hostname.indexOf("dev") > -1 ||
  hostname.indexOf("127.0.0.1") > -1 ||
  hostname.indexOf("localhost") > -1
) {
  configURL.baseURL = "https://dev-zjtie.goliveplus.cn/activitysupport_api"; //测试服
  configURL.saasURL = "https://dev-zjtie.goliveplus.cn/saas_wap/"; //测试服
  new Vconsole()
} else {
  configURL.baseURL = "https://zhhq-zjtie-edu-cn-s.zjtie.edu.cn:443/activitysupport_api"; //正式服
  configURL.saasURL = "https://zhhq-zjtie-edu-cn-s.zjtie.edu.cn:443/saas_wap/"; //正式服
}

export default configURL;
