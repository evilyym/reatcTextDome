/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 10:53:45
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, BrowserRouter } from 'react-router-dom';

import { App } from 'antd';
import { random } from 'ym-toolset';
import ReactDOM from 'react-dom/client';

import router from './router';
import store from './store/store';

import './index.scss';
import styles from '@/assets/styles/home.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log(random(1, 20));

root.render(
  <Provider store={store}>
    <App style={{ height: '100%', display: 'flex' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </App>
  </Provider>,
);
