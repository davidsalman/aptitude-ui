import React, { useState } from 'react';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../redux';
import { Button, Layout, Row, Col, Empty, Spin, Typography } from 'antd';
import { HomeFilled, EnvironmentFilled, LoadingOutlined } from '@ant-design/icons'
import routes from '../../configs/routes';
import './RequestTest.scss';

const { Title } = Typography;

interface ISelectBox {
  setNextStepHandler: () => void;
  setBoxHandler: (boxID: string) => void;
}

const SelectBox = ({ setNextStepHandler, setBoxHandler }: ISelectBox) => {
  useFirebaseConnect([
    { path: 'boxes' }
  ]);
  const boxes = useSelector((state: AppState) => state.firebase.ordered.boxes);
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  if (!isLoaded(boxes)) {
    return (
      <Spin
        className="loading-request-test-content"
        tip="Loading boxes, please wait ..."
        size="large"
        indicator={
          <LoadingOutlined style={{ fontSize: 36 }} spin />
        }
      />
    );
  }
  if (isEmpty(boxes)) {
    return (
      <Layout className="request-test-content">
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Typography.Title level={3}>
              "No Boxes Found! Please wait till one becomes available."
            </Typography.Title>
          }>
          <Button type="primary" onClick={() => history.push(routes.app.DASHBOARD)}>
            Go to Dashboard
          </Button>
        </Empty>
      </Layout>
    );
  }
  return (
    <Layout className="request-test-content">
      <Row align="middle" justify="space-around" gutter={[32, 32]} className="select-box-grid">
        {boxes.filter(box => box.value.taken === false).map((box, index) => {
          const { key, value } = box;
          const { name, company, location } = value;
          return (
            <Col span={6} key={key}
              className={selectedIndex !== index ? "select-box-grid-item" : "select-box-grid-item select-box-grid-item-selected"}
              onClick={() => { setSelectedIndex(index); setBoxHandler(key); }}>
              <Title level={3} className="select-box-grid-item-title">
                {name}
              </Title>
              <Title level={4} className="select-box-grid-item-description">
                <HomeFilled /> {company}
                <EnvironmentFilled /> {location}
              </Title>
            </Col>
          );
        })}
      </Row>
      <Layout className="select-box-options">
        <Button
          type="primary"
          className="select-box-next-step-button"
          disabled={selectedIndex === undefined ? true : false}
          onClick={() => setNextStepHandler()}>
          Next Step
        </Button>
      </Layout>
    </Layout>
  );
}

export default SelectBox;