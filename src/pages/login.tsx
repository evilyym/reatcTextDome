// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Form, Input, message, Modal, Spin } from 'antd';
import styled from 'styled-components';
// import { Format } from 'ym-vue-module';

import { goLogin, getList } from '@/apis/user';

import { increment, disconnect } from '@/store/counter';
// import store from '@/store/store';

// import { msg } from '@/store/msg';

// Format(111);
const Login: React.FC = () => {
  // msg.success(11);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const [userArr, setUserArr] = useState({ info: [{ tenant_code: '', tenant_name: '' }], mid_code: '' });
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    // navigate('/', { replace: true });
    dispatch(disconnect());

    goLogin({ ...values }).then((data: any) => {
      dispatch(increment());

      if (data.login) {
        localStorage.setItem('token', data.token);
        navigate('/', { replace: true });
      } else {
        setUserArr(data);
        showModal();
        // 弹出选择框
      }
    });
  };

  function getUserToken(code: any, mid: string) {
    onFinish({ mid_code: mid, tenant_code: code });
    // localStorage.setItem('token', data.token);
    // navigate('/', { replace: true });
  }
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
    // username: '15505707071',
    // password: 'Qw9KEV4C834Ie1lt/mKeeLfx/gLonCzzQc1kr2rv8gA=',
    username: 'golive',
    password: 'Y0WMs+G6PWTuYT2QXynKWw==',
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

  return (
    <Wrapper>
      {contextHolder}
      <Spin spinning={count} fullscreen />
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
        <Form.Item<FieldType> label="Userusername" name="username" rules={[{ required: true, message: '此项目必填' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: '此项目必填' }]}>
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
      <Modal centered title="选择租户" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
        {userArr.info?.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              getUserToken(item.tenant_code, userArr.mid_code);
            }}
          >
            <p className="box-title">{item.tenant_code}</p>
            <p>
              <span className={`box-icon icon-${index}`}>{item.tenant_name}</span>
            </p>
            <br />
          </li>
        ))}
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
  margin: auto;
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
