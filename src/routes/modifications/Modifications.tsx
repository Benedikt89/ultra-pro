import React, {useCallback} from "react";
import {Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {Button, Typography} from "antd";
import {FileAddOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import {AppStateType} from "store/store";
import ModificationSelector from "components/common/ModificationSelector";
import detail from "assets/images/mock-detail.png";
import {addModification} from "store/mods/actions";

import "./Modifications.less";

const Modifications: React.FC = () => {
  const {t} = useTranslation();
  const ids = useSelector((state: AppStateType) => state.mods.ids);
  const dispatch = useDispatch();

  const handleAddModification = useCallback(() => {
    dispatch(addModification());
  }, []);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values: any) => console.log(values)}
    >
      <Form className="modifications-wrapper">
        <div className="mods-inputs-block">
          <div className="mods-inputs-section">
            <div className="mods-inputs-title">
              <Typography.Title level={5}>{t("mods.mods_title")}</Typography.Title>
            </div>
            <div className="mods-inputs-wrapper p-4">
              <div className="col">
                {ids.map(id => (
                  <ModificationSelector id={id} key={id} />
                ))}
              </div>
              <div className="row between">
                <p> </p>
                <Button
                  onClick={handleAddModification}
                  type="primary"
                  icon={<FileAddOutlined />}
                >
                  {t("mods.add_mod")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-image-section">
          <div className="detail-image-title">
            <Typography.Title level={5}>{t("mods.image_title")}</Typography.Title>
          </div>
          <div className="detail-image-wrapper">
            <img src={detail} alt=""/>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default Modifications;
