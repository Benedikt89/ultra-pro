import * as React from "react";
import {Button} from "antd";
import {Form, Formik} from "formik";

import {ProfileFieldType} from "../../types/auth-types";

import './ProfilePage.css';
import {useTranslation} from "react-i18next";
import {FieldWrapper} from "../../components/forms/FormElements/FormsControls";

interface OtherProps {
  fields: ProfileFieldType[];
  onSubmit: (data: ProfileFieldType[]) => void,
  userRole: string
  loading: boolean
}

interface Values {
  [key: string]: string
}
interface Validators {
  [key: string]: (value: string) => string | undefined
}

export const isValidRegExp = (str: string): boolean => {
  try {
    const reg = new RegExp(str);
    reg.exec('asdwdsa/asdmaoskmcsdo w98ahe 9f9quhfv ilauhr8o7g qailfdbg lia');
    reg.test('asdwdsa/asdmaoskmcsdo w98ahe 9f9quhfv ilauhr8o7g qailfdbg lia');
    return true;
  } catch (e) {
    return false;
  }
};

const ProfileDataForm = ({userRole, fields, onSubmit, loading}: OtherProps) => {
  const {t} = useTranslation();

  const onFinish = (values: any) => {
    let newFields = fields.map(field => ({
      ...field,
      value: values[field.id] ? values[field.id] : field.value
    }));
    onSubmit(newFields);
  };
  const iniValues:Values = {};
  const validators:Validators = {};

  fields.forEach((field) => {
    iniValues[field.id] = field.value;
    const validator = (value: string) => {
      if (!value && field.mandatory) {
        return t('message_required');
      }
      if (field.regexp) {
        if (isValidRegExp(field.regexp)) {
          return new RegExp(field.regexp).test(value) ? undefined : t('message_notValid');
        }
      }
      return undefined;
    };
    validators[field.id] = validator
  });

  return !fields.length ? (
    // <div style={{minWidth: '40rem', minHeight: '10rem', textAlign: 'center'}}>No Data</div>
    <div className="profile-form-field" style={{marginBottom: '10px'}}>
      <label style={{color: '#919191'}} >{t('label_role')}</label>
      <div>
        <span className="ant-input">{t(userRole)}</span>
      </div>
    </div>
  ) : (
    <>
      <div className="profile-form-field" style={{marginBottom: '10px'}}>
        <label style={{color: '#919191'}} >{t('label_role')}</label>
        <div>
          <span className="ant-input">{t(userRole)}</span>
        </div>
      </div>
    <Formik
      initialValues={iniValues}
      onSubmit={(values: Values) => onFinish(values)}
    >
      <Form name="user_data" className="profile-form-wrapper">
        {fields.map((field) => (
          <FieldWrapper
            key={field.id}
            type="text"
            name={field.id}
            label={field.name}
            validate={validators[field.id]}
            wrapperclassname="profile-form-field"
            iconRender={() => false}
          />
        ))}
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('button_save')}
        </Button>
      </Form>
    </Formik>
    </>
  )
};

export default ProfileDataForm;
