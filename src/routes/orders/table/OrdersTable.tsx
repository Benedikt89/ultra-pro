import React, {useCallback, useMemo} from "react";
import {Button, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {TFunction, useTranslation} from "react-i18next";

import {ColumnType, columnTypes} from "types/orders-types";
import {AppStateType} from "store/store";
import {onAddRow} from "store/orders/actions";
import {selectFetchingByKey} from "store/app/selectors";

import EditableCell from "./EditableCell";
import OperationsCell from "./OperationsCell";

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
  onCell?: (record: {id: string, key: string}) => {
    record_id: string,
    dataIndex: ColumnType,
    title: string,
  }
};

const generateColumns = (t: TFunction): ColumnItemType[] => {
  return columnTypes.map((value) => {
    let res: ColumnItemType = {
      title: t(`orders.table.header.${value}`),
      _columnType: value as ColumnType,
      dataIndex: value as ColumnType,
      editable: true,
      width: 200,
      _contentType: value === "width" || value === "quantity" || value === "height" ? "number" : "select",
      onCell: (record: {id: string, key: string}) => ({
        record_id: record.id,
        dataIndex: value as ColumnType,
        _columnType: value as ColumnType,
        title: value as string,
      }),
    };
    return res;
  })
}


const OrdersTable:React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const ids = useSelector((state: AppStateType) => state.orders.ids);
  const loading = useSelector((state: AppStateType) => selectFetchingByKey(state, "onAddRow"));

  const handleAdd = useCallback(() => {
    dispatch(onAddRow())
  }, [dispatch]);

  const columns: ColumnItemType[] = useMemo(() => {
    return [
      ...generateColumns(t),
      {
        title: 'operation',
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
  }, [t]);

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return (
    <div className="w-full">
      <Table
        className="mb-2"
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={ids.map(id => ({id, key: id}))}
        columns={columns}
        scroll={{x: 1600}}
      />
      <div className="row between">
        <Button onClick={handleAdd} type="primary" loading={loading} >
          {t("orders.table.add")}
        </Button>
        <Button type="primary" >
          {t("orders.table.textures")}
        </Button>
      </div>
    </div>
  );
}

export default OrdersTable;