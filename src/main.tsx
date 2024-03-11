/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-11 09:39:08
 */
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { App } from 'antd';
import ReactDOM from 'react-dom/client';

import router from './router';

import './index.scss';
import styles from '@/assets/styles/home.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App style={{ height: '100%' }}>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </App>,
);
