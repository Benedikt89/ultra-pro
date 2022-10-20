import {createSelector} from "reselect";

import {AppStateType} from "store/store";
import {Modification} from "types/mods-types";

export const selectModById = (state:AppStateType, id: string): Modification | null =>
  state.mods.data[id] ?? null;

export const selectEditingModId = (state:AppStateType): string | null =>
  state.mods.editingId;

export const selectEditingMod = createSelector(
  (state: AppStateType) => state,
  selectEditingModId,
    (state, id) => id ? selectModById(state, id) : null
)

