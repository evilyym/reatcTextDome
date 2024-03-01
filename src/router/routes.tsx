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

const routes = [
  {
    path: '/login',
    element: <Login />,
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
    ],
  },
  {
    path: '*',
    // element: <div>404</div>,
    element: <ErrorPage />,
  },
];

export default routes;
