import React from 'react';
import classNames from "classnames";
import {Input, Select, Form} from "antd";
import {Rule} from "rc-field-form/lib/interface";

import style from './FormControl.module.css';

interface Props {
  type?: string;
  name: string;
  rules?: Rule[];
  label?: string;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  prefix?: React.ReactNode;
  iconRender?: (visible: boolean) => React.ReactNode;
  wrapperclassname?: string;
  options?: {value: string; disabled?: boolean; title?: string;}[]
}

export const FieldWrapper: React.FC<Props> = ({validate, wrapperclassname, ...props}: Props) => {

  let cx = classNames.bind(style);
  let classForField = cx(wrapperclassname);

  return (
    <Form.Item
      name={props.name}
      rules={props.rules}
      label={props.label}
      className={classForField}
    >
      {props.type === 'password'
        ? <Input.Password {...props} />
        : props.type === 'select'
          ? <Select {...props} style={{width: 360}}>
            {props?.options?.map((opt: any) => (
              <Select.Option value={opt.value} key={opt.value} disabled={opt.disabled}>
                {opt.title ?? opt.value}
              </Select.Option>
            ))}
          </Select>
          : <Input {...props} />
      }
    </Form.Item>
  )
};



