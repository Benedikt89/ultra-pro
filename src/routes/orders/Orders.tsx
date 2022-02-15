import React from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {Form, Formik} from "formik";

import {FieldWrapper} from "../../components/forms/FormElements/FormsControls";

import "./Orders.less";

const {Title} = Typography;

const OrdersPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values: any) => console.log(values)}
    >
      <Form className="content-wrapper">
        <div className="component-header">
          <Button type="primary">
            {t("orders.new_order")}
          </Button>
          <div className="row">
            <Title>{t("orders.title")}</Title>
            <FieldWrapper
              type="text"
              name={"order_number"}
              label={""}
              placeholder={t("orders.order_number.placeholder")}
            />
          </div>

          <div className="col">
          </div>
        </div>
        <div className="component-body">
          <div className="row-between">
            <div className="col">
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"series"}
                label={t("orders.series.title")}
                placeholder={t("orders.series.placeholder")}
              />
            </div>
            <div className="col">
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"date"}
                label={t("orders.date.title")}
                placeholder={t("orders.date.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"customer"}
                label={t("orders.customer.title")}
                placeholder={t("orders.customer.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"phone"}
                label={t("orders.phone.title")}
                placeholder={t("orders.phone.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"city"}
                label={t("orders.city.title")}
                placeholder={t("orders.city.placeholder")}
              />
            </div>
          </div>
          <div>
            CONTENT
            Зберегти замовлення
          </div>
        </div>
        <div className="component-footer">
          {["save_order", "save_options", "save_spec", "save_cnc", "save_materials"].map(key => (
            <Button type="primary" key={key}>
              {t(`orders.footer.${key}`)}
            </Button>
          ))}
        </div>
      </Form>
    </Formik>
  )
};


export default OrdersPage;
