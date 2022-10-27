import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router";
import {Button, Modal, Result} from "antd";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {AppStateType} from "store/store";
import {selectIsAuth} from "store/auth/selectors";
import {selectErrorByKey, selectFetchingByKey} from "store/app/selectors";
import {_setAuthUserData, localStorageKey, loginUserThunk} from "store/auth/actions";
import ProtectedRoute from "Hoc/ProtectedRoute";
import {AuthUserData, LoginData} from "types/auth-types";
import {MODAL, ModalType, ModalTypes} from "types/app-types";
import {setModal} from "store/app/actions";
import uiVersion from 'GitInfo.json';
import Header from "components/Header/Header";
import LoadingPage from "components/common/LoadingPage";

import useEffectOnce from "utils/hooks/useEffectOnce";
import OrdersPage from "./orders/Orders";
import Modifications from "./modifications/Modifications";
import ProfilePage from "./profile/ProfilePage";
import LoginPage from "./login/LoginPage";

import './Main.less';
import ModificationModal from "./modifications/modal/ModificationModal";

interface Props {}

interface ConnectedProps {
  modal: ModalType | null
  isAuth: boolean | null
  appError: { message: string } | null
  isFetching: boolean
}

interface DispatchedProps {
  setModal: (type: null | ModalTypes, message: string | null) => void
  _setAuthUserData: (payload: AuthUserData) => void
  loginUserThunk: (data: LoginData, commonAuth?: AuthUserData) => void
}

interface MainProps extends Props, ConnectedProps, DispatchedProps {
}

interface MainState {
  requested: boolean
  prevUrl: string
}

const Main: React.FC<MainProps> = ({
                                     isFetching,
                                     isAuth,
                                     modal,
                                     setModal,
                                     _setAuthUserData,
                                     loginUserThunk,
                                   }) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState<MainState>({
    requested: false,
    prevUrl: ''
  })

  useEffectOnce(() => {
    let path = pathname;
    if (path && path !== '/login' && path !== '/') {
      setState(prev => ({...prev, prevUrl: path}));
    }
    let localData = localStorage.getItem(localStorageKey);
    if (localData) {
      try {
        let auth: AuthUserData = JSON.parse(localData);
        if (auth && auth.Authorization) {
          _setAuthUserData(auth);
          loginUserThunk({login: '', password: ''}, auth);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setState(prev => ({...prev,requested: true}));
  })

  useEffect(() => {
    let url = !isAuth ? '/login' : state.prevUrl ? state.prevUrl : '/orders';
    navigate(url);
  }, [isAuth])

  return (
    <div className={"mainWrapper"}>
      <main>
        {isAuth && <Header />}
        {isFetching || !state.requested ?
          <LoadingPage/>
          : (
            <div className={"contentWrapper"}>
              <Routes>
                <Route path="/" element={<LoadingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                <Route path="/profile" element={<ProtectedRoute routeKey='profile' />}>
                  <Route path="" element={<ProfilePage/>} />
                </Route>

                <Route path="/orders" element={<ProtectedRoute routeKey='orders' />}>
                  <Route path="" element={<OrdersPage />} />
                </Route>

                <Route path="/modifications" element={<ProtectedRoute routeKey='modifications' />}>
                  <Route path="" element={<Modifications />} />
                </Route>

                <Route path="*" element={<Result
                  status="404"
                  title={t("error.404.title")}
                  subTitle={t("error.404.subtitle")}
                  extra={<Button type="primary">{t("error.go_back")}</Button>}
                />}/>
              </Routes>
            </div>
          )
        }
        <span className="ui-version">v.{uiVersion.gitCommitHash}</span>
      </main>
      <Modal
        title={modal && t(modal.title)}
        centered
        width={modal?.type === MODAL.MODIFICATION ? 800 : undefined}
        confirmLoading={false}
        forceRender={true}
        visible={!!modal}
        footer={(modal && modal?.type !== MODAL.MODIFICATION) && [
          <Button key="back" onClick={() => setModal(null, null)}>
            {t(`${modal?.type ?? ""}.go_back`)}
          </Button>
        ]}
        onCancel={() => setModal(null, null)}
      >
        {!modal ? null : modal?.type === MODAL.MODIFICATION ? (
          <ModificationModal />
        ) : (
          <Result
            status={modal.type}
            title={t(modal.type)}
            subTitle={t(modal.message)}
          />
        )}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: AppStateType): ConnectedProps => {
  return {
    modal: state.app.modal,
    isAuth: selectIsAuth(state),
    appError: selectErrorByKey(state, 'loginUser'),
    isFetching: selectFetchingByKey(state, 'loginUser'),
  }
};

let ComposedComponent = connect(
  mapStateToProps, {_setAuthUserData, loginUserThunk, setModal}
)(Main);

export default ComposedComponent;
