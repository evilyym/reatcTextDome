/*
 * @Author: yym
 * @Date: 2024-03-11 09:07:48
 * @LastEditTime: 2024-03-13 17:39:13
 */
import { configureStore } from '@reduxjs/toolkit';
import { App } from 'antd';

import counterReducer from './counter';

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

() => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export { message, notification, modal };

export default configureStore({
  reducer: {
    counter: counterReducer,
    // message,
    // notification,
    // modal,
  },
});
