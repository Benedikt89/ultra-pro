export type ModalTypes = 'error' | 'success' | 'info' | 'warning';

export interface I_appState {
    isFetching: {[key: string]: boolean},
    error: {[key: string]: {message: string}},
    modal: I_modal | null,
    passwordRegexp: string | null,
    companyLogo: string | null
}

export interface I_modal {type: ModalTypes, title: string, message: string, pass?: string}

export interface I_Paginator {
    page: number,
    sizePerPage? :number
}
