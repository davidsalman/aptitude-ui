import React from 'react';
import { Button, Col, Layout, Empty, Image, Row, Spin, Statistic, Table, Typography } from 'antd';
import { ApiTwoTone, AppstoreTwoTone, CalendarTwoTone, CheckSquareTwoTone, CloseSquareTwoTone, FlagTwoTone, FundTwoTone, LoadingOutlined } from '@ant-design/icons';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../redux';
import { useSelector } from 'react-redux';
import routes from '../../configs/routes';

const { ColumnGroup, Column } = Table;

interface ITestResult {
  sessionId: string
}

const TestResult = ({ sessionId }: ITestResult) => {
  useFirestoreConnect([{
    collection: 'results'
  }])
  const history = useHistory();
  const results = useSelector((state: AppState) => state.firestore.ordered.results);
  const session = useSelector((state: AppState) => state.firebase.ordered.sessions.find(_session => _session.key === sessionId));
  if (!isLoaded(results)) {
    return (
      <Spin
        className="loading-request-test-content"
        tip="Loading results, please wait ..."
        size="large"
        indicator={
          <LoadingOutlined style={{ fontSize: 36 }} spin />
        }
      />
    );
  }
  if (isEmpty(results)) {
    return (
      <Layout className="request-test-content">
        <Empty
          className="empty-result"
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Typography.Title level={3}>
              "No Result Found! Please contact admin for assistance."
            </Typography.Title>
          }>
          <Button type="primary" onClick={() => history.push(routes.app.DASHBOARD)}>
            Go to Dashboard
          </Button>
        </Empty>
      </Layout>
    );
  }
  const filteredResults = results.filter(result => result.session_id === sessionId);
  return (
    <Layout className="request-test-content">
      <Row align="middle" gutter={[32, 32]} className="test-result-stats-grid">
        <Col offset={1} span={5}>
          <Image src="/images/aptitude-box.jpg" width={360} />
        </Col>
        <Col span={18}>
          <Row justify="center" gutter={[32, 32]} >
            <Col span={23}>
              <Typography.Title level={1} className="test-result-header">
                Test Session Completed!
              </Typography.Title>
            </Col>
            <Col span={6} key="session_id">
              <Statistic title="Session ID" value={session?.key} prefix={<ApiTwoTone />} />
            </Col>
            <Col span={5} key="box_id">
              <Statistic title="Box ID" value={session?.value.box_id} prefix={<AppstoreTwoTone />} />
            </Col>
            <Col span={6} key="started_at">
              <Statistic title="Started At" prefix={<CalendarTwoTone />}
                value={new Date(session?.value.started_at || new Date().getTime()).toLocaleString()}
              />
            </Col>
            <Col span={6} key="completed_at">
              <Statistic title="Completed At" prefix={<CalendarTwoTone />}
                value={new Date(session?.value.completed_at || new Date().getTime()).toLocaleString()}
              />
            </Col>
            <Col span={6} key="total_score">
              <Statistic title="Total Score" prefix={<CheckSquareTwoTone twoToneColor={["green", "white"]} />}
                value={`${filteredResults.map(result => result.score).reduce((prev, next) => prev + next)}
                  / ${filteredResults.map(result => result.max_score).reduce((prev, next) => prev + next)}`}
              />
            </Col>
            <Col span={5} key="total_strikes">
              <Statistic title="Total Strike" prefix={<CloseSquareTwoTone twoToneColor={["red", "white"]} />}
                value={`${filteredResults.map(result => result.strikes).reduce((prev, next) => prev + next)}
                  / ${filteredResults.map(result => result.max_strikes).reduce((prev, next) => prev + next)}`}
              />
            </Col>
            <Col span={6} key="total_struckout">
              <Statistic title="Strike Outs" prefix={<FlagTwoTone twoToneColor={["red", "white"]} />}
                value={`${filteredResults.filter(result => result.strikes === result.max_strikes).length}/${filteredResults.length}`}
              />
            </Col>
            <Col span={6} key="session_timeout">
              <Statistic title="Completed" prefix={<FundTwoTone twoToneColor={["green", "white"]} />}
                value={`${filteredResults.filter(result => result.completed_at !== 0).length}/${filteredResults.length}`}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Table dataSource={filteredResults} bordered pagination={false}>
        <Column title="Game Name" dataIndex="name" key="name" />
        <ColumnGroup title="Duration">
          <Column title="Started At" dataIndex="started_at" key="started_at" render={startedAt => (startedAt === 0 ? 'N/A' : new Date(startedAt).toLocaleString())} />
          <Column title="Completed At" dataIndex="completed_at" key="completed_at" render={completedAt => (completedAt === 0 ? 'N/A' : new Date(completedAt).toLocaleString())} />
        </ColumnGroup>
        <ColumnGroup title="Score">
          <Column title="Your Score" dataIndex="score" key="score" />
          <Column title="Max Score" dataIndex="max_score" key="max_score" />
        </ColumnGroup>
        <ColumnGroup title="Strikes">
          <Column title="Your Strikes" dataIndex="strikes" key="strikes" />
          <Column title="Max Strikes" dataIndex="max_strikes" key="max_strikes" />
        </ColumnGroup>
        <Column title="Status" dataIndex="status" key="status" />
      </Table>
    </Layout>
  )
}

export default TestResult;