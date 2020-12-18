import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';
import { useHistory } from 'react-router';
import './AppViews.scss'
import routes from '../../configs/routes';

const DashboardView = () => {
  const history = useHistory();
  return (
    <Layout className="content-layout">

      <Row align="middle" justify="space-around" gutter={[32, 32]} className="dashboard-options">
        <Col span={24} key="welcome_text">
          <Typography.Title className="dashboard-welcome-text" style={{ textAlign: "center" }}>{`Welcome to the Aptitude-Cloud Dashboard.`}</Typography.Title>
        </Col>
        <Col span={12} key="request_test" className="dashboard-option-item" onClick={() => history.push(routes.app.REQUEST_TEST)}>
          <Typography.Title level={2} className="dashboard-options-title">Request Test</Typography.Title>
          <Typography.Title level={5} className="dashboard-options-description">Get started by requesting a test session.</Typography.Title>
        </Col>
        <Col span={12} key="request_test" className="dashboard-option-item" onClick={() => history.push(routes.app.TEST_RESULTS)}>
          <Typography.Title level={2} className="dashboard-options-title">Test Results</Typography.Title>
          <Typography.Title level={5} className="dashboard-options-description">View past test results from previous sessions.</Typography.Title>
        </Col>
      </Row>
    </Layout>
  );
}

export default DashboardView;