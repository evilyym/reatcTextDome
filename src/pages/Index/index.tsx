/*
 * @Date: 2024-09-25 09:00:30
 * @LastEditors: You yangym@golive.cc
 * @LastEditTime: 2025-02-07 16:14:59
 * @FilePath: \vite-react-ts-seed-master\src\pages\index\index.tsx
 */
import { useCallback } from 'react';

import { Space, Table, Tag } from 'antd';

import useUserStore from '@/store/user';

const Index = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  return (
    <div className="App">
      <>首页</>
    </div>
  );
};

export default Index;
