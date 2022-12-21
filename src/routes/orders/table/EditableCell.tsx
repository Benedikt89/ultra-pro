import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import DropdownSelect from "@Components/forms/DropdownSelect";
import {AppStateType} from "@Store/store";
import {selectRowCell} from "@Store/orders/selectors";
import {ColumnType} from "@Types/orders-types";
import {onOptionSelect} from "@Store/orders/actions";
import {selectFetchingByKey} from "@Store/app/selectors";
import {Input} from "antd";

interface EditableCellProps {
  children: React.ReactNode;
  _columnType: ColumnType;
  dataIndex: ColumnType;
  record_id: string;
  i: number;
}

const numberCells = ["width", "quantity", "height", "thick"];

const EditableCell: React.FC<EditableCellProps> = ({
                                                     children,
                                                     _columnType,
                                                     record_id,
                                                     dataIndex,
                                                     i,
                                                     ...restProps
                                                   }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const cellData = useSelector((state: AppStateType) => selectRowCell(state, record_id, _columnType));
  const loading = useSelector((state: AppStateType) => selectFetchingByKey(state, 'onOptionSelect' + record_id));

  useEffect(() => {
    if (!loading && editing) {
      setEditing(false);
    }
  }, [loading]);

  const toggleEdit = () => {
    if (loading || !cellData?.options.length) return;
    setEditing(!editing);
  };

  const onChange = useCallback((value: any) => {
    const option = cellData?.options.find(opt => opt.id === value);
    if (option) {
      // @ts-ignore
      dispatch(onOptionSelect(record_id, option, _columnType))
    }
  }, [record_id, _columnType, cellData]);

  const handleBlur = useCallback((e) => {
    if (loading) {
      e?.target.focus && e?.target.focus()
      return;
    }
    setEditing(false);
  }, [loading]);

  return (
    <td {...restProps}>
      {
        _columnType === "index" ? (
          <div className="editable-cell-value-wrap">{i + 1}</div>
        ) : numberCells.includes(_columnType) ? (
          <Input type="number" onChange={onChange} onBlur={handleBlur} />
        ) : cellData && !cellData.disabled ?(
          <DropdownSelect
            minWidth={160}
            onChange={onChange}
            loading={loading}
            autoFocus={true}
            value={cellData?.selected?.id ?? undefined}
            onBlur={handleBlur}
            options={cellData.options.map(opt => ({label: opt.title, value: opt.id}))}
          />
        ) : cellData && !cellData.disabled ? (
          <div className="editable-cell-value-wrap" style={{paddingRight: 24, minWidth: 200}} onClick={toggleEdit}>
            {cellData.selected ? cellData.selected.title
              : !cellData?.options.length ? t("orders.table.no_options") : t("orders.table.select")
            }
          </div>
        ) : children
      }
    </td>
  );
};

export default EditableCell;
