import React, {useCallback} from "react";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import FetchDropdown from "../forms/FetchDropdown";
import {AppStateType} from "../../store/store";
import {selectModById} from "../../store/mods/selectors";
import {deleteModification} from "../../store/mods/actions";

interface Props {
  id: string;
}
const ModificationSelector: React.FC<Props> = ({id}) => {
  const mod = useSelector((state: AppStateType) => selectModById(state, id));
  const dispatch = useDispatch();

  const removeModification = useCallback(() => dispatch(deleteModification(id)), [id, dispatch]);

  return !mod ? null : (
    <div className="mods-input-row">
      <FetchDropdown url={mod.id} />
      <Button
        onClick={removeModification}
        className="mx-2"
        icon={<DeleteOutlined color="primary" />}
      />
    </div>
  )
}

export default ModificationSelector;
