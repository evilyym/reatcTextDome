import React from 'react';
import * as Icons from '@ant-design/icons';

const Iconfont = (props: { icon: string }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = Icons;
  debugger
  return React.createElement(antIcon[icon]);
};

export default Iconfont
