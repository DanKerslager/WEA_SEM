import React from 'react'
import { useTranslation } from 'react-i18next';


const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
        <h1>404</h1>
        <p>{t('something_went_wrong')}</p>
    </div>
  )
}

export default NotFound