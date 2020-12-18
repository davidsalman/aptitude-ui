import { LoadingOutlined } from '@ant-design/icons';
import { Button, Empty, Layout, Typography, Spin, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { FirebaseReducer, isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import routes from '../../configs/routes';
import { AppState } from '../../redux';
import './TestResults.scss';

const { Title } = Typography;

const ResultsTable = () => {
  useFirestoreConnect([{
    collection: 'results'
  }]);
  const history = useHistory();
  const results = useSelector((state: AppState) => state.firestore.ordered.results);
  const auth: FirebaseReducer.AuthState = useSelector((state: AppState) => state.firebase.auth);
  if (!isLoaded(results)) {
    return (
      <Spin
        className="loading-test-result-content"
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
      <Layout className="test-results-content">
        <Empty
          className="empty-result"
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Title level={3}>
              "No Result Found! Request a test to get started."
            </Title>
          }>
          <Button type="primary" onClick={() => history.push(routes.app.REQUEST_TEST)}>
            Request Test
          </Button>
        </Empty>
      </Layout>
    );
  }
  const expandedRowRender = (record: { session_id: string; }) => {
    const subColumns = [
      { title: 'Game Name', dataIndex: 'name', key: 'name' },
      { title: 'Started At', dataIndex: 'started_at', key: 'started_at', render: (value: number) => (<span>{new Date(value).toLocaleString()}</span>) },
      { title: 'Completed At', dataIndex: 'completed_at', key: 'completed_at', render: (value: number) => (<span>{new Date(value).toLocaleString()}</span>) },
      { title: 'Score', dataIndex: 'score', key: 'score' },
      { title: 'Max Score', dataIndex: 'max_score', key: 'max_score' },
      { title: 'Strikes', dataIndex: 'strikes', key: 'strikes' },
      { title: 'Max Strikes', dataIndex: 'max_strikes', key: 'max_strikes' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
    ]
    const filteredData = results.filter(result => result.user_id === auth.uid).filter(result => result.session_id === record.session_id)
    return (<Table dataSource={filteredData} columns={subColumns} pagination={false} />)
  }
  const filteredResults = results.filter(result => result.user_id === auth.uid).filter(result => result.name === 'Simon Says Game');
  const columns = [
    { title: 'Session ID', dataIndex: 'session_id', key: 'session_id' },
    { title: 'Box ID', dataIndex: 'box_id', key: 'box_id' },
    { title: 'Session Created At', dataIndex: 'session_start', key: 'session_start', render: (value: number) => (<span>{new Date(value).toLocaleString()}</span>) },
    { title: 'Session Ended At', dataIndex: 'session_end', key: 'box_end', render: (value: number) => (<span>{new Date(value).toLocaleString()}</span>) },
  ];
  return (
    <Layout className="test-results-content">
      <Table className="test-results-table"
        dataSource={filteredResults}
        columns={columns}
        rowKey="id"
        expandable={{ expandedRowRender }}
        title={() => <Title>Test Results</Title>}
        pagination={{ pageSize: 13, position: ["bottomCenter"] }}
        tableLayout="auto"
      />
    </Layout>
  )
}

export default ResultsTable;