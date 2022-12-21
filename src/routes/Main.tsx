import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router";
import {ConfigProvider} from "antd";
import {useSelector} from "react-redux";

import {AppStateType, useAppDispatch} from "@Store/store";
import {selectIsAuth} from "@Store/auth/selectors";
import {selectErrorByKey, selectFetchingByKey} from "@Store/app/selectors";
import {checkAuth} from "@Store/auth/actions";
import uiVersion from '../GitInfo.json';
import Header from "@Components/Header/Header";
import LoadingPage from "@Components/common/LoadingPage";
import ProtectedRoute from "@Components/hoc/ProtectedRoute";
import useEffectOnce from "@Utils/hooks/useEffectOnce";
import ProfilePage from "@Routes/profile/ProfilePage";
import ErrorPage from "@Routes/error/ErrorPage";
import ModalWrapper from "@Routes/modal/ModalWrapper";
import {localStorageTokenKey} from "@Utils/api/api";

import OrdersPage from "./orders/Orders";
import Modifications from "./modifications/Modifications";
import LoginPage from "./login/LoginPage";

import './Main.less';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isAuth,
    appError,
    isFetching,
  } = useSelector((state: AppStateType) => ({
    isAuth: selectIsAuth(state),
    appError: selectErrorByKey(state, 'checkAuth'),
    isFetching: selectFetchingByKey(state, 'checkAuth'),
  }));
  const [requested, setRequested] = useState<string | null>(null);


  useEffectOnce(() => {
    const isToken = localStorage.getItem(localStorageTokenKey);
    if (!!isToken) {
      dispatch(checkAuth()).finally(() => setRequested("done"));
    }
    setRequested(isToken ? "requested" : "done");
  })

  useEffect(() => {
    if (!requested || requested === "requested") return;
    let url = !isAuth ? '/login' : '/orders';
    navigate(url);
  }, [requested, isAuth]);

  useEffect(() => {
    if (!appError) return;
    navigate('/login');
  }, [appError]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5070B1',
          borderRadius: 2
        },
      }}
    >
      <main className={"mainWrapper"}>
        {isAuth && <Header/>}
        {isFetching || requested !== "done" ?
          <LoadingPage/>
          : (
            <div className={"contentWrapper"}>
              <Routes>
                <Route path="/" element={<LoadingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                <Route path="/profile" element={<ProtectedRoute routeKey='profile'/>}>
                  <Route path="" element={<ProfilePage/>}/>
                </Route>

                <Route path="/orders" element={<ProtectedRoute routeKey='orders'/>}>
                  <Route path="" element={<OrdersPage/>}/>
                </Route>

                <Route path="/modifications/:orderId" element={<ProtectedRoute routeKey='modifications'/>}>
                  <Route path="" element={<Modifications/>}/>
                </Route>

                <Route path="*" element={<ErrorPage />}/>
              </Routes>
            </div>
          )
        }
        <ModalWrapper />
      </main>
      <span className="ui-version">v.{uiVersion.gitCommitHash}</span>
    </ConfigProvider>
  );
}

export default Main;
