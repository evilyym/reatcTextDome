/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-02 16:51:07
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const router = createBrowserRouter(routes);

//可传第二个参数，配置base路径 { basename: "/app"}

export default router;
