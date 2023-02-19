import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'

import { ROUTES } from 'shared/consts'
import { Modal, VerificationCode } from 'shared/ui'

interface Props {
  open: boolean
  handleClose: () => void
  qrCodeUrl: string
  timeLeft: number
  isTimerEnded: boolean
  onSubmit: (code: string) => void
  onSendCodeAgain: () => void
}

function QrCodeModal({
  open,
  handleClose,
  qrCodeUrl,
  timeLeft,
  isTimerEnded,
  onSubmit,
  onSendCodeAgain,
}: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      closable={false}
      title={t('user:updates.security.qrCodeModalTitle')}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          px: 8,
        }}
      >
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('user:updates.security.qrCodeTitle')}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
          {t('user:updates.security.qrCodeSubtitle')}
        </Typography>

        <Divider sx={{ mt: 2, width: '100%' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
          <Avatar
            sx={{
              height: 180,
              width: 180,
              borderRadius: 2,
              border: ({ palette }) => `3px solid ${palette.divider}`,
            }}
            src={qrCodeUrl}
          />

          <Typography sx={{ mt: 3, mb: 1 }} variant="subtitle2" color="text.secondary">
            {t('user:updates.security.qrCodeVerification')}
          </Typography>

          <VerificationCode
            onSubmit={(value) => {
              onSubmit(value)
              handleClose()
            }}
          />
        </Box>

        {isTimerEnded ? (
          <Button
            onClick={() => {
              onSendCodeAgain()
            }}
            sx={{
              width: 'fit-content',
              color: ({ palette }) => palette.text.primary,
            }}
            size="small"
          >
            {t('actions.sendCodeAgain')}
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('user:qrCodeSecondsLeft', { timeLeft })}
          </Typography>
        )}
      </Box>
    </Modal>
  )
}

export default QrCodeModal
