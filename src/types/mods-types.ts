export interface Modification {
  id: string
  options?: string[]
  value: null | string
}

export interface ModificationsState {
  data: {[key: string]: Modification};
  ids: string[]
}
