/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-01 17:37:00
 */
import { useLocation } from 'react-router-dom';
const File = () => {
  const { state } = useLocation();
  return <div>{state?.id}</div>;
};

export default File;
