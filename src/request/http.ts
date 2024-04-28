/*
 * @Author: yym
 * @Date: 2024-03-04 13:34:26
 * @LastEditTime: 2024-03-04 13:36:21
 */
import Vconsole from 'vconsole'

let hostname = location.hostname;
let configURL = { baseURL: "", saasURL: "" };
if (
  hostname.indexOf("dev") > -1 ||
  hostname.indexOf("127.0.0.1") > -1 ||
  hostname.indexOf("localhost") > -1
) {
  configURL.baseURL = "https://dev-msupervision.goliveplus.cn"; //测试服
  configURL.saasURL = "https://dev-zjtie.goliveplus.cn/saas_wap/"; //测试服
  // new Vconsole()
} else {
  configURL.baseURL = "https://zhhq.zjtie.edu.cn/activitysupport_api"; //正式服
  configURL.saasURL = "https://zhhq.zjtie.edu.cn/saas_wap/"; //正式服
}

export default configURL;