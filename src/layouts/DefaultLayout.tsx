import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import NavigationBar from '../components/common/NavigationBar'
import './Layouts.scss';

interface IDefaultLayoutProp {
  children: ReactNode
}

const DefaultLayout = ({ children }: IDefaultLayoutProp) => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className="layout">
      <Header className="default-header">
        <NavigationBar is_authenticated={false} />
      </Header>
      <Content className="default-content">
        {children}
      </Content>
      <Footer className="default-footer">
        {"Copyright © Aptitude-Cloud " + new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default DefaultLayout;