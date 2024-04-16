/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 10:53:45
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, BrowserRouter } from 'react-router-dom';

import { App, Spin, message } from 'antd';
import ReactDOM from 'react-dom/client';

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

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  useEffect(() => {
    msgT && error(msgT);
  }, [msgT]);
  return (
    <>
      {contextHolder}
      <Spin spinning={spin} fullscreen />
    </>
  );
};

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
