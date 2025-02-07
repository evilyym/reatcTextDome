import React, { useEffect, useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Flex gap="small" wrap="wrap">
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              查询
            </Button>
            <Button>Default 重置</Button>
            {/* <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button> */}
          </Flex>
        )}
      </Form.Item>
    </Form>
  );
};

export default App;
