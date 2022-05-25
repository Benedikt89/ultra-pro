import React, {CSSProperties, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Select} from "antd";
import {useDispatch} from "react-redux";
import {FileAddOutlined} from "@ant-design/icons";

import {setModal} from "store/app/actions";
import DetailPicker from "components/forms/DetailPicker/DetailPicker";

import "./ModificationsModal.less";

const optionsKeys = ["height", "width", "radius", "offsetX", "offsetY"] as const;
const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
const borders = ["left", "right", "top", "bottom"];

type InputsKeys = typeof optionsKeys;
type InputKey = InputsKeys[number]

const detailS: CSSProperties = {
  width: 180,
  height: 180
}
const modS: CSSProperties = {
  width: 49,
  height: 98
}

type Values = {
  [key in InputKey]: number;
};

const ModificationModal: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState<string>("");
  const [values, setValues] = useState<Values>({offsetX: 0, offsetY: 0, height: 98, width: 49, radius: 0});


  const calcStyles = useMemo(() => ({
    ...modS,
    top: `${50 + values.offsetY}%`,
    right: `${50 + values.offsetX}%`,
    width: values.width,
    height: values.height,
    borderRadius: `${values.radius}%`
  }), [values]);

  return (
    <div className="col">
      <div className="mod-modal-content">
        <div className="col between">
          <div className="col w-full">
            <div className="inputs-wrapper">
              <DetailPicker activeKey={activeKey} setActiveKey={setActiveKey}/>
              <div className="col">
                <div className="mb-2"><Select placeholder={"Обрати ручку J"} style={{width: 200}} /></div>
                <div className="mb-2"><Select placeholder={"Обрати модифікацію"} style={{width: 200}} /></div>
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
              {optionsKeys.map(key => (
                <div className="row between mb-2" key={key}>
                  <label>some {key}</label>
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
              onClick={() => dispatch(setModal(null, null))}
            >
              {t(`mods.add`)}
            </Button>
            <Button key="back" onClick={() => dispatch(setModal(null, null))}>
              {t(`mods.go_back`)}
            </Button>
          </div>
        </div>
        <div className="col">
          <div className="plan-wrapper">
            <div className="detail" style={borders.includes(activeKey) ? {
              ...detailS,
              [`border-${activeKey}`]: "2px solid black"
            } : detailS}>
              {corners.includes(activeKey) && (
                <span className={`active-corner ${activeKey}`} />
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
