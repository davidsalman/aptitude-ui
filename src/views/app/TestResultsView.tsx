import React from 'react';
import { Layout } from 'antd';
import ResultsTable from '../../components/test_results/ResultsTable';
import './AppViews.scss';

const TestResultView = () => {
  return (
    <Layout className="content-layout">
      <ResultsTable />
    </Layout>
  );
}

export default TestResultView;