import React from "react";
import {Alert, Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {Form as FormikForm, Formik} from "formik";

import {FieldWrapper} from "components/forms/FormElements/FormsControls";
import OrdersTable from "routes/orders/table/OrdersTable";

import "./Orders.less";

const OrdersPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className="content-wrapper">
      <Formik
        initialValues={{}}
        onSubmit={(values: any) => console.log(values)}
      >
        <FormikForm className="orders-header">
          <div className="orders-header-row">
            <div>
              <Button type="primary">
                {t("orders.new_order")}
              </Button>
            </div>
            <div className="row between">
              <Typography.Title level={4} style={{margin: "0 1.5rem 0 0"}}>
                {t("orders.title")}
              </Typography.Title>
              <FieldWrapper
                type="text"
                name={"order_number"}
                label={""}
                placeholder={t("orders.order_number.placeholder")}
              />
            </div>
            <div> </div>
          </div>
          <div className="orders-header-row">
            <div className="col">
              <FieldWrapper
                wrapperclassname="forms-row"
                type="text"
                name={"series"}
                label={t("orders.series.title")}
                placeholder={t("orders.series.placeholder")}
              />
            </div>
            <div>
              <Alert
                message="Важливо!"
                description="Даний товар обміну і поверненню не підлягає!"
                type="error"
                showIcon
              />
            </div>
            <div className="col">
              <FieldWrapper
                wrapperclassname="forms-row-right"
                type="text"
                name={"date"}
                label={t("orders.date.title")}
                placeholder={t("orders.date.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row-right"
                type="text"
                name={"customer"}
                label={t("orders.customer.title")}
                placeholder={t("orders.customer.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row-right"
                type="text"
                name={"phone"}
                label={t("orders.phone.title")}
                placeholder={t("orders.phone.placeholder")}
              />
              <FieldWrapper
                wrapperclassname="forms-row-right"
                type="text"
                name={"city"}
                label={t("orders.city.title")}
                placeholder={t("orders.city.placeholder")}
              />
            </div>
          </div>
        </FormikForm>
      </Formik>
      <div className="component-body">
        <div className="mb-2">
          <Typography.Title level={5} style={{margin: "0"}}>
            {t("orders.table_title")}
          </Typography.Title>
        </div>
        <OrdersTable />
      </div>
      <div className="orders-footer">
        {["save_order", "save_options", "save_spec", "save_cnc", "save_materials"].map(key => (
          <Button type="primary" key={key}>
            {t(`orders.footer.${key}`)}
          </Button>
        ))}
      </div>
    </div>
  )
};

export default OrdersPage;
