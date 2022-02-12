import * as React from 'react';
import {EditOutlined, DeleteOutlined, LockOutlined, LoadingOutlined} from '@ant-design/icons';
import {Popconfirm} from "antd";
import {useTranslation} from "react-i18next";

import "./common.css";

interface I_ComponentProps {
  onDelete?: () => void
  deleteLoading?: boolean
  onEdit?: () => void
  changePass?: () => void
  disabled?: boolean | undefined | null
}

const EditCloseButtons: React.FC<I_ComponentProps> = ({onDelete, onEdit, changePass, deleteLoading}) => {
  const { t } = useTranslation();
  return (
    <span className="edit-close-row">
      {onDelete &&
      <Popconfirm title={t('tooltip_sure') + "?"} onConfirm={onDelete}
                  okText={t('yes')} cancelButtonProps={{ghost: true, style: {display: 'none'}}}>
        {deleteLoading ? <LoadingOutlined /> : <DeleteOutlined style={{color: "#ff0000"}}/>}
      </Popconfirm>
      }
      {changePass && <LockOutlined onClick={changePass}/>}
      {onEdit && <EditOutlined onClick={onEdit}/>}
    </span>
  );
};

export default EditCloseButtons;
