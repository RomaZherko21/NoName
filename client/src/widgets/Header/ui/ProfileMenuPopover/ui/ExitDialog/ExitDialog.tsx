import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Button, Stack } from '@mui/material'

import { Modal } from 'shared/ui'
import { useRootStore } from 'stores'

interface Props {
  open: boolean
  handleClose: () => void
}

function ConfirmDialog({ open, handleClose }: Props) {
  const { t } = useTranslation()
  const { authorization } = useRootStore()

  const onExit = () => {
    authorization.unauthorize()
    handleClose()
  }

  return (
    <Modal open={open} handleClose={handleClose} title={t('notification:sure')}>
      <Stack direction="row" spacing={2} sx={{ py: 3, px: 2 }}>
        <Button size="small" onClick={onExit} variant="contained" color="error" fullWidth>
          {t('actions.exit')}
        </Button>
        <Button size="small" onClick={handleClose} variant="contained" fullWidth>
          {t('actions.cancel')}
        </Button>
      </Stack>
    </Modal>
  )
}

export default observer(ConfirmDialog)
