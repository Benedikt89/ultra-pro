import {I_authActions, LOGOUT_USER_SUCCESS, SET_USER_DATA} from "./actions";
import {I_authState} from "../../types/auth-types";

let initialState: I_authState = {
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

const authReducer = (state: I_authState = initialState, action: I_authActions) => {
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





