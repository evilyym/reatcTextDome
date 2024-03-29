/*
 * @Author: yym
 * @Date: 2024-03-07 08:41:55
 * @LastEditTime: 2024-03-08 10:45:52
 */
import { useNavigate, useLocation } from 'react-router-dom';

// index 为当前菜单管理的路由层级，从 1 开始
export function useMenuRoute(index: number) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 将 path 拆分为数组
  // 如 /user/profile 将被拆分为 ['', 'user', 'profile']
  const pathItems = pathname.split('/');
  // 获取当前路由层级的 path 片段
  const pathItem = pathItems[index] ?? '';

  // 将被返回的工具函数，
  // 该函数可设置新的菜单项的 key 并导航至相应路由
  // const setPathItem = (newItemKey: string) => {
  //   const parentPath = pathItems.slice(0, index).join('/');

  //   navigate(`${parentPath}/${newItemKey}`);
  // };
  // setPathItem
  // 返回当前菜单项的 key 与工具函数
  return [pathItem] as const;
}
