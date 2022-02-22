import * as React from "react";
import {useEffect, useState, useCallback} from "react";
import {Navigate} from "react-router";
import {useSelector} from "react-redux";
import {Spin} from "antd";

import BackGroundImage from "assets/images/BackGround.svg";
import {selectIsAuth} from "store/auth/selectors";
import {AppStateType} from "store/store";
import { selectCompanyLogo} from "store/app/selectors";
import logo from "assets/images/logo.png";

import './common.css';

const LoadingPage: React.FC = () => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const selector = useCallback(
    (state: AppStateType) => ({
      isAuth: selectIsAuth(state),
      companyLogo: selectCompanyLogo(state)
    }),
    []
  )

  const {
    isAuth,
    companyLogo
  } = useSelector(selector);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setRedirect(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return redirect
    ? <Navigate to={isAuth ? "/orders" : "/login"}/>
    : (
      <Spin size="large">
        <div className="main-page-wrapper">
          <img alt="Logo" src={companyLogo ? companyLogo : logo} className="main-page-logo"/>
          <img alt="BackGround" className="bg-image" src={BackGroundImage}/>
          <h4>DASHBOARD</h4>
        </div>
      </Spin>
    )
};

export default LoadingPage;
