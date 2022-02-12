import * as React from "react";
import {Form as FormikForm, FormikProps, withFormik} from "formik";
import * as Yup from 'yup';
import {Button} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from '@ant-design/icons';

import {I_loginData} from "../../types/auth-types";

import './LogIn.css'
import {FieldWrapper} from "../../components/forms/FormElements/FormsControls";
import {useTranslation} from "react-i18next";

interface FormValues {
  login: string;
  password: string;
}

interface OtherProps {
  initialLogin?: string;
  message?: string;
  error: { message: string } | null
  isFetching: boolean
  onSubmit: (data: I_loginData) => void
}

const InnerForm: React.FC<OtherProps & FormikProps<FormValues>> = ({isFetching, message, error}) => {
  const {t} = useTranslation();
  return (
    <FormikForm>
      {message && <h1>{message}</h1>}
      <FieldWrapper
        type="text"
        name="login"
        label={t('label_login')}
        prefix={<UserOutlined/>}
      />

      <FieldWrapper
        type="password"
        name="password"
        label={t('label_password')}
        prefix={<LockOutlined/>}
        iconRender={(visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
      />
      <div className="col">
        <span>{error ? ' ' : ' '}</span>
        <Button htmlType="submit" type="primary" disabled={isFetching} className="log-in-form-submit">
          {t('button_login')}
        </Button>
      </div>
    </FormikForm>
  );
};

// Wrap our form with the withFormik HoC
const LogInForm = withFormik<OtherProps, FormValues>({
  mapPropsToValues: props => ({
    login: props.initialLogin || "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    login: Yup.string()
      .required("Login is required"),
    password: Yup.string().required("Password is required")
  }),

  handleSubmit(
    {login, password}: FormValues,
    {props, setSubmitting}
  ) {
    props.onSubmit({login, password});
    setSubmitting(true);
  }
})(InnerForm);

export default LogInForm;
