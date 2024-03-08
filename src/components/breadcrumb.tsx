/*
 * @Author: yym
 * @Date: 2024-03-05 10:50:22
 * @LastEditTime: 2024-03-08 10:45:38
 */
import React, { Suspense } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';

import type { MenuProps } from 'antd';

// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const Bread: React.FC = () => {
  const navigate = useNavigate();

  const goReace = (e: any) => {
    navigate(e.key, { replace: true });
  };

  const itemRender = (item, params, items, paths) => {
    const last = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  };

  const breadcrumbItems = [
    {
      path: '/',
      title: 'home',
    },
    {
      path: '1',
      title: 'first',
      children: [
        {
          path: '/1',
          title: 'General',
        },
        {
          path: '/2',
          title: 'Layout',
        },
        {
          path: '/3',
          title: 'Navigation',
        },
        {
          path: '/',
          title: '主页',
        },
      ],
    },
    {
      path: 'second',
      title: 'second',
    },
  ];
  return <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} items={breadcrumbItems}></Breadcrumb>;
};

export default Bread;
