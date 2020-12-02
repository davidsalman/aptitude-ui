import React from 'react';
import { Layout } from 'antd'
import PageNotFound from '../components/result/PageNotFound'
import './ErrorViews.scss';

const PageNotFoundView = () => {
  return (
    <Layout className='error-layout'>
      <PageNotFound />
    </Layout>
  );
}

export default PageNotFoundView;