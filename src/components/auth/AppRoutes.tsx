import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty, FirebaseReducer } from 'react-redux-firebase';
import { Redirect, Route } from 'react-router-dom';
import { AppState } from '../../redux';
import Spinner from '../common/Spinner'

interface IAppRoutesProp {
  children: ReactNode;
  [name: string]: any;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
const AppRoutes = ({ children, ...rest }: IAppRoutesProp) => {
  const auth: FirebaseReducer.AuthState = useSelector((state: AppState) => state.firebase.auth);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setAuthLoading(false), 2000)
  }, []);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isLoaded(auth) || authLoading) {
          return <Spinner label='Authenticating ...'>{children}</Spinner>;
        } else if (isLoaded(auth) && !isEmpty(auth)) {
          return children;
        } else {
          return <Redirect to={{ pathname: "/sign-in", state: { from: location } }} />
        }
      }
      }
    />
  );
}

export default AppRoutes;