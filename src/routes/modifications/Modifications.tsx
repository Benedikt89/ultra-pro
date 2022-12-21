import React, {useCallback, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Button, Form, Typography} from "antd";
import {FileAddOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import {AppStateType} from "@Store/store";
import ModificationSelector from "@Components/common/ModificationSelector";
import detail from "@Assets/images/mock-detail.png";
import {addModification, setOrderModificationsState} from "@Store/mods/actions";
import {setModal} from "@Store/app/actions";
import {onSaveModifications} from "@Store/orders/actions";
import {MODAL} from "@Types/app-types";

import "./Modifications.less";

const Modifications: React.FC = () => {
  const {t} = useTranslation();
  let { orderId } = useParams();
  const ids = useSelector((state: AppStateType) => state.mods.ids);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      // @ts-ignore
      dispatch(setOrderModificationsState(orderId));
    }

    return () => {
      if (orderId) {
        // @ts-ignore
        dispatch(onSaveModifications(orderId))
      }
    }
  }, [orderId]);

  const handleAddModification = useCallback(() => {
    dispatch(addModification());
    dispatch(setModal(MODAL.MODIFICATION, "modal_title"));
  }, []);

  return (
    <Form className="modifications-wrapper" onFinish={console.log}>
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
  )
}

export default Modifications;
