import {ThunkDispatch} from "redux-thunk";

import {authAPI} from "./api";
import {I_authUserData, I_loginData, ProfileFieldType} from "../../types/auth-types";
import {AppActionsType, GetStateType} from "../store";
import {fetchHandler} from "../../utils/fetchWrapper";

export const localStorageKey = process.env.REACT_APP_LS_TOKEN || 'REACT_APP_LS_TOKEN';
export const localStorageRoleKey = process.env.REACT_APP_USER_ROLE || 'qmate-2-0-user-role';

export const LOGOUT_USER_SUCCESS = 'app/auth/LOGOUT_USER_SUCCESS';
export const SET_USER_DATA = 'app/auth/SET_USER_DATA';

export type I_authActions = I_userSessionDataAC | I_logoutUserSuccessAC;

//interfaces
interface I_userSessionDataAC {
  type: typeof SET_USER_DATA,
  payload: I_authUserData
  userFields?: ProfileFieldType[]
}

interface I_logoutUserSuccessAC {
  type: typeof LOGOUT_USER_SUCCESS
}


//ACTIONS CREATORS
export const _setAuthUserData = (payload: I_authUserData, userFields?: ProfileFieldType[]): I_userSessionDataAC =>
  ({type: SET_USER_DATA, payload, userFields});
export const logOut = (): I_logoutUserSuccessAC => {
  localStorage.removeItem(localStorageKey);
  localStorage.removeItem(localStorageRoleKey);
  return {type: LOGOUT_USER_SUCCESS};
};


//EXTERNAL ACTIONS
export const loginUserThunk = (data: I_loginData, commonAuth?: I_authUserData) =>
  fetchHandler(
    'loginUser',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      let auth: I_authUserData | null = commonAuth || null;
      if (!commonAuth) {
        auth = await authAPI.loginUser(data);
        localStorage.setItem(localStorageKey, JSON.stringify(auth));
      }
      if (auth) {
        try {
          let userData = await authAPI.getUser(auth.Authorization);
          if (auth && userData) {
            localStorage.setItem(localStorageRoleKey, userData.role);
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
