import React from "react";
import {SelectProps} from "antd/lib/select";
import {Select} from "antd";

interface Props extends SelectProps {
  className?: string;
  minWidth?: number;
}

const DropdownSelect: React.FC<Props> = React.memo(({className, minWidth, ...rest}) => {

  return (
    <div className={className}>
      <Select
        showSearch
        style={{ minWidth }}
        defaultActiveFirstOption={false}
        {...rest}
        filterOption={(input, option) => {
          const val: string = typeof option?.children === "string" ? option?.children : "";
          return val.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
      />
    </div>
  )
})

export default DropdownSelect;
