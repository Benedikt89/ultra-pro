import {ModificationsState} from "types/mods-types";
import {AppActionsType} from "store/store";

import {modsActionTypes} from "./actions";

const initialState: ModificationsState = {
  data: {},
  ids: []
};

const modsReducer = (state: ModificationsState = initialState, action: AppActionsType): ModificationsState => {
  switch (action.type) {
    case modsActionTypes.ADD_MODIFICATION: {
      const newOne = {id: Math.random() + "mod_id", value: null};
      return {
        ...state,
        data: {...state.data, [newOne.id]: newOne},
        ids: [...state.ids, newOne.id]
      };
    }
    case modsActionTypes.DELETE_MODIFICATION: {
      let newState = {...state};
      delete newState.data[action.id];
      return {
        ...newState,
        ids: newState.ids.filter(id => id !== action.id)
      };
    }
    default:
      return state;
  }
};


export default modsReducer;
