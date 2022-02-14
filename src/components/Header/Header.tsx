import * as React from "react";
import {useCallback, useMemo} from "react";
import {Avatar, Button, PageHeader, Switch} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {AppStateType} from "../../store/store";
import {selectUserData} from "../../store/auth/selectors";
import {setTheme} from "../../store/app/actions";
import {logOut} from "../../store/auth/actions";

import './Header.css';

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const { login, theme } = useSelector(
    (state: AppStateType) => ({
      login: selectUserData(state).login,
      theme: state.app.theme
    }))

  const toggleTheme = (isChecked: boolean) => {
    dispatch(setTheme(isChecked ? "dark" : "light"));
  };
  const toDisplay = useMemo(() => login.length > 5
    ? [...login.split('')].splice(0, 5).join('')
    : login, []);

  const logOutHandler = useCallback(() => {
    dispatch(logOut())
  }, []);
  return (
    <PageHeader
      className="site-page-header-responsive"
      extra={[
        <Switch key="Switch" checked={theme === "dark"} onChange={toggleTheme} />,
        <Link to='/profile' key="1">
          <Avatar
            style={{backgroundColor: "#2F80ED", verticalAlign: 'middle'}}
            size={40}
            gap={1}
          >
            {toDisplay}
          </Avatar>
        </Link>,
        <Button key="2" type="text" style={{color: '#fff'}} onClick={logOutHandler}>
          {t('logout')}
        </Button>,
      ]}
      style={{backgroundColor: '#00334E'}}
    />
  )
}

export default Header;
