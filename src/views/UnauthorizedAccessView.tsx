import React from 'react';
import { Layout } from 'antd'
import UnauthorizedAccess from '../components/result/UnauthorizedAccess';
import './ErrorViews.scss';

const UnauthorizedAccessView = () => {
  return (
    <Layout className='error-layout'>
      <UnauthorizedAccess />
    </Layout>
  );
}

export default UnauthorizedAccessView;