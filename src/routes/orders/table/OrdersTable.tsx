import React, {useCallback, useMemo} from "react";
import {Button, Table} from "antd";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import {ColumnType, columnTypes, numberCells} from "@Types/orders-types";
import {AppStateType, useAppDispatch} from "@Store/store";
import {onAddRow} from "@Store/orders/actions";
import {selectFetchingByKey} from "@Store/app/selectors";
import {selectAvailableColumns} from "@Store/orders/selectors";

import EditableCell from "./EditableCell";
import OperationsCell from "./OperationsCell";
import "../Orders.less";

type ColumnItemType = {
  _contentType?: 'text' | 'number' | 'operation' | 'select';
  _columnType: ColumnType;
  title: string,
  width?: string | number,
  editable?: boolean,

  dataIndex: ColumnType | "operation",
  render?: any
  sorter?: any
  key?: string
  fixed?: 'right'
  onCell?: (record: {id: string, key: string, i: number}) => {
    record_id: string,
    dataIndex: ColumnType,
    title: string,
    i: number,
  }
};

const generateColumns = (arr, t): ColumnItemType[] => {
  return arr.map((value) => {
    let res: ColumnItemType = {
      title: t(`orders.table.header.${value}`),
      _columnType: value as ColumnType,
      dataIndex: value as ColumnType,
      editable: value !== 'index',
      width: value === 'index' ? 50 : numberCells.includes(value) ? 100 : 200,
      _contentType: numberCells.includes(value) ? "number" : "select",
      onCell: (record: {id: string, key: string, i: number}) => ({
        record_id: record.id,
        dataIndex: value as ColumnType,
        _columnType: value as ColumnType,
        title: value as string,
        i: record.i,
      }),
    };
    return res;
  })
}

const OrdersTable:React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const ids = useSelector((state: AppStateType) => state.orders.ids);
  const availableColumns = useSelector((state: AppStateType) => selectAvailableColumns(state));
  const loading = useSelector((state: AppStateType) => selectFetchingByKey(state, "onAddRow"));

  const handleAdd = useCallback(() => {
    dispatch(onAddRow())
  }, [dispatch]);

  const columns: ColumnItemType[] = useMemo(() => {
    return [
      ...generateColumns(availableColumns, t),
      {
        title: t('orders.table.header.operation'),
        dataIndex: 'operation',
        _columnType: columnTypes[0],
        key: 'operation',
        fixed: 'right',
        width: 217,
        render: (_: any, {id}: {id: string}) => (
          <OperationsCell record_id={id} />
        ),
      },
    ];
  }, [availableColumns, t]);

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <div className="orders-table-wrapper">
      <Table
        className={"mb-3"}
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={ids.map((id, i) => ({id, key: id, i}))}
        columns={columns}
        scroll={{ x: 'calc(700px + 50%)', y: 'calc(100vh - 668px)' }}
      />
      <div className="row between">
        <Button onClick={handleAdd} type="primary" loading={loading}>
          {t("orders.table.add")}
        </Button>
        <Button type="primary" disabled={true}>
          {t("orders.table.textures")}
        </Button>
      </div>
    </div>
  );
}

export default OrdersTable;
