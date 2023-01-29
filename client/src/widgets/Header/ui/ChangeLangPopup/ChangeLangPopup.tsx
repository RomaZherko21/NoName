import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { PopupMenu } from 'shared/ui'
import flagIcon from 'assets/images/lang/uk.svg'

import { getPopupConfig } from './PopupConfig'
import i18next from 'i18next'
import { IconButton, Tooltip } from '@mui/material'

function ChangeLangPopup() {
  const { t } = useTranslation()

  const popupConfig = useMemo(
    () =>
      getPopupConfig((val: string) => {
        i18next.changeLanguage(val)
      }),
    []
  )

  return (
    <PopupMenu
      ActionButton={(btnProps: any) => (
        <Tooltip title={t('actions.changeLanguage')}>
          <IconButton>
            <img width="24px" alt="en" src={flagIcon} {...btnProps} />
          </IconButton>
        </Tooltip>
      )}
      config={popupConfig}
    />
  )
}

export default observer(ChangeLangPopup)
