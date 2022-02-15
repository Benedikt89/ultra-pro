import React from 'react';
import classNames from "classnames";
import {Input, Tooltip} from "antd";
import {useField} from "formik";
import {Select} from 'antd';

const {Option} = Select;

const style = require('./FormControl.module.css');

interface Props {
  type?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  prefix?: React.ReactNode;
  iconRender?: (visible: boolean) => React.ReactNode;
  wrapperclassname?: string;
  options?: {value: string; disabled?: boolean; title?: string;}[]
}

export const FieldWrapper: React.FC<Props> = ({validate, ...props}: Props) => {
  const [field, {touched, error}] = useField(props.name ?? "");

  let cx = classNames.bind(style);
  let classForField = cx(style.fieldWrapper, {
    success: touched && !error,
    error: error && touched,
  });

  return (
    <div className={props.wrapperclassname ? props.wrapperclassname : ''} style={{marginBottom: '10px'}}>
      <label className={style.title}>{props.label}</label>
      <Tooltip visible={touched && !!error}
               title={error ? error : ''}
               color={error ? 'red' : 'orange'}
      >
        <div className={classForField}>
          {props.type === 'password'
            ? <Input.Password {...field} {...props}/>
            : props.type === 'select'
              ? <Select {...field} {...props} style={{width: 360}}>
                {props?.options?.map((opt: any) => (
                  <Option value={opt.value} key={opt.value} disabled={opt.disabled}>{opt.title ?? opt.value}</Option>
                ))}
              </Select>
              : <Input {...field} {...props} />
          }
        </div>
      </Tooltip>
    </div>
  )
};



