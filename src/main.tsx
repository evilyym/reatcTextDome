/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-03 16:31:46
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { App } from 'antd';
import ReactDOM from 'react-dom/client';

import router from './router';
import store from './store/store';

import './index.scss';
import styles from '@/assets/styles/home.module.scss';

const RouterContext = React.createContext<{ menus: any[] }>({ menus: [] });

const modules = import.meta.glob('./pages/**/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '')] = modules[cur];
  return prev;
}, {}) as any;

function Apps() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getAdminMenus().then((adminMenus: any) => {
  //     setMenus(adminMenus);
  //     setLoading(false);

  //     // 获取菜单后动态添加路由
  //     router.routes[0].children = adminMenus.map((menu: any) => ({
  //       path: menu.route,
  //       Component: lazy(components[menu.filePath]),
  //     }));
  //   });
  // }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <RouterContext.Provider value={{ menus }}>
      <RouterProvider router={router} />
    </RouterContext.Provider>
  );
}

export default Apps;

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
