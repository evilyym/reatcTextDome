// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import { goLogin,getList } from '@/apis/user';
import styled from 'styled-components';

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
  goLogin({...values}).then(({data})=>{
    if (data.code==200) {
      getList({...values})
    }else{
      alert(data.msg)
    }
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  type?: string;
  phone?: string;
  password?: string;
  code?: string;
};

const Login: React.FC = () => (
  <Wrapper>
  <Form
    name="basic"
    className='basic'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Userphone"
      name="phone"
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

    <Form.Item<FieldType>
      name="type"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
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
    height: 60px;
    border: 1px solid;
  }
  .main {
    height: calc(100vh - 60px);
    display: flex;
    aside {
      width: 260px;
      border: 1px solid;
      .active {
        color: red;
      }
    }
    section {
      flex: 1;
    }
  }
`;

export default Login;
