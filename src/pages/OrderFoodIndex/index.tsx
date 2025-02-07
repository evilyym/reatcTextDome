/*
 * @Date: 2024-09-25 09:00:30
 * @LastEditors: You yangym@golive.cc
 * @LastEditTime: 2025-02-06 15:26:10
 * @FilePath: \vite-react-ts-seed-master\src\pages\OrderFoodIndex\index.tsx
 */
import { useCallback } from 'react';

import { Space, Table, Tag } from 'antd';

import Search from './search.tsx';

import useUserStore from '@/store/user';

const Info = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  const hanlderUser = useCallback(() => {
    updateUserInfo({ name: 'lisi', age: 24 });
  }, [updateUserInfo]);

  const handlerAge = useCallback(() => {
    updateAge(userInfo.age + 1);
  }, [updateAge, userInfo.age]);

  const handlerToken = useCallback(() => {
    updateToken('23652');
  }, [updateToken]);

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <div className="App">
      <Search />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Info;
