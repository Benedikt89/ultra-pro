import * as React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import {Form as FormikForm, FormikProps, withFormik} from "formik";
import * as Yup from 'yup';
import {Button} from "antd";
import {useTranslation} from "react-i18next";

import {I_recoverPasswordData} from "../../store/auth/api";
import {selectCompanyPasswordRegExp} from "../../store/app/selectors";
import {FieldWrapper} from "../../components/forms/FormElements/FormsControls";

import './ProfilePage.css';

interface FormValues {
  old_pass: string;
  password: string;
  repeat_password: string;
}

interface OtherProps {
  password?: string;
  isFetching: boolean
  waitForPass: boolean
  onSubmit: (data: I_recoverPasswordData) => void
}

const InnerForm: React.FC<OtherProps & FormikProps<FormValues>> = ({isFetching, resetForm, waitForPass}) => {
  const {t} = useTranslation();

  useEffect(() => {
    if (waitForPass && !isFetching) {
      resetForm();
    }
  }, [isFetching]);

  return (
    <FormikForm className="profile-form-wrapper">
      <FieldWrapper
        type="password"
        name="old_pass"
        label={t('label_old_password')}
        wrapperclassname="profile-password-field"
        iconRender={() => false}
      />
      <FieldWrapper
        type="password"
        name="password"
        label={t('label_new_password')}
        wrapperclassname="profile-password-field"
        iconRender={() => false}
      />
      <FieldWrapper
        type="password"
        name="repeat_password"
        label={t('label_confirm_password')}
        wrapperclassname="profile-password-field"
        iconRender={() => false}
      />
      <Button htmlType="submit" type="primary"
              disabled={isFetching} className="profile-form-submit">
        {t('button_save')}
      </Button>
    </FormikForm>
  );
};


function equalTo(this: any, ref: any, msg: string) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path
    },
    test: function (value: any) {
      return value === this.resolve(ref)
    }
  })
}

Yup.addMethod(Yup.string, 'equalTo', equalTo);

// Wrap our form with the withFormik HoC
const PasswordForm = withFormik<OtherProps, FormValues>({

  mapPropsToValues: props => ({
    old_pass: props.password || "",
    password: "",
    repeat_password: "",
  }),

  validationSchema: ((props: any) => {
    return Yup.object().shape({
      old_pass: Yup.string().required('message_required' + "Email"),
      password: Yup.string()
        .required('message_required').matches(props.passwordRegexp, 'message_passwordRegExp'),
      repeat_password: Yup.string()
        //@ts-ignore
        .required('message_required').equalTo(Yup.ref('password'),'message_equalTo')
    })
  }),

  handleSubmit(
    {old_pass, password, repeat_password}: FormValues,
    {props}
  ) {
    props.onSubmit({old_pass, password, repeat_password});
  }
})(InnerForm);

const mapStateToProps = (state: any) => {
  return {
    passwordRegexp: selectCompanyPasswordRegExp(state)
  };
};

export default connect(mapStateToProps)(PasswordForm);


// export default PasswordForm;
