import React, {Component} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Button, Modal, Result} from "antd";
import {connect} from "react-redux";

import {AppStateType} from "../store/store";
import {selectIsAuth} from "../store/auth/selectors";
import {selectErrorByKey, selectFetchingByKey} from "../store/app/selectors";
import {_setAuthUserData, localStorageKey, loginUserThunk, logOut} from "../store/auth/actions";
import ProfilePage from "./profile/ProfilePage";
import LoginPage from "./login/LoginPage";
import ProtectedRoute from "../Hoc/ProtectedRoute";
import {I_authUserData, I_loginData} from "../types/auth-types";
import {I_modal, ModalTypes} from "../types/app-types";
import {setModal} from "../store/app/actions";
import uiVersion from '../GitInfo.json'

import style from './Main.module.css';
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import LoadingPage from "../components/common/LoadingPage";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

interface I_props {
}

interface I_connectedProps {
  modal: I_modal | null
  isAuth: boolean | null
  login: string
  appError: { message: string } | null
  isFetching: boolean
}

interface I_dispatchedProps {
  setModal: (type: null | ModalTypes, message: string | null, pass?: string) => void
  logOut: () => void
  _setAuthUserData: (payload: I_authUserData) => void
  loginUserThunk: (data: I_loginData, commonAuth?: I_authUserData) => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

interface I_MainState {
  requested: boolean
  prevUrl: string
}

class Main extends Component<I_MainProps, I_MainState> {
  constructor(props: I_MainProps) {
    super(props);
    this.state = {
      requested: false,
      prevUrl: ''
    }
  }

  componentDidMount() {
    //console.clear();
    let path = this.props.history.location.pathname;
    if (path && path !== '/login' && path !== '/') {
      this.setState({prevUrl: path});
    }
    let localData = localStorage.getItem(localStorageKey);
    if (localData) {
      try {
        let auth: I_authUserData = JSON.parse(localData);
        if (auth && auth.Authorization) {
          this.props._setAuthUserData(auth);
          this.props.loginUserThunk({login: '', password: ''}, auth);
        }
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({requested: true})
  }

  componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.isAuth !== prevProps.isAuth) {
      let url = !this.props.isAuth ? '/login' : this.state.prevUrl ? this.state.prevUrl : '/branches';
      console.log('redirect ===> ' + url);
      this.props.history.push(url)
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {

    }
  }

  onLogOut = () => {
    this.props.logOut();
  };

  render() {
    let {isFetching, isAuth, login, modal, setModal} = this.props;
    return (
      <div className={style.mainWrapper}>
        {isAuth && <SideBar/>}
        <ErrorBoundary>
          <main>
            {isAuth && <Header login={login} logOutThunk={this.onLogOut}/>}
            {isFetching || !this.state.requested ?
              <LoadingPage/>
              :
              <div className={style.contentWrapper}>
                <Switch>
                  <Route exact path="/"
                         render={() => <LoadingPage/>}/>
                  <Route exact path="/login" render={() => <LoginPage/>}/>

                  <ProtectedRoute
                    routeKey='profile'
                    path='/profile'
                    component={() => (
                      <ProfilePage/>
                    )}
                  />

                  <Route path="*" render={() => <div>Error 404</div>}/>
                </Switch>
              </div>
            }
            <span className="ui-version">v.{uiVersion.gitCommitHash}</span>
          </main>
        </ErrorBoundary>
        <Modal
          title={modal && modal.title}
          centered
          confirmLoading={false}
          visible={!!modal}
          footer={[
            <Button key="back" onClick={() => setModal(null, null)}>
              {'button_return'}
            </Button>
          ]}
          onCancel={() => setModal(null, null)}
        >
          {modal && <Result
            status={modal.type}
            title={modal.type}
            subTitle={''}
          />}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
  return {
    modal: state.app.modal,
    isAuth: selectIsAuth(state),
    login: state.auth.userData.login,
    appError: selectErrorByKey(state, 'loginUser'),
    isFetching: selectFetchingByKey(state, 'loginUser'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {_setAuthUserData, loginUserThunk, logOut, setModal}
)(Main);

export default withRouter(ComposedComponent);
