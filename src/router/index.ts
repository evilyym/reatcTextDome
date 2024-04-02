/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-02 16:46:12
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes);

const modules = import.meta.glob('./pages/*/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
  prev[cur.replace('./pages', '')] = modules[cur];
  return prev;
}, {}) as any;

// 获取菜单后动态添加路由
router.routes[0].children = adminMenus.map((menu: any) => ({
  path: menu.route,
  Component: lazy(components[menu.filePath]),
}));
//可传第二个参数，配置base路径 { basename: "/app"}

export default router;
