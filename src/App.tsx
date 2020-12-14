import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-v3';
import rrfProps, { store } from './utils/rrf';
import recaptchaConfig from './configs/recaptcha';
import "antd/dist/antd.css";

/* Routing Files */
import routes from './configs/routes';
import DefaultRoutes from './components/auth/DefaultRoutes';
import AppRoutes from './components/auth/AppRoutes';
/* Layout Files */
import DefaultLayout from './layouts/DefaultLayout';
import AppLayout from './layouts/AppLayout';
/* View Files */
import SignInView from './views/SignInView';
import RegisterView from './views/RegisterView';
import ForgotPasswordView from './views/ForgotPasswordView';
import PageNotFoundView from './views/PageNotFoundView';
import UnauthorizedAccessView from './views/UnauthorizedAccessView';
import DashboardView from './views/app/DashboardView';
import RequestTestView from './views/app/RequestTestView';

const App = () => {
  useEffect(() => {
    loadReCaptcha(recaptchaConfig.siteKey || '');
  }, []);
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Switch>
            <AppRoutes exact path={routes.app.APP_ROUTES}>
              <AppLayout>
                <Switch>
                  <Route exact path={routes.app.DASHBOARD} component={DashboardView} />
                  <Route exact path={routes.app.REQUEST_TEST} component={RequestTestView} />
                  <Route exact path={routes.app.APP_LANDING} render={() => <Redirect to={routes.app.DASHBOARD} />} />
                  <Route exact path={routes.error.ERROR_ROUTES} render={() => <Redirect to={routes.error.PAGE_NOT_FOUND} />} />
                </Switch>
              </AppLayout>
            </AppRoutes>
            <DefaultRoutes>
              <DefaultLayout>
                <Switch>
                  <Route exact path={routes.default.SIGN_IN} component={SignInView} />
                  <Route exact path={routes.default.REGISTER} component={RegisterView} />
                  <Route exact path={routes.default.FORGOT_PASSWORD} component={ForgotPasswordView} />
                  <Route exact path={routes.error.PAGE_NOT_FOUND} component={PageNotFoundView} />
                  <Route exact path={routes.error.UNAUTHORIZED_ACCESS} component={UnauthorizedAccessView} />
                  <Route exact path={routes.default.DEFAULT_LANDING} render={() => <Redirect to={routes.default.SIGN_IN} />} />
                  <Route exact path={routes.error.ERROR_ROUTES} render={() => <Redirect to={routes.error.PAGE_NOT_FOUND} />} />
                </Switch>
              </DefaultLayout>
            </DefaultRoutes>
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
