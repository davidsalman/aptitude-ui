import React, { ReactNode, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Spinner from '../common/Spinner';

interface IDefaultRoutesProp {
  children: ReactNode;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
const DefaultRoutes = ({ children }: IDefaultRoutesProp) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, []);
  return (
    <Route
      render={() => {
        if (loading) {
          return (<Spinner label='Loading, please wait ...'>{children}</Spinner>);
        } else {
          return children;
        }
      }}
    />
  );
}

export default DefaultRoutes;