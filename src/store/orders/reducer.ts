import {columnTypes, DataRow, OrdersState} from "@Types/orders-types";
import {AppActionsType} from "@Store/store";

import {ordersTypes} from "./actions";

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  rows: {},
  ids: []
};

const ordersReducer = (state: OrdersState = initialState, action: AppActionsType): OrdersState => {
  switch (action.type) {
    case ordersTypes.SET_ORDERS: {
      return {
        ...state,
        orders: action.orders
      };
    }
    case ordersTypes.ADD_ROW: {
      const newOne: DataRow = {
        id: Math.random() + "row_id",
        series: { options: action.options, selected: null },
        fields: {},
        modifications: {
          ids: [],
          data: {}
        }
      };
      return {
        ...state,
        rows: {...state.rows, [newOne.id]: newOne},
        ids: [...state.ids, newOne.id]
      };
    }
    case ordersTypes.DUPLICATE_ROW: {
      const found = state.rows[action.id];
      if (!found) return state;
      const newOne: DataRow = {...found, id: Math.random() + "row_id"};
      const foundIndex = state.ids.indexOf(action.id);
      const newIds = [...state.ids]
      newIds.splice(foundIndex, 0, newOne.id);
      return {
        ...state,
        rows: {...state.rows, [newOne.id]: newOne},
        ids: newIds
      };
    }
    case ordersTypes.REMOVE_ROW: {
      let newState = {...state};
      delete newState.rows[action.id];
      return {
        ...newState,
        ids: newState.ids.filter(id => id !== action.id)
      };
    }
    case ordersTypes.SET_MODIFICATIONS: {
      const found = state.rows[action.id];
      if (!found) return state;
      return {
        ...state,
        rows: {...state.rows, [found.id]: {...found, modifications: action.modifications}},
      };
    }
    case ordersTypes.ON_SELECT: {
      const {row_id, value, columnType, options, nextType, fields} = action;
      let nextRow = state.rows[row_id]
      const typeIdx = columnTypes.indexOf(columnType);


      if (!nextRow) return state;

      columnTypes.forEach((key, i) => {
        if (i > typeIdx) {
          delete nextRow[key]
        }
      })
      nextRow = {
        ...nextRow,
        [columnType]: { ...nextRow[columnType], selected: value },
        fields
      };
      if (nextType) {
        nextRow = {...nextRow, [nextType]: { options, selected: null } }
      }

      return {
        ...state,
        rows: {
          ...state.rows,
          [row_id]: nextRow
        }
      };
    }
    default:
      return state;
  }
};


export default ordersReducer;
