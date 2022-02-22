import {AppState, ModalType, ModalTypes} from "types/app-types";
import {AppActionsType} from "store/store";

import {appActionTypes} from "./actions";

const initialState: AppState = {
  isFetching: {},
  error: {},
  modal: null,
  passwordRegexp: null,
  companyLogo: null,
  theme: "dark",
};

const getModalByType = (type: ModalTypes, message: string | null, pass?: string): ModalType => {
    if (type === 'error') {
        return {type: "error", message: message ? message : 'modal_error_default_message', title: 'modal_error_default_title'}
    } else {
        return {
          type: "success",
          message: !message ? 'modal_success_default_message'
              : message === 'user_created' ? 'modal_success_user_created'
              : message,
          title:  'modal_success_default_title', pass}
    }
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
          modal: action.modalType ? getModalByType(action.modalType, action.message, action.pass) : null
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
