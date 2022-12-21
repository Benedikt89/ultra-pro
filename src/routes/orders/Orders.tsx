import React from "react";
import {Alert, Button, Typography, Form} from "antd";
import {useTranslation} from "react-i18next";

import {FieldWrapper} from "@Components/forms/FormElements/FormsControls";
import OrdersTable from "@Routes/orders/table/OrdersTable";

import "./Orders.less";

const OrdersPage: React.FC = () => {
  const {t} = useTranslation();
  const [form] = Form.useForm();

  return (
    <div className="content-wrapper">
      <div className="col w-full between">
        <Form className="orders-header" form={form} onFinish={console.log}>
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
            <div style={{minWidth: "300px"}}>
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
        </Form>
        <div className="component-body">
          <div className="mb-2">
            <Typography.Title level={5} style={{margin: "0"}}>
              {t("orders.table_title")}
            </Typography.Title>
          </div>
          <OrdersTable />
        </div>
      </div>
      <div className="orders-footer">
        {["save_order", "save_options", "save_spec", "save_cnc", "save_materials"].map(key => (
          <Button type="primary" key={key} disabled={true}>
            {t(`orders.footer.${key}`)}
          </Button>
        ))}
      </div>
    </div>
  )
};

export default OrdersPage;
