export const columnTypes = [
  'index', 'type', 'height', 'width', 'quantity', 'thick', 'rollName', 'model', 'frontTexture', 'paint',
  'backTexture', 'color', 'areaFacade'
] as const;

export type ColumnType = typeof columnTypes[number];

export type DefaultRowValues = {
  id: string
  _isEditing?: boolean
  loading?: boolean
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

export type OrdersState = {
  readonly ids: string[]
  readonly rows: {
    [key: string]: DataRow
  }
}
