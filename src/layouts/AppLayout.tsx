import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import NavigationBar from '../components/common/NavigationBar'
import './Layouts.scss';

interface IAppLayoutProp {
  children: ReactNode
};

const AppLayout = ({ children } : IAppLayoutProp) => {
  const { Header, Content } = Layout;
  return (
    <Layout className="layout">
      <Header className="app-header">
        <NavigationBar is_authenticated={true} />
      </Header>
      <Content className="app-content">
        {children}
      </Content>
    </Layout>
  )
};

export default AppLayout;