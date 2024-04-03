/*
 * @Author: yym
 * @Date: 2024-02-28 15:06:28
 * @LastEditTime: 2024-04-02 11:19:58
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';

import { DownOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, ConfigProvider, Spin, Dropdown, message, Button } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import VirtualList from 'rc-virtual-list';

import '@/assets/styles/home.scss';

// import Iconfont from '@/components/Iconfont';

// import router from '@/router';
import Bread from '@/components/breadcrumb';
import { useMenuRoute } from '@/components/useMenuRoute';

import { getAssetsFile } from '@/utils/share';

import { getProductList, getListAll } from '@/apis/user';

import type { MenuProps } from 'antd';

import styles from '@/assets/styles/home.module.scss';
// import { notification, message } from '@/store/store';

const { Header, Content, Sider, Footer } = Layout;

const items1: MenuProps['items'] = [
  { key: '1', name: '主页' },
  { key: '2', name: '设置' },
].map((item) => ({
  key: item.key,
  label: `${item.name}`,
}));

const items2: any = [];

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        修改头像
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        系统消息
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        个人中心
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        修改密码
      </a>
    ),
  },
  {
    key: '5',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        退出登录
      </a>
    ),
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navClick = () => {
    message.success('Success!');
  };

  const navigate = useNavigate();
  const [location, setLocation] = useState(useLocation().pathname);

  const goReace = (e: any) => {
    // reverse().join("")
    setSelectedKeys(e.keyPath[0]);
    navigate(e.keyPath.reverse().join('/'), { replace: true });
  };

  const itemRender: any = (item: any, params: any, items: any, paths: any) => {
    const last = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  };

  const [userTtems2, setUserTtems2] = useState(items2);
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [loadingMeun, setLoadingMeun] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');

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
    let openKey: any;
    try {
      openKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    } catch (error) {
      openKey = false;
    }
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
      let myMenu = { list: [], name: '' };
      if (myProduct) {
        myMenu = myProduct.child.find((item: any) => item.en_name == 'Carcharging');
      }
      setTitle(myMenu.name);

      function GetRandomNum(Min, Max) {
        const Range = Max - Min;
        const Rand = Math.random();
        return Min + Math.round(Rand * Range);
      }

      function mapMenuTree(item) {
        const key = item.soren_namet || item.en_name;
        return {
          key: key,
          label: `${item.type_name || item.name}`,
          children:
            item.child && Array.isArray(item.child) && item.child.length
              ? item.child.map((childItem) => mapMenuTree(childItem))
              : item.list && Array.isArray(item.list) && item.list.length
                ? item.list.map((childItem) => mapMenuTree(childItem))
                : null,
        };
      }

      const arrN = menu_list.map(mapMenuTree);
      setOpenKeys(location.split('/'));
      setSelectedKeys(location.split('/').slice(-1));
      setUserTtems2(arrN);
      setLoadingMeun(false);

      // 添加路由
    });
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
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
          <>
            <div className={styles['head-logo']} />
            <div className={styles['head-title']} onClick={navClick}>
              {title}
            </div>
            <div className={styles['head-user']}>
              <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                <img src={getAssetsFile('home.png')} alt="" />
                {/* <Button>bottom</Button> */}
              </Dropdown>
            </div>
            {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{ flex: 1, minWidth: 0, color: 'red' }}
          /> */}
          </>
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
                {/* <VirtualList height={400}> */}
                <Menu
                  theme="dark"
                  mode="inline"
                  style={{ height: '100%', borderRight: 0, overflow: 'auto' }}
                  items={userTtems2}
                  onOpenChange={onOpenChange}
                  openKeys={openKeys}
                  onClick={goReace}
                  selectedKeys={selectedKeys}
                  // onSelect={({ key }) => setSelectedKey(key)}
                />
                {/* </VirtualList> */}
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
              {/* 选中: {selectedKeys}
              <br />
              展开: {openKeys}
              <br />
              路由 {location} */}
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
