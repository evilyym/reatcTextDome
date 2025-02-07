/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: yym
 * @Date: 2024-02-28 15:06:28
 * @LastEditTime: 2025-02-07 17:23:36
 */
import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, Link, useLocation, useMatches } from 'react-router-dom';

import { Layout, Menu, theme, ConfigProvider, Spin, Dropdown, message, Button, Card } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import '@/assets/styles/home.scss';

// import Iconfont from '@/components/Iconfont';

import Bread from '@/components/breadcrumb'; //面包屑导航组件
import { useMenuRoute } from '@/components/useMenuRoute';

import i18n from '@/utils/i18';
import { getAssetsFile } from '@/utils/share';

import { getProductListJson, getListAll } from '@/apis/user';

import type { MenuProps } from 'antd';

import styles from '@/assets/styles/home.module.scss';
import router from '@/router';

// import { notification, message } from '@/store/store';

const { Header, Content, Sider, Footer } = Layout;
const items1: MenuProps['items'] = [
  { key: '1', name: i18n.t('主页') },
  { key: '2', name: i18n.t('注册') },
].map((item) => ({
  key: item.key,
  label: item.name,
}));

const items2: [] = [];

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '修改头像',
  },
  {
    key: '2',
    label: '系统消息',
  },
  {
    key: '3',
    label: '个人中心',
  },
  {
    key: '4',
    label: '修改密码',
  },
  {
    key: '5',
    label: '退出登录',
  },
];
type aTpye = { key: string; name?: string }[];

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
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
    navigate(e.keyPath.reverse().join('/'), { replace: false });
  };

  function itemRender(item: any, params: any, items: any, paths: any): Element | React.ReactNode {
    const last: boolean = items.indexOf(item) === items.length - 1;
    return last ? <span>{item.title}</span> : <Link to={paths.join('/')}>{item.title}</Link>;
  }

  const [userTtems2, setUserTtems2] = useState(items2);
  const [openKeys, setOpenKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [loadingMeun, setLoadingMeun] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [collapsed, setCollapsed] = useState(false);

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
      openKey = keys.find((key: any) => openKeys && openKeys.indexOf(key) === -1);
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
  const matches = useMatches();

  const modules = import.meta.glob('../pages/**/*.tsx');
  // FoodApplication/OrderFood/OrderFoodIndex
  const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
    prev[cur.replace(/(\.\/)|(.tsx)/g, '')] = modules[cur];
    return prev;
  }, {}) as any;
  useEffect(() => {
    // getListAll({ token: localStorage.getItem('token') }).then(({ menu_list }) => {
    getProductListJson({}).then(({ menu_list, name }: any) => {
      // const myProduct = menu_list.find((item: any) => item.en_name == 'controllability');
      // let myMenu = { list: [], name: '' };
      // if (myProduct) {
      //   myMenu = myProduct.child.find((item: any) => item.en_name == 'Carcharging');
      // }
      setTitle(name);

      function mapMenuTree(item: { [string: string]: any }): any {
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

      const arrN = menu_list[0].child[0].list.map(mapMenuTree);

      // 添加路由
      // 递归获取路由名称
      const getRouterList = (menu: any, pathFather = '') => {
        return {
          path: menu.key,
          pathFather: pathFather,
          children:
            menu.children &&
            menu.children.map((children: any) =>
              getRouterList(children, pathFather ? pathFather + '/' + menu.key : menu.key),
            ),
          Component:
            menu.children == null && lazy(components[(pathFather ? pathFather + '/' + menu.key : menu.key) + '/index']),
        };
      };
      // 获取菜单后动态添加路由
      router.routes[2].children = arrN.map((menu: any) => {
        return getRouterList(menu);
      });
      const recursiveFirst = (arr) => {
        return arr.children ? recursiveFirst(arr.children) : arr.key;
      };
      const firstMenu = recursiveFirst(arrN[0]);
      router.navigate(firstMenu);

      setOpenKeys(location.split('/'));
      setSelectedKeys(location.split('/').slice(-1));
      setUserTtems2(arrN);
      setLoadingMeun(false);
    });
  }, [location]); //[] 监听对象 数据更新后 会请求
  // 换色
  const [value, setValue] = useState('defaultAlgorithm');
  const colorChange = (e) => {
    // 获取到 transition API 实例
    const transition = document.startViewTransition(() => {
      // document.documentElement.classList.toggle('dark');
      value == 'defaultAlgorithm' ? setValue('darkAlgorithm') : setValue('defaultAlgorithm');
    });

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e;

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));
      const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`];
      const isDark = value == 'defaultAlgorithm';
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 1000,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      );
    });
  };
  enum language {
    zh_CN = '简体中文',
    en_US = 'English',
  }
  // theme.defaultAlgorithm
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme[value],
        components: {
          Layout: {
            footerPadding: '10px 10px',
          },
        },
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Header className={styles.main} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
          <>
            <div
              className={styles['head-logo']}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
            <div className={styles['head-title']} onClick={navClick}>
              {i18n.t('主页')}
            </div>
            <div className={styles['head-user']}>
              <button onClick={() => i18n.changeLanguage(i18n.language == 'en_US' ? 'zh_CN' : 'en_US')}>
                {language[i18n.language]}
              </button>
              <button onClick={colorChange}>{t('主题')}</button>
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
          <Sider width={200} trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer }}>
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
                />
                {/* </VirtualList> */}
              </Spin>
            </ConfigProvider>
          </Sider>
          <Layout style={{ padding: '20px 24px 5px' }}>
            {/* <Bread /> */}
            <Content
              style={{
                padding: 10,
                margin: 0,
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Card>
                {/* 选中: {selectedKeys}
              <br />
              展开: {openKeys}
              <br />
              路由 {location} */}
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>
              </Card>
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
