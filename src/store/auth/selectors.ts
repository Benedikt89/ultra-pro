import {AppStateType} from "@Store/store";
import {AuthUserData, RolesType} from "@Types/auth-types";

export const selectIsAuth = (state:AppStateType): boolean =>
    state.auth.isAuth && !!state.auth.tokens.access;

export const selectToken = (state:AppStateType): string => state.auth.tokens.access;

export const selectUserData = (state:AppStateType): AuthUserData =>
    state.auth.userData;

export const selectUserRole = (state:AppStateType): RolesType | null =>
    state.auth.userData ? state.auth.userData.role : null;
