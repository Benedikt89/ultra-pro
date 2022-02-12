import * as React from 'react';
import {useTranslation} from "react-i18next";

export const ErrorMessage: React.FC<{ onReset: () => void }> = ({onReset,}) => {
  const {t} = useTranslation();
  return (
    <div>
      <h2>{t('message_unexpected')}</h2>
      {t('to_continue')}
      <a
        href="/"
        onClick={() => {
          onReset();
        }}
      >
        {t('to_main_page')}
      </a>
    </div>
  );
};
