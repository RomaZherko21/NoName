import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Button, Stack, Typography } from '@mui/material'

import { ROUTES } from 'shared/consts'
import { Modal } from 'shared/ui'

interface Props {
  open: boolean
  handleClose: () => void
  onDelete: () => void
}

function ConfirmDialog({ open, handleClose, onDelete }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onDeleteAccount = () => {
    onDelete()
    handleClose()
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={t('notification:sure')}
      footer={
        <Typography variant="subtitle2" color="text.secondary">
          <Trans i18nKey="sentences:support">
            <Typography
              onClick={() => {
                navigate(ROUTES.HELP)
              }}
              variant="subtitle2"
              color="primary.main"
              sx={{ display: 'inline', cursor: 'pointer' }}
            >
              Help
            </Typography>
          </Trans>
        </Typography>
      }
    >
      <Stack direction="row" spacing={2} sx={{ py: 3, px: 2 }}>
        <Button size="small" onClick={onDeleteAccount} variant="contained" color="error" fullWidth>
          {t('actions.delete')}
        </Button>
        <Button size="small" onClick={handleClose} variant="contained" fullWidth>
          {t('actions.cancel')}
        </Button>
      </Stack>
    </Modal>
  )
}

export default observer(ConfirmDialog)
