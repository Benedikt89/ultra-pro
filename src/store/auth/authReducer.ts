import {AuthState} from "types/auth-types";
import {AppActionsType} from "store/store";

import {LOGOUT_USER_SUCCESS, SET_USER_DATA} from "./actions";

let initialState: AuthState = {
    userData: {
        Authorization: '',
        Expiration: '',
        role: null,
        login: '',
        userId: -1
    },
    userFields: [],
    isAuth: false,
};

const authReducer = (state: AuthState = initialState, action: AppActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                isAuth: !!action.payload.Authorization,
                userData: {...state.userData, ...action.payload},
                userFields: action.userFields ? action.userFields : state.userFields
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return initialState;
        }
        default:
            return state;
    }
};


export default authReducer;





