import axios from "axios";
import { showLoadingToast, closeToast } from "vant";
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    msg: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
import Vconsole from 'vconsole'

let hostname = location.hostname;
let configURL = { baseURL: "", saasURL: "" };
if (
  hostname.indexOf("dev") > -1 ||
  hostname.indexOf("127.0.0.1") > -1 ||
  hostname.indexOf("localhost") > -1
) {
  configURL.baseURL = "https://dev-zjtie.goliveplus.cn/activitysupport_api"; //测试服
  configURL.saasURL = "https://dev-zjtie.goliveplus.cn"; //测试服
  new Vconsole()
} else {
  configURL.baseURL = "https://zjtie.goliveplus.cn/activitysupport_api"; //正式服
  configURL.saasURL = "https://zjtie.goliveplus.cn"; //正式服
}

const request = axios.create({
  baseURL: configURL.baseURL, //'https://dev-zjtie.goliveplus.cn/activitysupport_api'
});

request.interceptors.request.use(
  (config) => {

    showLoadingToast({
      message: "加载中...",
      duration: 0,
      forbidClick: true,
      loadingType: "spinner",
    });

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
    closeToast();
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
    case 12000401:
      sessionStorage.removeItem("go");
      let point_url = localStorage.getItem("point_url");
      point_url = point_url.replace(/%3A%2F%2F/, "://");
      location.replace(
        `${point_url}/?redirect_url=${location.origin + location.pathname}${
          location.search.indexOf("name=") > -1
            ? "?name=" + location.search.split("name=")[1].split("&")[0]
            : ""
        }`
      );
      // location.href = "https://zjtie.goliveplus.cn";
      break;
    case 200:
      break;
    default:
      console.error(msg);
      break;
  }
};

export default request;
