/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-08 10:10:20
 */
import React from 'react';

import react from '@vitejs/plugin-react';
import { message } from 'antd';
import axios from 'axios';
import { v1 as uid } from 'uuid';
/*
 * 创建实例
 * 与后端服务通信
 */
const HttpClient = axios.create({
  // VITE_APP_CAR_BASE_URL
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // baseURL: process.env.VITE_APP_BASE_URL,
});

/**
 * 请求拦截器
 * 功能：配置请求头
 */
HttpClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem('token');
    // config.headers['Trace-id'] = uid().replaceAll('-', '');
    if (/api\/saas/.test(config.url)) {
      config.baseURL = import.meta.env.VITE_APP_BASE_URL;
    } else {
      config.baseURL = import.meta.env.VITE_APP_CAR_BASE_URL;
    }
    console.log(config.baseURL);
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 功能：处理异常
 */
HttpClient.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    if (data.code == 200) return data.data;
    //
    message.error(
      React.createElement(
        'span',
        { style: { display: 'inline-block', 'word-wrap': 'break-word' } },
        data.msg + '\n' + data.trace_id.slice(0, 16),
      ),
    );
    return Promise.reject(data.msg);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default HttpClient;
