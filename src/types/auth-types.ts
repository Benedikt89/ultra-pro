export interface LoginData {
    login: string,
    password: string
}

export interface EventObject {
    status: boolean,
    message: string | null
}

export type EventType = 'AUTH_FETCHING' | 'AUTH_ERROR' | 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'AUTH_SUCCESS'
export type RolesType = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_OPERATOR' | 'ROLE_INSPECTOR'


export interface AuthUserData {
    Authorization: string
    Expiration: string
    login: string
    role: RolesType | null
    userId: number | string
}

export type ProfileFieldType = {
    id: string
    mandatory: boolean
    name: string
    regexp: null | string
    templateId: number | string
    value: string
}

export type AuthState = {
    [key in EventType]?: EventObject;
} & {
    userData: AuthUserData;
    userFields: ProfileFieldType[],
    isAuth: boolean;
};

export interface AuthToFrontUserData extends AuthUserData{
    tokenDeathTime: number | null,
    rememberMe: boolean | null,
}

