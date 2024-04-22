// import { useRequest } from 'ahooks';

// import { getAssetsFile } from '@/utils/share';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Checkbox, Form, Input, Modal } from 'antd';
import styled from 'styled-components';

import { goLogin, getList } from '@/apis/user';

import bgImg from '@/assets/images/bg-2.jpg';
import fromImg from '@/assets/images/背景框2.png';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userArr, setUserArr] = useState({ info: [{ tenant_code: '', tenant_name: '' }], mid_code: '' });

  const onFinish = (values: any) => {
    goLogin({ ...values }).then((data: any) => {
      if (data.login) {
        localStorage.setItem('token', data.token);
        navigate('/', { replace: true });
      } else {
        // 弹出选择框
        setUserArr(data);
        showModal();
      }
    });
  };

  function getUserToken(code: any, mid: string) {
    onFinish({ mid_code: mid, tenant_code: code });
  }
  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  interface FieldType {
    type?: string;
    username?: string;
    password?: string;
    code?: string;
    defaultValue?: any;
    autoComplete?: string;
  }

  const initialValues = {
    // username: 'golive',
    // password: 'Y0WMs+G6PWTuYT2QXynKWw==',
    // tenant_code: 'C10026',
    username: '15505707071',
    password: 'Qw9KEV4C834Ie1lt/mKeeLfx/gLonCzzQc1kr2rv8gA=',
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
          <Input.Password autoComplete="off" />
        </Form.Item>

        <Form.Item<FieldType> name="type" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
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

const Wrapper = styled.div`
  padding: auto;
  height: 100%;
  width: 100%;
  display: grid;
  background-image: url(${bgImg});
  background-size: cover;
  align-content: center;
  justify-content: center;
  .basic {
    height: 300px;
    width: 500px;
    padding: 50px;
    background-image: url(${fromImg});
    background-size: cover;
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
