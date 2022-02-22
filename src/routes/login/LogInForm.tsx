import * as React from "react";
import {Form as FormikForm, FormikProps, withFormik} from "formik";
import * as Yup from 'yup';
import {Button} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

import {LoginData} from "../../types/auth-types";
import {FieldWrapper} from "../../components/forms/FormElements/FormsControls";

import './LogIn.less'

interface FormValues {
  login: string;
  password: string;
}

interface OtherProps {
  initialLogin?: string;
  message?: string;
  error: { message: string } | null
  isFetching: boolean
  onSubmit: (data: LoginData) => void
}

const InnerForm: React.FC<OtherProps & FormikProps<FormValues>> = ({isFetching, message, error}) => {
  const {t} = useTranslation();
  return (
    <FormikForm>
      {message && <h1>{message}</h1>}
      <FieldWrapper
        wrapperclassname="mb-2"
        type="text"
        name="login"
        label={t('login.login.title')}
        placeholder={t('login.login.placeholder')}
        prefix={<UserOutlined/>}
      />
      <FieldWrapper
        wrapperclassname="mb-3"
        type="password"
        name="password"
        label={t('login.password.title')}
        placeholder={t('login.password.placeholder')}
        prefix={<LockOutlined/>}
        iconRender={(visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
      />
      <div className="col">
        <span>{error ? ' ' : ' '}</span>
        <Button htmlType="submit" type="primary" disabled={isFetching} className="log-in-form-submit">
          {t('login.confirm')}
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
