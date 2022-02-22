import {AppStateType} from "store/store";
import {AuthUserData, RolesType} from "types/auth-types";

export const selectIsAuth = (state:AppStateType): boolean =>
    state.auth.isAuth && !!state.auth.userData.Authorization;

export const selectToken = (state:AppStateType): string =>
    state.auth.userData.Authorization;

export const selectUserData = (state:AppStateType): AuthUserData =>
    state.auth.userData;

export const selectUserRole = (state:AppStateType): RolesType | null =>
    state.auth.userData ? state.auth.userData.role : null;
