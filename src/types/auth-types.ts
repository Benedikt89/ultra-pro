export interface I_loginData {
    login: string,
    password: string
}

export interface I_eventObject {
    status: boolean,
    message: string | null
}

export type I_eventType = 'AUTH_FETCHING' | 'AUTH_ERROR' | 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'AUTH_SUCCESS'
export type RolesType = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_OPERATOR' | 'ROLE_INSPECTOR'


export interface I_authUserData {
    Authorization: string
    Expiration: string
    login: string
    role: RolesType | null
    userId: number | string
}

export type ProfileFieldType = {
    id: number | string
    mandatory: boolean
    name: string
    regexp: null | string
    templateId: number | string
    value: string
}

export type I_authState = {
    [key in I_eventType]?: I_eventObject;
} & {
    userData: I_authUserData;
    userFields: ProfileFieldType[],
    isAuth: boolean;
};

export interface I_authToFrontUserData extends I_authUserData{
    tokenDeathTime: number | null,
    rememberMe: boolean | null,
}

