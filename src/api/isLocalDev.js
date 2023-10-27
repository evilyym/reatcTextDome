let hostname = location.hostname
let config = {}
if (hostname.indexOf('dev') > -1 || hostname.indexOf('127.0.0.1') > -1 || hostname.indexOf('localhost') > -1) {
   config.baseURL = 'https://dev-apartment-system-api.goliveplus.cn'  //测试服
   config.saasURL = 'https://dev-saas-api.goliveplus.cn'  //测试服

} else {
  config.baseURL = 'https://apartment-system-api.goliveplus.cn' //正式服
  config.saasURL = 'https://saas.api.goliveplus.cn' //正式服

}
export default config