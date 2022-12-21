import {AppState, ModalType, ModalTypes} from "@Types/app-types";
import {AppActionsType} from "@Store/store";

import {appActionTypes} from "./actions";

const initialState: AppState = {
  isFetching: {},
  error: {},
  modal: null,
  passwordRegexp: null,
  companyLogo: null,
  theme: "dark",
};

const getModalByType = (type: ModalTypes, message: string | null): ModalType => {
  const messageKey = `${type}.${message ? message : `modal_${type}_default_message`}`;
  const title = `${type}.${message ? message : `modal_${type}_default_title`}`;
  return { type, message: messageKey, title }
};

const appReducer = (state: AppState = initialState, action: AppActionsType) => {
  switch (action.type) {
    //setting fetching and frozen status
    case appActionTypes.SET_IS_FETCHING: {
      if (state.isFetching[action.key] && !action.status) {
        let newState = {...state};
        delete newState.isFetching[action.key];
        return newState
      }
      if (!state.isFetching[action.key] && action.status) {
        return {
          ...state,
          isFetching: {...state.isFetching, [action.key]: action.status},
        };
      } else return state;
    }
    case appActionTypes.SET_ERROR: {
      if (state.error[action.key] && !action.message) {
        let newState = {...state};
        delete newState.error[action.key];
        return newState
      }
      if (action.message) {
        return {
          ...state,
          error: {...state.error, [action.key]: {message: action.message}},
        };
      } else return state;
    }
    case appActionTypes.SET_MODAL: {
      return {
          ...state,
          modal: action.modalType ? getModalByType(action.modalType, action.message) : null
      }
    }
    case appActionTypes.SET_COMPANY_CONFIG: {
      return {
        ...state,
        passwordRegexp: action.passwordRegexp,
        companyLogo: action.logo
      }
    }
    case appActionTypes.SET_THEME: {
      return {
        ...state,
        theme: action.theme,
      }
    }
    default:
      return state;
  }
};


export default appReducer;
