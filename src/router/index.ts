/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 10:55:49
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_BASE });

//可传第二个参数，配置base路径 { basename: "/app"}

export default router;

// const RouterContext = React.createContext<{ menus: any[] }>({ menus: [] });

// const modules = import.meta.glob('./pages/**/index.tsx');
/*

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
        <RouterContext.Provider value= {{ menus }
}>
    <RouterProvider router={ router } />
        < /RouterContext.Provider>
);
}

export { Apps };
// */
