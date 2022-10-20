import React, {CSSProperties, useCallback, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {FileAddOutlined} from "@ant-design/icons";

import {setModal} from "store/app/actions";
import DetailPicker from "components/forms/DetailPicker/DetailPicker";
import FetchDropdown from "components/forms/FetchDropdown";
import {selectEditingMod} from "store/mods/selectors";
import {ModificationData, ModificationCoordsKeys} from "types/mods-types";
import {modDefaults} from "store/mods/reducer";
import {deleteModification, saveModification} from "store/mods/actions";
import {Option} from "types/orders-types";

import "./ModificationsModal.less";

const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
const borders = ["left", "right", "top", "bottom"];

const detailS: CSSProperties = {
  width: 180,
  height: 180
}
const modS: CSSProperties = {
  width: 49,
  height: 98
}

function capitalizeFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ModificationModal: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const modification = useSelector(selectEditingMod);

  const [activeKey, setActiveKey] = useState<string>("");
  const [values, setValues] = useState<ModificationData>(modification ? modification.data : modDefaults);
  const [error, setError] = useState(false);

  const calcStyles = useMemo(() => ({
    ...modS,
    top: `${50 + values.offsetY}%`,
    right: `${50 + values.offsetX}%`,
    width: values.width,
    height: values.height,
    borderRadius: `${values.radius}%`
  }), [values]);

  const handleAddModification = useCallback(() => {
    if (!values.modType) {
      setError(true);
      return;
    }
    modification && dispatch(saveModification({...modification, data: values}));
    dispatch(setModal(null, null));
  }, [modification, values]);

  const onModTypeChange = useCallback((v: Option | null, modTypeOptions) => {
    error && setError(false);
    setValues(values => ({...values, modType: v, modTypeOptions}))
  }, [error]);

  const onClose = useCallback(() => {
    dispatch(setModal(null, null));
    if (!modification?.data.modType && !values.modType) {
      dispatch(deleteModification(modification?.id ?? ''))
    }
  }, [modification, values])

  return !modification ? null : (
    <div className="col">
      <div className="mod-modal-content">
        <div className="col between">
          <div className="col w-full">
            <div className="inputs-wrapper">
              <DetailPicker activeKey={activeKey} setActiveKey={setActiveKey}/>
              <div className="col">
                <div className="mb-2">
                  <FetchDropdown
                    type="ручка"
                    url={`${modification.id}/forms`}
                    placeholder={"Обрати ручку J"}
                    style={{width: 200}}
                    onChange={(formType, formTypeOptions) => setValues(values => ({
                      ...values,
                      formType,
                      formTypeOptions
                    }))}
                    initialValue={modification?.data.formType ?? null}
                    initialOptions={modification.data.formTypeOptions}
                  />
                </div>
                <div className="mb-2">
                  <FetchDropdown
                    type="модифікація"
                    url={`${modification.id}/mods`}
                    placeholder={"Обрати модифікацію"}
                    style={{width: 200}}
                    onChange={onModTypeChange}
                    error={error}
                    initialValue={modification?.data.modType}
                    initialOptions={modification?.data.modTypeOptions}
                  />
                </div>
                <div className="mb-2">
                  <Select
                    style={{width: 200}} placeholder={"Обрати кут"}
                    value={corners.includes(activeKey) ? activeKey : undefined}
                    options={corners.map(key => ({label: key, value: key}))}
                    onChange={(value) => setActiveKey(value)}
                  />
                </div>
                <div className="mb-2">
                  <Select
                    style={{width: 200}} placeholder={"Обрати сторону"}
                    value={borders.includes(activeKey) ? activeKey : undefined}
                    options={borders.map(key => ({label: key, value: key}))}
                    onChange={(value) => setActiveKey(value)}
                  />
                </div>
              </div>
            </div>
            <div className="col w-full">
              {ModificationCoordsKeys.map(key => (
                <div className="row between mb-2" key={key}>
                  <label>{t(`mods.${key}`)}</label>
                  <Input
                    style={{width: 200}}
                    value={values[key]}
                    onChange={(e) =>
                      setValues((prev: any) => ({...prev, [key]: +e.target.value ?? 0}))
                    }
                    type="number"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="row between">
            <Button
              key="add" type="primary"
              icon={<FileAddOutlined/>}
              onClick={handleAddModification}
            >
              {t(`mods.add`)}
            </Button>
            <Button key="back" onClick={onClose}>
              {t(`mods.go_back`)}
            </Button>
          </div>
        </div>
        <div className="col">
          <div className="plan-wrapper">
            <div
              className="detail"
              style={borders.includes(activeKey) ? {
                ...detailS,
                [`border${capitalizeFirst(activeKey)}`]: "2px solid black"
              } : detailS}
            >
              {corners.includes(activeKey) && (
                <span className={`active-corner ${activeKey}`}/>
              )}
              <div className={`modification-wrap`} style={calcStyles}>
                <div className="modification-wrap-height">{values.height}</div>
                <div className="modification-wrap-width">{values.width}</div>
              </div>
            </div>
            <div className="x-y-coords">
              <span className="x-y-coords-dot"/>
              <span className="x-y-arrow"/>
              <span className="x-y-arrow vertical"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModificationModal;
