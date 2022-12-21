import {ThunkDispatch} from "redux-thunk";

import {AuthLoginResponse, AuthUserData, LoginData, RecoverPasswordData} from "@Types/auth-types";
import {AppActionsType, GetStateType} from "@Store/store";
import {fetchHandler} from "@Utils/fetchWrapper";

import {authAPI} from "./api";
import {localStorageRoleKey, localStorageTokenKey} from "@Utils/api/api";

export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type AuthActions = UserSessionDataAC | LogoutUserSuccessAC;

//interfaces
interface UserSessionDataAC {
  type: typeof SET_USER_DATA,
  payload: AuthUserData & AuthLoginResponse
}

interface LogoutUserSuccessAC {
  type: typeof LOGOUT_USER_SUCCESS
}


//ACTIONS CREATORS
export const _setAuthUserData = (payload: AuthUserData & AuthLoginResponse): UserSessionDataAC =>
  ({type: SET_USER_DATA, payload});

export const logOut = (): LogoutUserSuccessAC => {
  localStorage.removeItem(localStorageTokenKey);
  localStorage.removeItem(localStorageRoleKey);
  return {type: LOGOUT_USER_SUCCESS};
};


//EXTERNAL ACTIONS
export const loginUserThunk = (data: LoginData) =>
  fetchHandler(
    'loginUser',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      let auth: AuthLoginResponse | null = await authAPI.loginUser(data);
      if (auth) {
        try {
          const userData = await authAPI.getUser();
          if (auth && userData?.role !== "None") {
            localStorage.setItem(localStorageRoleKey, userData.role ?? "");
            dispatch(_setAuthUserData({...auth, ...userData}));
            return true;
          }
          dispatch(logOut());
        } catch (e) {
          dispatch(logOut());
        }
      }
    }
  );

export const checkAuth = () =>
  fetchHandler(
    'checkAuth',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const token = localStorage.getItem(localStorageTokenKey);
      if (token) {
        const userData = await authAPI.getUser(token);
        if (userData?.role !== "None") {
          dispatch(_setAuthUserData({tokens: {access: token}, ...userData}));
          return true;
        }
      }
    }
  );

export const recoverPasswordThunk = (data: RecoverPasswordData) =>
  fetchHandler(
    'recoverPassword',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      let result = await authAPI.recoverPassword(data);
      if (result) {
        return true
      }
    }
  );
