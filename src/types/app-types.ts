export type ModalTypes = 'error' | 'success' | 'info' | 'warning';

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
