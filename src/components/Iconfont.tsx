/*
 * @Author: yym
 * @Date: 2024-03-06 11:26:17
 * @LastEditTime: 2024-03-07 09:36:29
 */
import React from 'react';

import * as Icons from '@ant-design/icons';

const Iconfont = (props: { icon: string }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = Icons;
  return React.createElement(antIcon[icon]);
};

export default Iconfont;
