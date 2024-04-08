/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 10:25:42
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { CopyOutlined } from '@ant-design/icons';
import { notification, Spin } from 'antd';
import axios from 'axios';
import { v1 as uid } from 'uuid';

import type { InternalAxiosRequestConfig } from 'axios';

// import { notification, message } from '@/store/store';
import { msg } from '@/store/msg';

/*
 * 创建实例
 * 与后端服务通信
 */
const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // baseURL: process.env.VITE_APP_BASE_URL,
});

/**
 * 请求拦截器
 * 功能：配置请求头
 */
HttpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = localStorage.getItem('token');
    config.headers['Trace-id'] = uid().replaceAll('-', '');
    if (config.url && /api\/saas/.test(config.url)) {
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
    msg.success('Success!');
    const { data, config } = response;
    if (data.code == 200) return data.data;

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
            msg.success({ content: '复制成功', duration: 3 });
          },
        }),
      ),
    });
    const navigate = useNavigate();

    if (data.code == 401) navigate(`/login`);
    return Promise.reject(data.msg);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default HttpClient;
