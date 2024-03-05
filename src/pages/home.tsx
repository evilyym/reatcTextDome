/*
 * @Author: yym
 * @Date: 2024-02-28 15:06:28
 * @LastEditTime: 2024-03-05 16:00:48
 */
import React, { Suspense } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Bread from "@/components/breadcrumb";

import "@/assets/styles/home.scss";
import "@/assets/styles/home.module.scss";

// import router from '@/router';

import { getProductList } from '@/apis/user';

const { Header, Content, Sider, Footer } = Layout;

const items1: MenuProps['items'] = [
  { key: '1', name: '主页' },
  { key: '2', name: '设置' },
].map((item) => ({
  key: item.key,
  label: `${item.name}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(5).fill(null).map((_, j) => {
      const subKey = index * 5 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const goReace = (e: any) => {
    navigate(e.key, { replace: true });
  };

  const itemRender = (item, params, items, paths) => {
    const last = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  };

  // "H10172" 15505707071
  getProductList({ product_id:'H10172' }).then(({ data }) => {
    console.log(data);
  });

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
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            footerPadding: '10px 10px',
          },
        },
      }}
    >
      <Layout className='main' style={{ height: '100%' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{ flex: 1, minWidth: 0, color: 'red' }}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
              onClick={goReace}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 5px' }}>
            <Bread />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </Content>
            <Footer style={{ textAlign: 'center' }}>YM ©{new Date().getFullYear()} Created by Ant UED</Footer>
          </Layout>
        </Layout>
        {/* <Footer style={{ textAlign: 'center' }}>YM ©{new Date().getFullYear()} Created by Ant UED</Footer> */}
      </Layout>
    </ConfigProvider>
  );
};

export default App;
