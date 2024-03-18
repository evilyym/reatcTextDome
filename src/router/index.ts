/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-18 10:52:52
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

//可传第二个参数，配置base路径 { basename: "/app"}
const router = createBrowserRouter(routes);

export default router;
