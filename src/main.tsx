/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-13 17:26:14
 */
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { App } from 'antd';
import ReactDOM from 'react-dom/client';

import router from './router';
import store from './store/store';

import './index.scss';
import styles from '@/assets/styles/home.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App style={{ height: '100%' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </App>
  </Provider>,
);
