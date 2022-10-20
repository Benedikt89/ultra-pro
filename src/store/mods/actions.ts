import {Modification} from "../../types/mods-types";

export const modsActionTypes = {
  ADD_MODIFICATION: 'mods/ADD_MODIFICATION',
  DELETE_MODIFICATION: 'app/DELETE_MODIFICATION',
  SAVE_MODIFICATION: 'app/SAVE_MODIFICATION',
  SET_EDIT_MODIFICATION: 'app/SET_EDIT_MODIFICATION',
} as const;

export type ModsActions = AddModification | DeleteModification | SaveModification | SetEditModification;

//interfaces
interface AddModification {
  type: typeof modsActionTypes.ADD_MODIFICATION,
}
interface DeleteModification {
  type: typeof modsActionTypes.DELETE_MODIFICATION,
  id: string
}
interface SetEditModification {
  type: typeof modsActionTypes.SET_EDIT_MODIFICATION,
  id: string
}
interface SaveModification {
  type: typeof modsActionTypes.SAVE_MODIFICATION,
  item: Modification
}

export const deleteModification = (id: string): DeleteModification => ({
  type: modsActionTypes.DELETE_MODIFICATION, id
})

export const addModification = (): AddModification => ({
  type: modsActionTypes.ADD_MODIFICATION
})

export const setEditModification = (id: string): SetEditModification => ({
  type: modsActionTypes.SET_EDIT_MODIFICATION, id
})

export const saveModification = (item: Modification): SaveModification => ({
  type: modsActionTypes.SAVE_MODIFICATION, item
})
