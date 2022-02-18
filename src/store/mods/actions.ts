export const modsActionTypes = {
  ADD_MODIFICATION: 'mods/ADD_MODIFICATION',
  DELETE_MODIFICATION: 'app/DELETE_MODIFICATION',
} as const;

export type ModsActions = AddModification | DeleteModification;

//interfaces
interface AddModification {
  type: typeof modsActionTypes.ADD_MODIFICATION,
}
interface DeleteModification {
  type: typeof modsActionTypes.DELETE_MODIFICATION,
  id: string
}

export const deleteModification = (id: string): DeleteModification => ({
  type: modsActionTypes.DELETE_MODIFICATION, id
})

export const addModification = (): AddModification => ({
  type: modsActionTypes.ADD_MODIFICATION
})
