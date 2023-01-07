import {ModificationEntity} from "./mods-types";

export const columnFetchTypes = ['rollName', 'model', 'frontTexture', 'paint', 'backTexture', 'color', 'areaFacade'];

export const columnTypes = [
  'index', 'series', 'product_type', 'height', 'width', 'quantity', 'thick', 'rollName', 'model', 'frontTexture', 'paint',
  'backTexture', 'color', 'areaFacade'
] as const;

export function isColumnType (keyInput: string): keyInput is ColumnType {
  return  [
    'index', 'series', 'product_type', 'height', 'width', 'quantity', 'thick', 'rollName', 'model', 'frontTexture', 'paint',
    'backTexture', 'color', 'areaFacade'
  ].includes(keyInput);
}

export const numberCells = ["width", "quantity", "height", "thick"] as ColumnType[];

export type ColumnType = typeof columnTypes[number];

export type DefaultRowValues = {
  id: string
  _isEditing?: boolean
  loading?: boolean
  modifications: ModificationEntity
  fields: {[key: string]: string}
}

export type Option = {id: string, title: string}

export type RowCell = {
  options: Option[];
  selected: Option | null;
  disabled?: boolean;
}


export type DataRow = DefaultRowValues & {
  [key in ColumnType]?: RowCell
}

export type PartialDataRow = Partial<DataRow> & { id: string };

export interface Order {
  complete: boolean
  created_at: string
  id: string
}

export type OrdersState = {
  readonly orders: Order[]
  readonly currentOrder: Order | null
  readonly ids: string[]
  readonly rows: {
    [key: string]: DataRow
  }
}
