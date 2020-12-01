import React from 'react';
import { Divider, Layout, Typography } from 'antd';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import './DefaultViews.scss';

const ForgotPasswordView = () => {
  return (
    <Layout className="auth-layout">
      <Typography.Title level={3} className="auth-title">
        User Forgot Password
      </Typography.Title>
      <Divider />
      <ForgotPasswordForm />
    </Layout>
  );
}

export default ForgotPasswordView;