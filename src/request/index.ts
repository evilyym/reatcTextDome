import axios from "axios";
import { showLoadingToast, closeToast, showFailToast } from "vant";
import { routerQuery } from "../route/index";
import { v1 as uid } from "uuid";

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    msg: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
import configURL from "./http";

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
    // config.headers["Authorization"] = userCode;
    const tid = uid().replaceAll('-','')
    config.headers["Trace-Id"] = tid;
    const { data, params, method } = config;
    // 统一过滤空字段
    const obj = method === "get" ? params : data;
    if (obj) {
      const empty = ["", null, undefined, NaN];
      for (let item in obj) {
        if (empty.includes(obj[item]) || obj[item].length == 0) {
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
    const { data, config } = response;
    statusCodeHandle(data.code, data.data, data.msg||data.message, config.headers['Trace-Id'].substr(0, 12) );
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//状态码处理
const statusCodeHandle = (code: number, data: any, msg: string, tid:string) => {
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
    case 501:
    case 502:
      const codeType = routerQuery;
      if (codeType.code) {
        location.replace(
          data.register_url`?redirect_url=${
            location.origin + location.pathname
          }?activitysupporCode=${codeType.code}&time=${new Date().getTime()}`
        );
      } else if (codeType.id) {
        location.replace(
          data.register_url +
            `?redirect_url=${location.origin + location.pathname}?id=${
              codeType.id
            }&userType=${codeType.user_type}&time=${new Date().getTime()}`
        );
      } else {
        location.replace(
          data.register_url +
            `?redirect_url=${location.origin + location.pathname}`
        );
      }
      break;
    case 200:
      break;
    default:
      showFailToast(msg + '\n' + tid);
      break;
  }
};

export default request;
