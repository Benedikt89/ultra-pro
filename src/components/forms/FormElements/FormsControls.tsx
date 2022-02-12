import React from 'react';
import classNames from "classnames";
import {Input, Tooltip} from "antd";
import {useField} from "formik";
import {Select} from 'antd';

const {Option} = Select;

const style = require('./FormControl.module.css');

export const FieldWrapper: React.FC<any> = (props: any) => {
  const [field, {touched, error}] = useField(props);

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
                {props.options.map((opt: any) => (
                  <Option value={opt.value} disabled={opt.disabled}>{opt.title}</Option>
                ))}
              </Select>
              : <Input {...field} {...props}/>
          }
        </div>
      </Tooltip>
    </div>
  )
};



