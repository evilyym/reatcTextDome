/*
 * @Author: yym
 * @Date: 2024-03-14 16:36:44
 * @LastEditTime: 2024-03-14 16:48:08
 */
import React from 'react';

import { Layout, Button, Dropdown } from 'antd';

import type { MenuProps } from 'antd';

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => (
  <>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div></div>
      <div></div>
      <div>
        <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
          <Button>bottomLeft</Button>
        </Dropdown>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <Button>bottom</Button>
        </Dropdown>
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
          <Button>bottomRight</Button>
        </Dropdown>
        <br />
        <Dropdown menu={{ items }} placement="topLeft" arrow={{ pointAtCenter: true }}>
          <Button>topLeft</Button>
        </Dropdown>
        <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
          <Button>top</Button>
        </Dropdown>
        <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
          <Button>topRight</Button>
        </Dropdown>
      </div>
    </Header>
  </>
);

export default App;
