import {connect} from 'react-redux';
import {selectIsAuth} from "../store/auth/selectors";
import {AppStateType} from "../store/store";
import * as React from 'react';
import {Redirect, Route, RouteProps,} from 'react-router-dom';
import {getRoute} from "../constants/routes";
import {RolesType} from "../types/auth-types";
import {useCallback, useMemo} from "react";

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuth: boolean;
  role: RolesType | null,
  routeKey: string
}

const ProtectedRoute = (props: PrivateRouteProps) => {
  const {component: Component, isAuth, routeKey, role, location, ...rest} = props;
  const {path, permits} = useMemo(() => getRoute(routeKey), [routeKey]);
  const allowed = useMemo(() => role && permits.includes(role), [role, permits]);

  const renderComponent = useCallback((routeProps: RouteProps) => isAuth && allowed
    ? (<Component {...routeProps} {...rest} />)
    : isAuth && !allowed
      ? (<Redirect to={'/profile'} />)
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: routeProps.location}
          }}
        />
      ), [isAuth, allowed, Component, rest]);

  return (
      <Route
          {...rest}
          path={path}
          render={renderComponent}
      />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: selectIsAuth(state),
  role: state.auth.userData.role
});

export default connect(mapStateToProps, {})(ProtectedRoute);
