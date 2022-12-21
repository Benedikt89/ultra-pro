import {ModificationData, ModificationsState} from "@Types/mods-types";
import {AppActionsType} from "@Store/store";

import {modsActionTypes} from "./actions";

const initialState: ModificationsState = {
  data: {},
  ids: [],
  editingId: null,
};

export const modDefaults: ModificationData = {
  offsetX: 0,
  offsetY: 0,
  height: 98,
  width: 49,
  radius: 0,
  modType: null,
  modTypeOptions: null,
  formType: null,
  formTypeOptions: null,
};

const modsReducer = (state: ModificationsState = initialState, action: AppActionsType): ModificationsState => {
  switch (action.type) {
    case modsActionTypes.SET_STATE: {
      return {
        ...action.state,
        editingId: null
      }
    }
    case modsActionTypes.ADD_MODIFICATION: {
      const newOne = {id: Math.random() + "mod_id", value: null, data: modDefaults};
      return {
        ...state,
        data: {...state.data, [newOne.id]: newOne},
        ids: [...state.ids, newOne.id],
        editingId: newOne.id,
      };
    }
    case modsActionTypes.DELETE_MODIFICATION: {
      let newState = {...state};
      delete newState.data[action.id];
      return {
        ...newState,
        ids: newState.ids.filter(id => id !== action.id),
      };
    }
    case modsActionTypes.SET_EDIT_MODIFICATION: {
      return {
        ...state,
        editingId: action.id,
      };
    }
    case modsActionTypes.SAVE_MODIFICATION: {
      return {
        ...state,
        data: {...state.data, [action.item.id]: action.item},
        editingId: null,
      };
    }
    default:
      return state;
  }
};


export default modsReducer;
