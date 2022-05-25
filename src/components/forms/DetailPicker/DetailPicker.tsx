import React from "react";

import "./DetailPicker.less";

const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
const borders = ["left", "right", "top", "bottom"];

interface Props {
  activeKey?: string;
  setActiveKey?: (key: string) => void;
}

const DetailPicker: React.FC<Props> = ({activeKey, setActiveKey}) => {

  return (
    <div className="detail-scheme-wrapper">
      {corners.map((key, i) => (
        <div
          key={key}
          className={`detail-scheme-corner ${key} ${key === activeKey ? "active" : ""}`}
          onClick={() => setActiveKey && setActiveKey(key)}
        >
          {i + 1}
        </div>
      ))}
      {borders.map((key) => (
        <div
          key={key}
          className={`detail-scheme-border ${key} ${key === activeKey ? "active" : ""}`}
          onClick={() => setActiveKey && setActiveKey(key)}
        >
          {key}
        </div>
      ))}
      <div className="detail-scheme"/>
    </div>
  )
}

export default DetailPicker;
