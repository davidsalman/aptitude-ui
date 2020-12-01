const routes = {
  default: {
    LANDING: '/',
    SIGN_IN: '/sign-in',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password'
  },
  app: {
    APP_ROUTES: '/app/:path?',
    APP_LANDING: '/app/',
    DASHBOARD: '/app/dashboard',
    REQUEST_TEST: '/app/request-test',
    TEST_RESULTS: '/app/test-results',
    USER_PROFILE: '/app/user-profile'
  },
  admin: {
    ADMIN_ROUTES: '/admin/:path?',
    ADMIN_LANDING: '/admin/',
    DASHBOARD: '/admin/dashboard',
    BOX_MANAGEMENT: '/admin/box-management',
    USER_MANAGEMENT: '/admin/user-management',
    ADMIN_PROFILE: '/admin/admin-profile'
  },
  error: {
    ERROR_ROUTES: '*',
    INVALID: '/error/404-invalid',
    UNAUTHORIZED: '/error/401-unauthorized'
  }
}

export default routes;