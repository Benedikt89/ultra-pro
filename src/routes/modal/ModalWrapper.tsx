import React from "react";
import {Modal, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {AppStateType} from "@Store/store";
import {MODAL} from "@Types/app-types";
import {setModal} from "@Store/app/actions";
import ModificationModal from "@Routes/modifications/modal/ModificationModal";

const ModalWrapper: React.FC = () => {
  const {t} = useTranslation();
  const modal = useSelector((state: AppStateType) => state.app.modal)
  return (
    <Modal
      title={modal && t(modal.title)}
      centered
      width={modal?.type === MODAL.MODIFICATION ? 800 : undefined}
      confirmLoading={false}
      forceRender={true}
      open={!!modal}
      onCancel={() => setModal(null, null)}
    >
      {!modal ? null : modal?.type === MODAL.MODIFICATION ? (
        <ModificationModal/>
      ) : (
        <Result
          status={modal.type}
          title={t(modal.type)}
          subTitle={t(modal.message)}
        />
      )}
    </Modal>
  )
};

export default ModalWrapper;
