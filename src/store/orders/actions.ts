import {ThunkDispatch} from "redux-thunk";

import {fetchHandler} from "@Utils/fetchWrapper";
import {ColumnType, columnTypes, Option, Order} from "@Types/orders-types";
import {AppActionsType, AppDispatch, GetStateType} from "@Store/store";

import {ordersAPI} from "./api";
import {ModificationEntity} from "@Types/mods-types";
import {selectRowFields} from "@Store/orders/selectors";

export const ordersTypes = {
  SET_ORDERS: 'orders/SET_ORDERS',
  SET_SERIES: 'orders/SET_SERIES',
  ORDER_CHANGED: 'orders/ORDER_CHANGED',
  ADD_ROW: 'orders/ADD_ROW',
  REMOVE_ROW: 'orders/REMOVE_ROW',
  DUPLICATE_ROW: 'orders/DUPLICATE_ROW',
  ON_SELECT: 'orders/ON_SELECT',
  SET_MODIFICATIONS: 'orders/SET_MODIFICATIONS',
} as const;

export type OrdersActions = SetSeries | OrderChanged | SetOrders | AddRow | RemoveRow | OnSelect
  | DuplicateRow | SetOrderModifications;

// ========================================= Actions interfaces ============================================= //
interface SetSeries { type: typeof ordersTypes.SET_SERIES, series: Option[] }
interface OrderChanged { type: typeof ordersTypes.ORDER_CHANGED, order: Order }
interface SetOrders { type: typeof ordersTypes.SET_ORDERS, orders: Order[] }

interface AddRow { type: typeof ordersTypes.ADD_ROW, options: Option[] }

interface RemoveRow { type: typeof ordersTypes.REMOVE_ROW, id: string }

interface DuplicateRow { type: typeof ordersTypes.DUPLICATE_ROW, id: string }

interface OnSelectPayload {
  row_id: string
  value: Option | null
  columnType: ColumnType
  nextType?: ColumnType | null
  options: Option[]
  fields: {[key: string]: string}
}

interface SetOrderModifications {
  type: typeof ordersTypes.SET_MODIFICATIONS,
  id: string,
  modifications: ModificationEntity
}

interface OnSelect extends OnSelectPayload { type: typeof ordersTypes.ON_SELECT }

// ======================================== Internal ACTIONS CREATORS  ================================= //
export const _orderChanged = (order: Order): OrderChanged => ({ type: ordersTypes.ORDER_CHANGED, order });

export const _setSeries = (series: Option[]): SetSeries => ({ type: ordersTypes.SET_SERIES, series });
export const _addRow = (options: Option[]): AddRow => ({ type: ordersTypes.ADD_ROW, options });

export const _setOrders = (orders: Order[]): SetOrders => ({ type: ordersTypes.SET_ORDERS, orders });

export const _duplicateRow = (id: string): DuplicateRow => ({ type: ordersTypes.DUPLICATE_ROW, id });

export const _removeRow = (id: string): RemoveRow => ({type: ordersTypes.REMOVE_ROW, id});

export const _onSelectSuccess = (payload: OnSelectPayload): OnSelect => {
  return ({type: ordersTypes.ON_SELECT, ...payload});
};

export const _onSetOrderModifications = (id: string, modifications: ModificationEntity): SetOrderModifications => {
  return ({type: ordersTypes.SET_MODIFICATIONS, id, modifications});
};

// ========================================= EXTERNAL ACTIONS ============================================= //

export const getOrderList = () => fetchHandler(
  'getOrderList',
  async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    const orders = await ordersAPI.getOrders();
    dispatch(_setOrders(orders));
    return true;
  }
);

export const createOrder = () => fetchHandler(
  'createOrder',
  async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    const details = await ordersAPI.createOrder({});
    const orders = getState().orders.orders;
    dispatch(_setOrders([...orders, details]));
    return true;
  }
)


export const getOrder = (id: string) => fetchHandler(
  `getOrder_${id}`,
  async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
    const details = await ordersAPI.getOrderDetails(id);
    console.log(details);
    return true;
  }
)

// add row and request for options
export const onAddRow = () =>
  fetchHandler(
    'onAddRow',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        const { array } = await ordersAPI.postField({});
        dispatch(_addRow(array));
        return true;
      }
    }
  );

// add row and request for options
export const onDuplicateRow = (row_id: string): (dispatch: AppDispatch, getState: GetStateType) => Promise<void> =>
  fetchHandler(
    'onDuplicateRow',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        const fields = selectRowFields(getState(), row_id);
        const res = await ordersAPI.postField({fields});
        dispatch(_duplicateRow(row_id));
        return true;
      }
    }
  );

// set selected state, and request new options
export const onOptionSelect = (row_id: string, option: Option, columnType: ColumnType) =>
  fetchHandler(
    'onOptionSelect' + row_id,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        const fields = selectRowFields(getState(), row_id);
        const payload = {
          fields: {
            ...fields,
            [columnType]: option.id
          }
        }
        const typeIdx = columnTypes.indexOf(columnType);
        columnTypes.forEach((key, i) => {
          if (i > typeIdx) {
            delete payload.fields[key]
          }
        })
        const { array: options, fieldType: nextType } = await ordersAPI.postField(payload);
        dispatch(_onSelectSuccess({row_id, value: option, columnType, options, nextType, fields: payload.fields}));
        return true;
      }
    }
  );

// set selected state, and request new options
export const onSaveModifications = (row_id: string) =>
  fetchHandler(
    'onSaveModifications' + row_id,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const userData = getState().auth.userData;
      if (userData) {
        const {data, ids} = getState().mods;

        dispatch(_onSetOrderModifications(row_id, {data, ids}));
        return true;
      }
    }
  );
