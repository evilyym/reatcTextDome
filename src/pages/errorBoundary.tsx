/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-21 13:23:16
 */
import { useRouteError } from 'react-router-dom';

import { Empty } from 'antd';

const ErrorBoundary = () => {
  const error = useRouteError();
  //错误信息，可用来错误上报
  return (
    <div style={{ color: 'red', margin: 'auto' }}>
      <Empty description={'暂无权限'} />
    </div>
  );
};

export default ErrorBoundary;
