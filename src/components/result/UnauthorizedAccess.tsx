import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../configs/routes';

const UnauthorizedAccess = () => {
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403 - Unauthorized Access!"
      subTitle="Sorry, you are not authorized to access this page. Please click the 'Sign-in' button to sign in as an user."
      extra={<Button type="primary" onClick={() => history.push(routes.default.SIGN_IN)} >Sign-in</Button>}
    />
  );
}

export default UnauthorizedAccess;