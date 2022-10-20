import {ThunkDispatch} from "redux-thunk";

import {AuthUserData, LoginData, ProfileFieldType} from "types/auth-types";
import {AppActionsType, GetStateType} from "store/store";
import {fetchHandler} from "utils/fetchWrapper";

import {authAPI} from "./api";

export const localStorageKey = process.env.REACT_APP_LS_TOKEN || 'REACT_APP_LS_TOKEN';
export const localStorageRoleKey = process.env.REACT_APP_USER_ROLE || 'ultra-pro-user-role';

export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type AuthActions = UserSessionDataAC | LogoutUserSuccessAC;

//interfaces
interface UserSessionDataAC {
  type: typeof SET_USER_DATA,
  payload: AuthUserData
  userFields?: ProfileFieldType[]
}

interface LogoutUserSuccessAC {
  type: typeof LOGOUT_USER_SUCCESS
}


//ACTIONS CREATORS
export const _setAuthUserData = (payload: AuthUserData, userFields?: ProfileFieldType[]): UserSessionDataAC =>
  ({type: SET_USER_DATA, payload, userFields});

export const logOut = (): LogoutUserSuccessAC => {
  localStorage.removeItem(localStorageKey);
  localStorage.removeItem(localStorageRoleKey);
  return {type: LOGOUT_USER_SUCCESS};
};


//EXTERNAL ACTIONS
export const loginUserThunk = (data: LoginData, commonAuth?: AuthUserData) =>
  fetchHandler(
    'loginUser',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      let auth: AuthUserData | null = commonAuth || null;
      if (!commonAuth) {
        auth = await authAPI.loginUser(data);
        localStorage.setItem(localStorageKey, JSON.stringify(auth));
      }
      if (auth) {
        try {
          let userData = await authAPI.getUser(auth.Authorization);
          if (auth && userData) {
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

export const getUserDataThunk = () =>
  fetchHandler(
    'getUserData',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType, auth: string) => {
      console.log('=======> getUserDataThunk');
      const userData = getState().auth.userData;
      if (userData) {
        const res = await authAPI.getUserFields(auth);
        dispatch(_setAuthUserData({...userData}, res));
        return true
      }
    }
  );

export const updateUserDataThunk = (data: ProfileFieldType[]) => fetchHandler(
  'updateUserData',
  async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType, auth: string) => {
    console.log('=======> updateUserDataThunk');
    const userData = getState().auth.userData;
    if (userData) {
      const res = await authAPI.updateUserFields(auth, data);
      if (res) {
        dispatch(_setAuthUserData({...userData}, data));
        return true
      }
    }
  }
);

export const recoverPasswordThunk = (data: any) =>
  fetchHandler(
    'recoverPassword',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType, auth: string) => {
      let result = await authAPI.recoverPassword(auth, data);
      if (result) {
        return true
      }
    }
  );
