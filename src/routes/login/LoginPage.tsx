import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {Card} from "antd";

import {selectIsAuth} from "@Store/auth/selectors";
import {AppStateType} from "@Store/store";
import logo from "@Assets/images/logo.png";
import {loginUserThunk} from "@Store/auth/actions";
import {LoginData} from "@Types/auth-types";
import {selectErrorByKey, selectFetchingByKey, selectCompanyLogo} from "@Store/app/selectors";

import LogInForm from "./LogInForm";

import './LogIn.less'
import {useNavigate} from "react-router";

interface Props {
  error: { message: string } | null
  isFetching: boolean
  isAuth: boolean
  loginUserThunk: (data: LoginData) => void,
  companyLogo: string | null
}

const LoginPage: React.FC<Props> = ({ loginUserThunk, error, isFetching, isAuth, companyLogo}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && !!isAuth) {
      navigate('/orders');
    }
  }, [isFetching, isAuth])

  return (
    <div className="log-in-page">
      <img className="log-in-logo" src={companyLogo ? companyLogo : logo} alt="Ultra - Pro"/>
      <Card>
        <LogInForm message="" onSubmit={loginUserThunk} error={error} isFetching={isFetching}/>
      </Card>
    </div>
  )
};

const mapStateToProps = (state: AppStateType) => {
  return {
    error: selectErrorByKey(state, 'loginUser'),
    isFetching: selectFetchingByKey(state, 'loginUser'),
    isAuth: selectIsAuth(state),
    companyLogo: selectCompanyLogo(state)
  }
};

export default connect(
  mapStateToProps, {loginUserThunk}
)(LoginPage);
