import React from 'react';
import { Divider, Layout, Typography } from 'antd';
import SignInForm from '../components/auth/SignInForm';
import './DefaultViews.scss';

const SignInView = () => {
  return (
    <Layout className="auth-layout">
      <Typography.Title level={3} className="auth-title">
        User Email Sign-In
      </Typography.Title>
      <Divider />
      <SignInForm />
    </Layout>
  );
}

export default SignInView;