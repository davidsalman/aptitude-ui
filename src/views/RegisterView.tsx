import React from 'react';
import { Divider, Layout, Typography } from 'antd';
import RegisterForm from '../components/auth/RegisterForm';
import './DefaultViews.scss';

const RegisterView = () => {
  return (
    <Layout className="auth-layout">
      <Typography.Title level={3} className="auth-title">
        User Email Registration
      </Typography.Title>
      <Divider />
      <RegisterForm />
    </Layout>
  );
}

export default RegisterView;