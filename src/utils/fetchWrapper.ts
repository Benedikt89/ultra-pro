import {batch} from 'react-redux';
import {message, Modal} from "antd";

import {AppDispatch, GetStateType} from "@Store/store";
import {selectErrorByKey, selectFetchingByKey} from "@Store/app/selectors";
import {_setError, _setFetching} from "@Store/app/actions";
import {selectToken} from "@Store/auth/selectors";
import {logOut} from "@Store/auth/actions";
import {hasOwnProperty} from "@Types/typeHelpers";

import {errorMessages} from './errorMessages';
import {APIerrorLogger} from "./errorLogger";

export function fetchHandler(key: string, callback: (
  dispatch: AppDispatch,
  getState: GetStateType,
  ) => Promise<boolean | undefined | void>) {
  return async function (dispatch: AppDispatch, getState: GetStateType) {
    try {
      const loading = selectFetchingByKey(getState(), key);
      const error = selectErrorByKey(getState(), key);
      const auth = selectToken(getState());
      if (!loading && (!!auth || key === 'loginUser' || key === 'checkAuth')) {
        batch(() => {
          if (error) {
            dispatch(_setError(key, null));
          }
          dispatch(_setFetching(key, true));
        });
        const response = await callback(dispatch, getState);
        batch(() => {
          dispatch(_setFetching(key, false));
          if (!response) {
            console.log("message.error ========> !response", key);
            message.error('message_nothingFound');
            dispatch(_setError(key, 'message_nothingFound'));
          }
        });
      }
    } catch (e: any) {
      const errorMsg = APIerrorLogger(e);
      const meaningfulErrorMessage = errorMessages(errorMsg);
      let content = errorMsg ? errorMsg : 'message_error';
      if (meaningfulErrorMessage) {
        content = meaningfulErrorMessage;
      }
      //dispatch(setModal('error', errorMsg));
      Modal.error({title: 'message_errorTitle', content});
      message.error(content);
      if (key !== 'loginUser' && hasOwnProperty(e, "response") && e?.response && e?.response.status === 401) {
        dispatch(logOut())
      }
      batch(() => {
        dispatch(_setError(key, content));
        dispatch(_setFetching(key, false));
      });
    }
  };
}
