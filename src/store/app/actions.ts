import {ModalTypes} from "../../types/app-types";

export const appActionTypes: {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING'
  SET_ERROR: 'app/SET_ERROR'
  SET_MODAL: 'app/SET_MODAL',
  SET_COMPANY_CONFIG: 'app/SET_COMPANY_CONFIG'
} = {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING',
  SET_ERROR: 'app/SET_ERROR',
  SET_MODAL: 'app/SET_MODAL',
  SET_COMPANY_CONFIG: 'app/SET_COMPANY_CONFIG'
};

export type I_appActions = I_setFetching | I_setError | I_setModal | I_setCompanyConfig;

//interfaces
interface I_setFetching {
  type: typeof appActionTypes.SET_IS_FETCHING,
  key: string
  status: boolean
}

interface I_setError {
  type: typeof appActionTypes.SET_ERROR,
  key: string
  message: null | string
}

interface I_setModal {
  type: typeof appActionTypes.SET_MODAL,
  modalType: ModalTypes | null
  message: string | null
  pass?: string
}

interface I_setCompanyConfig {
  type: typeof appActionTypes.SET_COMPANY_CONFIG,
  passwordRegexp: string | null,
  logo: string | null
}


//Internal ACTIONS CREATORS
export const _setFetching = (key: string, status: boolean): I_setFetching =>
  ({type: appActionTypes.SET_IS_FETCHING, key, status});

export const _setError = (key: string, message: string | null): I_setError =>
  ({type: appActionTypes.SET_ERROR, key, message});

export const setModal = (modalType: ModalTypes | null, message: string | null, pass?: string): I_setModal => {
  // if (modalType) {
  //   Modal[modalType]({
  //     content: message ? message : 'Щось пошло не так...',
  //   });
  // }
  return ({type: appActionTypes.SET_MODAL, modalType, message, pass});
};

export const setCompanyConfig = (passwordRegexp: string | null, logo: string | null) => ({type: appActionTypes.SET_COMPANY_CONFIG, passwordRegexp, logo });
