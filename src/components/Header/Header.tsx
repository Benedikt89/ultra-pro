import * as React from "react";
import {useCallback} from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";

import {logOut} from "@Store/auth/actions";

import logo from "@Assets/images/logo.png";
import headphones from "@Assets/images/icons/headphones.svg";
import circul from "@Assets/images/icons/circul.svg";
import info from "@Assets/images/icons/info.svg";
import exit from "@Assets/images/icons/exit.svg";

import './Header.less';

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
    <div className="site-page-header-responsive">
      <div className="site-page-header-logo-section">
        <Link to='/orders'>
          <img src={logo} alt="logo" className="site-header-logo"/>
        </Link>
        <Button className="header-icon-button" icon={<img src={headphones} alt="logo"/>} disabled />
        <Button className="header-icon-button" icon={<img src={circul} alt="logo"/>} disabled/>
        <Button className="header-icon-button" icon={<img src={info} alt="logo"/>} disabled />
      </div>
      <div className="site-page-header-extra-section">
        {extra.map(component => component)}
      </div>
    </div>
  )
};

export default Header;
