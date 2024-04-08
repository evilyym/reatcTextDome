/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-08 10:55:49
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes, { basename: import.meta.env.VITE_BASE }); //'/YM_dom'

//可传第二个参数，配置base路径 { basename: "/app"}

export default router;
