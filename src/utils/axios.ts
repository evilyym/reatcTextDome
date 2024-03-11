/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-11 09:19:19
 */
import React from 'react';

import { CopyOutlined } from '@ant-design/icons';
import react from '@vitejs/plugin-react';
// import { notification, message } from 'antd';
import axios from 'axios';
import { v1 as uid } from 'uuid';

import { notification, message } from '@/store/store';

/*
 * 创建实例
 * 与后端服务通信
 */
const HttpClient = axios.create({
  // VITE_APP_CAR_BASE_URL
  // baseURL: import.meta.env.VITE_APP_BASE_URL,
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
    message.success('Success!');
    notification.error({
      className: 'messageErr',
      duration: 5,
      message: data.msg,
      description: React.createElement(
        'span',
        {},
        data.trace_id.slice(0, 16),
        React.createElement(CopyOutlined, {
          onClick: () => {
            message.success({ content: '复制成功', duration: 3 });
          },
        }),
      ),
      // onClick: () => {
      //   console.log('Notification Clicked!');
      // },
      // style: { background: 'red' },
      // content: React.createElement(
      //   'p',
      //   { style: { display: 'inline-block', 'word-wrap': 'break-word', width: '150px', 'text-overflow': 'ellipsis' } },
      //   data.msg + '\n' + data.trace_id.slice(0, 16),
      // ),
    });
    if (data.code == 401 && window.location.pathname != '/login') window.location.pathname = '/login';
    return Promise.reject(data.msg);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default HttpClient;
