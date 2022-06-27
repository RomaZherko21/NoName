import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, IconButton } from '@mui/material'

import { useDialog } from 'shared/hooks'
import { useRootStore } from 'stores'
import { PopupMenu } from 'shared/ui'

import ExitDialog from './ExitDialog'
import { getPopupConfig } from './PopupConfig'

function ProfileMenu() {
  const { user } = useRootStore()

  const [showConfirmationModal] = useDialog(
    'notification:exitConfirm',
    (onClose) => <ExitDialog onClose={onClose} />,
    true
  )

  const popupConfig = useMemo(() => getPopupConfig(showConfirmationModal), [showConfirmationModal])

  return (
    <PopupMenu
      ActionButton={(btnProps: any) => (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          {...btnProps}
        >
          <Box>
            <Avatar alt="Remy Sharp" sx={{ cursor: 'pointer' }} src={user.getPhotoUrl()} />
          </Box>
        </IconButton>
      )}
      config={popupConfig}
    />
  )
}

export default observer(ProfileMenu)
