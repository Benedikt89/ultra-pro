import * as React from 'react';
import {connect} from 'react-redux';
import {Navigate, RouteProps, Outlet } from 'react-router';

import {selectIsAuth} from "@Store/auth/selectors";
import {AppStateType} from "@Store/store";
import {RolesType} from "@Types/auth-types";

type PrivateRouteProps = {
  isAuth: boolean;
  role: RolesType | null,
  routeKey: string
} & RouteProps

const ProtectedRoute = (props: PrivateRouteProps) => {
  const { isAuth} = props; //, routeKey, role } = props;
  //const {permits} = useMemo(() => getRoute(routeKey), [routeKey]); // TODO: work with permissions
  const allowed = true;

  if (isAuth && !allowed) {
    return <Navigate to={'/profile'} />
  }
  if (!isAuth) {
    console.log("ProtectedRoute ===>>")
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
  role: state.auth.userData?.role
});

export default connect(mapStateToProps, {})(ProtectedRoute);
