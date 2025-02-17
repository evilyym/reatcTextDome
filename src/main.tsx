/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2025-02-17 17:27:03
 */
import React, { Suspense, useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, BrowserRouter } from 'react-router-dom';

import { App, Spin, message } from 'antd';
import ReactDOM from 'react-dom/client';
import Track from 'sunshine-track';

import router from './router';
import store from './store/store';

import styles from '@/assets/styles/home.module.scss';
import useStore from '@/store/spinState';
import './index.scss';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// eslint-disable-next-line react-refresh/only-export-components
const Msg = () => {
  const { spin, msgT } = useStore();

  const [messageApi, contextHolder] = message.useMessage();

  interface msgType {
    type: any;
    content: string;
    isOpen?: number;
  }

  const msge = (msg: msgType) => {
    messageApi.open({
      type: msg.type,
      content: msg.content,
    });
  };

  useEffect(() => {
    msgT.isOpen !== 0 && msge(msgT);
  }, [msgT]);

  return (
    <>
      {contextHolder}
      <Spin spinning={spin} fullscreen />
    </>
  );
};

Track.init({
  projectKey: '项目的key', // 项目的key
  userId: '用户id', // 用户id
  log: true,
  report: {
    url: 'http://127.0.0.1:5000/track', // 上报url
    reportType: 'img', // 上报方式
  },
  switchs: {
    // 上报数据开关
    xhr: true, // xhr请求
    fetch: true, // fetch请求
    error: true, // 报错
    hashchange: true, // hash变化
    history: true, // history变化
    whitescreen: true, // 白屏
    // performance: true, // 页面性能
  },
});

root.render(
  <Provider store={store}>
    <App style={{ height: '100%', display: 'flex' }}>
      <Msg></Msg>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </App>
  </Provider>,
);
