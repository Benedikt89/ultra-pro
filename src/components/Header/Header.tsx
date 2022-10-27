import * as React from "react";
import {useCallback} from "react";
import {Button, PageHeader} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {logOut} from "store/auth/actions";
import logo from "assets/images/logo.png";
import headphones from "assets/images/icons/headphones.svg";
import circul from "assets/images/icons/circul.svg";
import info from "assets/images/icons/info.svg";
import exit from "assets/images/icons/exit.svg";

import './Header.less';
import {useLocation} from "react-router";

interface Props {
}

const Header: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const logOutHandler = useCallback(() => {
    dispatch(logOut())
  }, []);

  const { pathname } = useLocation();

  const extra = [
    <Button
      key="3" className="logout-button" onClick={logOutHandler}
      icon={<img src={exit} alt="logo"/>}
    >
      {t('header.logout')}
    </Button>
  ];
  if (pathname !== '/orders') {
    extra.unshift(
      <Link to='/orders' key="2">
        <Button type="text">
          {t('header.orders_constructor')}
        </Button>
      </Link>
    )
  }

  return (
    <PageHeader
      className="site-page-header-responsive"
      title={<>
        <Link to='/orders'>
          <img src={logo} alt="logo" className="header-logo"/>
        </Link>
        <Button className="header-icon-button" icon={<img src={headphones} alt="logo"/>} disabled />
        <Button className="header-icon-button" icon={<img src={circul} alt="logo"/>} disabled/>
        <Button className="header-icon-button" icon={<img src={info} alt="logo"/>} disabled />
      </>}
      extra={extra}
    />
  )
};

export default Header;
