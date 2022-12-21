import * as React from "react";
import {Button, Form} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

import {LoginData} from "@Types/auth-types";
import {FieldWrapper} from "@Components/forms/FormElements/FormsControls";

import './LogIn.less'

interface OtherProps {
  initialLogin?: string;
  message?: string;
  error: { message: string } | null
  isFetching: boolean
  onSubmit: (data: LoginData) => void
}

const LogInForm: React.FC<OtherProps> = ({onSubmit, isFetching, message, error}) => {
  const {t} = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical" labelCol={{ span: 6 }}>
      {message && <h1>{message}</h1>}
      <FieldWrapper
        wrapperclassname="mb-2"
        type="text"
        name="username"
        label={t('login.login.title')}
        placeholder={t('login.login.placeholder')}
        prefix={<UserOutlined/>}
        rules={[{ required: true }]}
      />
      <FieldWrapper
        wrapperclassname="mb-3"
        type="password"
        name="password"
        label={t('login.password.title')}
        placeholder={t('login.password.placeholder')}
        prefix={<LockOutlined/>}
        rules={[{ required: true }]}
        iconRender={(visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
      />
      <span>{error ? ' ' : ' '}</span>
      <Form.Item name="">
        <Button htmlType="submit" type="primary" disabled={isFetching} className="log-in-form-submit">
          {t('login.confirm')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LogInForm;
