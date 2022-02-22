import React from "react";
import {Button, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, CopyOutlined, SaveOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {_removeRow} from "store/orders/actions";

interface Props {
  record_id: string;
}

const OperationsCell: React.FC<Props> = React.memo(({record_id}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(_removeRow(record_id))

  return (
    <div className="row around">
      <Button style={{marginRight: "5px"}} icon={<EditOutlined />}/>
      <Button style={{marginRight: "5px"}} icon={<CopyOutlined />}/>
      <Popconfirm title={t("orders.table.sure_delete")} onConfirm={handleDelete}>
        <Button style={{marginRight: "5px"}} icon={<DeleteOutlined />}/>
      </Popconfirm>
      <Button icon={<SaveOutlined />}/>
    </div>
  )
})

export default OperationsCell;
