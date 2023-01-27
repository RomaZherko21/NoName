import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import ukIcon from 'assets/images/lang/uk.svg'

import { PopupMenu } from 'shared/ui'

import { getPopupConfig } from './PopupConfig'
import i18next from 'i18next'
import { IconButton, Tooltip } from '@mui/material'

function ChangeLangPopup() {
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
        <Tooltip title="Change language">
          <IconButton>
            <img width="20px" alt="uk" src={ukIcon} {...btnProps} />
          </IconButton>
        </Tooltip>
      )}
      config={popupConfig}
    />
  )
}

export default observer(ChangeLangPopup)
