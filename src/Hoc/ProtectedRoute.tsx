import * as React from 'react';
import {useMemo} from "react";
import {connect} from 'react-redux';
import {Navigate, RouteProps, Outlet } from 'react-router';

import {selectIsAuth} from "../store/auth/selectors";
import {AppStateType} from "../store/store";
import {getRoute} from "../constants/routes";
import {RolesType} from "../types/auth-types";

interface PrivateRouteProps extends RouteProps {
  isAuth: boolean;
  role: RolesType | null,
  routeKey: string
}

const ProtectedRoute = (props: PrivateRouteProps) => {
  const { isAuth, routeKey, role } = props;
  const {permits} = useMemo(() => getRoute(routeKey), [routeKey]);
  const allowed = true;

  if (isAuth && !allowed) {
    return <Navigate to={'/profile'} />
  }
  if (!isAuth) {
    return <Navigate
      to={{
        pathname: '/login'
      }}
    />
  }
  return (
    <Outlet />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: selectIsAuth(state),
  role: state.auth.userData.role
});

export default connect(mapStateToProps, {})(ProtectedRoute);
