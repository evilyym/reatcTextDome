/*
 * @Author: yym
 * @Date: 2024-03-04 10:01:09
 * @LastEditTime: 2024-03-14 16:45:40
 */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

import ErrorBoundary from '../pages/errorBoundary';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const User = lazy(() => import('../pages/user'));
const Manage = lazy(() => import('../pages/manage'));
const File = lazy(() => import('../pages/file'));
const Info = lazy(() => import('../pages/info'));
const ErrorPage = lazy(() => import('../pages/errorBoundary'));
const DatePicker = lazy(() => import('../pages/datePicker'));
const Dropdoswns = lazy(() => import('../pages/antdDropdown.tsx'));

const routes = [
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
    errorElement: <ErrorBoundary />,
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
        path: '/data',
        element: <DatePicker />,
      },
      {
        path: '*',
        // element: <div>404</div>,
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
