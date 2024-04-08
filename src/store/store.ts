/*
 * @Author: yym
 * @Date: 2024-03-11 09:07:48
 * @LastEditTime: 2024-03-13 17:39:13
 */
import { configureStore } from '@reduxjs/toolkit';
import './msg';

import counterReducer from './counter';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
