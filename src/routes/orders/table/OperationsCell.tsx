import React, {useCallback} from "react";
import {Button, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, CopyOutlined, SaveOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {_removeRow, onDuplicateRow} from "store/orders/actions";
import {Link} from "react-router-dom";

interface Props {
  record_id: string;
}

const OperationsCell: React.FC<Props> = React.memo(({record_id}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = useCallback(() => dispatch(_removeRow(record_id)), [record_id]);
  const handleDuplicate = useCallback(() => dispatch(onDuplicateRow(record_id)), [record_id]);

  return (
    <div className="row around">
      <Link to={`/modifications/${record_id}`}>
        <Button style={{marginRight: "5px"}} icon={<EditOutlined />} />
      </Link>
      <Button style={{marginRight: "5px"}} icon={<CopyOutlined />} onClick={handleDuplicate}/>
      <Popconfirm title={t("orders.table.sure_delete")} onConfirm={handleDelete}>
        <Button style={{marginRight: "5px"}} icon={<DeleteOutlined />}/>
      </Popconfirm>
      <Button icon={<SaveOutlined />} disabled/>
    </div>
  )
})

export default OperationsCell;
