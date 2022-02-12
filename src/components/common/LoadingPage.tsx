import * as React from "react";
import {useEffect, useState, useCallback} from "react";
import {Redirect} from "react-router";
import {useSelector} from "react-redux";

import BackGroundImage from "../../assets/images/BackGround.svg";
import LogoWhite from "../../assets/images/LogoWhite.svg";
import {selectIsAuth} from "../../store/auth/selectors";
import {AppStateType} from "../../store/store";
import { selectCompanyLogo} from "../../store/app/selectors";

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
    ? <Redirect to={isAuth ? "/branches" : "/login"}/>
    : <div className="main-page-wrapper">
      <img alt="Logo" src={companyLogo ? companyLogo : LogoWhite} className="main-page-logo"/>
      <img alt="BackGround" className="bg-image" src={BackGroundImage}/>
      <h4>DASHBOARD</h4>
    </div>
};

export default LoadingPage;
