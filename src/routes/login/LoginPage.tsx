import React from "react";
import {connect} from 'react-redux';
import {Card} from "antd";

import {selectIsAuth} from "../../store/auth/selectors";
import {AppStateType} from "../../store/store";
import LogInForm from "./LogInForm";
import logo from "../../assets/images/logo.png";
import {loginUserThunk} from "../../store/auth/actions";
import {LoginData} from "../../types/auth-types";
import {selectErrorByKey, selectFetchingByKey, selectCompanyLogo} from "../../store/app/selectors";

import './LogIn.less'
import axios from "axios";
import {apiEndpoints} from "../../constants/api/api";

interface Props {
  error: { message: string } | null
  isFetching: boolean
  loginUserThunk: (data: LoginData) => void,
  companyLogo: string | null
}

const LoginPage: React.FC<Props> = ({ loginUserThunk, error, isFetching, companyLogo}) => {
  const onClick = () => {
    axios.get(apiEndpoints('read').auth.me).then(console.log).catch(console.log)
  }
  return (
    <div className="log-in-page">
      <img className="log-in-logo" src={companyLogo ? companyLogo : logo} alt="Ultra - Pro"/>
      <Card>
        <LogInForm message="" onSubmit={loginUserThunk} error={error} isFetching={isFetching}/>

        <button onClick={onClick}>Get ME</button>
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
