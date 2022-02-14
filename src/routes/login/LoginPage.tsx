import React from "react";
import {connect} from 'react-redux';
import {selectIsAuth} from "../../store/auth/selectors";
import {AppStateType} from "../../store/store";
import LogInForm from "./LogInForm";
import {Card} from "antd";
import LogoWhite from "../../assets/images/LogoWhite.svg";
import './LogIn.css'
import {loginUserThunk} from "../../store/auth/actions";
import {LoginData} from "../../types/auth-types";
import {selectErrorByKey, selectFetchingByKey, selectCompanyLogo} from "../../store/app/selectors";

interface Props {
  error: { message: string } | null
  isFetching: boolean
  loginUserThunk: (data: LoginData) => void,
  companyLogo: string | null
}

const LoginPage: React.FC<Props> = ({ loginUserThunk, error, isFetching, companyLogo}) => {
  return (
    <div className="log-in-page">
      <img className="log-in-logo" src={companyLogo ? companyLogo : LogoWhite} alt="Q MATE"/>
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
