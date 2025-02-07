/*
 * @Date: 2024-01-26 01:29:24
 * @LastEditors: You yangym@golive.cc
 * @LastEditTime: 2025-02-07 16:15:21
 * @FilePath: \vite-react-ts-seed-master\src\store\user.ts
 */
import { produce } from 'immer';
import { create } from 'zustand';

interface UserInfo {
  name: string;
  age: number;
}

interface UserState {
  userInfo: UserInfo;
  token: string;
  updateUserInfo: (parmas: UserInfo) => void;
  updateAge: (params: number) => void;
  updateToken: (params: string) => void;
}

// 创建状态存储
const useUserStore = create<UserState>((set) => ({
  userInfo: {
    name: 'zhangsan',
    age: 23,
  },
  token: 'token',
  //更新整个对象
  updateUserInfo: (userInfo) => set({ userInfo }), //合并userInfo
  //更新对象中某个属性
  updateAge: (age) =>
    set(
      produce((state) => {
        state.userInfo.age = age;
      }),
    ),
  //更新原始数据类型
  updateToken: (token) => set({ token }),
}));

export default useUserStore;
