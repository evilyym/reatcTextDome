import axios from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    msg: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

let hostname = location.hostname;
let configURL = { baseURL: "", saasURL: "" };
if (
  hostname.indexOf("dev") > -1 ||
  hostname.indexOf("127.0.0.1") > -1 ||
  hostname.indexOf("localhost") > -1
) {
  configURL.baseURL = "https://dev-zjtie.goliveplus.cn/activitysupport_api"; //测试服
  configURL.saasURL = "https://dev-zjtie.goliveplus.cn"; //测试服
} else {
  configURL.baseURL = "https://zjtie.goliveplus.cn/activitysupport_api"; //正式服
  configURL.saasURL = "https://zjtie.goliveplus.cn"; //正式服
}

const request = axios.create({
  baseURL: configURL.baseURL, //'https://dev-zjtie.goliveplus.cn/activitysupport_api'
});

request.interceptors.request.use(
  (config) => {
    const userCode = localStorage.getItem("userCode");
    config.headers["Authorization"] = userCode;
    const { data, params, method } = config;
    // 统一过滤空字段
    const obj = method === "get" ? params : data;
    if (obj) {
      const empty = ["", null, undefined, NaN];
      for (let item in obj) {
        if (empty.includes(obj[item])) {
          delete obj[item];
        }
      }
    }
    return config;
  },
  (error) => {
    console.log("请求拦截器抛出异常", error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功
    const { data } = response;

    statusCodeHandle(data.code, data.msg);
    // return { data: data.data, msg: data.msg, code: data.code };
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//状态码处理
const statusCodeHandle = (code: number, msg: string) => {
  switch (code) {
    case 401:
      location.href = "https://zjtie.goliveplus.cn";
      break;
    case 200:
      break;
    default:
      console.error(msg);
      break;
  }
};

export default request;
