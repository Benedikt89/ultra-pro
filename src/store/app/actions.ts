import {ModalTypes} from "@Types/app-types";

export const appActionTypes: {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING'
  SET_ERROR: 'app/SET_ERROR'
  SET_MODAL: 'app/SET_MODAL',
  SET_COMPANY_CONFIG: 'app/SET_COMPANY_CONFIG',
  SET_THEME: 'app/SET_THEME',
} = {
  SET_IS_FETCHING: 'app/SET_IS_FETCHING',
  SET_ERROR: 'app/SET_ERROR',
  SET_MODAL: 'app/SET_MODAL',
  SET_COMPANY_CONFIG: 'app/SET_COMPANY_CONFIG',
  SET_THEME: 'app/SET_THEME',
};

export type AppActions = SetFetching | SetError | SetModal | SetCompanyConfig | SetTheme;

//interfaces
interface SetFetching {
  type: typeof appActionTypes.SET_IS_FETCHING,
  key: string
  status: boolean
}

interface SetError {
  type: typeof appActionTypes.SET_ERROR,
  key: string
  message: null | string
}

interface SetModal {
  type: typeof appActionTypes.SET_MODAL,
  modalType: ModalTypes | null
  message: string | null
  pass?: string
}

interface SetCompanyConfig {
  type: typeof appActionTypes.SET_COMPANY_CONFIG,
  passwordRegexp: string | null,
  logo: string | null
}

interface SetTheme {
  type: typeof appActionTypes.SET_THEME,
  theme: string,
}


//Internal ACTIONS CREATORS
export const _setFetching = (key: string, status: boolean): SetFetching =>
  ({type: appActionTypes.SET_IS_FETCHING, key, status});

export const _setError = (key: string, message: string | null): SetError =>
  ({type: appActionTypes.SET_ERROR, key, message});

export const setModal = (modalType: ModalTypes | null, message: string | null): SetModal => {
  return ({type: appActionTypes.SET_MODAL, modalType, message});
};

export const setTheme = (theme: string): SetTheme => {
  return ({type: appActionTypes.SET_THEME, theme});
};
