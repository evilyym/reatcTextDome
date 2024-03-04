// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import { goLogin, getList } from '@/apis/user';
import styled from 'styled-components';

import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const onFinish = (values: any) => {
    // navigate('/', { replace: true });

    goLogin({ ...values }).then(({ data }) => {
      if (data.code == 200) {
        localStorage.setItem('token', data.trace_id);
        getList({ ...values }).then(() => {
          navigate('/', { replace: true });
        });
      } else {
        error(data.msg);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    type?: string;
    username?: string;
    password?: string;
    code?: string;
    defaultValue?: any;
  };
  const initialValues = {
    username: '15505707071',
    password: 'Qw9KEV4C834Ie1lt/mKeeLfx/gLonCzzQc1kr2rv8gA=',
    email: 'john.doe@example.com',
  };

  return (
    <Wrapper className="main">
      {contextHolder}
      <Form
        name="basic"
        className="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...initialValues,remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Userusername"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="type" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

// export default App;
// const Login = () => {
//   useRequest(getList, {
//     defaultParams: [{ id: 2 }],
//   });

//   return (
//     <div>
//       <input type="text" />
//       <input type="text" />
//       <Button color='getList' type="primary">登录</Button>
//       {/* <img src={getAssetsFile('home.png')} /> */}
//     </div>
//   );
// };
const Wrapper = styled.div`
.basic {
  height: 200px;
  width: 400px;
  aside {
    width: 260px;
    border: 1px solid;
  }
  section {
    flex: 1;
  }
}
`;

export default Login;
