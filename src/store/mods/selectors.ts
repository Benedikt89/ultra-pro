import {AppStateType} from "store/store";
import {Modification} from "types/mods-types";

export const selectModById = (state:AppStateType, id: string): Modification | null =>
  state.mods.data[id] ?? null;

