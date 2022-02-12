import * as React from "react";
import {MouseEventHandler, useMemo} from "react";
import {Button} from "antd";
import {useTranslation} from "react-i18next";

import {RolesType} from "../../types/auth-types";

interface I_Props {
  role?: RolesType | null
  onButtonClick: MouseEventHandler
  disabled?: boolean
}

const DataHeader: React.FC<I_Props> = ({onButtonClick, disabled}) => {
  const { t } = useTranslation();
  let header = useMemo(() => ({title: true, button: true, small: true}), []);

  const isDisabledButton: boolean | undefined = false;

  return !header ? null : (
    <div className="component-header" style={parent ? {padding: '10px 40px'} : {}}>
      <div className="col-8">
        <h4>{t(``)}</h4>
      </div>
      {header.button && (
        <Button type="primary"
                disabled={isDisabledButton || disabled}
                onClick={onButtonClick}
        >
          {t(`header_button`)}
        </Button>
      )}
    </div>
  )
};

export default DataHeader;
