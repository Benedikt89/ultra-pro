import {AuthState} from "@Types/auth-types";
import {AppActionsType} from "@Store/store";

import {LOGOUT_USER_SUCCESS, SET_USER_DATA} from "./actions";

let initialState: AuthState = {
    userData: null,
    isAuth: false,
    tokens: {
        access: ""
    }
};

const authReducer = (state: AuthState = initialState, action: AppActionsType) => {
    switch (action.type) {
        case SET_USER_DATA: {
            const {tokens, ...user} = action.payload;
            const userData = state.userData || {};
            return {
                ...state,
                isAuth: !!tokens.access,
                userData: {...userData, ...user},
                tokens,
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





