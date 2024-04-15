/*
 * @Author: yym
 * @Date: 2024-03-13 17:29:14
 * @LastEditTime: 2024-03-13 17:34:48
 */
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: false,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value = false;
    },
    disconnect: (state) => {
      state.value = true;
    },
  },
});
// 每个 case reducer 函数会生成对应的 Action creators
export const { increment, disconnect } = counterSlice.actions;

export default counterSlice.reducer;
