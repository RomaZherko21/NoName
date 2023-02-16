import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'

import { ROUTES } from 'shared/consts'
import { Modal, VerificationCode } from 'shared/ui'

interface Props {
  open: boolean
  handleClose: () => void
  title: string
  subtitle: string
  timeLeft: number
  isTimerEnded: boolean
  onSubmit: (code: string) => void
  onSendCodeAgain: () => void
}

function VerificationCodeModal({
  open,
  handleClose,
  title,
  subtitle,
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
      title={t('notification:verification')}
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
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary">
          {subtitle}
        </Typography>
        <VerificationCode
          sx={{ mt: 4 }}
          onSubmit={(value) => {
            onSubmit(value)
            handleClose()
          }}
        />

        {isTimerEnded ? (
          <Button
            onClick={() => {
              onSendCodeAgain()
            }}
            sx={{
              mt: 4,
              width: 'fit-content',
              color: ({ palette }) => palette.text.primary,
            }}
            size="small"
          >
            {t('actions.sendCodeAgain')}
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
            {t('user:codeSecondsLeft', { timeLeft })}
          </Typography>
        )}
      </Box>
    </Modal>
  )
}

export default VerificationCodeModal
