export type ModalTypesOld = 'error' | 'success' | 'info' | 'warning' | 'modification';

export const MODAL = {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    MODIFICATION: 'mods',
} as const;

type Keys = keyof typeof MODAL;
export type ModalTypes = typeof MODAL[Keys]


export interface AppState {
    isFetching: {[key: string]: boolean},
    error: {[key: string]: {message: string}},
    modal: ModalType | null,
    passwordRegexp: string | null,
    companyLogo: string | null
    theme: string
}

export interface ModalType {type: ModalTypes, title: string, message: string, pass?: string}

export interface Paginator {
    page: number,
    sizePerPage? :number
}
