export interface LoginData {
    username: string,
    password: string
}

export interface EventObject {
    status: boolean,
    message: string | null
}

export type EventType = 'AUTH_FETCHING' | 'AUTH_ERROR' | 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'AUTH_SUCCESS'
export type RolesType = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN' | 'ROLE_OPERATOR' | 'ROLE_INSPECTOR' | "None"


export interface AuthLoginResponse {
    tokens: {
        access: string;
        refresh?: string;
    }
}

export interface AuthUserData {
    login: string
    role: RolesType | null
    userId: number | string
}

export type AuthState = {
    [key in EventType]?: EventObject;
} & {
    userData: AuthUserData | null;
    isAuth: boolean;
} & AuthLoginResponse;



export interface RecoverPasswordData {
    old_pass: string,
    password: string,
    repeat_password: string
}
