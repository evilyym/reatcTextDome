/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-04-03 16:32:04
 */
import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

const aaa: string = 'ss';

aaa = 22;

const router = createBrowserRouter(routes);

//可传第二个参数，配置base路径 { basename: "/app"}

export default router;
