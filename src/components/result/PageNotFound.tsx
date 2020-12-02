import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../configs/routes';

const PageNotFound = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404 - Page Not Found!"
      subTitle="Sorry, the page you visited does not exist. Please click the 'Go Home' button to start over."
      extra={<Button type="primary" onClick={() => history.push(routes.default.SIGN_IN)} >Go Home</Button>}
    />
  );
}

export default PageNotFound;