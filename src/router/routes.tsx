/*
 * @Author: yym
 * @Date: 2024-03-04 10:01:09
 * @LastEditTime: 2025-02-07 16:18:55
 */
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';

const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));
const ErrorPage = lazy(() => import('../pages/errorBoundary'));
const Tetres = lazy(() => import('../pages/ExpandingFunctions/canvas.tsx'));

const routes = [
  {
    path: '/Tetres',
    element: <Tetres color={'red'} radius={0} v={0} angle={0} x={0} y={0} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [],
  },
];

export default routes;
