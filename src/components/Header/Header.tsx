import * as React from "react";
import {Avatar, Button, PageHeader} from "antd";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

import './Header.css';

interface Props {
  login: string,
  logOutThunk: () => void
}

const Header: React.FC<Props> = ({login, logOutThunk}) => {
  const {t} = useTranslation();
  let toDisplay = login.length > 5
    ? [...login.split('')].splice(0, 5).join('')
    : login;

  return (
    <PageHeader
      className="site-page-header-responsive"
      extra={[
        <Link to='/profile' key="1">
          <Avatar
            style={{backgroundColor: "#2F80ED", verticalAlign: 'middle'}}
            size={40}
            gap={1}
          >
            {toDisplay}
          </Avatar>
        </Link>,
        <Button key="2" type="text" style={{color: '#fff'}} onClick={logOutThunk}>
          {t('logout')}
        </Button>,
      ]}
      style={{backgroundColor: '#00334E'}}
    />
  )
}

export default Header;
