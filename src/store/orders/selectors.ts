import {AppStateType} from "@Store/store";
import {ColumnType, DataRow, isColumnType, numberCells, RowCell} from "@Types/orders-types";

export const selectRowCell = (state: AppStateType, id: string, cell_key: ColumnType): RowCell | undefined => {
  return state.orders.rows[id] && state.orders.rows[id][cell_key] ? state.orders.rows[id][cell_key] : undefined;
}
export const selectRow = (state: AppStateType, id: string): DataRow | undefined => {
  return state.orders.rows[id]  ? state.orders.rows[id] : undefined;
}

export const selectRowFields = (state: AppStateType, id: string): {[key: string]: string} => {
  return state.orders.rows[id]  ? state.orders.rows[id].fields : undefined;
}

export const selectAvailableColumns = (state: AppStateType): ColumnType[] => {
  const availableColumns: ColumnType[] = ['index', 'series', 'product_type', ...numberCells];
  state.orders.ids.forEach(id => {
    const row = selectRow(state, id);
    Object.keys(row).forEach((key: string | ColumnType) => {
      if (isColumnType(key) && !availableColumns.includes(key)) {
        availableColumns.push(key);
      }
    })
  })
  return availableColumns;
}
