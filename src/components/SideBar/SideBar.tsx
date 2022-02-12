import * as React from "react";
import {useCallback} from 'react';
import {Link, useLocation} from "react-router-dom";
import {Menu} from 'antd';
import {useTranslation} from "react-i18next";

import {I_navigationItem, navigationOptions} from "../../constants/navigation";
import LogoWhite from "../../assets/images/LogoWhite.svg";
import {useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {selectCompanyLogo} from "../../store/app/selectors";

import './SideBar.css';

const {SubMenu} = Menu;

const SideBar: React.FC = () => {
  const {t} = useTranslation();
  const {pathname} = useLocation();

  const selector = useCallback((state: AppStateType) => ({
      role: state.auth.userData.role,
      companyLogo: selectCompanyLogo(state)
    }),
    []
  )

  const { role, companyLogo } = useSelector(selector);

  const renderItem = (opt: I_navigationItem) => (<Menu.Item
    key={opt.path}
    disabled={opt.disabled || !!(role && !opt.permits.includes(role))}
    icon={opt.icon ? <img src={opt.icon} alt={opt.title}/> : <i/>}
  >
    {opt.path
      ? <Link to={opt.path}>
        {t(opt.title)}
      </Link>
      : t(opt.title)
    }
  </Menu.Item>);

  const defaultOpen = navigationOptions[0] && role && navigationOptions[0].permits.includes(role)
    ? navigationOptions[0].path : 'noway';

  return (
    <nav className="nav-bar">
      <Menu
        selectedKeys={[pathname]}
        style={{minWidth: 256, backgroundColor: '#fff', overflow: 'hidden'}}
        defaultSelectedKeys={['branches']}
        defaultOpenKeys={[defaultOpen]}
        mode="inline"
      >
        <Link to="/">
          <img alt="Logo" src={companyLogo ? companyLogo : LogoWhite} className="nav-bar-logo"/>
        </Link>
        {navigationOptions.map((opt: I_navigationItem) => opt.expandable
          ? (<SubMenu
            key={opt.path}
            icon={opt.icon ? <img alt="" src={opt.icon}/> : <i/>}
            title={t(opt.title)}
            disabled={opt.disabled || !!(role && !opt.permits.includes(role))}
          >
            {opt.expandable.map((item) => renderItem(item))}
          </SubMenu>)
          : renderItem(opt)
        )
        }
      </Menu>
      <div className="nav-bar-footer">
        © 2021 QMate Dashboard by SSI <br/> All rights reserved
      </div>
    </nav>
  );
};

export default SideBar;
