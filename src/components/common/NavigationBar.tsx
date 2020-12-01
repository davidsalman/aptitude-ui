import React from 'react';
import { Link } from "react-router-dom";
import { ExtendedFirebaseInstance, useFirebase } from 'react-redux-firebase';
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  ProjectOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import routes from '../../configs/routes';
import './NavigationBar.scss';

const AppNavigation = () => {
  const firebase: ExtendedFirebaseInstance = useFirebase();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      className="navigation-menu"
    >
      <Menu.Item key="1" disabled={true} className="navigation-menu-icon-item">
        <img
          className="navigation-menu-icon"
          src="/images/aptitude-cloud-icon-192.png"
          alt="aptitude-cloud-logo"
        />
        &nbsp;Aptitude-Cloud
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={routes.app.DASHBOARD} >
          <DashboardOutlined />
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={routes.app.REQUEST_TEST}>
          <AppstoreAddOutlined />
          Request Test
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={routes.app.TEST_RESULTS}>
          <ProjectOutlined />
          Test Results
        </Link>
      </Menu.Item>
      <Menu.SubMenu
        key="4"
        className="navigation-menu-submenu"
        title={
          <span className="submenu-title-wrapper">
            <SettingOutlined />
            User Settings
          </span>
        }
      >
        <Menu.ItemGroup title="Account">
          <Menu.Item key="4:1">
            <Link to={routes.app.USER_PROFILE}>
              <UserOutlined />
              Profile
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Actions">
          <Menu.Item key="4:2" onClick={firebase.logout}>
            <Link to={routes.default.SIGN_IN}>
              <LogoutOutlined />
              Sign Out
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}

const DefaultNavigation = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      className="navigation-menu"
    >
      <Menu.Item key="1" disabled={true} className="navigation-menu-icon-item">
        <img
          className="navigation-menu-icon"
          src="/images/aptitude-cloud-icon-192.png"
          alt="aptitude-cloud-logo"
        />
        &nbsp;Aptitude-Cloud
      </Menu.Item>
      <Menu.Item key="2" className="navigation-menu-auth-item">
        <Link to={routes.default.SIGN_IN}>
          <LoginOutlined />
          Sign In
        </Link>
      </Menu.Item>
      <Menu.Item key="3" className="navigation-menu-auth-item">
        <Link to={routes.default.REGISTER}>
          <UserAddOutlined />
          Register
        </Link>
      </Menu.Item>
    </Menu>
  );
}

interface INavigationBarProp {
  is_authenticated: boolean
}

const NavigationBar = ({ is_authenticated }: INavigationBarProp) => (
  is_authenticated ? <AppNavigation /> : <DefaultNavigation />
)

export default NavigationBar