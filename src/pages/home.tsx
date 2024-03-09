/*
 * @Author: yym
 * @Date: 2024-02-28 15:06:28
 * @LastEditTime: 2024-03-08 11:25:12
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';

import { Layout, Menu, theme, ConfigProvider, Spin } from 'antd';

import Bread from '@/components/breadcrumb';

import '@/assets/styles/home.scss';

// import Iconfont from '@/components/Iconfont';

// import router from '@/router';

// import { useMenuRoute } from '@/components/useMenuRoute';

import { getProductList, getListAll } from '@/apis/user';

import type { MenuProps } from 'antd';

import styles from '@/assets/styles/home.module.scss';

const { Header, Content, Sider, Footer } = Layout;

const items1: MenuProps['items'] = [
  { key: '1', name: '主页' },
  { key: '2', name: '设置' },
].map((item) => ({
  key: item.key,
  label: `${item.name}`,
}));

const items2: any = [];
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [location, setLocation] = useState(useLocation().pathname);

  const goReace = (e: any) => {
    setSelectedKeys(e.key);
    navigate(e.key.split('-')[0], { replace: true });
  };

  const itemRender: any = (item: any, params: any, items: any, paths: any) => {
    const last = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  };

  const [userTtems2, setUserTtems2] = useState(items2);
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [loadingMeun, setLoadingMeun] = useState<boolean>(true);

  let parentKey: string[] = [];
  const findParent = (arr: any[], path: string, parent: string[] = []): string[] => {
    let a = parent;
    for (const k in arr) {
      if (parentKey.length == 0) {
        if (arr[k].key === path) {
          parentKey = parent;
        } else {
          a = [];
        }
        if (arr[k].children && arr[k].children!.length > 0) {
          if (findParent(arr[k].children!, path, [arr[k].key, ...parent]).length > 0) {
            parent = parent.concat(findParent(arr[k].children!, path, [arr[k].key, ...parent]));
          }
        }
      }
    }
    return a;
  };
  const onOpenChange = (keys: any) => {
    const openKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    // const closeKey = openKeys.find((key) => keys.indexOf(key) === -1);
    if (openKey) {
      findParent(userTtems2, openKey, []) || [];
      setOpenKeys([openKey, ...parentKey]);
      parentKey = [];
    } else {
      setOpenKeys(keys);
    }
  };

  // "H10172" 15505707071
  useEffect(() => {
    // getListAll  getProductList
    // getListAll({token:localStorage.getItem('token')}).then(({ menu_list }) => {
    getProductList({}).then(({ menu_list }: any) => {
      const myProduct = menu_list.find((item: any) => item.en_name == 'controllability');
      let myMenu = { list: [] };
      if (myProduct) {
        myMenu = myProduct.child.find((item: any) => item.en_name == 'Carcharging');
      }
      const arrN = myMenu.list.map((itme: any, index: any) => {
        if (location != '/' && `/${itme.en_name}-${index}`.indexOf(location) != -1 && location.split('-').length == 1) {
          // setLocation(`${itme.en_name}-${index}`);
          setOpenKeys([`${itme.en_name}-${index}`]);
          setSelectedKeys(`${itme.en_name}-${index}`);
        }
        return {
          key: `${itme.en_name}-${index}`,
          label: `${itme.name}`,
          // label: (
          //   <Link to={itme.en_name}>
          //     {itme.en_name} - {itme.name}
          //   </Link>
          // ),
          children:
            itme.child &&
            itme.child.map((_: any, j: any) => {
              if (
                location != '/' &&
                `/${_.en_name}-${index}`.indexOf(location) != -1 &&
                location.split('-').length == 1
              ) {
                // setOpenKeys([...openKeys, `${itme.en_name}-${index}`]);
                setOpenKeys([`${itme.en_name}-${index}`, `${_.en_name}-${j}`]);
                setSelectedKeys(`${_.en_name}-${j}`);
              }
              // console.log(location);
              // console.log(`/${_.en_name}-${j}`);
              // `/${_.en_name}-${j}`.indexOf(location) != -1 && setLocation(`${_.en_name}-${j}`);
              return {
                key: `${_.en_name}-${j}`,
                label: _.name,
                // label: (
                //   <Link to={_.en_name}>
                //     {_.en_name} - {_.name}
                //   </Link>
                // ),
              };
            }),

          /* key: `${itme.sort}`,
          // icon: React.createElement(icon),
          label: `${itme.type_name}`,
          children: itme.child.map((_, j) => {
            return {
              key: _.id,
              icon: <img src={_.logo} alt="" width="16" height="16" />,
              label: _.name,
            };
          }), */
        };
      });
      setUserTtems2(arrN);
      setLoadingMeun(false);
    });
  }, []);

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
      <Layout style={{ height: '100%' }}>
        <Header className={styles.main} style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles['demo-logo']} />
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{ flex: 1, minWidth: 0, color: 'red' }}
          /> */}
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    darkItemBg: '#222653',
                    darkSubMenuItemBg: '#222653',
                    darkItemColor: '#ccc',
                    darkItemHoverBg: '#6495ed',
                    darkItemSelectedBg: '#1677ff',
                    darkItemSelectedColor: '#fff',
                  },
                },
              }}
            >
              <Spin spinning={loadingMeun}>
                <Menu
                  theme="dark"
                  mode="inline"
                  // defaultSelectedKeys={[location]}
                  // defaultOpenKeys={[location]}
                  style={{ height: '100%', borderRight: 0 }}
                  items={userTtems2}
                  onOpenChange={onOpenChange}
                  openKeys={openKeys}
                  onClick={goReace}
                  selectedKeys={selectedKeys}
                  // onSelect={({ key }) => setSelectedKey(key)}
                  // selectedKeys={[selectedKey]}
                />
              </Spin>
            </ConfigProvider>
          </Sider>
          <Layout style={{ padding: '20px 24px 5px' }}>
            {/* <Bread /> */}
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              选中: {selectedKeys}
              <br />
              展开: {openKeys}
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
