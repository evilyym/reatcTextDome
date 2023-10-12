import axios from './axiosplugin';
import options from './isLocalDev';


export default class Fetch {
  formatToken (config) {
    let tenantCode = localStorage.getItem("tenantCode")|| '';
    let userCode = localStorage.getItem("userCode")|| '';
    // console.log('reuqest前的请求返回:', Authorization);
    config['headers'] = config.headers || {};
    if (tenantCode != '') {
      config['headers']['tenantCode'] = tenantCode;
    }
    if (userCode != '') {

      config['headers']['userCode'] = userCode;
    }

    return config;
  }
  request (config) {
    let url = options.baseURL;
    if (/http(s)?/.test(config.url)) {
      url = '';
    } else {
      url = options.baseURL;
    }
    config = this.formatToken(config);
    return new Promise((resolve, reject) => {
      axios({
        url: url + config.url,
        method: config.method,
        data: config.data,
        params: (/post|put/i).test(config.method) ? {} : {
          ...config.params
        },
        headers: config.headers ? {
          ...config.headers
        } : {}
      }).then((res) => {
        resolve(res.data, res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
 saasRequest (config) {
    let url = options.saasURL;
    config = this.formatToken(config);
    return new Promise((resolve, reject) => {
      axios({
        url: url + config.url,
        method: config.method,
        data: config.data,
        params: (/post|put/i).test(config.method) ? {} : {
          ...config.params
        },
        headers: config.headers ? {
          ...config.headers
        } : {}
      }).then((res) => {
        resolve(res.data, res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
