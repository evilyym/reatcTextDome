// Entry component
import { App } from 'antd';

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let msg: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  const staticFunction = App.useApp();
  msg = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  debugger
  return null;
};

export { msg, notification, modal };
