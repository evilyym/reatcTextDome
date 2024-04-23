/*
 * @Author: yym
 * @Date: 2024-03-04 10:01:09
 * @LastEditTime: 2024-04-08 10:28:44
 */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const User = lazy(() => import('../pages/user'));
const Manage = lazy(() => import('../pages/manage'));
const File = lazy(() => import('../pages/file'));
const Info = lazy(() => import('../pages/info'));
const ErrorPage = lazy(() => import('../pages/errorBoundary'));
const DatePicker = lazy(() => import('../pages/datePicker'));
const Dropdoswns = lazy(() => import('../pages/antdDropdown.tsx'));
const Tetres = lazy(() => import('../pages/efilCom/canvas.tsx'));
const Els = lazy(() => import('../pages/elsDome.tsx'));
const ElsTst = lazy(() => import('../pages/efilCom/blackType.tsx'));
const ElsDom = lazy(() => import('../pages/elsVueDome.tsx'));

const routes = [
  {
    path: '/ElsDom',
    element: <ElsDom />,
  },
  {
    path: '/Tetres',
    element: <Tetres color={'red'} radius={0} v={0} angle={0} x={0} y={0} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/Dropdoswns',
    element: <Dropdoswns />,
  },
  {
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/1',
        element: <User />,
      },

      {
        path: '/2',
        element: <Manage />,
      },
      {
        path: '/3',
        element: <File />,
      },
      {
        path: '/',
        element: <Info />,
      },
      {
        path: '/elsTst',
        element: <ElsTst />,
      },
      {
        path: '/els',
        element: <Els />,
      },
      {
        path: '/data',
        element: <DatePicker />,
      },
    ],
  },
];

export default routes;
