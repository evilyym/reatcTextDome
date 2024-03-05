// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import { goLogin, getList } from '@/apis/user';
import styled from 'styled-components';

import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
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
  let userArr = [];
  const onFinish = (values: any) => {
    // navigate('/', { replace: true });
    goLogin({ ...values }).then((data) => {
      if (data.login) {
        localStorage.setItem('token', data.token);
        navigate('/', { replace: true });
      } else {
        userArr = data.info
        debugger
        showModal();
        // 弹出选择框
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
    tenant_code: 'C10026',
    mid_code: '',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Wrapper>
      {contextHolder}
      <Form
        name="basic"
        className="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...initialValues, remember: false }}
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
      <Modal centered title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>111</p>
        {()=>{ for (item in userArr) {
          debugger
          console.log(item.tenant_code);
          
          return <p>111</p>
        } }}
      </Modal>
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
  height: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
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
