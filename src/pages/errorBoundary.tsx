/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-05 13:25:34
 */
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();
  //错误信息，可用来错误上报
    console.log(error);
  return <div style={{color:'red'}}>错误页面</div>;
};

export default ErrorBoundary;
