import {AppStateType} from "../store";
import {I_authUserData, RolesType} from "../../types/auth-types";

export const selectIsAuth = (state:AppStateType): boolean =>
    state.auth.isAuth && !!state.auth.userData.Authorization;

export const selectToken = (state:AppStateType): string =>
    state.auth.userData.Authorization;

export const selectUserData = (state:AppStateType): I_authUserData =>
    state.auth.userData;

export const selectUserRole = (state:AppStateType): RolesType | null =>
    state.auth.userData ? state.auth.userData.role : null;
