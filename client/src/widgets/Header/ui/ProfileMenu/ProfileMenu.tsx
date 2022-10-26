import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, IconButton } from '@mui/material'

import { useDialog } from 'shared/hooks'
import { useRootStore } from 'stores'
import { PopupMenu } from 'shared/ui'
import { NODE_API_USER_AVATAR_URL } from 'shared/consts'

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
          sx={{ ml: 1 }}
          {...btnProps}
        >
          <Box>
            <Avatar
              alt="Remy Sharp"
              sx={{ cursor: 'pointer' }}
              src={`${NODE_API_USER_AVATAR_URL}/${user.avatar.url}`}
            />
          </Box>
        </IconButton>
      )}
      config={popupConfig}
    />
  )
}

export default observer(ProfileMenu)
