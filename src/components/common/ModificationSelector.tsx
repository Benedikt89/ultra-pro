import React, {useCallback} from "react";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import {AppStateType} from "@Store/store";
import {selectModById} from "@Store/mods/selectors";
import {deleteModification, setEditModification} from "@Store/mods/actions";
import {setModal} from "@Store/app/actions";
import {MODAL} from "@Types/app-types";

interface Props {
  id: string;
}

const ModificationSelector: React.FC<Props> = ({id}) => {
  const mod = useSelector((state: AppStateType) => selectModById(state, id));
  const dispatch = useDispatch();
  const removeModification = useCallback(() => dispatch(deleteModification(id)), [id]);

  const setEdit = useCallback(() => {
    dispatch(setEditModification(id));
    dispatch(setModal(MODAL.MODIFICATION, "modal_title"));
  }, [id]);

  return !mod ? null : (
    <div className="mods-input-row">
      <div className="ant-input" onClick={setEdit}>{mod.data.modType?.title ?? 'select-modification'}</div>
      <Button
        onClick={removeModification}
        className="mx-2"
        icon={<DeleteOutlined color="primary" />}
      />
    </div>
  )
}

export default ModificationSelector;
