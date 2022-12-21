import React from "react";
import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";

const ErrorPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Result
      status="404"
      title={t("error.404.title")}
      subTitle={t("error.404.subtitle")}
      extra={<Button type="primary">{t("error.go_back")}</Button>}
    />
  )
};

export default ErrorPage;
