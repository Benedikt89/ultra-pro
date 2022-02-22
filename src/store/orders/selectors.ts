import {AppStateType} from "store/store";
import {ColumnType, DataRow, RowCell} from "types/orders-types";

export const selectRowCell = (state: AppStateType, id: string, cell_key: ColumnType): RowCell | undefined => {
  return state.orders.rows[id] && state.orders.rows[id][cell_key] ? state.orders.rows[id][cell_key] : undefined;
}
export const selectRow = (state: AppStateType, id: string): DataRow | undefined => {
  return state.orders.rows[id]  ? state.orders.rows[id] : undefined;
}
