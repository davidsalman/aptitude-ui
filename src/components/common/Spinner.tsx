import React, { ReactNode } from 'react';
import { Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './Spinner.scss'

interface ISpinnerProp {
  label?: string;
  children: ReactNode;
}

const LoaderIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

const Spinner = ({ label, children }: ISpinnerProp) => {

  return (
    <Layout className="spinner-layout">
      <Spin className="spinner-icon" tip={label} size="large" indicator={LoaderIcon} >
        {children}
      </Spin>
    </Layout>
  );
}

export default Spinner;