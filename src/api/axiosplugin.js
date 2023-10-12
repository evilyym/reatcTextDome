// import Vue from 'vue'
import axios from 'axios'
import config from './isLocalDev'
import * as context from '../main'
import { Dialog } from 'vant'

// import {
//   AlertModule
// } from 'vux'
// sessionId
// let sessionId = localStorage.getItem("sessionId")
let options = {
  baseURL: config.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    //   // ; charset=utf-8

  }
}
const Axios = axios.create(options)
//请求拦截
Axios.defaults.timeout = 5000
Axios.interceptors.request.use((config) => {
  axios.log('输出axios拦截信息:', config);
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  let tenantCode = localStorage.getItem("tenantCode")
  let userCode = localStorage.getItem("userCode")
  let userId = localStorage.getItem("userId")
  // alert(usersData)
  // context.$router.replace("/login")
  // if (!tenantCode || !userCode) {
  //   context.$router.replace("/Login")
  //   return config
  // }
  config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json'
  // Authorization
  //此处是要添加身份角色验证的 token的请求添加
  // let token = ""
  // if (token) {
  //   config.headers["access_token"] = token
  // }
  return config
}, (error) => {
  console.log('请求失败:', error)
  console.log(error)
  if (error && error.response) {
    console.log(error.response)
    console.log(error.response.status)
  }
  return Promise.reject('error')
})
//响应拦截
axios.interceptors.response.use(function (response) {
  console.log('请求返回拦截:', response)
  if (response.config.url.indexOf('vcard/user-event/record') < 0) {
    if (response.data.code == 500) {
      Dialog({
        message: `<i class="iconfont icon-guanbi"></i><div class='mt10 text-dialog'>${response.data.msg}</div>`,
        showConfirmButton: false,
        closeOnClickOverlay: true,
        width: 150
      })
    } else if (response.data.code == 510) {
      window.location.href = '/'
    } else if (response.data.code == 402) {
      Dialog({
        message: `<i class="iconfont icon-guanbi"></i><div class='mt10 text-dialog'>${response.data.msg}</div>`,
        showConfirmButton: false,
        closeOnClickOverlay: true,
        width: 150
      })
      let point_url = localStorage.getItem('point_url');
      point_url = point_url.replace(/%3A%2F%2F/, '://')
      setTimeout(() => {
        location.replace(`${point_url}/?redirect_url=${location.origin + location.pathname}${location.search.indexOf('name=') > -1 ? '?name=' + location.search.split('name=')[1].split('&')[0] : ''}`)
      }, 1000);

    }
  }


  if (!response) {
    return Promise.reject('error')
  } else if (response.data.status == 0) {
    context.$message({
      message: response.data.msg,
      type: 'info',
      showClose: true,
      duration: 3000
    })
    context.$router.replace("/")
  }

  return response
}, function (error) {
  // 处理统一的验证失效错误.
  console.log(error)
  console.log('response:' + error.response)
  if (error && error.response) {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      console.log("错误回调", error)
      alert("网络超时")
      context.$router.push("/")
      return Promise.reject(error) // reject这个错误信息
    }
    console.log(error.response)
    switch (error.response.status) {
      default:
        console.log('请求失败')
        break
    }
  }
  return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.get['Content-Type'] = 'application/vnd.ms-excel;charset=utf-8';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true
// "Access-Control-Allow-Origin":"*"
// axios.defaults.headers['Access-Control-Allow-Origin'] = "http://192.168.33.3:8080";
export default axios
