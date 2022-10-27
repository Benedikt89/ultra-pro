import {Option} from "./orders-types";

export const ModificationCoordsKeys = ["height", "width", "radius", "offsetX", "offsetY"] as const;
type CoordsInputsKeys = typeof ModificationCoordsKeys;
type CoordsInputKey = CoordsInputsKeys[number]

export type ModificationCoords = {
  [key in CoordsInputKey]: number;
};

export interface ModificationData extends ModificationCoords {
  modType: Option | null,
  modTypeOptions: Option[] | null,
  formType: Option | null,
  formTypeOptions: Option[] | null,
}

export interface Modification {
  id: string
  options?: string[]
  value: null | string
  data: ModificationData
}


export interface ModificationEntity {
  data: {[key: string]: Modification}
  ids: string[]
}

export interface ModificationsState extends ModificationEntity{
    editingId: string | null
}
