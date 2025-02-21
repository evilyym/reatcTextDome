import React, { useEffect, useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Dropdown, Table, Tag, Card, Space } from 'antd';

import type { TableProps, MenuProps } from 'antd';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <i>{text}</i>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const FormDom: React.FC = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item name="name">
        <Input prefix={<UserOutlined />} placeholder="张三" />
      </Form.Item>
      {/* rules={[{ required: true, message: 'Please input your password!' }]} */}
      <Form.Item name="age">
        <Input prefix={<LockOutlined />} placeholder="18" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Flex gap="small" wrap="wrap">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button>重置</Button>
          </Flex>
        )}
      </Form.Item>
    </Form>
  );
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <Button>word</Button>,
  },
  {
    key: '2',
    label: <Button>pdf</Button>,
  },
  {
    key: '3',
    label: <Button>exll</Button>,
  },
];

const ButtonBox: React.FC = () => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
        <Button>导出</Button>
      </Dropdown>
      <Button>打印</Button>
    </Space>
  </Space>
);

const App: React.FC = () => (
  <>
    <FormDom />
    <ButtonBox></ButtonBox>
    <br />
    <Table<DataType> columns={columns} dataSource={data} />
  </>
);
export default App;
