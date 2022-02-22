import {ThunkDispatch} from "redux-thunk";

import {fetchHandler} from "utils/fetchWrapper";
import {ColumnType, columnTypes, Option} from "types/orders-types";
import {AppActionsType, GetStateType} from "store/store";

import {ordersAPI} from "./api";

export const ordersTypes = {
  ADD_ROW: 'orders/ADD_ROW',
  REMOVE_ROW: 'orders/REMOVE_ROW',
  ON_SELECT: 'orders/ON_SELECT',
} as const;

export type OrdersActions = AddRow | RemoveRow | OnSelect;

// ========================================= Actions interfaces ============================================= //
interface AddRow {
  type: typeof ordersTypes.ADD_ROW,
  options: Option[]
}

interface RemoveRow {
  type: typeof ordersTypes.REMOVE_ROW,
  id: string
}

interface OnSelectPayload {
  row_id: string
  value: Option | null
  columnType: ColumnType
  nextType?: ColumnType | null
  options: Option[]
}

interface OnSelect extends OnSelectPayload {
  type: typeof ordersTypes.ON_SELECT,
}

// ======================================== Internal ACTIONS CREATORS  ================================= //
export const _addRow = (options: Option[]): AddRow =>
  ({ type: ordersTypes.ADD_ROW, options });

export const _removeRow = (id: string): RemoveRow =>
  ({type: ordersTypes.REMOVE_ROW, id});

export const _onSelectSuccess = (payload: OnSelectPayload): OnSelect => {
  return ({type: ordersTypes.ON_SELECT, ...payload});
};

// ========================================= EXTERNAL ACTIONS ============================================= //
export const onAddRow = () =>
  fetchHandler(
    'onAddRow',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        const options = await ordersAPI.getOptions("details", 22);
        dispatch(_addRow(options));
        return true;
      }
    }
  );


export const onOptionSelect = (row_id: string, option: Option, columnType: ColumnType) =>
  fetchHandler(
    'onOptionSelect' + row_id,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        console.log("onOptionSelect ===> " + row_id)
        const options = await ordersAPI.getOptions();
        const nextIdx = columnTypes.indexOf(columnType) + 1;
        const nextType = columnTypes[nextIdx];

        dispatch(_onSelectSuccess({row_id, value: option, columnType, options, nextType}));
        return true;
      }
    }
  );
