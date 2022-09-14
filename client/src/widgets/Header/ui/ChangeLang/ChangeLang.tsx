import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import ukIcon from 'assets/images/lang/uk.svg'

import { PopupMenu } from 'shared/ui'

import { getPopupConfig } from './PopupConfig'
import i18next from 'i18next'
import { IconButton } from '@mui/material'

function ChangeLang() {
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
        <IconButton sx={{ ml: 1 }}>
          <img width="20px" alt="uk" src={ukIcon} {...btnProps} />
        </IconButton>
      )}
      config={popupConfig}
    />
  )
}

export default observer(ChangeLang)
